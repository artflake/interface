import { namehash } from '@ethersproject/hash';
import { useMemo } from 'react';
import { useSingleCallResult } from "../state/multicall/hooks";
import { isAddress } from "../utils";
import isZero from "../utils/isZero";
import { useENSRegistrarContract, useENSResolverContract } from "./useContract";
import useDebounce from "./useDebounce";
/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */

export default function useENSName(address) {
  var _resolverAddress$resu;

  const debouncedAddress = useDebounce(address, 200);
  const ensNodeArgument = useMemo(() => {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return [undefined];
    return [namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`)];
  }, [debouncedAddress]);
  const registrarContract = useENSRegistrarContract(false);
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  const resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
  const name = useSingleCallResult(resolverContract, 'name', ensNodeArgument);
  const changed = debouncedAddress !== address;
  return useMemo(() => {
    var _name$result$, _name$result;

    return {
      ENSName: changed ? null : (_name$result$ = (_name$result = name.result) === null || _name$result === void 0 ? void 0 : _name$result[0]) !== null && _name$result$ !== void 0 ? _name$result$ : null,
      loading: changed || resolverAddress.loading || name.loading
    };
  }, [changed, name.loading, name.result, resolverAddress.loading]);
}