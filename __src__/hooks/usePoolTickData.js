import { skipToken } from '@reduxjs/toolkit/query/react';
import { Pool, TICK_SPACINGS, tickToPrice } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
import { useMemo } from 'react';
import { useAllV3TicksQuery } from 'state/data/enhanced';
import computeSurroundingTicks from 'utils/computeSurroundingTicks';
import { PoolState, usePool } from './usePools';
const PRICE_FIXED_DIGITS = 8; // Tick with fields parsed to JSBIs, and active liquidity computed.

const getActiveTick = (tickCurrent, feeAmount) => tickCurrent && feeAmount ? Math.floor(tickCurrent / TICK_SPACINGS[feeAmount]) * TICK_SPACINGS[feeAmount] : undefined; // Fetches all ticks for a given pool


export function useAllV3Ticks(currencyA, currencyB, feeAmount) {
  const poolAddress = currencyA && currencyB && feeAmount ? Pool.getAddress(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped, feeAmount) : undefined;
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAllV3TicksQuery(poolAddress ? {
    poolAddress: poolAddress === null || poolAddress === void 0 ? void 0 : poolAddress.toLowerCase(),
    skip: 0
  } : skipToken, {
    pollingInterval: 30000
  });
  return {
    isLoading,
    isUninitialized,
    isError,
    error,
    ticks: data === null || data === void 0 ? void 0 : data.ticks
  };
}
export function usePoolActiveLiquidity(currencyA, currencyB, feeAmount) {
  const pool = usePool(currencyA, currencyB, feeAmount); // Find nearest valid tick for pool in case tick is not initialized.

  const activeTick = useMemo(() => {
    var _pool$;

    return getActiveTick((_pool$ = pool[1]) === null || _pool$ === void 0 ? void 0 : _pool$.tickCurrent, feeAmount);
  }, [pool, feeAmount]);
  const {
    isLoading,
    isUninitialized,
    isError,
    error,
    ticks
  } = useAllV3Ticks(currencyA, currencyB, feeAmount);
  return useMemo(() => {
    var _pool$1$liquidity, _pool$2;

    if (!currencyA || !currencyB || activeTick === undefined || pool[0] !== PoolState.EXISTS || !ticks || ticks.length === 0 || isLoading || isUninitialized) {
      return {
        isLoading: isLoading || pool[0] === PoolState.LOADING,
        isUninitialized,
        isError,
        error,
        activeTick,
        data: undefined
      };
    }

    const token0 = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
    const token1 = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped; // find where the active tick would be to partition the array
    // if the active tick is initialized, the pivot will be an element
    // if not, take the previous tick as pivot

    const pivot = ticks.findIndex(_ref => {
      let {
        tickIdx
      } = _ref;
      return tickIdx > activeTick;
    }) - 1;

    if (pivot < 0) {
      // consider setting a local error
      console.error('TickData pivot not found');
      return {
        isLoading,
        isUninitialized,
        isError,
        error,
        activeTick,
        data: undefined
      };
    }

    const activeTickProcessed = {
      liquidityActive: JSBI.BigInt((_pool$1$liquidity = (_pool$2 = pool[1]) === null || _pool$2 === void 0 ? void 0 : _pool$2.liquidity) !== null && _pool$1$liquidity !== void 0 ? _pool$1$liquidity : 0),
      tickIdx: activeTick,
      liquidityNet: Number(ticks[pivot].tickIdx) === activeTick ? JSBI.BigInt(ticks[pivot].liquidityNet) : JSBI.BigInt(0),
      price0: tickToPrice(token0, token1, activeTick).toFixed(PRICE_FIXED_DIGITS)
    };
    const subsequentTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, true);
    const previousTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, false);
    const ticksProcessed = previousTicks.concat(activeTickProcessed).concat(subsequentTicks);
    return {
      isLoading,
      isUninitialized,
      isError,
      error,
      activeTick,
      data: ticksProcessed
    };
  }, [currencyA, currencyB, activeTick, pool, ticks, isLoading, isUninitialized, isError, error]);
}