import _styled from "styled-components";
import { brushHandleAccentPath, brushHandlePath, OffScreenHandle } from "./svg";
import { brushX, select } from 'd3';
import usePrevious from "../../hooks/usePrevious";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const Handle = _styled.path.withConfig({
  displayName: "Brush__Handle",
  componentId: "sc-1hckctp-0"
})(["cursor:ew-resize;pointer-events:none;stroke-width:3;stroke:", ";fill:", ";"], _ref => {
  let {
    color
  } = _ref;
  return color;
}, _ref2 => {
  let {
    color
  } = _ref2;
  return color;
});

const HandleAccent = _styled.path.withConfig({
  displayName: "Brush__HandleAccent",
  componentId: "sc-1hckctp-1"
})(["cursor:ew-resize;pointer-events:none;stroke-width:1.5;stroke:", ";opacity:0.6;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.white;
});

const LabelGroup = _styled.g.withConfig({
  displayName: "Brush__LabelGroup",
  componentId: "sc-1hckctp-2"
})(["opacity:", ";transition:opacity 300ms;"], _ref4 => {
  let {
    visible
  } = _ref4;
  return visible ? '1' : '0';
});

const TooltipBackground = _styled.rect.withConfig({
  displayName: "Brush__TooltipBackground",
  componentId: "sc-1hckctp-3"
})(["fill:", ";"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg2;
});

const Tooltip = _styled.text.withConfig({
  displayName: "Brush__Tooltip",
  componentId: "sc-1hckctp-4"
})(["text-anchor:middle;font-size:13px;fill:", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.text1;
}); // flips the handles draggers when close to the container edges


const FLIP_HANDLE_THRESHOLD_PX = 20; // margin to prevent tick snapping from putting the brush off screen

const BRUSH_EXTENT_MARGIN_PX = 2;
/**
 * Returns true if every element in `a` maps to the
 * same pixel coordinate as elements in `b`
 */

const compare = (a, b, xScale) => {
  // normalize pixels to 1 decimals
  const aNorm = a.map(x => xScale(x).toFixed(1));
  const bNorm = b.map(x => xScale(x).toFixed(1));
  return aNorm.every((v, i) => v === bNorm[i]);
};

export const Brush = _ref7 => {
  let {
    id,
    xScale,
    interactive,
    brushLabelValue,
    brushExtent,
    setBrushExtent,
    innerWidth,
    innerHeight,
    westHandleColor,
    eastHandleColor
  } = _ref7;
  const brushRef = useRef(null);
  const brushBehavior = useRef(null); // only used to drag the handles on brush for performance

  const [localBrushExtent, setLocalBrushExtent] = useState(brushExtent);
  const [showLabels, setShowLabels] = useState(false);
  const [hovering, setHovering] = useState(false);
  const previousBrushExtent = usePrevious(brushExtent);
  const brushed = useCallback(event => {
    const {
      type,
      selection,
      mode
    } = event;

    if (!selection) {
      setLocalBrushExtent(null);
      return;
    }

    const scaled = selection.map(xScale.invert); // avoid infinite render loop by checking for change

    if (type === 'end' && !compare(brushExtent, scaled, xScale)) {
      setBrushExtent(scaled, mode);
    }

    setLocalBrushExtent(scaled);
  }, [xScale, brushExtent, setBrushExtent]); // keep local and external brush extent in sync
  // i.e. snap to ticks on bruhs end

  useEffect(() => {
    setLocalBrushExtent(brushExtent);
  }, [brushExtent]); // initialize the brush

  useEffect(() => {
    if (!brushRef.current) return;
    brushBehavior.current = brushX().extent([[Math.max(0 + BRUSH_EXTENT_MARGIN_PX, xScale(0)), 0], [innerWidth - BRUSH_EXTENT_MARGIN_PX, innerHeight]]).handleSize(30).filter(() => interactive).on('brush end', brushed);
    brushBehavior.current(select(brushRef.current));

    if (previousBrushExtent && compare(brushExtent, previousBrushExtent, xScale)) {
      select(brushRef.current).transition().call(brushBehavior.current.move, brushExtent.map(xScale));
    } // brush linear gradient


    select(brushRef.current).selectAll('.selection').attr('stroke', 'none').attr('fill-opacity', '0.1').attr('fill', `url(#${id}-gradient-selection)`);
  }, [brushExtent, brushed, id, innerHeight, innerWidth, interactive, previousBrushExtent, xScale]); // respond to xScale changes only

  useEffect(() => {
    if (!brushRef.current || !brushBehavior.current) return;
    brushBehavior.current.move(select(brushRef.current), brushExtent.map(xScale));
  }, [brushExtent, xScale]); // show labels when local brush changes

  useEffect(() => {
    setShowLabels(true);
    const timeout = setTimeout(() => setShowLabels(false), 1500);
    return () => clearTimeout(timeout);
  }, [localBrushExtent]); // variables to help render the SVGs

  const flipWestHandle = localBrushExtent && xScale(localBrushExtent[0]) > FLIP_HANDLE_THRESHOLD_PX;
  const flipEastHandle = localBrushExtent && xScale(localBrushExtent[1]) > innerWidth - FLIP_HANDLE_THRESHOLD_PX;
  const showWestArrow = localBrushExtent && (xScale(localBrushExtent[0]) < 0 || xScale(localBrushExtent[1]) < 0);
  const showEastArrow = localBrushExtent && (xScale(localBrushExtent[0]) > innerWidth || xScale(localBrushExtent[1]) > innerWidth);
  const westHandleInView = localBrushExtent && xScale(localBrushExtent[0]) >= 0 && xScale(localBrushExtent[0]) <= innerWidth;
  const eastHandleInView = localBrushExtent && xScale(localBrushExtent[1]) >= 0 && xScale(localBrushExtent[1]) <= innerWidth;
  return useMemo(() => /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("defs", {
      children: [/*#__PURE__*/_jsxs("linearGradient", {
        id: `${id}-gradient-selection`,
        x1: "0%",
        y1: "100%",
        x2: "100%",
        y2: "100%",
        children: [/*#__PURE__*/_jsx("stop", {
          stopColor: westHandleColor
        }), /*#__PURE__*/_jsx("stop", {
          stopColor: eastHandleColor,
          offset: "1"
        })]
      }), /*#__PURE__*/_jsx("clipPath", {
        id: `${id}-brush-clip`,
        children: /*#__PURE__*/_jsx("rect", {
          x: "0",
          y: "0",
          width: innerWidth,
          height: innerHeight
        })
      })]
    }), /*#__PURE__*/_jsx("g", {
      ref: brushRef,
      clipPath: `url(#${id}-brush-clip)`,
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false)
    }), localBrushExtent && /*#__PURE__*/_jsxs(_Fragment, {
      children: [westHandleInView ? /*#__PURE__*/_jsxs("g", {
        transform: `translate(${Math.max(0, xScale(localBrushExtent[0]))}, 0), scale(${flipWestHandle ? '-1' : '1'}, 1)`,
        children: [/*#__PURE__*/_jsxs("g", {
          children: [/*#__PURE__*/_jsx(Handle, {
            color: westHandleColor,
            d: brushHandlePath(innerHeight)
          }), /*#__PURE__*/_jsx(HandleAccent, {
            d: brushHandleAccentPath()
          })]
        }), /*#__PURE__*/_jsxs(LabelGroup, {
          transform: `translate(50,0), scale(${flipWestHandle ? '1' : '-1'}, 1)`,
          visible: showLabels || hovering,
          children: [/*#__PURE__*/_jsx(TooltipBackground, {
            y: "0",
            x: "-30",
            height: "30",
            width: "60",
            rx: "8"
          }), /*#__PURE__*/_jsx(Tooltip, {
            transform: `scale(-1, 1)`,
            y: "15",
            dominantBaseline: "middle",
            children: brushLabelValue('w', localBrushExtent[0])
          })]
        })]
      }) : null, eastHandleInView ? /*#__PURE__*/_jsxs("g", {
        transform: `translate(${xScale(localBrushExtent[1])}, 0), scale(${flipEastHandle ? '-1' : '1'}, 1)`,
        children: [/*#__PURE__*/_jsxs("g", {
          children: [/*#__PURE__*/_jsx(Handle, {
            color: eastHandleColor,
            d: brushHandlePath(innerHeight)
          }), /*#__PURE__*/_jsx(HandleAccent, {
            d: brushHandleAccentPath()
          })]
        }), /*#__PURE__*/_jsxs(LabelGroup, {
          transform: `translate(50,0), scale(${flipEastHandle ? '-1' : '1'}, 1)`,
          visible: showLabels || hovering,
          children: [/*#__PURE__*/_jsx(TooltipBackground, {
            y: "0",
            x: "-30",
            height: "30",
            width: "60",
            rx: "8"
          }), /*#__PURE__*/_jsx(Tooltip, {
            y: "15",
            dominantBaseline: "middle",
            children: brushLabelValue('e', localBrushExtent[1])
          })]
        })]
      }) : null, showWestArrow && /*#__PURE__*/_jsx(OffScreenHandle, {
        color: westHandleColor
      }), showEastArrow && /*#__PURE__*/_jsx("g", {
        transform: `translate(${innerWidth}, 0) scale(-1, 1)`,
        children: /*#__PURE__*/_jsx(OffScreenHandle, {
          color: eastHandleColor
        })
      })]
    })]
  }), [brushLabelValue, eastHandleColor, eastHandleInView, flipEastHandle, flipWestHandle, hovering, id, innerHeight, innerWidth, localBrushExtent, showEastArrow, showLabels, showWestArrow, westHandleColor, westHandleInView, xScale]);
};