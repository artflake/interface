import _styled from "styled-components";
import { Trans } from "@lingui/react";
import AddressInputPanel from 'components/AddressInputPanel';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import React from 'react';
import { ProposalAction } from './ProposalActionSelector';
import { jsx as _jsx } from "react/jsx-runtime";
var ProposalActionDetailField;

(function (ProposalActionDetailField) {
  ProposalActionDetailField[ProposalActionDetailField["ADDRESS"] = 0] = "ADDRESS";
  ProposalActionDetailField[ProposalActionDetailField["CURRENCY"] = 1] = "CURRENCY";
})(ProposalActionDetailField || (ProposalActionDetailField = {}));

const ProposalActionDetailContainer = _styled.div.withConfig({
  displayName: "ProposalActionDetail__ProposalActionDetailContainer",
  componentId: "sc-13r0ry5-0"
})(["margin-top:10px;display:grid;grid-template-columns:repeat(1,1fr);grid-gap:10px;"]);

export const ProposalActionDetail = _ref => {
  let {
    className,
    proposalAction,
    currency,
    amount,
    toAddress,
    onCurrencySelect,
    onAmountInput,
    onToAddressInput
  } = _ref;
  const proposalActionsData = {
    [ProposalAction.TRANSFER_TOKEN]: [{
      type: ProposalActionDetailField.ADDRESS,
      label: /*#__PURE__*/_jsx(Trans, {
        id: "To"
      })
    }, {
      type: ProposalActionDetailField.CURRENCY
    }],
    [ProposalAction.APPROVE_TOKEN]: [{
      type: ProposalActionDetailField.ADDRESS,
      label: /*#__PURE__*/_jsx(Trans, {
        id: "To"
      })
    }, {
      type: ProposalActionDetailField.CURRENCY
    }]
  };
  return /*#__PURE__*/_jsx(ProposalActionDetailContainer, {
    className: className,
    children: proposalActionsData[proposalAction].map((field, i) => field.type === ProposalActionDetailField.ADDRESS ? /*#__PURE__*/_jsx(AddressInputPanel, {
      label: field.label,
      value: toAddress,
      onChange: onToAddressInput
    }, i) : field.type === ProposalActionDetailField.CURRENCY ? /*#__PURE__*/_jsx(CurrencyInputPanel, {
      value: amount,
      currency: currency,
      onUserInput: amount => onAmountInput(amount),
      onCurrencySelect: currency => onCurrencySelect(currency),
      showMaxButton: false,
      showCommonBases: false,
      showCurrencyAmount: false,
      disableNonToken: true,
      hideBalance: true,
      id: "currency-input"
    }, i) : null)
  });
};