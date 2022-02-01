import { useActiveWeb3React } from "./web3";
import { useCallback, useState } from 'react';
import { getTokenLogoURL } from "./../components/CurrencyLogo/index";
export default function useAddTokenToMetamask(currencyToAdd) {
  const {
    library
  } = useActiveWeb3React();
  const token = currencyToAdd === null || currencyToAdd === void 0 ? void 0 : currencyToAdd.wrapped;
  const [success, setSuccess] = useState();
  const addToken = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && token) {
      library.provider.request({
        method: 'wallet_watchAsset',
        params: {
          //@ts-ignore // need this for incorrect ethers provider type
          type: 'ERC20',
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            image: getTokenLogoURL(token.address)
          }
        }
      }).then(success => {
        setSuccess(success);
      }).catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }, [library, token]);
  return {
    addToken,
    success
  };
}