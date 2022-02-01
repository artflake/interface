import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from "../../components/Button";
import { AutoColumn } from "../../components/Column";
import Modal from "../../components/Modal";
import { LoadingView, SubmittedView } from "../../components/ModalViews";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import { ExternalLink, ThemedText } from "../../theme";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const ProposalSubmissionModal = _ref => {
  let {
    isOpen,
    hash,
    onDismiss
  } = _ref;
  const theme = useContext(_ThemeContext);
  return /*#__PURE__*/_jsx(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    children: !hash ? /*#__PURE__*/_jsx(LoadingView, {
      onDismiss: onDismiss,
      children: /*#__PURE__*/_jsx(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Submitting Proposal"
          })
        })
      })
    }) : /*#__PURE__*/_jsx(SubmittedView, {
      onDismiss: onDismiss,
      hash: hash,
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          textAlign: "center",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Proposal Submitted"
          })
        }), hash && /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(1, hash, ExplorerDataType.TRANSACTION),
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 14,
            color: theme.primary1,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View on Etherscan"
            })
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          as: Link,
          to: "/vote",
          onClick: onDismiss,
          style: {
            margin: '20px 0 0 0'
          },
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Return"
            })
          })
        })]
      })
    })
  });
};