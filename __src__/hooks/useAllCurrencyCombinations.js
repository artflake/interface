import { useMemo } from 'react';
import { ADDITIONAL_BASES, BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES } from '../constants/routing';
export function useAllCurrencyCombinations(currencyA, currencyB) {
  const chainId = currencyA === null || currencyA === void 0 ? void 0 : currencyA.chainId;
  const [tokenA, tokenB] = chainId ? [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped] : [undefined, undefined];
  const bases = useMemo(() => {
    var _BASES_TO_CHECK_TRADE, _ADDITIONAL_BASES$cha, _ADDITIONAL_BASES$cha2, _ADDITIONAL_BASES$cha3, _ADDITIONAL_BASES$cha4;

    if (!chainId || chainId !== (tokenB === null || tokenB === void 0 ? void 0 : tokenB.chainId)) return [];
    const common = (_BASES_TO_CHECK_TRADE = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _BASES_TO_CHECK_TRADE !== void 0 ? _BASES_TO_CHECK_TRADE : [];
    const additionalA = tokenA ? (_ADDITIONAL_BASES$cha = (_ADDITIONAL_BASES$cha2 = ADDITIONAL_BASES[chainId]) === null || _ADDITIONAL_BASES$cha2 === void 0 ? void 0 : _ADDITIONAL_BASES$cha2[tokenA.address]) !== null && _ADDITIONAL_BASES$cha !== void 0 ? _ADDITIONAL_BASES$cha : [] : [];
    const additionalB = tokenB ? (_ADDITIONAL_BASES$cha3 = (_ADDITIONAL_BASES$cha4 = ADDITIONAL_BASES[chainId]) === null || _ADDITIONAL_BASES$cha4 === void 0 ? void 0 : _ADDITIONAL_BASES$cha4[tokenB.address]) !== null && _ADDITIONAL_BASES$cha3 !== void 0 ? _ADDITIONAL_BASES$cha3 : [] : [];
    return [...common, ...additionalA, ...additionalB];
  }, [chainId, tokenA, tokenB]);
  const basePairs = useMemo(() => bases.flatMap(base => bases.map(otherBase => [base, otherBase])) // though redundant with the first filter below, that expression runs more often, so this is probably worthwhile
  .filter(_ref => {
    let [t0, t1] = _ref;
    return !t0.equals(t1);
  }), [bases]);
  return useMemo(() => tokenA && tokenB ? [// the direct pair
  [tokenA, tokenB], // token A against all bases
  ...bases.map(base => [tokenA, base]), // token B against all bases
  ...bases.map(base => [tokenB, base]), // each base against all bases
  ...basePairs] // filter out invalid pairs comprised of the same asset (e.g. WETH<>WETH)
  .filter(_ref2 => {
    let [t0, t1] = _ref2;
    return !t0.equals(t1);
  }) // filter out duplicate pairs
  .filter((_ref3, i, otherPairs) => {
    let [t0, t1] = _ref3;
    // find the first index in the array at which there are the same 2 tokens as the current
    const firstIndexInOtherPairs = otherPairs.findIndex(_ref4 => {
      let [t0Other, t1Other] = _ref4;
      return t0.equals(t0Other) && t1.equals(t1Other) || t0.equals(t1Other) && t1.equals(t0Other);
    }); // only accept the first occurrence of the same 2 tokens

    return firstIndexInOtherPairs === i;
  }) // optionally filter out some pairs for tokens with custom bases defined
  .filter(_ref5 => {
    let [tokenA, tokenB] = _ref5;
    if (!chainId) return true;
    const customBases = CUSTOM_BASES[chainId];
    const customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
    const customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
    if (!customBasesA && !customBasesB) return true;
    if (customBasesA && !customBasesA.find(base => tokenB.equals(base))) return false;
    if (customBasesB && !customBasesB.find(base => tokenA.equals(base))) return false;
    return true;
  }) : [], [tokenA, tokenB, bases, basePairs, chainId]);
}