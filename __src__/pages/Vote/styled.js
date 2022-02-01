import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ProposalState } from '../../state/governance/hooks';
import { jsx as _jsx } from "react/jsx-runtime";

const handleColorType = (status, theme) => {
  switch (status) {
    case ProposalState.PENDING:
    case ProposalState.ACTIVE:
      return theme.blue1;

    case ProposalState.SUCCEEDED:
    case ProposalState.EXECUTED:
      return theme.green1;

    case ProposalState.DEFEATED:
      return theme.red1;

    case ProposalState.QUEUED:
    case ProposalState.CANCELED:
    case ProposalState.EXPIRED:
    default:
      return theme.text3;
  }
};

function StatusText(_ref) {
  let {
    status
  } = _ref;

  switch (status) {
    case ProposalState.PENDING:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Pending"
      });

    case ProposalState.ACTIVE:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Active"
      });

    case ProposalState.SUCCEEDED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Succeeded"
      });

    case ProposalState.EXECUTED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Executed"
      });

    case ProposalState.DEFEATED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Defeated"
      });

    case ProposalState.QUEUED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Queued"
      });

    case ProposalState.CANCELED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Canceled"
      });

    case ProposalState.EXPIRED:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Expired"
      });

    default:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Undetermined"
      });
  }
}

const StyledProposalContainer = _styled.span.withConfig({
  displayName: "styled__StyledProposalContainer",
  componentId: "sc-1z0b5a1-0"
})(["font-size:0.825rem;font-weight:600;padding:0.5rem;border-radius:8px;color:", ";border:1px solid ", ";width:fit-content;justify-self:flex-end;text-transform:uppercase;flex:0 0 100px;text-align:center;"], _ref2 => {
  let {
    status,
    theme
  } = _ref2;
  return handleColorType(status, theme);
}, _ref3 => {
  let {
    status,
    theme
  } = _ref3;
  return handleColorType(status, theme);
});

export function ProposalStatus(_ref4) {
  let {
    status
  } = _ref4;
  return /*#__PURE__*/_jsx(StyledProposalContainer, {
    status: status,
    children: /*#__PURE__*/_jsx(StatusText, {
      status: status
    })
  });
}