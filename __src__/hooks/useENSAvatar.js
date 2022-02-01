import { namehash } from '@ethersproject/hash';
import { useEffect, useMemo, useState } from 'react';
import { safeNamehash } from 'utils/safeNamehash';
import uriToHttp from 'utils/uriToHttp';
import { useSingleCallResult } from '../state/multicall/hooks';
import { isAddress } from '../utils';
import isZero from '../utils/isZero';
import { useENSRegistrarContract, useENSResolverContract, useERC721Contract, useERC1155Contract } from './useContract';
import useDebounce from './useDebounce';
import useENSName from './useENSName';
import { useActiveWeb3React } from './web3';
/**
 * Returns the ENS avatar URI, if available.
 * Spec: https://gist.github.com/Arachnid/9db60bd75277969ee1689c8742b75182.
 */

export default function useENSAvatar(address) {
  let enforceOwnership = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const debouncedAddress = useDebounce(address, 200);
  const node = useMemo(() => {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return undefined;
    return namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`);
  }, [debouncedAddress]);
  const addressAvatar = useAvatarFromNode(node);
  const ENSName = useENSName(address).ENSName;
  const nameAvatar = useAvatarFromNode(ENSName === null ? undefined : safeNamehash(ENSName));
  let avatar = addressAvatar.avatar || nameAvatar.avatar;
  const nftAvatar = useAvatarFromNFT(avatar, enforceOwnership);
  avatar = nftAvatar.avatar || avatar;
  const http = avatar && uriToHttp(avatar)[0];
  const changed = debouncedAddress !== address;
  return useMemo(() => ({
    avatar: changed ? null : http !== null && http !== void 0 ? http : null,
    loading: changed || addressAvatar.loading || nameAvatar.loading || nftAvatar.loading
  }), [addressAvatar.loading, changed, http, nameAvatar.loading, nftAvatar.loading]);
}

function useAvatarFromNode(node) {
  var _resolverAddress$resu;

  const nodeArgument = useMemo(() => [node], [node]);
  const textArgument = useMemo(() => [node, 'avatar'], [node]);
  const registrarContract = useENSRegistrarContract(false);
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', nodeArgument);
  const resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
  const avatar = useSingleCallResult(resolverContract, 'text', textArgument);
  return useMemo(() => {
    var _avatar$result;

    return {
      avatar: (_avatar$result = avatar.result) === null || _avatar$result === void 0 ? void 0 : _avatar$result[0],
      loading: resolverAddress.loading || avatar.loading
    };
  }, [avatar.loading, avatar.result, resolverAddress.loading]);
}

function useAvatarFromNFT() {
  var _parts$1$split, _parts$, _parts$2$split, _parts$2;

  let nftUri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let enforceOwnership = arguments.length > 1 ? arguments[1] : undefined;
  const parts = nftUri.toLowerCase().split(':');
  const protocol = parts[0]; // ignore the chain from eip155
  // TODO: when we are able, pull only from the specified chain

  const [, erc] = (_parts$1$split = (_parts$ = parts[1]) === null || _parts$ === void 0 ? void 0 : _parts$.split('/')) !== null && _parts$1$split !== void 0 ? _parts$1$split : [];
  const [contractAddress, id] = (_parts$2$split = (_parts$2 = parts[2]) === null || _parts$2 === void 0 ? void 0 : _parts$2.split('/')) !== null && _parts$2$split !== void 0 ? _parts$2$split : [];
  const isERC721 = protocol === 'eip155' && erc === 'erc721';
  const isERC1155 = protocol === 'eip155' && erc === 'erc1155';
  const erc721 = useERC721Uri(isERC721 ? contractAddress : undefined, id, enforceOwnership);
  const erc1155 = useERC1155Uri(isERC1155 ? contractAddress : undefined, id, enforceOwnership);
  const uri = erc721.uri || erc1155.uri;
  const http = uri && uriToHttp(uri)[0];
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(undefined);
  useEffect(() => {
    setAvatar(undefined);

    if (http) {
      setLoading(true);
      fetch(http).then(res => res.json()).then(_ref => {
        let {
          image
        } = _ref;
        setAvatar(image);
      }).catch(e => console.warn(e)).finally(() => {
        setLoading(false);
      });
    }
  }, [http]);
  return useMemo(() => ({
    avatar,
    loading: erc721.loading || erc1155.loading || loading
  }), [avatar, erc1155.loading, erc721.loading, loading]);
}

function useERC721Uri(contractAddress, id, enforceOwnership) {
  const idArgument = useMemo(() => [id], [id]);
  const {
    account
  } = useActiveWeb3React();
  const contract = useERC721Contract(contractAddress);
  const owner = useSingleCallResult(contract, 'ownerOf', idArgument);
  const uri = useSingleCallResult(contract, 'tokenURI', idArgument);
  return useMemo(() => {
    var _owner$result, _uri$result;

    return {
      uri: !enforceOwnership || account === ((_owner$result = owner.result) === null || _owner$result === void 0 ? void 0 : _owner$result[0]) ? (_uri$result = uri.result) === null || _uri$result === void 0 ? void 0 : _uri$result[0] : undefined,
      loading: owner.loading || uri.loading
    };
  }, [account, enforceOwnership, owner.loading, owner.result, uri.loading, uri.result]);
}

function useERC1155Uri(contractAddress, id, enforceOwnership) {
  const {
    account
  } = useActiveWeb3React();
  const idArgument = useMemo(() => [id], [id]);
  const accountArgument = useMemo(() => [account || '', id], [account, id]);
  const contract = useERC1155Contract(contractAddress);
  const balance = useSingleCallResult(contract, 'balanceOf', accountArgument);
  const uri = useSingleCallResult(contract, 'uri', idArgument);
  return useMemo(() => {
    var _balance$result, _uri$result2;

    return {
      uri: !enforceOwnership || ((_balance$result = balance.result) === null || _balance$result === void 0 ? void 0 : _balance$result[0]) > 0 ? (_uri$result2 = uri.result) === null || _uri$result2 === void 0 ? void 0 : _uri$result2[0] : undefined,
      loading: balance.loading || uri.loading
    };
  }, [balance.loading, balance.result, enforceOwnership, uri.loading, uri.result]);
}