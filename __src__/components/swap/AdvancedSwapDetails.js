import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { TradeType } from '@uniswap/sdk-core';
import { LoadingRows } from "../Loader/styled";
import { useContext, useMemo } from 'react';
import { ThemedText } from "../../theme";
import { computeRealizedLPFeePercent } from "../../utils/prices";
import { AutoColumn } from "../Column";
import { RowBetween, RowFixed } from "../Row";
import FormattedPriceImpact from "./FormattedPriceImpact";
import { TransactionDetailsLabel } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function TextWithLoadingPlaceholder(_ref) {
  let {
    syncing,
    width,
    children
  } = _ref;
  return syncing ? /*#__PURE__*/_jsx(LoadingRows, {
    children: /*#__PURE__*/_jsx("div", {
      style: {
        height: '15px',
        width: `${width}px`
      }
    })
  }) : children;
}

export function AdvancedSwapDetails(_ref2) {
  let {
    trade,
    allowedSlippage,
    syncing = false
  } = _ref2;
  const theme = useContext(_ThemeContext);
  const {
    realizedLPFee,
    priceImpact
  } = useMemo(() => {
    if (!trade) return {
      realizedLPFee: undefined,
      priceImpact: undefined
    };
    const realizedLpFeePercent = computeRealizedLPFeePercent(trade);
    const realizedLPFee = trade.inputAmount.multiply(realizedLpFeePercent);
    const priceImpact = trade.priceImpact.subtract(realizedLpFeePercent);
    return {
      priceImpact,
      realizedLPFee
    };
  }, [trade]);
  return !trade ? null : /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "8px",
    children: [/*#__PURE__*/_jsx(TransactionDetailsLabel, {
      fontWeight: 500,
      fontSize: 14,
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Transaction Details"
      })
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: theme.text1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Liquidity Provider Fee"
          })
        })
      }), /*#__PURE__*/_jsx(TextWithLoadingPlaceholder, {
        syncing: syncing,
        width: 65,
        children: /*#__PURE__*/_jsx(ThemedText.Black, {
          textAlign: "right",
          fontSize: 14,
          children: realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${realizedLPFee.currency.symbol}` : '-'
        })
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: theme.text1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Price Impact"
          })
        })
      }), /*#__PURE__*/_jsx(TextWithLoadingPlaceholder, {
        syncing: syncing,
        width: 50,
        children: /*#__PURE__*/_jsx(ThemedText.Black, {
          textAlign: "right",
          fontSize: 14,
          children: /*#__PURE__*/_jsx(FormattedPriceImpact, {
            priceImpact: priceImpact
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: theme.text1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Allowed Slippage"
          })
        })
      }), /*#__PURE__*/_jsx(TextWithLoadingPlaceholder, {
        syncing: syncing,
        width: 45,
        children: /*#__PURE__*/_jsxs(ThemedText.Black, {
          textAlign: "right",
          fontSize: 14,
          children: [allowedSlippage.toFixed(2), "%"]
        })
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: theme.text1,
          children: trade.tradeType === TradeType.EXACT_INPUT ? /*#__PURE__*/_jsx(Trans, {
            id: "Minimum received"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Maximum sent"
          })
        })
      }), /*#__PURE__*/_jsx(TextWithLoadingPlaceholder, {
        syncing: syncing,
        width: 70,
        children: /*#__PURE__*/_jsx(ThemedText.Black, {
          textAlign: "right",
          fontSize: 14,
          children: trade.tradeType === TradeType.EXACT_INPUT ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}` : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`
        })
      })]
    })]
  });
}