import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonOutlined } from "../Button";
import { AutoRow } from "../Row";
import React from 'react';
import ReactGA from 'react-ga';
import { ThemedText } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";

const Button = _styled(ButtonOutlined).attrs(() => ({
  padding: '8px',
  $borderRadius: '8px'
})).withConfig({
  displayName: "PresetsButtons__Button",
  componentId: "sc-ko0mcr-0"
})(["color:", ";flex:1;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
});

export default function PresetsButtons(_ref2) {
  let {
    setFullRange
  } = _ref2;
  return /*#__PURE__*/_jsx(AutoRow, {
    gap: "4px",
    width: "auto",
    children: /*#__PURE__*/_jsx(Button, {
      onClick: () => {
        setFullRange();
        ReactGA.event({
          category: 'Liquidity',
          action: 'Full Range Clicked'
        });
      },
      children: /*#__PURE__*/_jsx(ThemedText.Body, {
        fontSize: 12,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Full Range"
        })
      })
    })
  });
}