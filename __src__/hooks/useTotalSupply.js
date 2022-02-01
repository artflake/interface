import { CurrencyAmount } from '@uniswap/sdk-core';
import { useSingleCallResult } from '../state/multicall/hooks';
import { useTokenContract } from './useContract'; // returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched

export function useTotalSupply(token) {
  var _useSingleCallResult, _useSingleCallResult$;

  const contract = useTokenContract(token !== null && token !== void 0 && token.isToken ? token.address : undefined, false);
  const totalSupply = (_useSingleCallResult = useSingleCallResult(contract, 'totalSupply')) === null || _useSingleCallResult === void 0 ? void 0 : (_useSingleCallResult$ = _useSingleCallResult.result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
  return token !== null && token !== void 0 && token.isToken && totalSupply ? CurrencyAmount.fromRawAmount(token, totalSupply.toString()) : undefined;
}