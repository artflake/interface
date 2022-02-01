import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { ResizingTextArea, TextInput } from 'components/TextInput';
import React, { memo } from 'react';
import { Text } from 'rebass';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ProposalEditorHeader = _styled(Text).withConfig({
  displayName: "ProposalEditor__ProposalEditorHeader",
  componentId: "sc-1bp9aty-0"
})(["font-size:14px;font-weight:500;color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const ProposalTitle = /*#__PURE__*/memo(_styled(TextInput).withConfig({
  displayName: "ProposalEditor__ProposalTitle",
  componentId: "sc-1bp9aty-1"
})(["margin-top:10.5px;margin-bottom:7.5px;"]));

const ProposalEditorContainer = _styled.div.withConfig({
  displayName: "ProposalEditor__ProposalEditorContainer",
  componentId: "sc-1bp9aty-2"
})(["margin-top:10px;padding:0.75rem 1rem 0.75rem 1rem;border-radius:20px;border:1px solid ", ";background-color:", ";"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg1;
});

export const ProposalEditor = _ref4 => {
  let {
    className,
    title,
    body,
    onTitleInput,
    onBodyInput
  } = _ref4;
  const bodyPlaceholder = `## Summary

Insert your summary here

## Methodology
  
Insert your methodology here

## Conclusion
  
Insert your conclusion here
  
  `;
  return /*#__PURE__*/_jsxs(ProposalEditorContainer, {
    className: className,
    children: [/*#__PURE__*/_jsx(ProposalEditorHeader, {
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Proposal"
      })
    }), /*#__PURE__*/_jsx(ProposalTitle, {
      value: title,
      onUserInput: onTitleInput,
      placeholder:
      /*i18n*/
      i18n._("Proposal Title"),
      fontSize: "1.25rem"
    }), /*#__PURE__*/_jsx("hr", {}), /*#__PURE__*/_jsx(ResizingTextArea, {
      value: body,
      onUserInput: onBodyInput,
      placeholder: bodyPlaceholder,
      fontSize: "1rem"
    })]
  });
};