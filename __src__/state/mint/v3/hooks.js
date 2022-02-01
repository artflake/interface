import { Trans } from "@lingui/react";
import { CurrencyAmount, Price, Rounding } from '@uniswap/sdk-core';
import { encodeSqrtRatioX96, nearestUsableTick, Pool, Position, priceToClosestTick, TICK_SPACINGS, TickMath, tickToPrice } from '@uniswap/v3-sdk';
import { usePool } from "../../../hooks/usePools";
import JSBI from 'jsbi';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTickToPrice } from "../../../utils/getTickToPrice";
import { BIG_INT_ZERO } from "../../../constants/misc";
import { PoolState } from "../../../hooks/usePools";
import { useActiveWeb3React } from "../../../hooks/web3";
import { tryParseAmount } from "../../swap/hooks";
import { useCurrencyBalances } from "../../wallet/hooks";
import { Bound, Field, setFullRange, typeInput, typeLeftRangeInput, typeRightRangeInput, typeStartPriceInput } from "./actions";
import { tryParseTick } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
export function useV3MintState() {
  return useAppSelector(state => state.mintV3);
}
export function useV3MintActionHandlers(noLiquidity) {
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
  const onLeftRangeInput = useCallback(typedValue => {
    dispatch(typeLeftRangeInput({
      typedValue
    }));
  }, [dispatch]);
  const onRightRangeInput = useCallback(typedValue => {
    dispatch(typeRightRangeInput({
      typedValue
    }));
  }, [dispatch]);
  const onStartPriceInput = useCallback(typedValue => {
    dispatch(typeStartPriceInput({
      typedValue
    }));
  }, [dispatch]);
  return {
    onFieldAInput,
    onFieldBInput,
    onLeftRangeInput,
    onRightRangeInput,
    onStartPriceInput
  };
}
export function useV3DerivedMintInfo(currencyA, currencyB, feeAmount, baseCurrency, // override for existing position
existingPosition) {
  var _currencyBalances$Fie, _currencyBalances$Fie2;

  const {
    account
  } = useActiveWeb3React();
  const {
    independentField,
    typedValue,
    leftRangeTypedValue,
    rightRangeTypedValue,
    startPriceTypedValue
  } = useV3MintState();
  const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A; // currencies

  const currencies = useMemo(() => ({
    [Field.CURRENCY_A]: currencyA,
    [Field.CURRENCY_B]: currencyB
  }), [currencyA, currencyB]); // formatted with tokens

  const [tokenA, tokenB, baseToken] = useMemo(() => [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped, baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.wrapped], [currencyA, currencyB, baseCurrency]);
  const [token0, token1] = useMemo(() => tokenA && tokenB ? tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] : [undefined, undefined], [tokenA, tokenB]); // balances

  const balances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, useMemo(() => [currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B]], [currencies]));
  const currencyBalances = {
    [Field.CURRENCY_A]: balances[0],
    [Field.CURRENCY_B]: balances[1]
  }; // pool

  const [poolState, pool] = usePool(currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B], feeAmount);
  const noLiquidity = poolState === PoolState.NOT_EXISTS; // note to parse inputs in reverse

  const invertPrice = Boolean(baseToken && token0 && !baseToken.equals(token0)); // always returns the price with 0 as base token

  const price = useMemo(() => {
    // if no liquidity use typed value
    if (noLiquidity) {
      const parsedQuoteAmount = tryParseAmount(startPriceTypedValue, invertPrice ? token0 : token1);

      if (parsedQuoteAmount && token0 && token1) {
        var _ref;

        const baseAmount = tryParseAmount('1', invertPrice ? token1 : token0);
        const price = baseAmount && parsedQuoteAmount ? new Price(baseAmount.currency, parsedQuoteAmount.currency, baseAmount.quotient, parsedQuoteAmount.quotient) : undefined;
        return (_ref = invertPrice ? price === null || price === void 0 ? void 0 : price.invert() : price) !== null && _ref !== void 0 ? _ref : undefined;
      }

      return undefined;
    } else {
      // get the amount of quote currency
      return pool && token0 ? pool.priceOf(token0) : undefined;
    }
  }, [noLiquidity, startPriceTypedValue, invertPrice, token1, token0, pool]); // check for invalid price input (converts to invalid ratio)

  const invalidPrice = useMemo(() => {
    const sqrtRatioX96 = price ? encodeSqrtRatioX96(price.numerator, price.denominator) : undefined;
    const invalid = price && sqrtRatioX96 && !(JSBI.greaterThanOrEqual(sqrtRatioX96, TickMath.MIN_SQRT_RATIO) && JSBI.lessThan(sqrtRatioX96, TickMath.MAX_SQRT_RATIO));
    return invalid;
  }, [price]); // used for ratio calculation when pool not initialized

  const mockPool = useMemo(() => {
    if (tokenA && tokenB && feeAmount && price && !invalidPrice) {
      const currentTick = priceToClosestTick(price);
      const currentSqrt = TickMath.getSqrtRatioAtTick(currentTick);
      return new Pool(tokenA, tokenB, feeAmount, currentSqrt, JSBI.BigInt(0), currentTick, []);
    } else {
      return undefined;
    }
  }, [feeAmount, invalidPrice, price, tokenA, tokenB]); // if pool exists use it, if not use the mock pool

  const poolForPosition = pool !== null && pool !== void 0 ? pool : mockPool; // lower and upper limits in the tick space for `feeAmoun<Trans>

  const tickSpaceLimits = useMemo(() => ({
    [Bound.LOWER]: feeAmount ? nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]) : undefined,
    [Bound.UPPER]: feeAmount ? nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]) : undefined
  }), [feeAmount]); // parse typed range values and determine closest ticks
  // lower should always be a smaller tick

  const ticks = useMemo(() => {
    return {
      [Bound.LOWER]: typeof (existingPosition === null || existingPosition === void 0 ? void 0 : existingPosition.tickLower) === 'number' ? existingPosition.tickLower : invertPrice && typeof rightRangeTypedValue === 'boolean' || !invertPrice && typeof leftRangeTypedValue === 'boolean' ? tickSpaceLimits[Bound.LOWER] : invertPrice ? tryParseTick(token1, token0, feeAmount, rightRangeTypedValue.toString()) : tryParseTick(token0, token1, feeAmount, leftRangeTypedValue.toString()),
      [Bound.UPPER]: typeof (existingPosition === null || existingPosition === void 0 ? void 0 : existingPosition.tickUpper) === 'number' ? existingPosition.tickUpper : !invertPrice && typeof rightRangeTypedValue === 'boolean' || invertPrice && typeof leftRangeTypedValue === 'boolean' ? tickSpaceLimits[Bound.UPPER] : invertPrice ? tryParseTick(token1, token0, feeAmount, leftRangeTypedValue.toString()) : tryParseTick(token0, token1, feeAmount, rightRangeTypedValue.toString())
    };
  }, [existingPosition, feeAmount, invertPrice, leftRangeTypedValue, rightRangeTypedValue, token0, token1, tickSpaceLimits]);
  const {
    [Bound.LOWER]: tickLower,
    [Bound.UPPER]: tickUpper
  } = ticks || {}; // specifies whether the lower and upper ticks is at the exteme bounds

  const ticksAtLimit = useMemo(() => ({
    [Bound.LOWER]: feeAmount && tickLower === tickSpaceLimits.LOWER,
    [Bound.UPPER]: feeAmount && tickUpper === tickSpaceLimits.UPPER
  }), [tickSpaceLimits, tickLower, tickUpper, feeAmount]); // mark invalid range

  const invalidRange = Boolean(typeof tickLower === 'number' && typeof tickUpper === 'number' && tickLower >= tickUpper); // always returns the price with 0 as base token

  const pricesAtTicks = useMemo(() => {
    return {
      [Bound.LOWER]: getTickToPrice(token0, token1, ticks[Bound.LOWER]),
      [Bound.UPPER]: getTickToPrice(token0, token1, ticks[Bound.UPPER])
    };
  }, [token0, token1, ticks]);
  const {
    [Bound.LOWER]: lowerPrice,
    [Bound.UPPER]: upperPrice
  } = pricesAtTicks; // liquidity range warning

  const outOfRange = Boolean(!invalidRange && price && lowerPrice && upperPrice && (price.lessThan(lowerPrice) || price.greaterThan(upperPrice))); // amounts

  const independentAmount = tryParseAmount(typedValue, currencies[independentField]);
  const dependentAmount = useMemo(() => {
    // we wrap the currencies just to get the price in terms of the other token
    const wrappedIndependentAmount = independentAmount === null || independentAmount === void 0 ? void 0 : independentAmount.wrapped;
    const dependentCurrency = dependentField === Field.CURRENCY_B ? currencyB : currencyA;

    if (independentAmount && wrappedIndependentAmount && typeof tickLower === 'number' && typeof tickUpper === 'number' && poolForPosition) {
      // if price is out of range or invalid range - return 0 (single deposit will be independent)
      if (outOfRange || invalidRange) {
        return undefined;
      }

      const position = wrappedIndependentAmount.currency.equals(poolForPosition.token0) ? Position.fromAmount0({
        pool: poolForPosition,
        tickLower,
        tickUpper,
        amount0: independentAmount.quotient,
        useFullPrecision: true // we want full precision for the theoretical position

      }) : Position.fromAmount1({
        pool: poolForPosition,
        tickLower,
        tickUpper,
        amount1: independentAmount.quotient
      });
      const dependentTokenAmount = wrappedIndependentAmount.currency.equals(poolForPosition.token0) ? position.amount1 : position.amount0;
      return dependentCurrency && CurrencyAmount.fromRawAmount(dependentCurrency, dependentTokenAmount.quotient);
    }

    return undefined;
  }, [independentAmount, outOfRange, dependentField, currencyB, currencyA, tickLower, tickUpper, poolForPosition, invalidRange]);
  const parsedAmounts = useMemo(() => {
    return {
      [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? independentAmount : dependentAmount,
      [Field.CURRENCY_B]: independentField === Field.CURRENCY_A ? dependentAmount : independentAmount
    };
  }, [dependentAmount, independentAmount, independentField]); // single deposit only if price is out of range

  const deposit0Disabled = Boolean(typeof tickUpper === 'number' && poolForPosition && poolForPosition.tickCurrent >= tickUpper);
  const deposit1Disabled = Boolean(typeof tickLower === 'number' && poolForPosition && poolForPosition.tickCurrent <= tickLower); // sorted for token order

  const depositADisabled = invalidRange || Boolean(deposit0Disabled && poolForPosition && tokenA && poolForPosition.token0.equals(tokenA) || deposit1Disabled && poolForPosition && tokenA && poolForPosition.token1.equals(tokenA));
  const depositBDisabled = invalidRange || Boolean(deposit0Disabled && poolForPosition && tokenB && poolForPosition.token0.equals(tokenB) || deposit1Disabled && poolForPosition && tokenB && poolForPosition.token1.equals(tokenB)); // create position entity based on users selection

  const position = useMemo(() => {
    var _parsedAmounts, _parsedAmounts2;

    if (!poolForPosition || !tokenA || !tokenB || typeof tickLower !== 'number' || typeof tickUpper !== 'number' || invalidRange) {
      return undefined;
    } // mark as 0 if disabled because out of range


    const amount0 = !deposit0Disabled ? parsedAmounts === null || parsedAmounts === void 0 ? void 0 : (_parsedAmounts = parsedAmounts[tokenA.equals(poolForPosition.token0) ? Field.CURRENCY_A : Field.CURRENCY_B]) === null || _parsedAmounts === void 0 ? void 0 : _parsedAmounts.quotient : BIG_INT_ZERO;
    const amount1 = !deposit1Disabled ? parsedAmounts === null || parsedAmounts === void 0 ? void 0 : (_parsedAmounts2 = parsedAmounts[tokenA.equals(poolForPosition.token0) ? Field.CURRENCY_B : Field.CURRENCY_A]) === null || _parsedAmounts2 === void 0 ? void 0 : _parsedAmounts2.quotient : BIG_INT_ZERO;

    if (amount0 !== undefined && amount1 !== undefined) {
      return Position.fromAmounts({
        pool: poolForPosition,
        tickLower,
        tickUpper,
        amount0,
        amount1,
        useFullPrecision: true // we want full precision for the theoretical position

      });
    } else {
      return undefined;
    }
  }, [parsedAmounts, poolForPosition, tokenA, tokenB, deposit0Disabled, deposit1Disabled, invalidRange, tickLower, tickUpper]);
  let errorMessage;

  if (!account) {
    errorMessage = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (poolState === PoolState.INVALID) {
    var _errorMessage;

    errorMessage = (_errorMessage = errorMessage) !== null && _errorMessage !== void 0 ? _errorMessage : /*#__PURE__*/_jsx(Trans, {
      id: "Invalid pair"
    });
  }

  if (invalidPrice) {
    var _errorMessage2;

    errorMessage = (_errorMessage2 = errorMessage) !== null && _errorMessage2 !== void 0 ? _errorMessage2 : /*#__PURE__*/_jsx(Trans, {
      id: "Invalid price input"
    });
  }

  if (!parsedAmounts[Field.CURRENCY_A] && !depositADisabled || !parsedAmounts[Field.CURRENCY_B] && !depositBDisabled) {
    var _errorMessage3;

    errorMessage = (_errorMessage3 = errorMessage) !== null && _errorMessage3 !== void 0 ? _errorMessage3 : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  const {
    [Field.CURRENCY_A]: currencyAAmount,
    [Field.CURRENCY_B]: currencyBAmount
  } = parsedAmounts;

  if (currencyAAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie = currencyBalances[Field.CURRENCY_A]) !== null && _currencyBalances$Fie !== void 0 && _currencyBalances$Fie.lessThan(currencyAAmount)) {
    var _currencies$Field$CUR;

    errorMessage = /*#__PURE__*/_jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: (_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol
      }
    });
  }

  if (currencyBAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie2 = currencyBalances[Field.CURRENCY_B]) !== null && _currencyBalances$Fie2 !== void 0 && _currencyBalances$Fie2.lessThan(currencyBAmount)) {
    var _currencies$Field$CUR2;

    errorMessage = /*#__PURE__*/_jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol
      }
    });
  }

  const invalidPool = poolState === PoolState.INVALID;
  return {
    dependentField,
    currencies,
    pool,
    poolState,
    currencyBalances,
    parsedAmounts,
    ticks,
    price,
    pricesAtTicks,
    position,
    noLiquidity,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit
  };
}
export function useRangeHopCallbacks(baseCurrency, quoteCurrency, feeAmount, tickLower, tickUpper, pool) {
  const dispatch = useAppDispatch();
  const baseToken = useMemo(() => baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.wrapped, [baseCurrency]);
  const quoteToken = useMemo(() => quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.wrapped, [quoteCurrency]);
  const getDecrementLower = useCallback(() => {
    if (baseToken && quoteToken && typeof tickLower === 'number' && feeAmount) {
      const newPrice = tickToPrice(baseToken, quoteToken, tickLower - TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    } // use pool current tick as starting tick if we have pool but no tick input


    if (!(typeof tickLower === 'number') && baseToken && quoteToken && feeAmount && pool) {
      const newPrice = tickToPrice(baseToken, quoteToken, pool.tickCurrent - TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    }

    return '';
  }, [baseToken, quoteToken, tickLower, feeAmount, pool]);
  const getIncrementLower = useCallback(() => {
    if (baseToken && quoteToken && typeof tickLower === 'number' && feeAmount) {
      const newPrice = tickToPrice(baseToken, quoteToken, tickLower + TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    } // use pool current tick as starting tick if we have pool but no tick input


    if (!(typeof tickLower === 'number') && baseToken && quoteToken && feeAmount && pool) {
      const newPrice = tickToPrice(baseToken, quoteToken, pool.tickCurrent + TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    }

    return '';
  }, [baseToken, quoteToken, tickLower, feeAmount, pool]);
  const getDecrementUpper = useCallback(() => {
    if (baseToken && quoteToken && typeof tickUpper === 'number' && feeAmount) {
      const newPrice = tickToPrice(baseToken, quoteToken, tickUpper - TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    } // use pool current tick as starting tick if we have pool but no tick input


    if (!(typeof tickUpper === 'number') && baseToken && quoteToken && feeAmount && pool) {
      const newPrice = tickToPrice(baseToken, quoteToken, pool.tickCurrent - TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    }

    return '';
  }, [baseToken, quoteToken, tickUpper, feeAmount, pool]);
  const getIncrementUpper = useCallback(() => {
    if (baseToken && quoteToken && typeof tickUpper === 'number' && feeAmount) {
      const newPrice = tickToPrice(baseToken, quoteToken, tickUpper + TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    } // use pool current tick as starting tick if we have pool but no tick input


    if (!(typeof tickUpper === 'number') && baseToken && quoteToken && feeAmount && pool) {
      const newPrice = tickToPrice(baseToken, quoteToken, pool.tickCurrent + TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, Rounding.ROUND_UP);
    }

    return '';
  }, [baseToken, quoteToken, tickUpper, feeAmount, pool]);
  const getSetFullRange = useCallback(() => {
    dispatch(setFullRange());
  }, [dispatch]);
  return {
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
    getSetFullRange
  };
}