import { Trans } from "@lingui/react";
import { CurrencyAmount, Percent } from '@uniswap/sdk-core';
import { Position } from '@uniswap/v3-sdk';
import { useToken } from "../../../hooks/Tokens";
import { usePool } from "../../../hooks/usePools";
import { useV3PositionFees } from "../../../hooks/useV3PositionFees";
import { useActiveWeb3React } from "../../../hooks/web3";
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { unwrappedToken } from "../../../utils/unwrappedToken";
import { selectPercent } from "./actions";
import { jsx as _jsx } from "react/jsx-runtime";
export function useBurnV3State() {
  return useAppSelector(state => state.burnV3);
}
export function useDerivedV3BurnInfo(position) {
  let asWETH = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const {
    account
  } = useActiveWeb3React();
  const {
    percent
  } = useBurnV3State();
  const token0 = useToken(position === null || position === void 0 ? void 0 : position.token0);
  const token1 = useToken(position === null || position === void 0 ? void 0 : position.token1);
  const [, pool] = usePool(token0 !== null && token0 !== void 0 ? token0 : undefined, token1 !== null && token1 !== void 0 ? token1 : undefined, position === null || position === void 0 ? void 0 : position.fee);
  const positionSDK = useMemo(() => pool && position !== null && position !== void 0 && position.liquidity && typeof (position === null || position === void 0 ? void 0 : position.tickLower) === 'number' && typeof (position === null || position === void 0 ? void 0 : position.tickUpper) === 'number' ? new Position({
    pool,
    liquidity: position.liquidity.toString(),
    tickLower: position.tickLower,
    tickUpper: position.tickUpper
  }) : undefined, [pool, position]);
  const liquidityPercentage = new Percent(percent, 100);
  const discountedAmount0 = positionSDK ? liquidityPercentage.multiply(positionSDK.amount0.quotient).quotient : undefined;
  const discountedAmount1 = positionSDK ? liquidityPercentage.multiply(positionSDK.amount1.quotient).quotient : undefined;
  const liquidityValue0 = token0 && discountedAmount0 ? CurrencyAmount.fromRawAmount(asWETH ? token0 : unwrappedToken(token0), discountedAmount0) : undefined;
  const liquidityValue1 = token1 && discountedAmount1 ? CurrencyAmount.fromRawAmount(asWETH ? token1 : unwrappedToken(token1), discountedAmount1) : undefined;
  const [feeValue0, feeValue1] = useV3PositionFees(pool !== null && pool !== void 0 ? pool : undefined, position === null || position === void 0 ? void 0 : position.tokenId, asWETH);
  const outOfRange = pool && position ? pool.tickCurrent < position.tickLower || pool.tickCurrent > position.tickUpper : false;
  let error;

  if (!account) {
    error = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (percent === 0) {
    var _error;

    error = (_error = error) !== null && _error !== void 0 ? _error : /*#__PURE__*/_jsx(Trans, {
      id: "Enter a percent"
    });
  }

  return {
    position: positionSDK,
    liquidityPercentage,
    liquidityValue0,
    liquidityValue1,
    feeValue0,
    feeValue1,
    outOfRange,
    error
  };
}
export function useBurnV3ActionHandlers() {
  const dispatch = useAppDispatch();
  const onPercentSelect = useCallback(percent => {
    dispatch(selectPercent({
      percent
    }));
  }, [dispatch]);
  return {
    onPercentSelect
  };
}