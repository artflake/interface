import { Trans } from "@lingui/react";
import { CurrencyAmount, Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { useTotalSupply } from "../../hooks/useTotalSupply";
import { useV2Pair } from "../../hooks/useV2Pairs";
import { useActiveWeb3React } from "../../hooks/web3";
import { tryParseAmount } from "../swap/hooks";
import { useTokenBalances } from "../wallet/hooks";
import { Field, typeInput } from "./actions";
import { jsx as _jsx } from "react/jsx-runtime";
export function useBurnState() {
  return useAppSelector(state => state.burn);
}
export function useDerivedBurnInfo(currencyA, currencyB) {
  var _pair$liquidityToken$, _pair$liquidityToken;

  const {
    account
  } = useActiveWeb3React();
  const {
    independentField,
    typedValue
  } = useBurnState(); // pair + totalsupply

  const [, pair] = useV2Pair(currencyA, currencyB); // balances

  const relevantTokenBalances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, [pair === null || pair === void 0 ? void 0 : pair.liquidityToken]);
  const userLiquidity = relevantTokenBalances === null || relevantTokenBalances === void 0 ? void 0 : relevantTokenBalances[(_pair$liquidityToken$ = pair === null || pair === void 0 ? void 0 : (_pair$liquidityToken = pair.liquidityToken) === null || _pair$liquidityToken === void 0 ? void 0 : _pair$liquidityToken.address) !== null && _pair$liquidityToken$ !== void 0 ? _pair$liquidityToken$ : ''];
  const [tokenA, tokenB] = [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped];
  const tokens = {
    [Field.CURRENCY_A]: tokenA,
    [Field.CURRENCY_B]: tokenB,
    [Field.LIQUIDITY]: pair === null || pair === void 0 ? void 0 : pair.liquidityToken
  }; // liquidity values

  const totalSupply = useTotalSupply(pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
  const liquidityValueA = pair && totalSupply && userLiquidity && tokenA && // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
  JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient) ? CurrencyAmount.fromRawAmount(tokenA, pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false).quotient) : undefined;
  const liquidityValueB = pair && totalSupply && userLiquidity && tokenB && // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
  JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient) ? CurrencyAmount.fromRawAmount(tokenB, pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false).quotient) : undefined;
  const liquidityValues = {
    [Field.CURRENCY_A]: liquidityValueA,
    [Field.CURRENCY_B]: liquidityValueB
  };
  let percentToRemove = new Percent('0', '100'); // user specified a %

  if (independentField === Field.LIQUIDITY_PERCENT) {
    percentToRemove = new Percent(typedValue, '100');
  } // user specified a specific amount of liquidity tokens
  else if (independentField === Field.LIQUIDITY) {
    if (pair !== null && pair !== void 0 && pair.liquidityToken) {
      const independentAmount = tryParseAmount(typedValue, pair.liquidityToken);

      if (independentAmount && userLiquidity && !independentAmount.greaterThan(userLiquidity)) {
        percentToRemove = new Percent(independentAmount.quotient, userLiquidity.quotient);
      }
    }
  } // user specified a specific amount of token a or b
  else {
    if (tokens[independentField]) {
      const independentAmount = tryParseAmount(typedValue, tokens[independentField]);
      const liquidityValue = liquidityValues[independentField];

      if (independentAmount && liquidityValue && !independentAmount.greaterThan(liquidityValue)) {
        percentToRemove = new Percent(independentAmount.quotient, liquidityValue.quotient);
      }
    }
  }

  const parsedAmounts = {
    [Field.LIQUIDITY_PERCENT]: percentToRemove,
    [Field.LIQUIDITY]: userLiquidity && percentToRemove && percentToRemove.greaterThan('0') ? CurrencyAmount.fromRawAmount(userLiquidity.currency, percentToRemove.multiply(userLiquidity.quotient).quotient) : undefined,
    [Field.CURRENCY_A]: tokenA && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueA ? CurrencyAmount.fromRawAmount(tokenA, percentToRemove.multiply(liquidityValueA.quotient).quotient) : undefined,
    [Field.CURRENCY_B]: tokenB && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueB ? CurrencyAmount.fromRawAmount(tokenB, percentToRemove.multiply(liquidityValueB.quotient).quotient) : undefined
  };
  let error;

  if (!account) {
    error = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (!parsedAmounts[Field.LIQUIDITY] || !parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
    var _error;

    error = (_error = error) !== null && _error !== void 0 ? _error : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  return {
    pair,
    parsedAmounts,
    error
  };
}
export function useBurnActionHandlers() {
  const dispatch = useAppDispatch();
  const onUserInput = useCallback((field, typedValue) => {
    dispatch(typeInput({
      field,
      typedValue
    }));
  }, [dispatch]);
  return {
    onUserInput
  };
}