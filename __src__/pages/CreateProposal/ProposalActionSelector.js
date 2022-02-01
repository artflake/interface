import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonDropdown } from "../../components/Button";
import Column from "../../components/Column";
import Modal from "../../components/Modal";
import { RowBetween } from "../../components/Row";
import { MenuItem, PaddedColumn, Separator } from "../../components/SearchModal/styleds";
import React, { useCallback } from 'react';
import { Text } from 'rebass';
import { CloseIcon } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export let ProposalAction;

(function (ProposalAction) {
  ProposalAction["TRANSFER_TOKEN"] = "Transfer Token";
  ProposalAction["APPROVE_TOKEN"] = "Approve Token";
})(ProposalAction || (ProposalAction = {}));

const ContentWrapper = _styled(Column).withConfig({
  displayName: "ProposalActionSelector__ContentWrapper",
  componentId: "sc-144yti9-0"
})(["width:100%;flex:1 1;position:relative;"]);

const ActionSelectorHeader = _styled.div.withConfig({
  displayName: "ProposalActionSelector__ActionSelectorHeader",
  componentId: "sc-144yti9-1"
})(["font-size:14px;font-weight:500;color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const ActionDropdown = _styled(ButtonDropdown).withConfig({
  displayName: "ProposalActionSelector__ActionDropdown",
  componentId: "sc-144yti9-2"
})(["padding:0px;background-color:transparent;color:", ";font-size:1.25rem;:hover,:active,:focus{outline:0px;box-shadow:none;background-color:transparent;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text1;
});

const ProposalActionSelectorFlex = _styled.div.withConfig({
  displayName: "ProposalActionSelector__ProposalActionSelectorFlex",
  componentId: "sc-144yti9-3"
})(["margin-top:10px;display:flex;flex-flow:column nowrap;border-radius:20px;border:1px solid ", ";background-color:", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg2;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg1;
});

const ProposalActionSelectorContainer = _styled.div.withConfig({
  displayName: "ProposalActionSelector__ProposalActionSelectorContainer",
  componentId: "sc-144yti9-4"
})(["flex:1;padding:1rem;display:grid;grid-auto-rows:auto;grid-row-gap:10px;"]);

export const ProposalActionSelector = _ref5 => {
  let {
    className,
    onClick,
    proposalAction
  } = _ref5;
  return /*#__PURE__*/_jsx(ProposalActionSelectorFlex, {
    children: /*#__PURE__*/_jsxs(ProposalActionSelectorContainer, {
      className: className,
      children: [/*#__PURE__*/_jsx(ActionSelectorHeader, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Proposed Action"
        })
      }), /*#__PURE__*/_jsx(ActionDropdown, {
        onClick: onClick,
        children: proposalAction
      })]
    })
  });
};
export function ProposalActionSelectorModal(_ref6) {
  let {
    isOpen,
    onDismiss,
    onProposalActionSelect
  } = _ref6;
  const handleProposalActionSelect = useCallback(proposalAction => {
    onProposalActionSelect(proposalAction);
    onDismiss();
  }, [onDismiss, onProposalActionSelect]);
  return /*#__PURE__*/_jsx(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    children: /*#__PURE__*/_jsxs(ContentWrapper, {
      children: [/*#__PURE__*/_jsx(PaddedColumn, {
        gap: "16px",
        children: /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 16,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Select an action"
            })
          }), /*#__PURE__*/_jsx(CloseIcon, {
            onClick: onDismiss
          })]
        })
      }), /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsx(MenuItem, {
        onClick: () => handleProposalActionSelect(ProposalAction.TRANSFER_TOKEN),
        children: /*#__PURE__*/_jsx(Column, {
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Transfer Token"
            })
          })
        })
      }), /*#__PURE__*/_jsx(MenuItem, {
        onClick: () => handleProposalActionSelect(ProposalAction.APPROVE_TOKEN),
        children: /*#__PURE__*/_jsx(Column, {
          children: /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Approve Token"
            })
          })
        })
      })]
    })
  });
}