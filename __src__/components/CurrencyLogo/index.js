import _styled from "styled-components";
import { SupportedChainId } from "../../constants/chains";
import React, { useMemo } from 'react';
import EthereumLogo from "../../assets/images/ethereum-logo.png";
import useHttpLocations from "../../hooks/useHttpLocations";
import { WrappedTokenInfo } from "../../state/lists/wrappedTokenInfo";
import Logo from "../Logo";
import { jsx as _jsx } from "react/jsx-runtime";

function chainIdToNetworkName(networkId) {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum';

    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum';

    case SupportedChainId.OPTIMISM:
      return 'optimism';

    default:
      return 'ethereum';
  }
}

export const getTokenLogoURL = function (address) {
  let chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SupportedChainId.MAINNET;
  const networkName = chainIdToNetworkName(chainId);
  const networksWithUrls = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.MAINNET, SupportedChainId.OPTIMISM];

  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`;
  }
};

const StyledEthereumLogo = _styled.img.withConfig({
  displayName: "CurrencyLogo__StyledEthereumLogo",
  componentId: "sc-1fvnadz-0"
})(["width:", ";height:", ";box-shadow:0px 6px 10px rgba(0,0,0,0.075);border-radius:24px;"], _ref => {
  let {
    size
  } = _ref;
  return size;
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size;
});

const StyledLogo = _styled(Logo).withConfig({
  displayName: "CurrencyLogo__StyledLogo",
  componentId: "sc-1fvnadz-1"
})(["width:", ";height:", ";border-radius:", ";box-shadow:0px 6px 10px rgba(0,0,0,0.075);background-color:", ";"], _ref3 => {
  let {
    size
  } = _ref3;
  return size;
}, _ref4 => {
  let {
    size
  } = _ref4;
  return size;
}, _ref5 => {
  let {
    size
  } = _ref5;
  return size;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.white;
});

export default function CurrencyLogo(_ref7) {
  var _currency$symbol;

  let {
    currency,
    size = '24px',
    style,
    ...rest
  } = _ref7;
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);
  const srcs = useMemo(() => {
    if (!currency || currency.isNative) return [];

    if (currency.isToken) {
      const defaultUrls = [];
      const url = getTokenLogoURL(currency.address, currency.chainId);

      if (url) {
        defaultUrls.push(url);
      }

      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls];
      }

      return defaultUrls;
    }

    return [];
  }, [currency, uriLocations]);

  if (currency !== null && currency !== void 0 && currency.isNative) {
    return /*#__PURE__*/_jsx(StyledEthereumLogo, {
      src: EthereumLogo,
      alt: "ethereum logo",
      size: size,
      style: style,
      ...rest
    });
  }

  return /*#__PURE__*/_jsx(StyledLogo, {
    size: size,
    srcs: srcs,
    alt: `${(_currency$symbol = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : 'token'} logo`,
    style: style,
    ...rest
  });
}