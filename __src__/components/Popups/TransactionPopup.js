import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useActiveWeb3React } from "../../hooks/web3";
import { useTransaction } from "../../state/transactions/hooks";
import { ThemedText } from "../../theme";
import { ExternalLink } from "../../theme";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { TransactionSummary } from "../AccountDetails/TransactionSummary";
import { AutoColumn } from "../Column";
import { AutoRow } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const RowNoFlex = _styled(AutoRow).withConfig({
  displayName: "TransactionPopup__RowNoFlex",
  componentId: "sc-13d9pmm-0"
})(["flex-wrap:nowrap;"]);

export default function TransactionPopup(_ref) {
  let {
    hash
  } = _ref;
  const {
    chainId
  } = useActiveWeb3React();
  const tx = useTransaction(hash);
  const theme = useContext(_ThemeContext);
  if (!tx) return null;
  const success = Boolean(tx.receipt && tx.receipt.status === 1);
  return /*#__PURE__*/_jsxs(RowNoFlex, {
    children: [/*#__PURE__*/_jsx("div", {
      style: {
        paddingRight: 16
      },
      children: success ? /*#__PURE__*/_jsx(CheckCircle, {
        color: theme.green1,
        size: 24
      }) : /*#__PURE__*/_jsx(AlertCircle, {
        color: theme.red1,
        size: 24
      })
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "8px",
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        fontWeight: 500,
        children: /*#__PURE__*/_jsx(TransactionSummary, {
          info: tx.info
        })
      }), chainId && /*#__PURE__*/_jsx(ExternalLink, {
        href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
        children: "View on Explorer"
      })]
    })]
  });
}