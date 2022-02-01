import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import useTheme from 'hooks/useTheme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "AnimatedConfirmation__Wrapper",
  componentId: "sc-o25mq5-0"
})(["height:90px;width:90px;"]);

const dash = _keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;
const dashCheck = _keyframes`
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
`;

const Circle = _styled.circle.withConfig({
  displayName: "AnimatedConfirmation__Circle",
  componentId: "sc-o25mq5-1"
})(["stroke-dasharray:1000;stroke-dashoffset:0;-webkit-animation:", " 0.9s ease-in-out;animation:", " 0.9s ease-in-out;"], dash, dash);

const PolyLine = _styled.polyline.withConfig({
  displayName: "AnimatedConfirmation__PolyLine",
  componentId: "sc-o25mq5-2"
})(["stroke-dasharray:1000;stroke-dashoffset:0;stroke-dashoffset:-100;-webkit-animation:", " 0.9s 0.35s ease-in-out forwards;animation:", " 0.9s 0.35s ease-in-out forwards;"], dashCheck, dashCheck);

export default function AnimatedConfirmation() {
  const theme = useTheme();
  return /*#__PURE__*/_jsx(Wrapper, {
    className: "w4rAnimated_checkmark",
    children: /*#__PURE__*/_jsxs("svg", {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 130.2 130.2",
      children: [/*#__PURE__*/_jsx(Circle, {
        className: "path circle",
        fill: "none",
        stroke: theme.green1,
        strokeWidth: "6",
        strokeMiterlimit: "10",
        cx: "65.1",
        cy: "65.1",
        r: "62.1"
      }), /*#__PURE__*/_jsx(PolyLine, {
        className: "path check",
        fill: "none",
        stroke: theme.green1,
        strokeWidth: "6",
        strokeLinecap: "round",
        strokeMiterlimit: "10",
        points: "100.2,40.2 51.5,88.8 29.8,67.5 "
      })]
    })
  });
}