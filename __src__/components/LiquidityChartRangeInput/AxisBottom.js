import _styled from "styled-components";
import { axisBottom, select } from 'd3';
import React, { useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const StyledGroup = _styled.g.withConfig({
  displayName: "AxisBottom__StyledGroup",
  componentId: "sc-1t7rife-0"
})(["line{display:none;}text{color:", ";transform:translateY(5px);}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const Axis = _ref2 => {
  let {
    axisGenerator
  } = _ref2;

  const axisRef = axis => {
    axis && select(axis).call(axisGenerator).call(g => g.select('.domain').remove());
  };

  return /*#__PURE__*/_jsx("g", {
    ref: axisRef
  });
};

export const AxisBottom = _ref3 => {
  let {
    xScale,
    innerHeight,
    offset = 0
  } = _ref3;
  return useMemo(() => /*#__PURE__*/_jsx(StyledGroup, {
    transform: `translate(0, ${innerHeight + offset})`,
    children: /*#__PURE__*/_jsx(Axis, {
      axisGenerator: axisBottom(xScale).ticks(6)
    })
  }), [innerHeight, offset, xScale]);
};