import { max, scaleLinear } from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Bound } from "../../state/mint/v3/actions";
import { Area } from "./Area";
import { AxisBottom } from "./AxisBottom";
import { Brush } from "./Brush";
import { Line } from "./Line";
import Zoom, { ZoomOverlay } from "./Zoom";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export const xAccessor = d => d.price0;
export const yAccessor = d => d.activeLiquidity;
export function Chart(_ref) {
  let {
    id = 'liquidityChartRangeInput',
    data: {
      series,
      current
    },
    ticksAtLimit,
    styles,
    dimensions: {
      width,
      height
    },
    margins,
    interactive = true,
    brushDomain,
    brushLabels,
    onBrushDomainChange,
    zoomLevels
  } = _ref;
  const zoomRef = useRef(null);
  const [zoom, setZoom] = useState(null);
  const [innerHeight, innerWidth] = useMemo(() => [height - margins.top - margins.bottom, width - margins.left - margins.right], [width, height, margins]);
  const {
    xScale,
    yScale
  } = useMemo(() => {
    const scales = {
      xScale: scaleLinear().domain([current * zoomLevels.initialMin, current * zoomLevels.initialMax]).range([0, innerWidth]),
      yScale: scaleLinear().domain([0, max(series, yAccessor)]).range([innerHeight, 0])
    };

    if (zoom) {
      const newXscale = zoom.rescaleX(scales.xScale);
      scales.xScale.domain(newXscale.domain());
    }

    return scales;
  }, [current, zoomLevels.initialMin, zoomLevels.initialMax, innerWidth, series, innerHeight, zoom]);
  useEffect(() => {
    // reset zoom as necessary
    setZoom(null);
  }, [zoomLevels]);
  useEffect(() => {
    if (!brushDomain) {
      onBrushDomainChange(xScale.domain(), undefined);
    }
  }, [brushDomain, onBrushDomainChange, xScale]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Zoom, {
      svg: zoomRef.current,
      xScale: xScale,
      setZoom: setZoom,
      width: innerWidth,
      height: // allow zooming inside the x-axis
      height,
      resetBrush: () => {
        onBrushDomainChange([current * zoomLevels.initialMin, current * zoomLevels.initialMax], 'reset');
      },
      showResetButton: Boolean(ticksAtLimit[Bound.LOWER] || ticksAtLimit[Bound.UPPER]),
      zoomLevels: zoomLevels
    }), /*#__PURE__*/_jsxs("svg", {
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${width} ${height}`,
      style: {
        overflow: 'visible'
      },
      children: [/*#__PURE__*/_jsxs("defs", {
        children: [/*#__PURE__*/_jsx("clipPath", {
          id: `${id}-chart-clip`,
          children: /*#__PURE__*/_jsx("rect", {
            x: "0",
            y: "0",
            width: innerWidth,
            height: height
          })
        }), brushDomain &&
        /*#__PURE__*/
        // mask to highlight selected area
        _jsx("mask", {
          id: `${id}-chart-area-mask`,
          children: /*#__PURE__*/_jsx("rect", {
            fill: "white",
            x: xScale(brushDomain[0]),
            y: "0",
            width: xScale(brushDomain[1]) - xScale(brushDomain[0]),
            height: innerHeight
          })
        })]
      }), /*#__PURE__*/_jsxs("g", {
        transform: `translate(${margins.left},${margins.top})`,
        children: [/*#__PURE__*/_jsxs("g", {
          clipPath: `url(#${id}-chart-clip)`,
          children: [/*#__PURE__*/_jsx(Area, {
            series: series,
            xScale: xScale,
            yScale: yScale,
            xValue: xAccessor,
            yValue: yAccessor
          }), brushDomain &&
          /*#__PURE__*/
          // duplicate area chart with mask for selected area
          _jsx("g", {
            mask: `url(#${id}-chart-area-mask)`,
            children: /*#__PURE__*/_jsx(Area, {
              series: series,
              xScale: xScale,
              yScale: yScale,
              xValue: xAccessor,
              yValue: yAccessor,
              fill: styles.area.selection
            })
          }), /*#__PURE__*/_jsx(Line, {
            value: current,
            xScale: xScale,
            innerHeight: innerHeight
          }), /*#__PURE__*/_jsx(AxisBottom, {
            xScale: xScale,
            innerHeight: innerHeight
          })]
        }), /*#__PURE__*/_jsx(ZoomOverlay, {
          width: innerWidth,
          height: height,
          ref: zoomRef
        }), /*#__PURE__*/_jsx(Brush, {
          id: id,
          xScale: xScale,
          interactive: interactive,
          brushLabelValue: brushLabels,
          brushExtent: brushDomain !== null && brushDomain !== void 0 ? brushDomain : xScale.domain(),
          innerWidth: innerWidth,
          innerHeight: innerHeight,
          setBrushExtent: onBrushDomainChange,
          westHandleColor: styles.brush.handle.west,
          eastHandleColor: styles.brush.handle.east
        })]
      })]
    })]
  });
}