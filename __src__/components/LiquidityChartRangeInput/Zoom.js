import _styled from "styled-components";
import { ButtonGray } from "../Button";
import { select, zoom, zoomIdentity } from 'd3';
import React, { useEffect, useMemo, useRef } from 'react';
import { RefreshCcw, ZoomIn, ZoomOut } from 'react-feather';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "Zoom__Wrapper",
  componentId: "sc-2wmd87-0"
})(["display:grid;grid-template-columns:repeat(", ",1fr);grid-gap:6px;position:absolute;top:-75px;right:0;"], _ref => {
  let {
    count
  } = _ref;
  return count.toString();
});

const Button = _styled(ButtonGray).withConfig({
  displayName: "Zoom__Button",
  componentId: "sc-2wmd87-1"
})(["&:hover{background-color:", ";color:", ";}width:32px;height:32px;padding:4px;"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text1;
});

export const ZoomOverlay = _styled.rect.withConfig({
  displayName: "Zoom__ZoomOverlay",
  componentId: "sc-2wmd87-2"
})(["fill:transparent;cursor:grab;&:active{cursor:grabbing;}"]);
export default function Zoom(_ref4) {
  let {
    svg,
    xScale,
    setZoom,
    width,
    height,
    resetBrush,
    showResetButton,
    zoomLevels
  } = _ref4;
  const zoomBehavior = useRef();
  const [zoomIn, zoomOut, zoomInitial, zoomReset] = useMemo(() => [() => svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleBy, 2), () => svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleBy, 0.5), () => svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleTo, 0.5), () => svg && zoomBehavior.current && select(svg).call(zoomBehavior.current.transform, zoomIdentity.translate(0, 0).scale(1)).transition().call(zoomBehavior.current.scaleTo, 0.5)], [svg]);
  useEffect(() => {
    if (!svg) return;
    zoomBehavior.current = zoom().scaleExtent([zoomLevels.min, zoomLevels.max]).extent([[0, 0], [width, height]]).on('zoom', _ref5 => {
      let {
        transform
      } = _ref5;
      return setZoom(transform);
    });
    select(svg).call(zoomBehavior.current);
  }, [height, width, setZoom, svg, xScale, zoomBehavior, zoomLevels, zoomLevels.max, zoomLevels.min]);
  useEffect(() => {
    // reset zoom to initial on zoomLevel change
    zoomInitial();
  }, [zoomInitial, zoomLevels]);
  return /*#__PURE__*/_jsxs(Wrapper, {
    count: showResetButton ? 3 : 2,
    children: [showResetButton && /*#__PURE__*/_jsx(Button, {
      onClick: () => {
        resetBrush();
        zoomReset();
      },
      disabled: false,
      children: /*#__PURE__*/_jsx(RefreshCcw, {
        size: 16
      })
    }), /*#__PURE__*/_jsx(Button, {
      onClick: zoomIn,
      disabled: false,
      children: /*#__PURE__*/_jsx(ZoomIn, {
        size: 16
      })
    }), /*#__PURE__*/_jsx(Button, {
      onClick: zoomOut,
      disabled: false,
      children: /*#__PURE__*/_jsx(ZoomOut, {
        size: 16
      })
    })]
  });
}