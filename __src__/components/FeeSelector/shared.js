import { Trans } from "@lingui/react";
import { FeeAmount } from '@uniswap/v3-sdk';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';
import { jsx as _jsx } from "react/jsx-runtime";
export const FEE_AMOUNT_DETAIL = {
  [FeeAmount.LOWEST]: {
    label: '0.01',
    description: /*#__PURE__*/_jsx(Trans, {
      id: "Best for very stable pairs."
    }),
    supportedChains: [SupportedChainId.MAINNET]
  },
  [FeeAmount.LOW]: {
    label: '0.05',
    description: /*#__PURE__*/_jsx(Trans, {
      id: "Best for stable pairs."
    }),
    supportedChains: ALL_SUPPORTED_CHAIN_IDS
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: /*#__PURE__*/_jsx(Trans, {
      id: "Best for most pairs."
    }),
    supportedChains: ALL_SUPPORTED_CHAIN_IDS
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: /*#__PURE__*/_jsx(Trans, {
      id: "Best for exotic pairs."
    }),
    supportedChains: ALL_SUPPORTED_CHAIN_IDS
  }
};