import { css as _css } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ARBITRUM_HELP_CENTER_LINK, L2_CHAIN_IDS, OPTIMISM_HELP_CENTER_LINK, SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useState } from 'react';
import { ArrowDownCircle, X } from 'react-feather';
import { useArbitrumAlphaAlert, useDarkModeManager, useOptimismAlphaAlert } from 'state/user/hooks';
import { useETHBalances } from 'state/wallet/hooks';
import { ExternalLink, MEDIA_WIDTHS } from 'theme';
import { CHAIN_INFO } from '../../constants/chains';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const DesktopTextBreak = _styled.div.withConfig({
  displayName: "NetworkAlert__DesktopTextBreak",
  componentId: "sc-17mb1wp-0"
})(["display:none;@media screen and (min-width:", "px){display:block;}"], MEDIA_WIDTHS.upToMedium);

const L2Icon = _styled.img.withConfig({
  displayName: "NetworkAlert__L2Icon",
  componentId: "sc-17mb1wp-1"
})(["width:36px;height:36px;justify-self:center;"]);

const BetaTag = _styled.span.withConfig({
  displayName: "NetworkAlert__BetaTag",
  componentId: "sc-17mb1wp-2"
})(["align-items:center;background-color:", ";border-radius:6px;color:", ";display:flex;font-size:14px;height:28px;justify-content:center;left:-16px;position:absolute;transform:rotate(-15deg);top:-16px;width:60px;z-index:1;"], _ref => {
  let {
    color
  } = _ref;
  return color;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.white;
});

const Body = _styled.p.withConfig({
  displayName: "NetworkAlert__Body",
  componentId: "sc-17mb1wp-3"
})(["font-size:12px;grid-column:1 / 3;line-height:143%;margin:0;@media screen and (min-width:", "px){grid-column:2 / 3;}"], MEDIA_WIDTHS.upToSmall);

export const Controls = _styled.div.withConfig({
  displayName: "NetworkAlert__Controls",
  componentId: "sc-17mb1wp-4"
})(["align-items:center;display:flex;justify-content:flex-start;", ""], _ref3 => {
  let {
    thin
  } = _ref3;
  return thin && _css`
      margin: auto 32px auto 0;
    `;
});

const CloseIcon = _styled(X).withConfig({
  displayName: "NetworkAlert__CloseIcon",
  componentId: "sc-17mb1wp-5"
})(["cursor:pointer;position:absolute;top:16px;right:16px;"]);

const BodyText = _styled.div.withConfig({
  displayName: "NetworkAlert__BodyText",
  componentId: "sc-17mb1wp-6"
})(["align-items:center;display:grid;grid-gap:4px;grid-template-columns:40px 4fr;grid-template-rows:auto auto;margin:20px 16px;@media screen and (min-width:", "px){grid-template-columns:42px 4fr;grid-gap:8px;}"], MEDIA_WIDTHS.upToSmall);

const LearnMoreLink = _styled(ExternalLink).withConfig({
  displayName: "NetworkAlert__LearnMoreLink",
  componentId: "sc-17mb1wp-7"
})(["align-items:center;background-color:transparent;border:1px solid rgba(255,255,255,0.4);border-radius:8px;color:", ";display:flex;font-size:16px;height:44px;justify-content:space-between;margin:0 0 20px 0;padding:12px 16px;text-decoration:none;width:auto;:hover,:focus,:active{background-color:rgba(255,255,255,0.05);}transition:background-color 150ms ease-in-out;", ""], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.text1;
}, _ref5 => {
  let {
    thin
  } = _ref5;
  return thin && _css`
      font-size: 14px;
      margin: auto;
      width: 112px;
    `;
});

const RootWrapper = _styled.div.withConfig({
  displayName: "NetworkAlert__RootWrapper",
  componentId: "sc-17mb1wp-8"
})(["position:relative;"]);

export const ArbitrumWrapperBackgroundDarkMode = _css`
  background: radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),
    radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.3) 0%, rgba(33, 114, 229, 0.3) 100%), hsla(0, 0%, 100%, 0.1);
`;
export const ArbitrumWrapperBackgroundLightMode = _css`
  background: radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),
    radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1);
`;
export const OptimismWrapperBackgroundDarkMode = _css`
  background: radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%),
    radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.5) 0%, rgba(235, 0, 255, 0.345) 96%);
`;
export const OptimismWrapperBackgroundLightMode = _css`
  background: radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),
    radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.5);
`;

const ContentWrapper = _styled.div.withConfig({
  displayName: "NetworkAlert__ContentWrapper",
  componentId: "sc-17mb1wp-9"
})(["", ";border-radius:20px;display:flex;flex-direction:column;max-width:480px;min-height:174px;overflow:hidden;position:relative;width:100%;", ":before{background-image:url(", ");background-repeat:no-repeat;background-size:300px;content:'';height:300px;opacity:0.1;position:absolute;transform:rotate(25deg) translate(-90px,-40px);width:300px;z-index:-1;}"], _ref6 => {
  let {
    chainId,
    darkMode
  } = _ref6;
  return [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId) ? darkMode ? OptimismWrapperBackgroundDarkMode : OptimismWrapperBackgroundLightMode : darkMode ? ArbitrumWrapperBackgroundDarkMode : ArbitrumWrapperBackgroundLightMode;
}, _ref7 => {
  let {
    thin
  } = _ref7;
  return thin && _css`
      flex-direction: row;
      max-width: max-content;
      min-height: min-content;
    `;
}, _ref8 => {
  let {
    logoUrl
  } = _ref8;
  return logoUrl;
});

const Header = _styled.h2.withConfig({
  displayName: "NetworkAlert__Header",
  componentId: "sc-17mb1wp-10"
})(["font-weight:600;font-size:20px;margin:0;padding-right:30px;display:", ";"], _ref9 => {
  let {
    thin
  } = _ref9;
  return thin ? 'none' : 'block';
});

const LinkOutCircle = _styled(ArrowDownCircle).withConfig({
  displayName: "NetworkAlert__LinkOutCircle",
  componentId: "sc-17mb1wp-11"
})(["margin-left:12px;transform:rotate(230deg);width:20px;height:20px;"]);

const LinkOutToBridge = _styled(ExternalLink).withConfig({
  displayName: "NetworkAlert__LinkOutToBridge",
  componentId: "sc-17mb1wp-12"
})(["align-items:center;background-color:black;border-radius:8px;color:white;display:flex;font-size:16px;height:44px;justify-content:space-between;margin:0 12px 20px 18px;padding:12px 16px;text-decoration:none;width:auto;:hover,:focus,:active{background-color:black;}", ""], _ref10 => {
  let {
    thin
  } = _ref10;
  return thin && _css`
      font-size: 14px;
      margin: auto 10px;
      width: 168px;
    `;
});

export function NetworkAlert(props) {
  var _useETHBalances;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const [darkMode] = useDarkModeManager();
  const [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged] = useArbitrumAlphaAlert();
  const [optimismAlphaAcknowledged, setOptimismAlphaAcknowledged] = useOptimismAlphaAlert();
  const [locallyDismissed, setLocallyDimissed] = useState(false);
  const userEthBalance = (_useETHBalances = useETHBalances(account ? [account] : [])) === null || _useETHBalances === void 0 ? void 0 : _useETHBalances[account !== null && account !== void 0 ? account : ''];
  const dismiss = useCallback(() => {
    if (userEthBalance !== null && userEthBalance !== void 0 && userEthBalance.greaterThan(0)) {
      switch (chainId) {
        case SupportedChainId.OPTIMISM:
          setOptimismAlphaAcknowledged(true);
          break;

        case SupportedChainId.ARBITRUM_ONE:
          setArbitrumAlphaAcknowledged(true);
          break;
      }
    } else {
      setLocallyDimissed(true);
    }
  }, [chainId, setArbitrumAlphaAcknowledged, setOptimismAlphaAcknowledged, userEthBalance]);
  const onOptimismAndOptimismAcknowledged = SupportedChainId.OPTIMISM === chainId && optimismAlphaAcknowledged;
  const onArbitrumAndArbitrumAcknowledged = SupportedChainId.ARBITRUM_ONE === chainId && arbitrumAlphaAcknowledged;

  if (!chainId || !L2_CHAIN_IDS.includes(chainId) || onArbitrumAndArbitrumAcknowledged || onOptimismAndOptimismAcknowledged || locallyDismissed) {
    return null;
  }

  const info = CHAIN_INFO[chainId];
  const isOptimism = [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId);
  const depositUrl = isOptimism ? `${info.bridge}?chainId=1` : info.bridge;
  const helpCenterLink = isOptimism ? OPTIMISM_HELP_CENTER_LINK : ARBITRUM_HELP_CENTER_LINK;
  const showCloseIcon = Boolean((userEthBalance === null || userEthBalance === void 0 ? void 0 : userEthBalance.greaterThan(0)) && !props.thin);
  return /*#__PURE__*/_jsxs(RootWrapper, {
    children: [/*#__PURE__*/_jsx(BetaTag, {
      color: isOptimism ? '#ff0420' : '#0490ed',
      children: "Beta"
    }), /*#__PURE__*/_jsxs(ContentWrapper, {
      chainId: chainId,
      darkMode: darkMode,
      logoUrl: info.logoUrl,
      thin: props.thin,
      children: [showCloseIcon && /*#__PURE__*/_jsx(CloseIcon, {
        onClick: dismiss
      }), /*#__PURE__*/_jsxs(BodyText, {
        children: [/*#__PURE__*/_jsx(L2Icon, {
          src: info.logoUrl
        }), /*#__PURE__*/_jsx(Header, {
          thin: props.thin,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Uniswap on {0}",
            values: {
              0: info.label
            }
          })
        }), /*#__PURE__*/_jsx(Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "To start trading on {0}, first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using {1}.",
            values: {
              0: info.label,
              1: info.label
            }
          })
        })]
      }), /*#__PURE__*/_jsxs(Controls, {
        thin: props.thin,
        children: [/*#__PURE__*/_jsxs(LinkOutToBridge, {
          href: depositUrl,
          thin: props.thin,
          children: [/*#__PURE__*/_jsx(Trans, {
            id: "Deposit Assets"
          }), /*#__PURE__*/_jsx(LinkOutCircle, {})]
        }), /*#__PURE__*/_jsx(LearnMoreLink, {
          href: helpCenterLink,
          thin: props.thin,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Learn More"
          })
        })]
      })]
    })]
  });
}