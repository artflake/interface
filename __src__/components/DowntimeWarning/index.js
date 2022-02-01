import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { L2_CHAIN_IDS, SupportedChainId } from "../../constants/chains";
import { useActiveWeb3React } from "../../hooks/web3";
import { AlertOctagon } from 'react-feather';
import { ExternalLink } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Root = _styled.div.withConfig({
  displayName: "DowntimeWarning__Root",
  componentId: "sc-10ftn5n-0"
})(["background-color:", ";border-radius:18px;color:black;display:flex;flex-direction:row;font-size:14px;margin:12px auto;padding:16px;width:100%;max-width:880px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.darkMode ? '#888D9B' : '#CED0D9';
});

const WarningIcon = _styled(AlertOctagon).withConfig({
  displayName: "DowntimeWarning__WarningIcon",
  componentId: "sc-10ftn5n-1"
})(["display:block;margin:auto 16px auto 0;min-height:22px;min-width:22px;"]);

const ReadMoreLink = _styled(ExternalLink).withConfig({
  displayName: "DowntimeWarning__ReadMoreLink",
  componentId: "sc-10ftn5n-2"
})(["color:black;text-decoration:underline;"]);

export default function DowntimeWarning() {
  const {
    chainId
  } = useActiveWeb3React();

  if (!chainId || !L2_CHAIN_IDS.includes(chainId)) {
    return null;
  }

  const Content = () => {
    switch (chainId) {
      case SupportedChainId.OPTIMISM:
      case SupportedChainId.OPTIMISTIC_KOVAN:
        return /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Optimistic Ethereum is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>",
            components: {
              0: /*#__PURE__*/_jsx(ReadMoreLink, {
                href: "https://help.uniswap.org/en/articles/5406082-what-happens-if-the-optimistic-ethereum-network-experiences-downtime"
              })
            }
          })
        });

      case SupportedChainId.ARBITRUM_ONE:
      case SupportedChainId.ARBITRUM_RINKEBY:
        return /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Arbitrum is in Beta and may experience downtime. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>",
            components: {
              0: /*#__PURE__*/_jsx(ReadMoreLink, {
                href: "https://help.uniswap.org/en/articles/5576122-arbitrum-network-downtime"
              })
            }
          })
        });

      default:
        return null;
    }
  };

  return /*#__PURE__*/_jsxs(Root, {
    children: [/*#__PURE__*/_jsx(WarningIcon, {}), /*#__PURE__*/_jsx(Content, {})]
  });
}