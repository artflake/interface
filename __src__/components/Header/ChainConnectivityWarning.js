import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import { AlertOctagon } from 'react-feather';
import { ExternalLink, MEDIA_WIDTHS } from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const BodyRow = _styled.div.withConfig({
  displayName: "ChainConnectivityWarning__BodyRow",
  componentId: "sc-zncp67-0"
})(["color:", ";font-size:12px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.black;
});

const CautionIcon = _styled(AlertOctagon).withConfig({
  displayName: "ChainConnectivityWarning__CautionIcon",
  componentId: "sc-zncp67-1"
})(["color:", ";"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.black;
});

const Link = _styled(ExternalLink).withConfig({
  displayName: "ChainConnectivityWarning__Link",
  componentId: "sc-zncp67-2"
})(["color:", ";text-decoration:underline;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.black;
});

const TitleRow = _styled.div.withConfig({
  displayName: "ChainConnectivityWarning__TitleRow",
  componentId: "sc-zncp67-3"
})(["align-items:center;display:flex;justify-content:flex-start;margin-bottom:8px;"]);

const TitleText = _styled.div.withConfig({
  displayName: "ChainConnectivityWarning__TitleText",
  componentId: "sc-zncp67-4"
})(["color:black;font-weight:600;font-size:16px;line-height:20px;margin:0px 12px;"]);

const Wrapper = _styled.div.withConfig({
  displayName: "ChainConnectivityWarning__Wrapper",
  componentId: "sc-zncp67-5"
})(["background-color:", ";border-radius:12px;bottom:60px;display:none;max-width:348px;padding:16px 20px;position:absolute;right:16px;@media screen and (min-width:", "px){display:block;}"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.yellow3;
}, MEDIA_WIDTHS.upToMedium);

export function ChainConnectivityWarning() {
  const {
    chainId
  } = useActiveWeb3React();
  const info = CHAIN_INFO[chainId !== null && chainId !== void 0 ? chainId : SupportedChainId.MAINNET];
  const label = info === null || info === void 0 ? void 0 : info.label;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(TitleRow, {
      children: [/*#__PURE__*/_jsx(CautionIcon, {}), /*#__PURE__*/_jsx(TitleText, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Network Warning"
        })
      })]
    }), /*#__PURE__*/_jsxs(BodyRow, {
      children: [chainId === SupportedChainId.MAINNET ? /*#__PURE__*/_jsx(Trans, {
        id: "You may have lost your network connection."
      }) : /*#__PURE__*/_jsx(Trans, {
        id: "You may have lost your network connection, or {label} might be down right now.",
        values: {
          label: label
        }
      }), ' ', info.statusPage !== undefined && /*#__PURE__*/_jsxs("span", {
        children: [/*#__PURE__*/_jsx(Trans, {
          id: "Check network status"
        }), ' ', /*#__PURE__*/_jsx(Link, {
          href: info.statusPage || '',
          children: /*#__PURE__*/_jsx(Trans, {
            id: "here."
          })
        })]
      })]
    })]
  });
}