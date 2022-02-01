import _styled from "styled-components";
import { Trans } from "@lingui/react";
import PositionListItem from "../PositionListItem";
import React from 'react';
import { MEDIA_WIDTHS } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const DesktopHeader = _styled.div.withConfig({
  displayName: "PositionList__DesktopHeader",
  componentId: "sc-15gvr73-0"
})(["display:none;font-size:14px;font-weight:500;padding:8px;@media screen and (min-width:", "px){align-items:center;display:flex;display:grid;grid-template-columns:1fr 1fr;& > div:last-child{text-align:right;margin-right:12px;}}"], MEDIA_WIDTHS.upToSmall);

const MobileHeader = _styled.div.withConfig({
  displayName: "PositionList__MobileHeader",
  componentId: "sc-15gvr73-1"
})(["font-weight:medium;font-size:16px;font-weight:500;padding:8px;@media screen and (min-width:", "px){display:none;}"], MEDIA_WIDTHS.upToSmall);

export default function PositionList(_ref) {
  let {
    positions
  } = _ref;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(DesktopHeader, {
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Trans, {
          id: "Your positions"
        }), positions && ' (' + positions.length + ')']
      }), /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Status"
        })
      })]
    }), /*#__PURE__*/_jsx(MobileHeader, {
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Your positions"
      })
    }), positions.map(p => {
      return /*#__PURE__*/_jsx(PositionListItem, {
        positionDetails: p
      }, p.tokenId.toString());
    })]
  });
}