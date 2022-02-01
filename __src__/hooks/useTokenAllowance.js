import { CurrencyAmount } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useSingleCallResult } from '../state/multicall/hooks';
import { useTokenContract } from './useContract';
export function useTokenAllowance(token, owner, spender) {
  const contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
  const inputs = useMemo(() => [owner, spender], [owner, spender]);
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result;
  return useMemo(() => token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined, [token, allowance]);
}