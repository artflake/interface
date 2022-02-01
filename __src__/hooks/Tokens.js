import { arrayify } from '@ethersproject/bytes';
import { parseBytes32String } from '@ethersproject/strings';
import { Token } from '@uniswap/sdk-core';
import { CHAIN_INFO, L2_CHAIN_IDS, SupportedChainId } from 'constants/chains';
import { useMemo } from 'react';
import { createTokenFilterFunction } from '../components/SearchModal/filtering';
import { ExtendedEther, WETH9_EXTENDED } from '../constants/tokens';
import { useAllLists, useCombinedActiveList, useInactiveListUrls } from '../state/lists/hooks';
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useUserAddedTokens } from '../state/user/hooks';
import { isAddress } from '../utils';
import { useUnsupportedTokenList } from './../state/lists/hooks';
import { useBytes32TokenContract, useTokenContract } from './useContract';
import { useActiveWeb3React } from './web3'; // reduce token map into standard address <-> Token mapping, optionally include user added tokens

function useTokensFromMap(tokenMap, includeUserAdded) {
  const {
    chainId
  } = useActiveWeb3React();
  const userAddedTokens = useUserAddedTokens();
  return useMemo(() => {
    var _tokenMap$chainId;

    if (!chainId) return {}; // reduce to just tokens

    const mapWithoutUrls = Object.keys((_tokenMap$chainId = tokenMap[chainId]) !== null && _tokenMap$chainId !== void 0 ? _tokenMap$chainId : {}).reduce((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token;
      return newMap;
    }, {});

    if (includeUserAdded) {
      return userAddedTokens // reduce into all ALL_TOKENS filtered by the current chain
      .reduce((tokenMap, token) => {
        tokenMap[token.address] = token;
        return tokenMap;
      }, // must make a copy because reduce modifies the map, and we do not
      // want to make a copy in every iteration
      { ...mapWithoutUrls
      });
    }

    return mapWithoutUrls;
  }, [chainId, userAddedTokens, tokenMap, includeUserAdded]);
}

export function useAllTokens() {
  const allTokens = useCombinedActiveList();
  return useTokensFromMap(allTokens, true);
}
export function useUnsupportedTokens() {
  const {
    chainId
  } = useActiveWeb3React();
  const listsByUrl = useAllLists();
  const unsupportedTokensMap = useUnsupportedTokenList();
  const unsupportedTokens = useTokensFromMap(unsupportedTokensMap, false); // checks the default L2 lists to see if `bridgeInfo` has an L1 address value that is unsupported

  const l2InferredBlockedTokens = useMemo(() => {
    if (!chainId || !L2_CHAIN_IDS.includes(chainId)) {
      return {};
    }

    if (!listsByUrl) {
      return {};
    }

    const listUrl = CHAIN_INFO[chainId].defaultListUrl;
    const {
      current: list
    } = listsByUrl[listUrl];

    if (!list) {
      return {};
    }

    const unsupportedSet = new Set(Object.keys(unsupportedTokens));
    return list.tokens.reduce((acc, tokenInfo) => {
      var _tokenInfo$extensions;

      const bridgeInfo = (_tokenInfo$extensions = tokenInfo.extensions) === null || _tokenInfo$extensions === void 0 ? void 0 : _tokenInfo$extensions.bridgeInfo;

      if (bridgeInfo && bridgeInfo[SupportedChainId.MAINNET] && bridgeInfo[SupportedChainId.MAINNET].tokenAddress && unsupportedSet.has(bridgeInfo[SupportedChainId.MAINNET].tokenAddress)) {
        const address = bridgeInfo[SupportedChainId.MAINNET].tokenAddress; // don't rely on decimals--it's possible that a token could be bridged w/ different decimals on the L2

        return { ...acc,
          [address]: new Token(SupportedChainId.MAINNET, address, tokenInfo.decimals)
        };
      }

      return acc;
    }, {});
  }, [chainId, listsByUrl, unsupportedTokens]);
  return { ...unsupportedTokens,
    ...l2InferredBlockedTokens
  };
}
export function useSearchInactiveTokenLists(search) {
  let minResults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  const lists = useAllLists();
  const inactiveUrls = useInactiveListUrls();
  const {
    chainId
  } = useActiveWeb3React();
  const activeTokens = useAllTokens();
  return useMemo(() => {
    if (!search || search.trim().length === 0) return [];
    const tokenFilter = createTokenFilterFunction(search);
    const result = [];
    const addressSet = {};

    for (const url of inactiveUrls) {
      const list = lists[url].current;
      if (!list) continue;

      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          const wrapped = new WrappedTokenInfo(tokenInfo, list);

          if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
            addressSet[wrapped.address] = true;
            result.push(wrapped);
            if (result.length >= minResults) return result;
          }
        }
      }
    }

    return result;
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search]);
}
export function useIsTokenActive(token) {
  const activeTokens = useAllTokens();

  if (!activeTokens || !token) {
    return false;
  }

  return !!activeTokens[token.address];
} // Check if currency is included in custom list from user storage

export function useIsUserAddedToken(currency) {
  const userAddedTokens = useUserAddedTokens();

  if (!currency) {
    return false;
  }

  return !!userAddedTokens.find(token => currency.equals(token));
} // parse a name or symbol from a token response

const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

function parseStringOrBytes32(str, bytes32, defaultValue) {
  return str && str.length > 0 ? str : // need to check for proper bytes string and valid terminator
  bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0 ? parseBytes32String(bytes32) : defaultValue;
} // undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token


export function useToken(tokenAddress) {
  const {
    chainId
  } = useActiveWeb3React();
  const tokens = useAllTokens();
  const address = isAddress(tokenAddress);
  const tokenContract = useTokenContract(address ? address : undefined, false);
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
  const token = address ? tokens[address] : undefined;
  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
  const tokenNameBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'name', undefined, NEVER_RELOAD);
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD);
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);
  return useMemo(() => {
    if (token) return token;
    if (tokenAddress === null) return null;
    if (!chainId || !address) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;

    if (decimals.result) {
      var _symbol$result, _symbolBytes32$result, _tokenName$result, _tokenNameBytes32$res;

      return new Token(chainId, address, decimals.result[0], parseStringOrBytes32((_symbol$result = symbol.result) === null || _symbol$result === void 0 ? void 0 : _symbol$result[0], (_symbolBytes32$result = symbolBytes32.result) === null || _symbolBytes32$result === void 0 ? void 0 : _symbolBytes32$result[0], 'UNKNOWN'), parseStringOrBytes32((_tokenName$result = tokenName.result) === null || _tokenName$result === void 0 ? void 0 : _tokenName$result[0], (_tokenNameBytes32$res = tokenNameBytes32.result) === null || _tokenNameBytes32$res === void 0 ? void 0 : _tokenNameBytes32$res[0], 'Unknown Token'));
    }

    return undefined;
  }, [address, chainId, decimals.loading, decimals.result, symbol.loading, symbol.result, symbolBytes32.result, token, tokenAddress, tokenName.loading, tokenName.result, tokenNameBytes32.result]);
}
export function useCurrency(currencyId) {
  var _weth$address;

  const {
    chainId
  } = useActiveWeb3React();
  const isETH = (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === 'ETH';
  const token = useToken(isETH ? undefined : currencyId);
  const extendedEther = useMemo(() => chainId ? ExtendedEther.onChain(chainId) : // display mainnet when not connected
  ExtendedEther.onChain(SupportedChainId.MAINNET), [chainId]);
  const weth = chainId ? WETH9_EXTENDED[chainId] : undefined;
  if (currencyId === null || currencyId === undefined) return currencyId;
  if ((weth === null || weth === void 0 ? void 0 : (_weth$address = weth.address) === null || _weth$address === void 0 ? void 0 : _weth$address.toUpperCase()) === (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase())) return weth;
  return isETH ? extendedEther : token;
}