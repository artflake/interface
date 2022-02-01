import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useV3NFTPositionManagerContract } from './useContract';
const STARTS_WITH = 'data:application/json;base64,';
export function usePositionTokenURI(tokenId) {
  const contract = useV3NFTPositionManagerContract();
  const inputs = useMemo(() => [tokenId instanceof BigNumber ? tokenId.toHexString() : tokenId === null || tokenId === void 0 ? void 0 : tokenId.toString(16)], [tokenId]);
  const {
    result,
    error,
    loading,
    valid
  } = useSingleCallResult(contract, 'tokenURI', inputs, { ...NEVER_RELOAD,
    gasRequired: 3000000
  });
  return useMemo(() => {
    if (error || !valid || !tokenId) {
      return {
        valid: false,
        loading: false
      };
    }

    if (loading) {
      return {
        valid: true,
        loading: true
      };
    }

    if (!result) {
      return {
        valid: false,
        loading: false
      };
    }

    const [tokenURI] = result;
    if (!tokenURI || !tokenURI.startsWith(STARTS_WITH)) return {
      valid: false,
      loading: false
    };

    try {
      const json = JSON.parse(atob(tokenURI.slice(STARTS_WITH.length)));
      return {
        valid: true,
        loading: false,
        result: json
      };
    } catch (error) {
      return {
        valid: false,
        loading: false
      };
    }
  }, [error, loading, result, tokenId, valid]);
}