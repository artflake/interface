import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { useSingleCallResult, useSingleContractMultipleData } from "../state/multicall/hooks";
import { useV3NFTPositionManagerContract } from "./useContract";

function useV3PositionsFromTokenIds(tokenIds) {
  const positionManager = useV3NFTPositionManagerContract();
  const inputs = useMemo(() => tokenIds ? tokenIds.map(tokenId => [BigNumber.from(tokenId)]) : [], [tokenIds]);
  const results = useSingleContractMultipleData(positionManager, 'positions', inputs);
  const loading = useMemo(() => results.some(_ref => {
    let {
      loading
    } = _ref;
    return loading;
  }), [results]);
  const error = useMemo(() => results.some(_ref2 => {
    let {
      error
    } = _ref2;
    return error;
  }), [results]);
  const positions = useMemo(() => {
    if (!loading && !error && tokenIds) {
      return results.map((call, i) => {
        const tokenId = tokenIds[i];
        const result = call.result;
        return {
          tokenId,
          fee: result.fee,
          feeGrowthInside0LastX128: result.feeGrowthInside0LastX128,
          feeGrowthInside1LastX128: result.feeGrowthInside1LastX128,
          liquidity: result.liquidity,
          nonce: result.nonce,
          operator: result.operator,
          tickLower: result.tickLower,
          tickUpper: result.tickUpper,
          token0: result.token0,
          token1: result.token1,
          tokensOwed0: result.tokensOwed0,
          tokensOwed1: result.tokensOwed1
        };
      });
    }

    return undefined;
  }, [loading, error, results, tokenIds]);
  return {
    loading,
    positions: positions === null || positions === void 0 ? void 0 : positions.map((position, i) => ({ ...position,
      tokenId: inputs[i][0]
    }))
  };
}

export function useV3PositionFromTokenId(tokenId) {
  var _position$positions;

  const position = useV3PositionsFromTokenIds(tokenId ? [tokenId] : undefined);
  return {
    loading: position.loading,
    position: (_position$positions = position.positions) === null || _position$positions === void 0 ? void 0 : _position$positions[0]
  };
}
export function useV3Positions(account) {
  var _balanceResult$;

  const positionManager = useV3NFTPositionManagerContract();
  const {
    loading: balanceLoading,
    result: balanceResult
  } = useSingleCallResult(positionManager, 'balanceOf', [account !== null && account !== void 0 ? account : undefined]); // we don't expect any account balance to ever exceed the bounds of max safe int

  const accountBalance = balanceResult === null || balanceResult === void 0 ? void 0 : (_balanceResult$ = balanceResult[0]) === null || _balanceResult$ === void 0 ? void 0 : _balanceResult$.toNumber();
  const tokenIdsArgs = useMemo(() => {
    if (accountBalance && account) {
      const tokenRequests = [];

      for (let i = 0; i < accountBalance; i++) {
        tokenRequests.push([account, i]);
      }

      return tokenRequests;
    }

    return [];
  }, [account, accountBalance]);
  const tokenIdResults = useSingleContractMultipleData(positionManager, 'tokenOfOwnerByIndex', tokenIdsArgs);
  const someTokenIdsLoading = useMemo(() => tokenIdResults.some(_ref3 => {
    let {
      loading
    } = _ref3;
    return loading;
  }), [tokenIdResults]);
  const tokenIds = useMemo(() => {
    if (account) {
      return tokenIdResults.map(_ref4 => {
        let {
          result
        } = _ref4;
        return result;
      }).filter(result => !!result).map(result => BigNumber.from(result[0]));
    }

    return [];
  }, [account, tokenIdResults]);
  const {
    positions,
    loading: positionsLoading
  } = useV3PositionsFromTokenIds(tokenIds);
  return {
    loading: someTokenIdsLoading || balanceLoading || positionsLoading,
    positions
  };
}