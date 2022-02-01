import { css as _css } from "styled-components";
import _styled from "styled-components";
import { loadingOpacityMixin } from 'components/Loader/styled';
import { TooltipContainer } from 'components/Tooltip';
import { transparentize } from 'polished';
import { AlertTriangle } from 'react-feather';
import { Text } from 'rebass';
import { ThemedText } from '../../theme';
import { AutoColumn } from '../Column';
import TradePrice from './TradePrice';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const Wrapper = _styled.div.withConfig({
  displayName: "styleds__Wrapper",
  componentId: "sc-11ce2lf-0"
})(["position:relative;padding:8px;"]);
export const ArrowWrapper = _styled.div.withConfig({
  displayName: "styleds__ArrowWrapper",
  componentId: "sc-11ce2lf-1"
})(["padding:4px;border-radius:12px;height:32px;width:32px;position:relative;margin-top:-14px;margin-bottom:-14px;left:calc(50% - 16px);background-color:", ";border:4px solid ", ";z-index:2;", ""], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg0;
}, _ref3 => {
  let {
    clickable
  } = _ref3;
  return clickable ? _css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        ` : null;
});
export const SectionBreak = _styled.div.withConfig({
  displayName: "styleds__SectionBreak",
  componentId: "sc-11ce2lf-2"
})(["height:1px;width:100%;background-color:", ";"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg3;
});
export const ErrorText = _styled(Text).withConfig({
  displayName: "styleds__ErrorText",
  componentId: "sc-11ce2lf-3"
})(["color:", ";"], _ref5 => {
  let {
    theme,
    severity
  } = _ref5;
  return severity === 3 || severity === 4 ? theme.red1 : severity === 2 ? theme.yellow2 : severity === 1 ? theme.text1 : theme.text2;
});
export const TruncatedText = _styled(Text).withConfig({
  displayName: "styleds__TruncatedText",
  componentId: "sc-11ce2lf-4"
})(["text-overflow:ellipsis;max-width:220px;overflow:hidden;text-align:right;"]); // styles

export const Dots = _styled.span.withConfig({
  displayName: "styleds__Dots",
  componentId: "sc-11ce2lf-5"
})(["&::after{display:inline-block;animation:ellipsis 1.25s infinite;content:'.';width:1em;text-align:left;}@keyframes ellipsis{0%{content:'.';}33%{content:'..';}66%{content:'...';}}"]);

const SwapCallbackErrorInner = _styled.div.withConfig({
  displayName: "styleds__SwapCallbackErrorInner",
  componentId: "sc-11ce2lf-6"
})(["background-color:", ";border-radius:1rem;display:flex;align-items:center;font-size:0.825rem;width:100%;padding:3rem 1.25rem 1rem 1rem;margin-top:-2rem;color:", ";z-index:-1;p{padding:0;margin:0;font-weight:500;}"], _ref6 => {
  let {
    theme
  } = _ref6;
  return transparentize(0.9, theme.red1);
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.red1;
});

const SwapCallbackErrorInnerAlertTriangle = _styled.div.withConfig({
  displayName: "styleds__SwapCallbackErrorInnerAlertTriangle",
  componentId: "sc-11ce2lf-7"
})(["background-color:", ";display:flex;align-items:center;justify-content:center;margin-right:12px;border-radius:12px;min-width:48px;height:48px;"], _ref8 => {
  let {
    theme
  } = _ref8;
  return transparentize(0.9, theme.red1);
});

export function SwapCallbackError(_ref9) {
  let {
    error
  } = _ref9;
  return /*#__PURE__*/_jsxs(SwapCallbackErrorInner, {
    children: [/*#__PURE__*/_jsx(SwapCallbackErrorInnerAlertTriangle, {
      children: /*#__PURE__*/_jsx(AlertTriangle, {
        size: 24
      })
    }), /*#__PURE__*/_jsx("p", {
      style: {
        wordBreak: 'break-word'
      },
      children: error
    })]
  });
}
export const SwapShowAcceptChanges = _styled(AutoColumn).withConfig({
  displayName: "styleds__SwapShowAcceptChanges",
  componentId: "sc-11ce2lf-8"
})(["background-color:", ";color:", ";padding:0.5rem;border-radius:12px;margin-top:8px;"], _ref10 => {
  let {
    theme
  } = _ref10;
  return transparentize(0.95, theme.primary3);
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.primaryText1;
});
export const TransactionDetailsLabel = _styled(ThemedText.Black).withConfig({
  displayName: "styleds__TransactionDetailsLabel",
  componentId: "sc-11ce2lf-9"
})(["border-bottom:1px solid ", ";padding-bottom:0.5rem;"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.bg2;
});
export const ResponsiveTooltipContainer = _styled(TooltipContainer).withConfig({
  displayName: "styleds__ResponsiveTooltipContainer",
  componentId: "sc-11ce2lf-10"
})(["background-color:", ";border:1px solid ", ";padding:1rem;width:", ";", ""], _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.bg0;
}, _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.bg2;
}, _ref15 => {
  let {
    width
  } = _ref15;
  return width !== null && width !== void 0 ? width : 'auto';
}, _ref16 => {
  let {
    theme,
    origin
  } = _ref16;
  return theme.mediaWidth.upToExtraSmall`
    transform: scale(0.8);
    transform-origin: ${origin !== null && origin !== void 0 ? origin : 'top left'};
  `;
});
export const StyledTradePrice = _styled(TradePrice).withConfig({
  displayName: "styleds__StyledTradePrice",
  componentId: "sc-11ce2lf-11"
})(["", ""], loadingOpacityMixin);