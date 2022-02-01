import _styled from "styled-components";
import { Trans } from "@lingui/react";
import React from 'react';
import { CheckCircle, Copy } from 'react-feather';
import useCopyClipboard from '../../hooks/useCopyClipboard';
import { LinkStyledButton } from '../../theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const CopyIcon = _styled(LinkStyledButton).withConfig({
  displayName: "Copy__CopyIcon",
  componentId: "sc-jaq3xr-0"
})(["color:", ";flex-shrink:0;display:flex;text-decoration:none;font-size:0.825rem;:hover,:active,:focus{text-decoration:none;color:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text3;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text2;
});

const TransactionStatusText = _styled.span.withConfig({
  displayName: "Copy__TransactionStatusText",
  componentId: "sc-jaq3xr-1"
})(["margin-left:0.25rem;font-size:0.825rem;", ";align-items:center;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.flexRowNoWrap;
});

export default function CopyHelper(props) {
  const [isCopied, setCopied] = useCopyClipboard();
  return /*#__PURE__*/_jsxs(CopyIcon, {
    onClick: () => setCopied(props.toCopy),
    children: [isCopied ? /*#__PURE__*/_jsxs(TransactionStatusText, {
      children: [/*#__PURE__*/_jsx(CheckCircle, {
        size: '16'
      }), /*#__PURE__*/_jsx(TransactionStatusText, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Copied"
        })
      })]
    }) : /*#__PURE__*/_jsx(TransactionStatusText, {
      children: /*#__PURE__*/_jsx(Copy, {
        size: '16'
      })
    }), isCopied ? '' : props.children]
  });
}