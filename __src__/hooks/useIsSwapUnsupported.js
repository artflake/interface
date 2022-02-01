import { useMemo } from 'react';
import { useUnsupportedTokens } from "./Tokens";
/**
 * Returns true if the input currency or output currency cannot be traded in the interface
 * @param currencyIn the input currency to check
 * @param currencyOut the output currency to check
 */

export function useIsSwapUnsupported(currencyIn, currencyOut) {
  const unsupportedTokens = useUnsupportedTokens();
  return useMemo(() => {
    if (!unsupportedTokens) {
      return false;
    }

    const currencyInUnsupported = Boolean((currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isToken) && unsupportedTokens[currencyIn.address]);
    const currencyOutUnsupported = Boolean((currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.isToken) && unsupportedTokens[currencyOut.address]);
    return currencyInUnsupported || currencyOutUnsupported;
  }, [currencyIn, currencyOut, unsupportedTokens]);
}