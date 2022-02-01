import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { AutoColumn } from "../../components/Column";
import { CHAIN_INFO, SupportedChainId } from "../../constants/chains";
import { useActiveWeb3React } from "../../hooks/web3";
import { ThemedText } from "../../theme";
import Texture from "../../assets/images/sandtexture.webp";
import { ExternalLink } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const CTASection = _styled.section.withConfig({
  displayName: "CTACards__CTASection",
  componentId: "sc-1dn0qar-0"
})(["display:grid;grid-template-columns:2fr 1fr;gap:8px;margin-top:8px;", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `;
});

const CTA1 = _styled(ExternalLink).withConfig({
  displayName: "CTACards__CTA1",
  componentId: "sc-1dn0qar-1"
})(["background-color:", ";background:radial-gradient( 92.78% 103.09% at 50.06% 7.22%,rgba(255,58,212,0.072) 0%,rgba(255,255,255,0.042) 100% ),radial-gradient(100% 97.16% at 0% 12.22%,rgba(235,0,255,0.2) 0%,rgba(243,19,19,0.2) 100%);padding:2rem;border-radius:20px;display:flex;flex-direction:column;position:relative;justify-content:space-between;align-items:center;overflow:hidden;border:1px solid transparent;*{color:", ";text-decoration:none !important;}:hover{border:1px solid ", ";text-decoration:none;*{text-decoration:none !important;}}:before{content:'';position:absolute;width:800%;height:480%;top:-390px;left:-310px;z-index:-1;opacity:0.4;background:url(", ") 0 0 repeat;transform:rotate(-4deg);}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text1;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg0;
}, Texture);

const CTA2 = _styled(ExternalLink).withConfig({
  displayName: "CTACards__CTA2",
  componentId: "sc-1dn0qar-2"
})(["position:relative;overflow:hidden;padding:32px;border-radius:20px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid transparent;*{color:", ";text-decoration:none !important;}:hover{border:1px solid ", ";text-decoration:none !important;*{text-decoration:none !important;}}:before{content:'';position:absolute;width:340%;height:280%;top:-170%;left:-134%;opacity:0.4;z-index:-1;background:url(", ") 0 0 repeat;transform:rotate(-4deg);}"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.text1;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg0;
}, Texture);

const HeaderText = _styled(ThemedText.Label).withConfig({
  displayName: "CTACards__HeaderText",
  componentId: "sc-1dn0qar-3"
})(["align-items:center;display:flex;margin-bottom:24px;font-weight:400;font-size:20px;", ";"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.mediaWidth.upToMedium`
    font-size: 20px;
  `;
});

const ResponsiveColumn = _styled(AutoColumn).withConfig({
  displayName: "CTACards__ResponsiveColumn",
  componentId: "sc-1dn0qar-4"
})(["grid-template-columns:1fr;width:100%;gap:12px;", ";justify-content:space-between;"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.mediaWidth.upToMedium`
    gap: 8px;
  `;
});

export default function CTACards() {
  const {
    chainId
  } = useActiveWeb3React();
  const {
    infoLink
  } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET];
  return /*#__PURE__*/_jsxs(CTASection, {
    children: [/*#__PURE__*/_jsx(CTA1, {
      href: 'https://help.uniswap.org/en/articles/5391541-providing-liquidity-on-uniswap-v3',
      children: /*#__PURE__*/_jsxs(ResponsiveColumn, {
        children: [/*#__PURE__*/_jsxs(HeaderText, {
          children: [/*#__PURE__*/_jsx(Trans, {
            id: "Learn about providing liquidity"
          }), " \u2197"]
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 300,
          style: {
            alignItems: 'center',
            display: 'flex',
            maxWidth: '80%'
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Check out our v3 LP walkthrough and migration guides."
          })
        })]
      })
    }), /*#__PURE__*/_jsx(CTA2, {
      href: infoLink + 'pools',
      children: /*#__PURE__*/_jsxs(ResponsiveColumn, {
        children: [/*#__PURE__*/_jsxs(HeaderText, {
          style: {
            alignSelf: 'flex-start'
          },
          children: [/*#__PURE__*/_jsx(Trans, {
            id: "Top pools"
          }), " \u2197"]
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 300,
          style: {
            alignSelf: 'flex-start'
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Explore popular pools on Uniswap Analytics."
          })
        })]
      })
    })]
  });
}