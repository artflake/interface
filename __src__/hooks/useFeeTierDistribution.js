import { skipToken } from '@reduxjs/toolkit/query/react';
import { FeeAmount } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import ReactGA from 'react-ga';
import { useBlockNumber } from "../state/application/hooks";
import { useFeeTierDistributionQuery } from "../state/data/enhanced";
import { PoolState, usePool } from "./usePools"; // maximum number of blocks past which we consider the data stale

const MAX_DATA_BLOCK_AGE = 20;
export function useFeeTierDistribution(currencyA, currencyB) {
  const {
    isFetching,
    isLoading,
    isUninitialized,
    isError,
    distributions
  } = usePoolTVL(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped); // fetch all pool states to determine pool state

  const [poolStateVeryLow] = usePool(currencyA, currencyB, FeeAmount.LOWEST);
  const [poolStateLow] = usePool(currencyA, currencyB, FeeAmount.LOW);
  const [poolStateMedium] = usePool(currencyA, currencyB, FeeAmount.MEDIUM);
  const [poolStateHigh] = usePool(currencyA, currencyB, FeeAmount.HIGH);
  return useMemo(() => {
    var _distributions$FeeAmo, _distributions$FeeAmo2, _distributions$FeeAmo3, _distributions$FeeAmo4;

    if (isLoading || isFetching || isUninitialized || isError || !distributions) {
      return {
        isLoading: isLoading || isFetching || !isUninitialized,
        isError,
        distributions
      };
    }

    const largestUsageFeeTier = Object.keys(distributions).map(d => Number(d)).filter(d => distributions[d] !== 0 && distributions[d] !== undefined).reduce((a, b) => {
      var _distributions$a, _distributions$b;

      return ((_distributions$a = distributions[a]) !== null && _distributions$a !== void 0 ? _distributions$a : 0) > ((_distributions$b = distributions[b]) !== null && _distributions$b !== void 0 ? _distributions$b : 0) ? a : b;
    }, -1);
    const percentages = !isLoading && !isError && distributions && poolStateVeryLow !== PoolState.LOADING && poolStateLow !== PoolState.LOADING && poolStateMedium !== PoolState.LOADING && poolStateHigh !== PoolState.LOADING ? {
      [FeeAmount.LOWEST]: poolStateVeryLow === PoolState.EXISTS ? ((_distributions$FeeAmo = distributions[FeeAmount.LOWEST]) !== null && _distributions$FeeAmo !== void 0 ? _distributions$FeeAmo : 0) * 100 : undefined,
      [FeeAmount.LOW]: poolStateLow === PoolState.EXISTS ? ((_distributions$FeeAmo2 = distributions[FeeAmount.LOW]) !== null && _distributions$FeeAmo2 !== void 0 ? _distributions$FeeAmo2 : 0) * 100 : undefined,
      [FeeAmount.MEDIUM]: poolStateMedium === PoolState.EXISTS ? ((_distributions$FeeAmo3 = distributions[FeeAmount.MEDIUM]) !== null && _distributions$FeeAmo3 !== void 0 ? _distributions$FeeAmo3 : 0) * 100 : undefined,
      [FeeAmount.HIGH]: poolStateHigh === PoolState.EXISTS ? ((_distributions$FeeAmo4 = distributions[FeeAmount.HIGH]) !== null && _distributions$FeeAmo4 !== void 0 ? _distributions$FeeAmo4 : 0) * 100 : undefined
    } : undefined;
    return {
      isLoading,
      isError,
      distributions: percentages,
      largestUsageFeeTier: largestUsageFeeTier === -1 ? undefined : largestUsageFeeTier
    };
  }, [isLoading, isFetching, isUninitialized, isError, distributions, poolStateVeryLow, poolStateLow, poolStateMedium, poolStateHigh]);
}

function usePoolTVL(token0, token1) {
  var _ref;

  const latestBlock = useBlockNumber();
  const {
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    data
  } = useFeeTierDistributionQuery(token0 && token1 ? {
    token0: token0.address.toLowerCase(),
    token1: token1.address.toLowerCase()
  } : skipToken, {
    pollingInterval: 30000
  });
  const {
    asToken0,
    asToken1,
    _meta
  } = (_ref = data) !== null && _ref !== void 0 ? _ref : {};
  return useMemo(() => {
    var _meta$block$number, _meta$block;

    if (!latestBlock || !_meta || !asToken0 || !asToken1) {
      return {
        isLoading,
        isFetching,
        isUninitialized,
        isError
      };
    }

    if (latestBlock - ((_meta$block$number = _meta === null || _meta === void 0 ? void 0 : (_meta$block = _meta.block) === null || _meta$block === void 0 ? void 0 : _meta$block.number) !== null && _meta$block$number !== void 0 ? _meta$block$number : 0) > MAX_DATA_BLOCK_AGE) {
      ReactGA.exception({
        description: `Graph stale (latest block: ${latestBlock})`
      });
      return {
        isLoading,
        isFetching,
        isUninitialized,
        isError
      };
    }

    const all = asToken0.concat(asToken1); // sum tvl for token0 and token1 by fee tier

    const tvlByFeeTier = all.reduce((acc, value) => {
      var _acc$value$feeTier$, _acc$value$feeTier$2;

      acc[value.feeTier][0] = ((_acc$value$feeTier$ = acc[value.feeTier][0]) !== null && _acc$value$feeTier$ !== void 0 ? _acc$value$feeTier$ : 0) + Number(value.totalValueLockedToken0);
      acc[value.feeTier][1] = ((_acc$value$feeTier$2 = acc[value.feeTier][1]) !== null && _acc$value$feeTier$2 !== void 0 ? _acc$value$feeTier$2 : 0) + Number(value.totalValueLockedToken1);
      return acc;
    }, {
      [FeeAmount.LOWEST]: [undefined, undefined],
      [FeeAmount.LOW]: [undefined, undefined],
      [FeeAmount.MEDIUM]: [undefined, undefined],
      [FeeAmount.HIGH]: [undefined, undefined]
    }); // sum total tvl for token0 and token1

    const [sumToken0Tvl, sumToken1Tvl] = Object.values(tvlByFeeTier).reduce((acc, value) => {
      var _value$, _value$2;

      acc[0] += (_value$ = value[0]) !== null && _value$ !== void 0 ? _value$ : 0;
      acc[1] += (_value$2 = value[1]) !== null && _value$2 !== void 0 ? _value$2 : 0;
      return acc;
    }, [0, 0]); // returns undefined if both tvl0 and tvl1 are undefined (pool not created)

    const mean = (tvl0, sumTvl0, tvl1, sumTvl1) => tvl0 === undefined && tvl1 === undefined ? undefined : ((tvl0 !== null && tvl0 !== void 0 ? tvl0 : 0) + (tvl1 !== null && tvl1 !== void 0 ? tvl1 : 0)) / (sumTvl0 + sumTvl1) || 0;

    const distributions = {
      [FeeAmount.LOWEST]: mean(tvlByFeeTier[FeeAmount.LOWEST][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.LOWEST][1], sumToken1Tvl),
      [FeeAmount.LOW]: mean(tvlByFeeTier[FeeAmount.LOW][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.LOW][1], sumToken1Tvl),
      [FeeAmount.MEDIUM]: mean(tvlByFeeTier[FeeAmount.MEDIUM][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.MEDIUM][1], sumToken1Tvl),
      [FeeAmount.HIGH]: mean(tvlByFeeTier[FeeAmount.HIGH][0], sumToken0Tvl, tvlByFeeTier[FeeAmount.HIGH][1], sumToken1Tvl)
    };
    return {
      isLoading,
      isFetching,
      isUninitialized,
      isError,
      distributions
    };
  }, [_meta, asToken0, asToken1, isLoading, isError, isFetching, isUninitialized, latestBlock]);
}