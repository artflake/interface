import { Route } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { useV3SwapPools } from './useV3SwapPools';
import { useActiveWeb3React } from './web3';
/**
 * Returns true if poolA is equivalent to poolB
 * @param poolA one of the two pools
 * @param poolB the other pool
 */

function poolEquals(poolA, poolB) {
  return poolA === poolB || poolA.token0.equals(poolB.token0) && poolA.token1.equals(poolB.token1) && poolA.fee === poolB.fee;
}

function computeAllRoutes(currencyIn, currencyOut, pools, chainId) {
  let currentPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  let allPaths = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  let startCurrencyIn = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : currencyIn;
  let maxHops = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2;
  const tokenIn = currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.wrapped;
  const tokenOut = currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.wrapped;
  if (!tokenIn || !tokenOut) throw new Error('Missing tokenIn/tokenOut');

  for (const pool of pools) {
    if (!pool.involvesToken(tokenIn) || currentPath.find(pathPool => poolEquals(pool, pathPool))) continue;
    const outputToken = pool.token0.equals(tokenIn) ? pool.token1 : pool.token0;

    if (outputToken.equals(tokenOut)) {
      allPaths.push(new Route([...currentPath, pool], startCurrencyIn, currencyOut));
    } else if (maxHops > 1) {
      computeAllRoutes(outputToken, currencyOut, pools, chainId, [...currentPath, pool], allPaths, startCurrencyIn, maxHops - 1);
    }
  }

  return allPaths;
}
/**
 * Returns all the routes from an input currency to an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */


export function useAllV3Routes(currencyIn, currencyOut) {
  const {
    chainId
  } = useActiveWeb3React();
  const {
    pools,
    loading: poolsLoading
  } = useV3SwapPools(currencyIn, currencyOut);
  return useMemo(() => {
    if (poolsLoading || !chainId || !pools || !currencyIn || !currencyOut) return {
      loading: true,
      routes: []
    };
    const routes = computeAllRoutes(currencyIn, currencyOut, pools, chainId, [], [], currencyIn, 2);
    return {
      loading: false,
      routes
    };
  }, [chainId, currencyIn, currencyOut, pools, poolsLoading]);
}