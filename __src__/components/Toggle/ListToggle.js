import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ThemedText } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.button.withConfig({
  displayName: "ListToggle__Wrapper",
  componentId: "sc-1ahjqam-0"
})(["border-radius:20px;border:none;background:", ";display:flex;width:fit-content;cursor:pointer;outline:none;padding:0.4rem 0.4rem;align-items:center;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg1;
});

const ToggleElement = _styled.span.withConfig({
  displayName: "ListToggle__ToggleElement",
  componentId: "sc-1ahjqam-1"
})(["border-radius:50%;height:24px;width:24px;background-color:", ";:hover{opacity:0.8;}"], _ref2 => {
  let {
    isActive,
    bgColor,
    theme
  } = _ref2;
  return isActive ? bgColor : theme.bg4;
});

const StatusText = _styled(ThemedText.Main).withConfig({
  displayName: "ListToggle__StatusText",
  componentId: "sc-1ahjqam-2"
})(["margin:0 10px;width:24px;color:", ";"], _ref3 => {
  let {
    theme,
    isActive
  } = _ref3;
  return isActive ? theme.text1 : theme.text3;
});

export default function ListToggle(_ref4) {
  let {
    id,
    isActive,
    bgColor,
    toggle
  } = _ref4;
  return /*#__PURE__*/_jsxs(Wrapper, {
    id: id,
    isActive: isActive,
    onClick: toggle,
    children: [isActive && /*#__PURE__*/_jsx(StatusText, {
      fontWeight: "600",
      margin: "0 6px",
      isActive: true,
      children: /*#__PURE__*/_jsx(Trans, {
        id: "ON"
      })
    }), /*#__PURE__*/_jsx(ToggleElement, {
      isActive: isActive,
      bgColor: bgColor
    }), !isActive && /*#__PURE__*/_jsx(StatusText, {
      fontWeight: "600",
      margin: "0 6px",
      isActive: false,
      children: /*#__PURE__*/_jsx(Trans, {
        id: "OFF"
      })
    })]
  });
}