import _styled from "styled-components";
import { area, curveStepAfter } from 'd3';
import React, { useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const Path = _styled.path.withConfig({
  displayName: "Area__Path",
  componentId: "sc-112grg1-0"
})(["opacity:0.5;stroke:", ";fill:", ";"], _ref => {
  let {
    fill,
    theme
  } = _ref;
  return fill !== null && fill !== void 0 ? fill : theme.blue2;
}, _ref2 => {
  let {
    fill,
    theme
  } = _ref2;
  return fill !== null && fill !== void 0 ? fill : theme.blue2;
});

export const Area = _ref3 => {
  let {
    series,
    xScale,
    yScale,
    xValue,
    yValue,
    fill
  } = _ref3;
  return useMemo(() => {
    var _area$curve$x$y1$y;

    return /*#__PURE__*/_jsx(Path, {
      fill: fill,
      d: (_area$curve$x$y1$y = area().curve(curveStepAfter).x(d => xScale(xValue(d))).y1(d => yScale(yValue(d))).y0(yScale(0))(series.filter(d => {
        const value = xScale(xValue(d));
        return value > 0 && value <= window.innerWidth;
      }))) !== null && _area$curve$x$y1$y !== void 0 ? _area$curve$x$y1$y : undefined
    });
  }, [fill, series, xScale, xValue, yScale, yValue]);
};