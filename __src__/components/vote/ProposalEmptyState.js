import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { L2_CHAIN_IDS } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import { ThemedText } from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const EmptyProposals = _styled.div.withConfig({
  displayName: "ProposalEmptyState__EmptyProposals",
  componentId: "sc-s6ucod-0"
})(["border:1px solid ", ";padding:16px 12px;border-radius:12px;display:flex;flex-direction:column;justify-content:center;align-items:center;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text4;
});

const Sub = _styled.i.withConfig({
  displayName: "ProposalEmptyState__Sub",
  componentId: "sc-s6ucod-1"
})(["align-items:center;display:flex;justify-content:center;text-align:center;"]);

const EmptyState = _ref2 => {
  let {
    HeaderContent,
    SubHeaderContent
  } = _ref2;
  return /*#__PURE__*/_jsxs(EmptyProposals, {
    children: [/*#__PURE__*/_jsx(ThemedText.Body, {
      style: {
        marginBottom: '8px'
      },
      children: /*#__PURE__*/_jsx(HeaderContent, {})
    }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
      children: /*#__PURE__*/_jsx(Sub, {
        children: /*#__PURE__*/_jsx(SubHeaderContent, {})
      })
    })]
  });
};

export default function ProposalEmptyState() {
  const {
    chainId
  } = useActiveWeb3React();

  if (chainId && L2_CHAIN_IDS.includes(chainId)) {
    return /*#__PURE__*/_jsx(EmptyState, {
      HeaderContent: () => /*#__PURE__*/_jsx(Trans, {
        id: "Please connect to Layer 1 Ethereum"
      }),
      SubHeaderContent: () => /*#__PURE__*/_jsx(Trans, {
        id: "Uniswap governance is only available on Layer 1. Switch your network to Ethereum Mainnet to view Proposals and Vote."
      })
    });
  }

  return /*#__PURE__*/_jsx(EmptyState, {
    HeaderContent: () => /*#__PURE__*/_jsx(Trans, {
      id: "No proposals found."
    }),
    SubHeaderContent: () => /*#__PURE__*/_jsx(Trans, {
      id: "Proposals submitted by community members will appear here."
    })
  });
}