import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg';
import FortmaticIcon from '../../assets/images/fortmaticIcon.png';
import PortisIcon from '../../assets/images/portisIcon.png';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors';
import Identicon from '../Identicon';
import { jsx as _jsx } from "react/jsx-runtime";
export default function StatusIcon(_ref) {
  let {
    connector
  } = _ref;

  switch (connector) {
    case injected:
      return /*#__PURE__*/_jsx(Identicon, {});

    case walletconnect:
      return /*#__PURE__*/_jsx("img", {
        src: WalletConnectIcon,
        alt: 'WalletConnect'
      });

    case walletlink:
      return /*#__PURE__*/_jsx("img", {
        src: CoinbaseWalletIcon,
        alt: 'Coinbase Wallet'
      });

    case fortmatic:
      return /*#__PURE__*/_jsx("img", {
        src: FortmaticIcon,
        alt: 'Fortmatic'
      });

    case portis:
      return /*#__PURE__*/_jsx("img", {
        src: PortisIcon,
        alt: 'Portis'
      });

    default:
      return null;
  }
}