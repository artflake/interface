import { Trans } from "@lingui/react";
import { CurrencyAmount, Percent, Price } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { useTotalSupply } from "../../hooks/useTotalSupply";
import { PairState, useV2Pair } from "../../hooks/useV2Pairs";
import { useActiveWeb3React } from "../../hooks/web3";
import { tryParseAmount } from "../swap/hooks";
import { useCurrencyBalances } from "../wallet/hooks";
import { Field, typeInput } from "./actions";
import { jsx as _jsx } from "react/jsx-runtime";
const ZERO = JSBI.BigInt(0);
export function useMintState() {
  return useAppSelector(state => state.mint);
}
export function useMintActionHandlers(noLiquidity) {
  const dispatch = useAppDispatch();
  const onFieldAInput = useCallback(typedValue => {
    dispatch(typeInput({
      field: Field.CURRENCY_A,
      typedValue,
      noLiquidity: noLiquidity === true
    }));
  }, [dispatch, noLiquidity]);
  const onFieldBInput = useCallback(typedValue => {
    dispatch(typeInput({
      field: Field.CURRENCY_B,
      typedValue,
      noLiquidity: noLiquidity === true
    }));
  }, [dispatch, noLiquidity]);
  return {
    onFieldAInput,
    onFieldBInput
  };
}
export function useDerivedMintInfo(currencyA, currencyB) {
  var _currencyBalances$Fie, _currencyBalances$Fie2;

  const {
    account
  } = useActiveWeb3React();
  const {
    independentField,
    typedValue,
    otherTypedValue
  } = useMintState();
  const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A; // tokens

  const currencies = useMemo(() => ({
    [Field.CURRENCY_A]: currencyA !== null && currencyA !== void 0 ? currencyA : undefined,
    [Field.CURRENCY_B]: currencyB !== null && currencyB !== void 0 ? currencyB : undefined
  }), [currencyA, currencyB]); // pair

  const [pairState, pair] = useV2Pair(currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B]);
  const totalSupply = useTotalSupply(pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
  const noLiquidity = pairState === PairState.NOT_EXISTS || Boolean(totalSupply && JSBI.equal(totalSupply.quotient, ZERO)) || Boolean(pairState === PairState.EXISTS && pair && JSBI.equal(pair.reserve0.quotient, ZERO) && JSBI.equal(pair.reserve1.quotient, ZERO)); // balances

  const balances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, useMemo(() => [currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B]], [currencies]));
  const currencyBalances = {
    [Field.CURRENCY_A]: balances[0],
    [Field.CURRENCY_B]: balances[1]
  }; // amounts

  const independentAmount = tryParseAmount(typedValue, currencies[independentField]);
  const dependentAmount = useMemo(() => {
    if (noLiquidity) {
      if (otherTypedValue && currencies[dependentField]) {
        return tryParseAmount(otherTypedValue, currencies[dependentField]);
      }

      return undefined;
    } else if (independentAmount) {
      // we wrap the currencies just to get the price in terms of the other token
      const wrappedIndependentAmount = independentAmount === null || independentAmount === void 0 ? void 0 : independentAmount.wrapped;
      const [tokenA, tokenB] = [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped];

      if (tokenA && tokenB && wrappedIndependentAmount && pair) {
        const dependentCurrency = dependentField === Field.CURRENCY_B ? currencyB : currencyA;
        const dependentTokenAmount = dependentField === Field.CURRENCY_B ? pair.priceOf(tokenA).quote(wrappedIndependentAmount) : pair.priceOf(tokenB).quote(wrappedIndependentAmount);
        return dependentCurrency !== null && dependentCurrency !== void 0 && dependentCurrency.isNative ? CurrencyAmount.fromRawAmount(dependentCurrency, dependentTokenAmount.quotient) : dependentTokenAmount;
      }

      return undefined;
    } else {
      return undefined;
    }
  }, [noLiquidity, otherTypedValue, currencies, dependentField, independentAmount, currencyA, currencyB, pair]);
  const parsedAmounts = useMemo(() => {
    return {
      [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? independentAmount : dependentAmount,
      [Field.CURRENCY_B]: independentField === Field.CURRENCY_A ? dependentAmount : independentAmount
    };
  }, [dependentAmount, independentAmount, independentField]);
  const price = useMemo(() => {
    if (noLiquidity) {
      const {
        [Field.CURRENCY_A]: currencyAAmount,
        [Field.CURRENCY_B]: currencyBAmount
      } = parsedAmounts;

      if (currencyAAmount !== null && currencyAAmount !== void 0 && currencyAAmount.greaterThan(0) && currencyBAmount !== null && currencyBAmount !== void 0 && currencyBAmount.greaterThan(0)) {
        const value = currencyBAmount.divide(currencyAAmount);
        return new Price(currencyAAmount.currency, currencyBAmount.currency, value.denominator, value.numerator);
      }

      return undefined;
    } else {
      const wrappedCurrencyA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
      return pair && wrappedCurrencyA ? pair.priceOf(wrappedCurrencyA) : undefined;
    }
  }, [currencyA, noLiquidity, pair, parsedAmounts]); // liquidity minted

  const liquidityMinted = useMemo(() => {
    const {
      [Field.CURRENCY_A]: currencyAAmount,
      [Field.CURRENCY_B]: currencyBAmount
    } = parsedAmounts;
    const [tokenAmountA, tokenAmountB] = [currencyAAmount === null || currencyAAmount === void 0 ? void 0 : currencyAAmount.wrapped, currencyBAmount === null || currencyBAmount === void 0 ? void 0 : currencyBAmount.wrapped];

    if (pair && totalSupply && tokenAmountA && tokenAmountB) {
      try {
        return pair.getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB);
      } catch (error) {
        console.error(error);
        return undefined;
      }
    } else {
      return undefined;
    }
  }, [parsedAmounts, pair, totalSupply]);
  const poolTokenPercentage = useMemo(() => {
    if (liquidityMinted && totalSupply) {
      return new Percent(liquidityMinted.quotient, totalSupply.add(liquidityMinted).quotient);
    } else {
      return undefined;
    }
  }, [liquidityMinted, totalSupply]);
  let error;

  if (!account) {
    error = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (pairState === PairState.INVALID) {
    var _error;

    error = (_error = error) !== null && _error !== void 0 ? _error : /*#__PURE__*/_jsx(Trans, {
      id: "Invalid pair"
    });
  }

  if (!parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
    var _error2;

    error = (_error2 = error) !== null && _error2 !== void 0 ? _error2 : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  const {
    [Field.CURRENCY_A]: currencyAAmount,
    [Field.CURRENCY_B]: currencyBAmount
  } = parsedAmounts;

  if (currencyAAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie = currencyBalances[Field.CURRENCY_A]) !== null && _currencyBalances$Fie !== void 0 && _currencyBalances$Fie.lessThan(currencyAAmount)) {
    var _currencies$Field$CUR;

    error = /*#__PURE__*/_jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: (_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol
      }
    });
  }

  if (currencyBAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie2 = currencyBalances[Field.CURRENCY_B]) !== null && _currencyBalances$Fie2 !== void 0 && _currencyBalances$Fie2.lessThan(currencyBAmount)) {
    var _currencies$Field$CUR2;

    error = /*#__PURE__*/_jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol
      }
    });
  }

  return {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error
  };
}