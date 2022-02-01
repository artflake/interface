import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ThemedText } from '../../theme';
import { RowBetween, RowFixed } from '../Row';
import SettingsTab from '../Settings';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const StyledSwapHeader = _styled.div.withConfig({
  displayName: "SwapHeader__StyledSwapHeader",
  componentId: "sc-jhay2b-0"
})(["padding:1rem 1.25rem 0.5rem 1.25rem;width:100%;color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

export default function SwapHeader(_ref2) {
  let {
    allowedSlippage
  } = _ref2;
  return /*#__PURE__*/_jsx(StyledSwapHeader, {
    children: /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(ThemedText.Black, {
          fontWeight: 500,
          fontSize: 16,
          style: {
            marginRight: '8px'
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Swap"
          })
        })
      }), /*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(SettingsTab, {
          placeholderSlippage: allowedSlippage
        })
      })]
    })
  });
}