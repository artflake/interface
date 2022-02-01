import _styled from "styled-components";
import { CheckCircle, Triangle } from 'react-feather';
import { useActiveWeb3React } from "../../hooks/web3";
import { useAllTransactions } from "../../state/transactions/hooks";
import { ExternalLink } from "../../theme";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import Loader from "../Loader";
import { RowFixed } from "../Row";
import { TransactionSummary } from "./TransactionSummary";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const TransactionStatusText = _styled.div.withConfig({
  displayName: "Transaction__TransactionStatusText",
  componentId: "sc-1epcs64-0"
})(["margin-right:0.5rem;display:flex;align-items:center;:hover{text-decoration:underline;}"]);

const TransactionState = _styled(ExternalLink).withConfig({
  displayName: "Transaction__TransactionState",
  componentId: "sc-1epcs64-1"
})(["display:flex;justify-content:space-between;align-items:center;text-decoration:none !important;border-radius:0.5rem;padding:0.25rem 0rem;font-weight:500;font-size:0.825rem;color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.primary1;
});

const IconWrapper = _styled.div.withConfig({
  displayName: "Transaction__IconWrapper",
  componentId: "sc-1epcs64-2"
})(["color:", ";"], _ref2 => {
  let {
    pending,
    success,
    theme
  } = _ref2;
  return pending ? theme.primary1 : success ? theme.green1 : theme.red1;
});

export default function Transaction(_ref3) {
  var _tx$receipt, _tx$receipt2;

  let {
    hash
  } = _ref3;
  const {
    chainId
  } = useActiveWeb3React();
  const allTransactions = useAllTransactions();
  const tx = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions[hash];
  const info = tx === null || tx === void 0 ? void 0 : tx.info;
  const pending = !(tx !== null && tx !== void 0 && tx.receipt);
  const success = !pending && tx && (((_tx$receipt = tx.receipt) === null || _tx$receipt === void 0 ? void 0 : _tx$receipt.status) === 1 || typeof ((_tx$receipt2 = tx.receipt) === null || _tx$receipt2 === void 0 ? void 0 : _tx$receipt2.status) === 'undefined');
  if (!chainId) return null;
  return /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsxs(TransactionState, {
      href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
      pending: pending,
      success: success,
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsxs(TransactionStatusText, {
          children: [/*#__PURE__*/_jsx(TransactionSummary, {
            info: info
          }), " \u2197"]
        })
      }), /*#__PURE__*/_jsx(IconWrapper, {
        pending: pending,
        success: success,
        children: pending ? /*#__PURE__*/_jsx(Loader, {}) : success ? /*#__PURE__*/_jsx(CheckCircle, {
          size: "16"
        }) : /*#__PURE__*/_jsx(Triangle, {
          size: "16"
        })
      })]
    })
  });
}