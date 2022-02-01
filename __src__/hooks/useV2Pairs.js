import { Interface } from '@ethersproject/abi';
import { CurrencyAmount } from '@uniswap/sdk-core';
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import { computePairAddress, Pair } from '@uniswap/v2-sdk';
import { useMemo } from 'react';
import { V2_FACTORY_ADDRESSES } from "../constants/addresses";
import { useMultipleContractSingleData } from "../state/multicall/hooks";
const PAIR_INTERFACE = new Interface(IUniswapV2PairABI);
export let PairState;

(function (PairState) {
  PairState[PairState["LOADING"] = 0] = "LOADING";
  PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PairState[PairState["EXISTS"] = 2] = "EXISTS";
  PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (PairState = {}));

export function useV2Pairs(currencies) {
  const tokens = useMemo(() => currencies.map(_ref => {
    let [currencyA, currencyB] = _ref;
    return [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped];
  }), [currencies]);
  const pairAddresses = useMemo(() => tokens.map(_ref2 => {
    let [tokenA, tokenB] = _ref2;
    return tokenA && tokenB && tokenA.chainId === tokenB.chainId && !tokenA.equals(tokenB) && V2_FACTORY_ADDRESSES[tokenA.chainId] ? computePairAddress({
      factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId],
      tokenA,
      tokenB
    }) : undefined;
  }), [tokens]);
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves');
  return useMemo(() => {
    return results.map((result, i) => {
      const {
        result: reserves,
        loading
      } = result;
      const tokenA = tokens[i][0];
      const tokenB = tokens[i][1];
      if (loading) return [PairState.LOADING, null];
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null];
      if (!reserves) return [PairState.NOT_EXISTS, null];
      const {
        reserve0,
        reserve1
      } = reserves;
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
      return [PairState.EXISTS, new Pair(CurrencyAmount.fromRawAmount(token0, reserve0.toString()), CurrencyAmount.fromRawAmount(token1, reserve1.toString()))];
    });
  }, [results, tokens]);
}
export function useV2Pair(tokenA, tokenB) {
  const inputs = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB]);
  return useV2Pairs(inputs)[0];
}