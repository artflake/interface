import { Interface } from '@ethersproject/abi';
import { abi as IUniswapV3PoolStateABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/pool/IUniswapV3PoolState.sol/IUniswapV3PoolState.json';
import { computePoolAddress } from '@uniswap/v3-sdk';
import { Pool } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { V3_CORE_FACTORY_ADDRESSES } from '../constants/addresses';
import { useMultipleContractSingleData } from '../state/multicall/hooks';
import { useActiveWeb3React } from './web3';
const POOL_STATE_INTERFACE = new Interface(IUniswapV3PoolStateABI);
export let PoolState;

(function (PoolState) {
  PoolState[PoolState["LOADING"] = 0] = "LOADING";
  PoolState[PoolState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PoolState[PoolState["EXISTS"] = 2] = "EXISTS";
  PoolState[PoolState["INVALID"] = 3] = "INVALID";
})(PoolState || (PoolState = {}));

export function usePools(poolKeys) {
  const {
    chainId
  } = useActiveWeb3React();
  const transformed = useMemo(() => {
    return poolKeys.map(_ref => {
      let [currencyA, currencyB, feeAmount] = _ref;
      if (!chainId || !currencyA || !currencyB || !feeAmount) return null;
      const tokenA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
      const tokenB = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped;
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return null;
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
      return [token0, token1, feeAmount];
    });
  }, [chainId, poolKeys]);
  const poolAddresses = useMemo(() => {
    const v3CoreFactoryAddress = chainId && V3_CORE_FACTORY_ADDRESSES[chainId];
    return transformed.map(value => {
      if (!v3CoreFactoryAddress || !value) return undefined;
      return computePoolAddress({
        factoryAddress: v3CoreFactoryAddress,
        tokenA: value[0],
        tokenB: value[1],
        fee: value[2]
      });
    });
  }, [chainId, transformed]);
  const slot0s = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'slot0');
  const liquidities = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'liquidity');
  return useMemo(() => {
    return poolKeys.map((_key, index) => {
      var _transformed$index;

      const [token0, token1, fee] = (_transformed$index = transformed[index]) !== null && _transformed$index !== void 0 ? _transformed$index : [];
      if (!token0 || !token1 || !fee) return [PoolState.INVALID, null];
      const {
        result: slot0,
        loading: slot0Loading,
        valid: slot0Valid
      } = slot0s[index];
      const {
        result: liquidity,
        loading: liquidityLoading,
        valid: liquidityValid
      } = liquidities[index];
      if (!slot0Valid || !liquidityValid) return [PoolState.INVALID, null];
      if (slot0Loading || liquidityLoading) return [PoolState.LOADING, null];
      if (!slot0 || !liquidity) return [PoolState.NOT_EXISTS, null];
      if (!slot0.sqrtPriceX96 || slot0.sqrtPriceX96.eq(0)) return [PoolState.NOT_EXISTS, null];

      try {
        return [PoolState.EXISTS, new Pool(token0, token1, fee, slot0.sqrtPriceX96, liquidity[0], slot0.tick)];
      } catch (error) {
        console.error('Error when constructing the pool', error);
        return [PoolState.NOT_EXISTS, null];
      }
    });
  }, [liquidities, poolKeys, slot0s, transformed]);
}
export function usePool(currencyA, currencyB, feeAmount) {
  const poolKeys = useMemo(() => [[currencyA, currencyB, feeAmount]], [currencyA, currencyB, feeAmount]);
  return usePools(poolKeys)[0];
}