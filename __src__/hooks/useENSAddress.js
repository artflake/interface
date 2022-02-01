import { useMemo } from 'react';
import { safeNamehash } from "../utils/safeNamehash";
import { useSingleCallResult } from "../state/multicall/hooks";
import isZero from "../utils/isZero";
import { useENSRegistrarContract, useENSResolverContract } from "./useContract";
import useDebounce from "./useDebounce";
/**
 * Does a lookup for an ENS name to find its address.
 */

export default function useENSAddress(ensName) {
  var _resolverAddress$resu;

  const debouncedName = useDebounce(ensName, 200);
  const ensNodeArgument = useMemo(() => [debouncedName === null ? undefined : safeNamehash(debouncedName)], [debouncedName]);
  const registrarContract = useENSRegistrarContract(false);
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  const resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
  const addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument);
  const changed = debouncedName !== ensName;
  return useMemo(() => {
    var _addr$result$, _addr$result;

    return {
      address: changed ? null : (_addr$result$ = (_addr$result = addr.result) === null || _addr$result === void 0 ? void 0 : _addr$result[0]) !== null && _addr$result$ !== void 0 ? _addr$result$ : null,
      loading: changed || resolverAddress.loading || addr.loading
    };
  }, [addr.loading, addr.result, changed, resolverAddress.loading]);
}