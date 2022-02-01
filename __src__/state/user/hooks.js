import { Percent, Token } from '@uniswap/sdk-core';
import { computePairAddress } from '@uniswap/v2-sdk';
import { L2_CHAIN_IDS, SupportedChainId } from "../../constants/chains";
import { L2_DEADLINE_FROM_NOW } from "../../constants/misc";
import JSBI from 'jsbi';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from "../hooks";
import { V2_FACTORY_ADDRESSES } from "../../constants/addresses";
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from "../../constants/routing";
import { useAllTokens } from "../../hooks/Tokens";
import { useActiveWeb3React } from "../../hooks/web3";
import { addSerializedPair, addSerializedToken, removeSerializedToken, updateArbitrumAlphaAcknowledged, updateHideClosedPositions, updateOptimismAlphaAcknowledged, updateUserClientSideRouter, updateUserDarkMode, updateUserDeadline, updateUserExpertMode, updateUserLocale, updateUserSlippageTolerance } from "./actions";

function serializeToken(token) {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name
  };
}

function deserializeToken(serializedToken) {
  return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}

export function useIsDarkMode() {
  const {
    userDarkMode,
    matchesDarkMode
  } = useAppSelector(_ref => {
    let {
      user: {
        matchesDarkMode,
        userDarkMode
      }
    } = _ref;
    return {
      userDarkMode,
      matchesDarkMode
    };
  }, shallowEqual);
  return userDarkMode === null ? matchesDarkMode : userDarkMode;
}
export function useDarkModeManager() {
  const dispatch = useAppDispatch();
  const darkMode = useIsDarkMode();
  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({
      userDarkMode: !darkMode
    }));
  }, [darkMode, dispatch]);
  return [darkMode, toggleSetDarkMode];
}
export function useUserLocale() {
  return useAppSelector(state => state.user.userLocale);
}
export function useUserLocaleManager() {
  const dispatch = useAppDispatch();
  const locale = useUserLocale();
  const setLocale = useCallback(newLocale => {
    dispatch(updateUserLocale({
      userLocale: newLocale
    }));
  }, [dispatch]);
  return [locale, setLocale];
}
export function useIsExpertMode() {
  return useAppSelector(state => state.user.userExpertMode);
}
export function useExpertModeManager() {
  const dispatch = useAppDispatch();
  const expertMode = useIsExpertMode();
  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({
      userExpertMode: !expertMode
    }));
  }, [expertMode, dispatch]);
  return [expertMode, toggleSetExpertMode];
}
export function useClientSideRouter() {
  const dispatch = useAppDispatch();
  const clientSideRouter = useAppSelector(state => Boolean(state.user.userClientSideRouter));
  const setClientSideRouter = useCallback(newClientSideRouter => {
    dispatch(updateUserClientSideRouter({
      userClientSideRouter: newClientSideRouter
    }));
  }, [dispatch]);
  return [clientSideRouter, setClientSideRouter];
}
export function useRoutingAPIEnabled() {
  const {
    chainId
  } = useActiveWeb3React();
  const [clientSideRouter] = useClientSideRouter();
  return chainId === SupportedChainId.MAINNET && !clientSideRouter;
}
export function useSetUserSlippageTolerance() {
  const dispatch = useAppDispatch();
  return useCallback(userSlippageTolerance => {
    let value;

    try {
      value = userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10000).quotient);
    } catch (error) {
      value = 'auto';
    }

    dispatch(updateUserSlippageTolerance({
      userSlippageTolerance: value
    }));
  }, [dispatch]);
}
/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */

export function useUserSlippageTolerance() {
  const userSlippageTolerance = useAppSelector(state => {
    return state.user.userSlippageTolerance;
  });
  return useMemo(() => userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10000), [userSlippageTolerance]);
}
export function useUserHideClosedPositions() {
  const dispatch = useAppDispatch();
  const hideClosedPositions = useAppSelector(state => state.user.userHideClosedPositions);
  const setHideClosedPositions = useCallback(newHideClosedPositions => {
    dispatch(updateHideClosedPositions({
      userHideClosedPositions: newHideClosedPositions
    }));
  }, [dispatch]);
  return [hideClosedPositions, setHideClosedPositions];
}
/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */

export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance) {
  const allowedSlippage = useUserSlippageTolerance();
  return useMemo(() => allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage, [allowedSlippage, defaultSlippageTolerance]);
}
export function useUserTransactionTTL() {
  const {
    chainId
  } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const userDeadline = useAppSelector(state => state.user.userDeadline);
  const onL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
  const deadline = onL2 ? L2_DEADLINE_FROM_NOW : userDeadline;
  const setUserDeadline = useCallback(userDeadline => {
    dispatch(updateUserDeadline({
      userDeadline
    }));
  }, [dispatch]);
  return [deadline, setUserDeadline];
}
export function useAddUserToken() {
  const dispatch = useAppDispatch();
  return useCallback(token => {
    dispatch(addSerializedToken({
      serializedToken: serializeToken(token)
    }));
  }, [dispatch]);
}
export function useRemoveUserAddedToken() {
  const dispatch = useAppDispatch();
  return useCallback((chainId, address) => {
    dispatch(removeSerializedToken({
      chainId,
      address
    }));
  }, [dispatch]);
}
export function useUserAddedTokens() {
  const {
    chainId
  } = useActiveWeb3React();
  const serializedTokensMap = useAppSelector(_ref2 => {
    let {
      user: {
        tokens
      }
    } = _ref2;
    return tokens;
  });
  return useMemo(() => {
    var _serializedTokensMap$;

    if (!chainId) return [];
    return Object.values((_serializedTokensMap$ = serializedTokensMap === null || serializedTokensMap === void 0 ? void 0 : serializedTokensMap[chainId]) !== null && _serializedTokensMap$ !== void 0 ? _serializedTokensMap$ : {}).map(deserializeToken);
  }, [serializedTokensMap, chainId]);
}

function serializePair(pair) {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1)
  };
}

export function usePairAdder() {
  const dispatch = useAppDispatch();
  return useCallback(pair => {
    dispatch(addSerializedPair({
      serializedPair: serializePair(pair)
    }));
  }, [dispatch]);
}
export function useURLWarningVisible() {
  return useAppSelector(state => state.user.URLWarningVisible);
}
/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */

export function toV2LiquidityToken(_ref3) {
  let [tokenA, tokenB] = _ref3;
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs');
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal');
  if (!V2_FACTORY_ADDRESSES[tokenA.chainId]) throw new Error('No V2 factory address on this chain');
  return new Token(tokenA.chainId, computePairAddress({
    factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId],
    tokenA,
    tokenB
  }), 18, 'UNI-V2', 'Uniswap V2');
}
/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */

export function useTrackedTokenPairs() {
  const {
    chainId
  } = useActiveWeb3React();
  const tokens = useAllTokens(); // pinned pairs

  const pinnedPairs = useMemo(() => {
    var _PINNED_PAIRS$chainId;

    return chainId ? (_PINNED_PAIRS$chainId = PINNED_PAIRS[chainId]) !== null && _PINNED_PAIRS$chainId !== void 0 ? _PINNED_PAIRS$chainId : [] : [];
  }, [chainId]); // pairs for every token against every base

  const generatedPairs = useMemo(() => chainId ? Object.keys(tokens).flatMap(tokenAddress => {
    var _BASES_TO_TRACK_LIQUI;

    const token = tokens[tokenAddress]; // for each token on the current chain,

    return (// loop though all bases on the current chain
      ((_BASES_TO_TRACK_LIQUI = BASES_TO_TRACK_LIQUIDITY_FOR[chainId]) !== null && _BASES_TO_TRACK_LIQUI !== void 0 ? _BASES_TO_TRACK_LIQUI : [] // to construct pairs of the given token with each base
      ).map(base => {
        if (base.address === token.address) {
          return null;
        } else {
          return [base, token];
        }
      }).filter(p => p !== null)
    );
  }) : [], [tokens, chainId]); // pairs saved by users

  const savedSerializedPairs = useAppSelector(_ref4 => {
    let {
      user: {
        pairs
      }
    } = _ref4;
    return pairs;
  });
  const userPairs = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return [];
    const forChain = savedSerializedPairs[chainId];
    if (!forChain) return [];
    return Object.keys(forChain).map(pairId => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)];
    });
  }, [savedSerializedPairs, chainId]);
  const combinedList = useMemo(() => userPairs.concat(generatedPairs).concat(pinnedPairs), [generatedPairs, pinnedPairs, userPairs]);
  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce((memo, _ref5) => {
      let [tokenA, tokenB] = _ref5;
      const sorted = tokenA.sortsBefore(tokenB);
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`;
      if (memo[key]) return memo;
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA];
      return memo;
    }, {});
    return Object.keys(keyed).map(key => keyed[key]);
  }, [combinedList]);
}
export function useArbitrumAlphaAlert() {
  const dispatch = useAppDispatch();
  const arbitrumAlphaAcknowledged = useAppSelector(_ref6 => {
    let {
      user
    } = _ref6;
    return user.arbitrumAlphaAcknowledged;
  });

  const setArbitrumAlphaAcknowledged = arbitrumAlphaAcknowledged => {
    dispatch(updateArbitrumAlphaAcknowledged({
      arbitrumAlphaAcknowledged
    }));
  };

  return [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged];
}
export function useOptimismAlphaAlert() {
  const dispatch = useAppDispatch();
  const optimismAlphaAcknowledged = useAppSelector(_ref7 => {
    let {
      user
    } = _ref7;
    return user.optimismAlphaAcknowledged;
  });

  const setOptimismAlphaAcknowledged = optimismAlphaAcknowledged => {
    dispatch(updateOptimismAlphaAcknowledged({
      optimismAlphaAcknowledged
    }));
  };

  return [optimismAlphaAcknowledged, setOptimismAlphaAcknowledged];
}