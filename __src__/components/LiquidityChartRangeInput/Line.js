import _styled from "styled-components";
import React, { useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const StyledLine = _styled.line.withConfig({
  displayName: "Line__StyledLine",
  componentId: "sc-1ppgf2d-0"
})(["opacity:0.5;stroke-width:2;stroke:", ";fill:none;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
});

export const Line = _ref2 => {
  let {
    value,
    xScale,
    innerHeight
  } = _ref2;
  return useMemo(() => /*#__PURE__*/_jsx(StyledLine, {
    x1: xScale(value),
    y1: "0",
    x2: xScale(value),
    y2: innerHeight
  }), [value, xScale, innerHeight]);
};