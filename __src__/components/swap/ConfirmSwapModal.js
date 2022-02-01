import { Trans } from "@lingui/react";
import { Trade as V2Trade } from '@uniswap/v2-sdk';
import { Trade as V3Trade } from '@uniswap/v3-sdk';
import { useCallback, useMemo } from 'react';
import TransactionConfirmationModal, { ConfirmationModalContent, TransactionErrorContent } from '../TransactionConfirmationModal';
import SwapModalFooter from './SwapModalFooter';
import SwapModalHeader from './SwapModalHeader';
/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param args either a pair of V2 trades or a pair of V3 trades
 */

import { jsx as _jsx } from "react/jsx-runtime";

function tradeMeaningfullyDiffers() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  const [tradeA, tradeB] = args;
  return tradeA.tradeType !== tradeB.tradeType || !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) || !tradeA.inputAmount.equalTo(tradeB.inputAmount) || !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency) || !tradeA.outputAmount.equalTo(tradeB.outputAmount);
}

export default function ConfirmSwapModal(_ref) {
  var _trade$inputAmount, _trade$inputAmount2, _trade$inputAmount2$c, _trade$outputAmount, _trade$outputAmount2, _trade$outputAmount2$;

  let {
    trade,
    originalTrade,
    onAcceptChanges,
    allowedSlippage,
    onConfirm,
    onDismiss,
    recipient,
    swapErrorMessage,
    isOpen,
    attemptingTxn,
    txHash
  } = _ref;
  const showAcceptChanges = useMemo(() => Boolean(trade instanceof V2Trade && originalTrade instanceof V2Trade && tradeMeaningfullyDiffers(trade, originalTrade) || trade instanceof V3Trade && originalTrade instanceof V3Trade && tradeMeaningfullyDiffers(trade, originalTrade)), [originalTrade, trade]);
  const modalHeader = useCallback(() => {
    return trade ? /*#__PURE__*/_jsx(SwapModalHeader, {
      trade: trade,
      allowedSlippage: allowedSlippage,
      recipient: recipient,
      showAcceptChanges: showAcceptChanges,
      onAcceptChanges: onAcceptChanges
    }) : null;
  }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
  const modalBottom = useCallback(() => {
    return trade ? /*#__PURE__*/_jsx(SwapModalFooter, {
      onConfirm: onConfirm,
      trade: trade,
      disabledConfirm: showAcceptChanges,
      swapErrorMessage: swapErrorMessage
    }) : null;
  }, [onConfirm, showAcceptChanges, swapErrorMessage, trade]); // text to show while loading

  const pendingText = /*#__PURE__*/_jsx(Trans, {
    id: "Swapping {0} {1} for {2} {3}",
    values: {
      0: trade === null || trade === void 0 ? void 0 : (_trade$inputAmount = trade.inputAmount) === null || _trade$inputAmount === void 0 ? void 0 : _trade$inputAmount.toSignificant(6),
      1: trade === null || trade === void 0 ? void 0 : (_trade$inputAmount2 = trade.inputAmount) === null || _trade$inputAmount2 === void 0 ? void 0 : (_trade$inputAmount2$c = _trade$inputAmount2.currency) === null || _trade$inputAmount2$c === void 0 ? void 0 : _trade$inputAmount2$c.symbol,
      2: trade === null || trade === void 0 ? void 0 : (_trade$outputAmount = trade.outputAmount) === null || _trade$outputAmount === void 0 ? void 0 : _trade$outputAmount.toSignificant(6),
      3: trade === null || trade === void 0 ? void 0 : (_trade$outputAmount2 = trade.outputAmount) === null || _trade$outputAmount2 === void 0 ? void 0 : (_trade$outputAmount2$ = _trade$outputAmount2.currency) === null || _trade$outputAmount2$ === void 0 ? void 0 : _trade$outputAmount2$.symbol
    }
  });

  const confirmationContent = useCallback(() => swapErrorMessage ? /*#__PURE__*/_jsx(TransactionErrorContent, {
    onDismiss: onDismiss,
    message: swapErrorMessage
  }) : /*#__PURE__*/_jsx(ConfirmationModalContent, {
    title: /*#__PURE__*/_jsx(Trans, {
      id: "Confirm Swap"
    }),
    onDismiss: onDismiss,
    topContent: modalHeader,
    bottomContent: modalBottom
  }), [onDismiss, modalBottom, modalHeader, swapErrorMessage]);
  return /*#__PURE__*/_jsx(TransactionConfirmationModal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    attemptingTxn: attemptingTxn,
    hash: txHash,
    content: confirmationContent,
    pendingText: pendingText,
    currencyToAdd: trade === null || trade === void 0 ? void 0 : trade.outputAmount.currency
  });
}