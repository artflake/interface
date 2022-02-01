import { useMemo } from 'react';
import { isAddress } from '../../utils';

const alwaysTrue = () => true;
/**
 * Create a filter function to apply to a token for whether it matches a particular search query
 * @param search the search query to apply to the token
 */


export function createTokenFilterFunction(search) {
  const searchingAddress = isAddress(search);

  if (searchingAddress) {
    const lower = searchingAddress.toLowerCase();
    return t => 'isToken' in t ? searchingAddress === t.address : lower === t.address.toLowerCase();
  }

  const lowerSearchParts = search.toLowerCase().split(/\s+/).filter(s => s.length > 0);
  if (lowerSearchParts.length === 0) return alwaysTrue;

  const matchesSearch = s => {
    const sParts = s.toLowerCase().split(/\s+/).filter(s => s.length > 0);
    return lowerSearchParts.every(p => p.length === 0 || sParts.some(sp => sp.startsWith(p) || sp.endsWith(p)));
  };

  return _ref => {
    let {
      name,
      symbol
    } = _ref;
    return Boolean(symbol && matchesSearch(symbol) || name && matchesSearch(name));
  };
}
export function filterTokens(tokens, search) {
  return tokens.filter(createTokenFilterFunction(search));
}
export function useSortedTokensByQuery(tokens, searchQuery) {
  return useMemo(() => {
    if (!tokens) {
      return [];
    }

    const symbolMatch = searchQuery.toLowerCase().split(/\s+/).filter(s => s.length > 0);

    if (symbolMatch.length > 1) {
      return tokens;
    }

    const exactMatches = [];
    const symbolSubtrings = [];
    const rest = []; // sort tokens by exact match -> subtring on symbol match -> rest

    tokens.map(token => {
      var _token$symbol, _token$symbol2;

      if (((_token$symbol = token.symbol) === null || _token$symbol === void 0 ? void 0 : _token$symbol.toLowerCase()) === symbolMatch[0]) {
        return exactMatches.push(token);
      } else if ((_token$symbol2 = token.symbol) !== null && _token$symbol2 !== void 0 && _token$symbol2.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) {
        return symbolSubtrings.push(token);
      } else {
        return rest.push(token);
      }
    });
    return [...exactMatches, ...symbolSubtrings, ...rest];
  }, [tokens, searchQuery]);
}