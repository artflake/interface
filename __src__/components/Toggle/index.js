import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { darken } from 'polished';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ToggleElement = _styled.span.withConfig({
  displayName: "Toggle__ToggleElement",
  componentId: "sc-1poje5t-0"
})(["padding:0.25rem 0.6rem;border-radius:9px;background:", ";color:", ";font-size:14px;font-weight:", ";:hover{user-select:", ";background:", ";color:", ";}"], _ref => {
  let {
    theme,
    isActive,
    isOnSwitch
  } = _ref;
  return isActive ? isOnSwitch ? theme.primary1 : theme.bg4 : 'none';
}, _ref2 => {
  let {
    theme,
    isActive
  } = _ref2;
  return isActive ? theme.white : theme.text2;
}, _ref3 => {
  let {
    isOnSwitch
  } = _ref3;
  return isOnSwitch ? '500' : '400';
}, _ref4 => {
  let {
    isOnSwitch
  } = _ref4;
  return isOnSwitch ? 'none' : 'initial';
}, _ref5 => {
  let {
    theme,
    isActive,
    isOnSwitch
  } = _ref5;
  return isActive ? isOnSwitch ? darken(0.05, theme.primary1) : darken(0.05, theme.bg4) : 'none';
}, _ref6 => {
  let {
    theme,
    isActive,
    isOnSwitch
  } = _ref6;
  return isActive ? isOnSwitch ? theme.white : theme.white : theme.text3;
});

const StyledToggle = _styled.button.withConfig({
  displayName: "Toggle__StyledToggle",
  componentId: "sc-1poje5t-1"
})(["border-radius:12px;border:none;background:", ";display:flex;width:fit-content;cursor:pointer;outline:none;padding:2px;"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg0;
});

export default function Toggle(_ref8) {
  let {
    id,
    isActive,
    toggle,
    checked = /*#__PURE__*/_jsx(Trans, {
      id: "On"
    }),
    unchecked = /*#__PURE__*/_jsx(Trans, {
      id: "Off"
    })
  } = _ref8;
  return /*#__PURE__*/_jsxs(StyledToggle, {
    id: id,
    isActive: isActive,
    onClick: toggle,
    children: [/*#__PURE__*/_jsx(ToggleElement, {
      isActive: isActive,
      isOnSwitch: true,
      children: checked
    }), /*#__PURE__*/_jsx(ToggleElement, {
      isActive: !isActive,
      isOnSwitch: false,
      children: unchecked
    })]
  });
}