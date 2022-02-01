import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import { jsx as _jsx } from "react/jsx-runtime";
const rotate = _keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSVG = _styled.svg.withConfig({
  displayName: "Loader__StyledSVG",
  componentId: "sc-x3cipg-0"
})(["animation:2s ", " linear infinite;height:", ";width:", ";path{stroke:", ";}"], rotate, _ref => {
  let {
    size
  } = _ref;
  return size;
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size;
}, _ref3 => {
  let {
    stroke,
    theme
  } = _ref3;
  return stroke !== null && stroke !== void 0 ? stroke : theme.primary1;
});
/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */


export default function Loader(_ref4) {
  let {
    size = '16px',
    stroke,
    ...rest
  } = _ref4;
  return /*#__PURE__*/_jsx(StyledSVG, {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    size: size,
    stroke: stroke,
    ...rest,
    children: /*#__PURE__*/_jsx("path", {
      d: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
}