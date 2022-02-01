import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import { CHAIN_INFO } from 'constants/chains';
import { addNetwork } from './addNetwork';
// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork(_ref) {
  var _library$provider;

  let {
    library,
    chainId
  } = _ref;

  if (!(library !== null && library !== void 0 && (_library$provider = library.provider) !== null && _library$provider !== void 0 && _library$provider.request)) {
    return;
  }

  if (!chainId && library !== null && library !== void 0 && library.getNetwork) {
    ;
    ({
      chainId
    } = await library.getNetwork());
  }

  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());

  try {
    await (library === null || library === void 0 ? void 0 : library.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{
        chainId: formattedChainId
      }]
    }));
  } catch (error) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if (error.code === 4902 && chainId !== undefined) {
      const info = CHAIN_INFO[chainId]; // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)

      await addNetwork({
        library,
        chainId,
        info
      });
      await switchToNetwork({
        library,
        chainId
      });
    } else {
      throw error;
    }
  }
}