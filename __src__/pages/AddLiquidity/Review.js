import _styled from "styled-components";
import { AutoColumn } from "../../components/Column";
import { PositionPreview } from "../../components/PositionPreview";
import { jsx as _jsx } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "Review__Wrapper",
  componentId: "sc-ldnzki-0"
})(["padding-top:12px;"]);

export function Review(_ref) {
  let {
    position,
    outOfRange,
    ticksAtLimit
  } = _ref;
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsx(AutoColumn, {
      gap: "lg",
      children: position ? /*#__PURE__*/_jsx(PositionPreview, {
        position: position,
        inRange: !outOfRange,
        ticksAtLimit: ticksAtLimit,
        title: 'Selected Range'
      }) : null
    })
  });
}