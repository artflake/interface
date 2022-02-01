import { nearestUsableTick, TICK_SPACINGS, TickMath } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { Bound } from 'state/mint/v3/actions';
export default function useIsTickAtLimit(feeAmount, tickLower, tickUpper) {
  return useMemo(() => ({
    [Bound.LOWER]: feeAmount && tickLower ? tickLower === nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]) : undefined,
    [Bound.UPPER]: feeAmount && tickUpper ? tickUpper === nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]) : undefined
  }), [feeAmount, tickLower, tickUpper]);
}