import { useMemo } from 'react';
import { safeNamehash } from 'utils/safeNamehash';
import { useSingleCallResult } from '../state/multicall/hooks';
import isZero from '../utils/isZero';
import { useENSRegistrarContract, useENSResolverContract } from './useContract';
/**
 * Does a lookup for an ENS name to find its contenthash.
 */

export default function useENSContentHash(ensName) {
  var _resolverAddressResul;

  const ensNodeArgument = useMemo(() => [ensName === null ? undefined : safeNamehash(ensName)], [ensName]);
  const registrarContract = useENSRegistrarContract(false);
  const resolverAddressResult = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  const resolverAddress = (_resolverAddressResul = resolverAddressResult.result) === null || _resolverAddressResul === void 0 ? void 0 : _resolverAddressResul[0];
  const resolverContract = useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress, false);
  const contenthash = useSingleCallResult(resolverContract, 'contenthash', ensNodeArgument);
  return useMemo(() => {
    var _contenthash$result$, _contenthash$result;

    return {
      contenthash: (_contenthash$result$ = (_contenthash$result = contenthash.result) === null || _contenthash$result === void 0 ? void 0 : _contenthash$result[0]) !== null && _contenthash$result$ !== void 0 ? _contenthash$result$ : null,
      loading: resolverAddressResult.loading || contenthash.loading
    };
  }, [contenthash.loading, contenthash.result, resolverAddressResult.loading]);
}