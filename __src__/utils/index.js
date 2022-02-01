import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
} // shorten the checksummed version of the input address to have 0x + 4 characters at start and end

export function shortenAddress(address) {
  let chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  const parsed = isAddress(address);

  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
} // account is not optional

function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
} // account is optional


function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
} // account is optional


export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
export function isTokenOnList(tokenAddressMap, token) {
  var _tokenAddressMap$toke;

  return Boolean((token === null || token === void 0 ? void 0 : token.isToken) && ((_tokenAddressMap$toke = tokenAddressMap[token.chainId]) === null || _tokenAddressMap$toke === void 0 ? void 0 : _tokenAddressMap$toke[token.address]));
}
export function formattedFeeAmount(feeAmount) {
  return feeAmount / 10000;
}