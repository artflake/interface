import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { Percent, TradeType } from '@uniswap/sdk-core';
import { Trade as V2Trade } from '@uniswap/v2-sdk';
import Badge from "../Badge";
import { AutoColumn } from "../Column";
import { LoadingRows } from "../Loader/styled";
import RoutingDiagram from "../RoutingDiagram/RoutingDiagram";
import { AutoRow, RowBetween } from "../Row";
import { Version } from "../../hooks/useToggledVersion";
import { memo } from 'react';
import { useRoutingAPIEnabled } from "../../state/user/hooks";
import { ThemedText } from "../../theme";
import { getTradeVersion } from "../../utils/getTradeVersion";
import { AutoRouterLabel, AutoRouterLogo } from "./RouterLabel";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Separator = _styled.div.withConfig({
  displayName: "SwapRoute__Separator",
  componentId: "sc-176vpyh-0"
})(["border-top:1px solid ", ";height:1px;width:100%;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg2;
});

const V2_DEFAULT_FEE_TIER = 3000;
export default /*#__PURE__*/memo(function SwapRoute(_ref2) {
  let {
    trade,
    syncing
  } = _ref2;
  const routingAPIEnabled = useRoutingAPIEnabled();
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "12px",
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsxs(AutoRow, {
        gap: "4px",
        width: "auto",
        children: [/*#__PURE__*/_jsx(AutoRouterLogo, {}), /*#__PURE__*/_jsx(AutoRouterLabel, {})]
      }), syncing ? /*#__PURE__*/_jsx(LoadingRows, {
        children: /*#__PURE__*/_jsx("div", {
          style: {
            width: '30px',
            height: '24px'
          }
        })
      }) : /*#__PURE__*/_jsx(Badge, {
        children: /*#__PURE__*/_jsx(ThemedText.Black, {
          fontSize: 12,
          children: getTradeVersion(trade) === Version.v2 ? /*#__PURE__*/_jsx(Trans, {
            id: "V2"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "V3"
          })
        })
      })]
    }), /*#__PURE__*/_jsx(Separator, {}), syncing ? /*#__PURE__*/_jsx(LoadingRows, {
      children: /*#__PURE__*/_jsx("div", {
        style: {
          width: '400px',
          height: '30px'
        }
      })
    }) : /*#__PURE__*/_jsx(RoutingDiagram, {
      currencyIn: trade.inputAmount.currency,
      currencyOut: trade.outputAmount.currency,
      routes: getTokenPath(trade)
    }), routingAPIEnabled && /*#__PURE__*/_jsx(ThemedText.Main, {
      fontSize: 12,
      width: 400,
      children: /*#__PURE__*/_jsx(Trans, {
        id: "This route optimizes your price by considering split routes, multiple hops, and gas costs."
      })
    })]
  });
});

function getTokenPath(trade) {
  // convert V2 path to a list of routes
  if (trade instanceof V2Trade) {
    const {
      path: tokenPath
    } = trade.route;
    const path = [];

    for (let i = 1; i < tokenPath.length; i++) {
      path.push([tokenPath[i - 1], tokenPath[i], V2_DEFAULT_FEE_TIER]);
    }

    return [{
      percent: new Percent(100, 100),
      path
    }];
  }

  return trade.swaps.map(_ref3 => {
    let {
      route: {
        tokenPath,
        pools
      },
      inputAmount,
      outputAmount
    } = _ref3;
    const portion = trade.tradeType === TradeType.EXACT_INPUT ? inputAmount.divide(trade.inputAmount) : outputAmount.divide(trade.outputAmount);
    const percent = new Percent(portion.numerator, portion.denominator);
    const path = [];

    for (let i = 0; i < pools.length; i++) {
      const nextPool = pools[i];
      const tokenIn = tokenPath[i];
      const tokenOut = tokenPath[i + 1];
      path.push([tokenIn, tokenOut, nextPool.fee]);
    }

    return {
      percent,
      path
    };
  });
}