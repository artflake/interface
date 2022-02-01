import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonRadioChecked } from 'components/Button';
import { AutoColumn } from 'components/Column';
import React from 'react';
import { ThemedText } from 'theme';
import { FeeTierPercentageBadge } from './FeeTierPercentageBadge';
import { FEE_AMOUNT_DETAIL } from './shared';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ResponsiveText = _styled(ThemedText.Label).withConfig({
  displayName: "FeeOption__ResponsiveText",
  componentId: "sc-1k0cth1-0"
})(["line-height:16px;font-size:14px;", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
    font-size: 12px;
    line-height: 12px;
  `;
});

export function FeeOption(_ref2) {
  let {
    feeAmount,
    active,
    poolState,
    distributions,
    onClick
  } = _ref2;
  return /*#__PURE__*/_jsx(ButtonRadioChecked, {
    active: active,
    onClick: onClick,
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "sm",
      justify: "flex-start",
      children: [/*#__PURE__*/_jsxs(AutoColumn, {
        justify: "flex-start",
        gap: "6px",
        children: [/*#__PURE__*/_jsx(ResponsiveText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0}%",
            values: {
              0: FEE_AMOUNT_DETAIL[feeAmount].label
            }
          })
        }), /*#__PURE__*/_jsx(ThemedText.Main, {
          fontWeight: 400,
          fontSize: "12px",
          textAlign: "left",
          children: FEE_AMOUNT_DETAIL[feeAmount].description
        })]
      }), distributions && /*#__PURE__*/_jsx(FeeTierPercentageBadge, {
        distributions: distributions,
        feeAmount: feeAmount,
        poolState: poolState
      })]
    })
  });
}