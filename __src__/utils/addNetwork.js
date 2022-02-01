import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function addNetwork(_ref) {
  var _library$provider;

  let {
    library,
    chainId,
    info
  } = _ref;

  if (!(library !== null && library !== void 0 && (_library$provider = library.provider) !== null && _library$provider !== void 0 && _library$provider.request)) {
    return;
  }

  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());

  try {
    await (library === null || library === void 0 ? void 0 : library.provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: formattedChainId,
        chainName: info.label,
        rpcUrls: info.rpcUrls,
        nativeCurrency: info.nativeCurrency,
        blockExplorerUrls: [info.explorer]
      }]
    }));
  } catch (error) {
    console.error('error adding eth network: ', chainId, info, error);
  }
}