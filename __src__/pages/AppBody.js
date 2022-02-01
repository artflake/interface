import _styled from "styled-components";
import React from 'react';
import { Z_INDEX } from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";
export const BodyWrapper = _styled.main.withConfig({
  displayName: "AppBody__BodyWrapper",
  componentId: "sc-ebxalf-0"
})(["position:relative;margin-top:", ";max-width:", ";width:100%;background:", ";box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);border-radius:24px;margin-top:1rem;margin-left:auto;margin-right:auto;z-index:", ";"], _ref => {
  let {
    margin
  } = _ref;
  return margin !== null && margin !== void 0 ? margin : '0px';
}, _ref2 => {
  let {
    maxWidth
  } = _ref2;
  return maxWidth !== null && maxWidth !== void 0 ? maxWidth : '480px';
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg0;
}, Z_INDEX.deprecated_content);
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */

export default function AppBody(_ref4) {
  let {
    children,
    ...rest
  } = _ref4;
  return /*#__PURE__*/_jsx(BodyWrapper, { ...rest,
    children: children
  });
}