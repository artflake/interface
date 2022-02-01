import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { defaultAbiCoder } from '@ethersproject/abi';
import { getAddress, isAddress } from '@ethersproject/address';
import { ButtonError } from 'components/Button';
import { BlueCard } from 'components/Card';
import { AutoColumn } from 'components/Column';
import { useActiveWeb3React } from 'hooks/web3';
import JSBI from 'jsbi';
import { Wrapper } from 'pages/Pool/styleds';
import React, { useCallback, useMemo, useState } from 'react';
import { ProposalState, useCreateProposalCallback, useLatestProposalId, useProposalData, useProposalThreshold, useUserVotes } from 'state/governance/hooks';
import { tryParseAmount } from 'state/swap/hooks';
import { ExternalLink, ThemedText } from 'theme';
import { CreateProposalTabs } from '../../components/NavigationTabs';
import { UNI } from '../../constants/tokens';
import AppBody from '../AppBody';
import { ProposalActionDetail } from './ProposalActionDetail';
import { ProposalAction, ProposalActionSelector, ProposalActionSelectorModal } from './ProposalActionSelector';
import { ProposalEditor } from './ProposalEditor';
import { ProposalSubmissionModal } from './ProposalSubmissionModal';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const CreateProposalButton = _ref => {
  let {
    proposalThreshold,
    hasActiveOrPendingProposal,
    hasEnoughVote,
    isFormInvalid,
    handleCreateProposal
  } = _ref;
  const formattedProposalThreshold = proposalThreshold ? JSBI.divide(proposalThreshold.quotient, JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(proposalThreshold.currency.decimals))).toLocaleString() : undefined;
  return /*#__PURE__*/_jsx(ButtonError, {
    style: {
      marginTop: '18px'
    },
    error: hasActiveOrPendingProposal || !hasEnoughVote,
    disabled: isFormInvalid || hasActiveOrPendingProposal || !hasEnoughVote,
    onClick: handleCreateProposal,
    children: hasActiveOrPendingProposal ? /*#__PURE__*/_jsx(Trans, {
      id: "You already have an active or pending proposal"
    }) : !hasEnoughVote ? /*#__PURE__*/_jsx(_Fragment, {
      children: formattedProposalThreshold ? /*#__PURE__*/_jsx(Trans, {
        id: "You must have {formattedProposalThreshold} votes to submit a proposal",
        values: {
          formattedProposalThreshold: formattedProposalThreshold
        }
      }) : /*#__PURE__*/_jsx(Trans, {
        id: "You don't have enough votes to submit a proposal"
      })
    }) : /*#__PURE__*/_jsx(Trans, {
      id: "Create Proposal"
    })
  });
};

const CreateProposalWrapper = _styled(Wrapper).withConfig({
  displayName: "CreateProposal__CreateProposalWrapper",
  componentId: "sc-38qcfg-0"
})(["display:flex;flex-flow:column wrap;"]);

const AutonomousProposalCTA = _styled.div.withConfig({
  displayName: "CreateProposal__AutonomousProposalCTA",
  componentId: "sc-38qcfg-1"
})(["text-align:center;margin-top:10px;"]);

export default function CreateProposal() {
  var _useLatestProposalId;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const latestProposalId = (_useLatestProposalId = useLatestProposalId(account !== null && account !== void 0 ? account : undefined)) !== null && _useLatestProposalId !== void 0 ? _useLatestProposalId : '0'; // the first argument below should be the index of the latest governor

  const latestProposalData = useProposalData(
  /* governorIndex */
  2, latestProposalId);
  const {
    votes: availableVotes
  } = useUserVotes();
  const proposalThreshold = useProposalThreshold();
  const [modalOpen, setModalOpen] = useState(false);
  const [hash, setHash] = useState();
  const [attempting, setAttempting] = useState(false);
  const [proposalAction, setProposalAction] = useState(ProposalAction.TRANSFER_TOKEN);
  const [toAddressValue, setToAddressValue] = useState('');
  const [currencyValue, setCurrencyValue] = useState(UNI[chainId !== null && chainId !== void 0 ? chainId : 1]);
  const [amountValue, setAmountValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const handleActionSelectorClick = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleActionChange = useCallback(proposalAction => {
    setProposalAction(proposalAction);
  }, [setProposalAction]);
  const handleDismissActionSelector = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const handleDismissSubmissionModal = useCallback(() => {
    setHash(undefined);
    setAttempting(false);
  }, [setHash, setAttempting]);
  const handleToAddressInput = useCallback(toAddress => {
    setToAddressValue(toAddress);
  }, [setToAddressValue]);
  const handleCurrencySelect = useCallback(currency => {
    setCurrencyValue(currency);
  }, [setCurrencyValue]);
  const handleAmountInput = useCallback(amount => {
    setAmountValue(amount);
  }, [setAmountValue]);
  const handleTitleInput = useCallback(title => {
    setTitleValue(title);
  }, [setTitleValue]);
  const handleBodyInput = useCallback(body => {
    setBodyValue(body);
  }, [setBodyValue]);
  const isFormInvalid = useMemo(() => Boolean(!proposalAction || !isAddress(toAddressValue) || !(currencyValue !== null && currencyValue !== void 0 && currencyValue.isToken) || amountValue === '' || titleValue === '' || bodyValue === ''), [proposalAction, toAddressValue, currencyValue, amountValue, titleValue, bodyValue]);
  const hasEnoughVote = Boolean(availableVotes && proposalThreshold && JSBI.greaterThanOrEqual(availableVotes.quotient, proposalThreshold.quotient));
  const createProposalCallback = useCreateProposalCallback();

  const handleCreateProposal = async () => {
    var _createProposalCallba;

    setAttempting(true);
    const createProposalData = {};
    if (!createProposalCallback || !proposalAction || !currencyValue.isToken) return;
    const tokenAmount = tryParseAmount(amountValue, currencyValue);
    if (!tokenAmount) return;
    createProposalData.targets = [currencyValue.address];
    createProposalData.values = ['0'];
    createProposalData.description = `# ${titleValue}

${bodyValue}
`;
    let types;
    let values;

    switch (proposalAction) {
      case ProposalAction.TRANSFER_TOKEN:
        {
          types = [['address', 'uint256']];
          values = [[getAddress(toAddressValue), tokenAmount.quotient.toString()]];
          createProposalData.signatures = [`transfer(${types[0].join(',')})`];
          break;
        }

      case ProposalAction.APPROVE_TOKEN:
        {
          types = [['address', 'uint256']];
          values = [[getAddress(toAddressValue), tokenAmount.quotient.toString()]];
          createProposalData.signatures = [`approve(${types[0].join(',')})`];
          break;
        }
    }

    createProposalData.calldatas = [];

    for (let i = 0; i < createProposalData.signatures.length; i++) {
      createProposalData.calldatas[i] = defaultAbiCoder.encode(types[i], values[i]);
    }

    const hash = await ((_createProposalCallba = createProposalCallback(createProposalData !== null && createProposalData !== void 0 ? createProposalData : undefined)) === null || _createProposalCallba === void 0 ? void 0 : _createProposalCallba.catch(() => {
      setAttempting(false);
    }));
    if (hash) setHash(hash);
  };

  return /*#__PURE__*/_jsxs(AppBody, {
    maxWidth: '800px',
    children: [/*#__PURE__*/_jsx(CreateProposalTabs, {}), /*#__PURE__*/_jsxs(CreateProposalWrapper, {
      children: [/*#__PURE__*/_jsx(BlueCard, {
        children: /*#__PURE__*/_jsx(AutoColumn, {
          gap: "10px",
          children: /*#__PURE__*/_jsx(ThemedText.Link, {
            fontWeight: 400,
            color: 'primaryText1',
            children: /*#__PURE__*/_jsx(Trans, {
              id: "<0>Tip:</0> Select an action and describe your proposal for the community. The proposal cannot be modified after submission, so please verify all information before submitting. The voting period will begin immediately and last for 7 days. To propose a custom action, <1>read the docs</1>.",
              components: {
                0: /*#__PURE__*/_jsx("strong", {}),
                1: /*#__PURE__*/_jsx(ExternalLink, {
                  href: "https://uniswap.org/docs/v2/governance/governance-reference/#propose"
                })
              }
            })
          })
        })
      }), /*#__PURE__*/_jsx(ProposalActionSelector, {
        onClick: handleActionSelectorClick,
        proposalAction: proposalAction
      }), /*#__PURE__*/_jsx(ProposalActionDetail, {
        proposalAction: proposalAction,
        currency: currencyValue,
        amount: amountValue,
        toAddress: toAddressValue,
        onCurrencySelect: handleCurrencySelect,
        onAmountInput: handleAmountInput,
        onToAddressInput: handleToAddressInput
      }), /*#__PURE__*/_jsx(ProposalEditor, {
        title: titleValue,
        body: bodyValue,
        onTitleInput: handleTitleInput,
        onBodyInput: handleBodyInput
      }), /*#__PURE__*/_jsx(CreateProposalButton, {
        proposalThreshold: proposalThreshold,
        hasActiveOrPendingProposal: (latestProposalData === null || latestProposalData === void 0 ? void 0 : latestProposalData.status) === ProposalState.ACTIVE || (latestProposalData === null || latestProposalData === void 0 ? void 0 : latestProposalData.status) === ProposalState.PENDING,
        hasEnoughVote: hasEnoughVote,
        isFormInvalid: isFormInvalid,
        handleCreateProposal: handleCreateProposal
      }), !hasEnoughVote ? /*#__PURE__*/_jsxs(AutonomousProposalCTA, {
        children: ["Don\u2019t have 2.5M votes? Anyone can create an autonomous proposal using", ' ', /*#__PURE__*/_jsx(ExternalLink, {
          href: "https://fish.vote",
          children: "fish.vote"
        })]
      }) : null]
    }), /*#__PURE__*/_jsx(ProposalActionSelectorModal, {
      isOpen: modalOpen,
      onDismiss: handleDismissActionSelector,
      onProposalActionSelect: proposalAction => handleActionChange(proposalAction)
    }), /*#__PURE__*/_jsx(ProposalSubmissionModal, {
      isOpen: attempting,
      hash: hash,
      onDismiss: handleDismissSubmissionModal
    })]
  });
}