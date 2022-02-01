import { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';
import sortByListPriority from 'utils/listSort';
import BROKEN_LIST from '../../constants/tokenLists/broken.tokenlist.json';
import UNSUPPORTED_TOKEN_LIST from '../../constants/tokenLists/unsupported.tokenlist.json';
import { UNSUPPORTED_LIST_URLS } from './../../constants/lists';
import { WrappedTokenInfo } from './wrappedTokenInfo';
const listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

function listToTokenMap(list) {
  const result = listCache === null || listCache === void 0 ? void 0 : listCache.get(list);
  if (result) return result;
  const map = list.tokens.reduce((tokenMap, tokenInfo) => {
    var _tokenMap$token$chain;

    const token = new WrappedTokenInfo(tokenInfo, list);

    if (((_tokenMap$token$chain = tokenMap[token.chainId]) === null || _tokenMap$token$chain === void 0 ? void 0 : _tokenMap$token$chain[token.address]) !== undefined) {
      console.error(`Duplicate token! ${token.address}`);
      return tokenMap;
    }

    if (!tokenMap[token.chainId]) tokenMap[token.chainId] = {};
    tokenMap[token.chainId][token.address] = {
      token,
      list
    };
    return tokenMap;
  }, {});
  listCache === null || listCache === void 0 ? void 0 : listCache.set(list, map);
  return map;
}

export function useAllLists() {
  return useAppSelector(state => state.lists.byUrl);
}
/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */

export function combineMaps(map1, map2) {
  const chainIds = Object.keys(Object.keys(map1).concat(Object.keys(map2)).reduce((memo, value) => {
    memo[value] = true;
    return memo;
  }, {})).map(id => parseInt(id));
  return chainIds.reduce((memo, chainId) => {
    memo[chainId] = { ...map2[chainId],
      // map1 takes precedence
      ...map1[chainId]
    };
    return memo;
  }, {});
} // merge tokens contained within lists from urls

function useCombinedTokenMapFromUrls(urls) {
  const lists = useAllLists();
  return useMemo(() => {
    if (!urls) return {};
    return urls.slice() // sort by priority so top priority goes last
    .sort(sortByListPriority).reduce((allTokens, currentUrl) => {
      var _lists$currentUrl;

      const current = (_lists$currentUrl = lists[currentUrl]) === null || _lists$currentUrl === void 0 ? void 0 : _lists$currentUrl.current;
      if (!current) return allTokens;

      try {
        return combineMaps(allTokens, listToTokenMap(current));
      } catch (error) {
        console.error('Could not show token list due to error', error);
        return allTokens;
      }
    }, {});
  }, [lists, urls]);
} // filter out unsupported lists


export function useActiveListUrls() {
  const activeListUrls = useAppSelector(state => state.lists.activeListUrls);
  return useMemo(() => activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.filter(url => !UNSUPPORTED_LIST_URLS.includes(url)), [activeListUrls]);
}
export function useInactiveListUrls() {
  const lists = useAllLists();
  const allActiveListUrls = useActiveListUrls();
  return useMemo(() => Object.keys(lists).filter(url => !(allActiveListUrls !== null && allActiveListUrls !== void 0 && allActiveListUrls.includes(url)) && !UNSUPPORTED_LIST_URLS.includes(url)), [lists, allActiveListUrls]);
} // get all the tokens from active lists, combine with local default tokens

export function useCombinedActiveList() {
  const activeListUrls = useActiveListUrls();
  const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
  return activeTokens;
} // list of tokens not supported on interface for various reasons, used to show warnings and prevent swaps and adds

export function useUnsupportedTokenList() {
  // get hard-coded broken tokens
  const brokenListMap = useMemo(() => listToTokenMap(BROKEN_LIST), []); // get hard-coded list of unsupported tokens

  const localUnsupportedListMap = useMemo(() => listToTokenMap(UNSUPPORTED_TOKEN_LIST), []); // get dynamic list of unsupported tokens

  const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS); // format into one token address map

  return useMemo(() => combineMaps(brokenListMap, combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)), [brokenListMap, localUnsupportedListMap, loadedUnsupportedListMap]);
}
export function useIsListActive(url) {
  const activeListUrls = useActiveListUrls();
  return Boolean(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(url));
}