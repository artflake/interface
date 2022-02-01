import { FeeAmount } from '@uniswap/v3-sdk';
import { SupportedChainId } from "../constants/chains";
import { useMemo } from 'react';
import { useAllCurrencyCombinations } from "./useAllCurrencyCombinations";
import { PoolState, usePools } from "./usePools";
import { useActiveWeb3React } from "./web3";
/**
 * Returns all the existing pools that should be considered for swapping between an input currency and an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */

export function useV3SwapPools(currencyIn, currencyOut) {
  const {
    chainId
  } = useActiveWeb3React();
  const allCurrencyCombinations = useAllCurrencyCombinations(currencyIn, currencyOut);
  const allCurrencyCombinationsWithAllFees = useMemo(() => allCurrencyCombinations.reduce((list, _ref) => {
    let [tokenA, tokenB] = _ref;
    return chainId === SupportedChainId.MAINNET ? list.concat([[tokenA, tokenB, FeeAmount.LOW], [tokenA, tokenB, FeeAmount.MEDIUM], [tokenA, tokenB, FeeAmount.HIGH]]) : list.concat([[tokenA, tokenB, FeeAmount.LOWEST], [tokenA, tokenB, FeeAmount.LOW], [tokenA, tokenB, FeeAmount.MEDIUM], [tokenA, tokenB, FeeAmount.HIGH]]);
  }, []), [allCurrencyCombinations, chainId]);
  const pools = usePools(allCurrencyCombinationsWithAllFees);
  return useMemo(() => {
    return {
      pools: pools.filter(tuple => {
        return tuple[0] === PoolState.EXISTS && tuple[1] !== null;
      }).map(_ref2 => {
        let [, pool] = _ref2;
        return pool;
      }),
      loading: pools.some(_ref3 => {
        let [state] = _ref3;
        return state === PoolState.LOADING;
      })
    };
  }, [pools]);
}