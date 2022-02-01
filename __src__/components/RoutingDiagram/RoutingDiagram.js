import _styled from "styled-components";
import Badge from "../Badge";
import CurrencyLogo from "../CurrencyLogo";
import DoubleCurrencyLogo from "../DoubleLogo";
import Row, { AutoRow } from "../Row";
import { useTokenInfoFromActiveList } from "../../hooks/useTokenInfoFromActiveList";
import { Box } from 'rebass';
import { ThemedText } from "../../theme";
import { ReactComponent as DotLine } from "../../assets/svg/dot_line.svg";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled(Box).withConfig({
  displayName: "RoutingDiagram__Wrapper",
  componentId: "sc-o1ook0-0"
})(["align-items:center;background-color:", ";width:400px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg0;
});

const RouteContainerRow = _styled(Row).withConfig({
  displayName: "RoutingDiagram__RouteContainerRow",
  componentId: "sc-o1ook0-1"
})(["display:grid;grid-gap:8px;grid-template-columns:24px 1fr 24px;"]);

const RouteRow = _styled(Row).withConfig({
  displayName: "RoutingDiagram__RouteRow",
  componentId: "sc-o1ook0-2"
})(["align-items:center;display:flex;justify-content:center;padding:0.1rem 0.5rem;position:relative;"]);

const PoolBadge = _styled(Badge).withConfig({
  displayName: "RoutingDiagram__PoolBadge",
  componentId: "sc-o1ook0-3"
})(["display:flex;padding:0.25rem 0.5rem;"]);

const DottedLine = _styled.div.withConfig({
  displayName: "RoutingDiagram__DottedLine",
  componentId: "sc-o1ook0-4"
})(["display:flex;align-items:center;position:absolute;width:calc(100%);z-index:1;opacity:0.5;"]);

const DotColor = _styled(DotLine).withConfig({
  displayName: "RoutingDiagram__DotColor",
  componentId: "sc-o1ook0-5"
})(["path{stroke:", ";}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg4;
});

const OpaqueBadge = _styled(Badge).withConfig({
  displayName: "RoutingDiagram__OpaqueBadge",
  componentId: "sc-o1ook0-6"
})(["background-color:", ";z-index:2;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg2;
});

export default function RoutingDiagram(_ref4) {
  let {
    currencyIn,
    currencyOut,
    routes
  } = _ref4;
  const tokenIn = useTokenInfoFromActiveList(currencyIn);
  const tokenOut = useTokenInfoFromActiveList(currencyOut);
  return /*#__PURE__*/_jsx(Wrapper, {
    children: routes.map((_ref5, index) => {
      let {
        percent,
        path
      } = _ref5;
      return /*#__PURE__*/_jsxs(RouteContainerRow, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          currency: tokenIn
        }), /*#__PURE__*/_jsx(Route, {
          percent: percent,
          path: path
        }), /*#__PURE__*/_jsx(CurrencyLogo, {
          currency: tokenOut
        })]
      }, index);
    })
  });
}

function Route(_ref6) {
  let {
    percent,
    path
  } = _ref6;
  return /*#__PURE__*/_jsxs(RouteRow, {
    children: [/*#__PURE__*/_jsx(DottedLine, {
      children: /*#__PURE__*/_jsx(DotColor, {})
    }), /*#__PURE__*/_jsx(OpaqueBadge, {
      children: /*#__PURE__*/_jsxs(ThemedText.Small, {
        fontSize: 12,
        style: {
          wordBreak: 'normal'
        },
        children: [percent.toSignificant(2), "%"]
      })
    }), /*#__PURE__*/_jsx(AutoRow, {
      gap: "1px",
      width: "100%",
      style: {
        justifyContent: 'space-evenly',
        zIndex: 2
      },
      children: path.map((_ref7, index) => {
        let [currency0, currency1, feeAmount] = _ref7;
        return /*#__PURE__*/_jsx(Pool, {
          currency0: currency0,
          currency1: currency1,
          feeAmount: feeAmount
        }, index);
      })
    })]
  });
}

function Pool(_ref8) {
  let {
    currency0,
    currency1,
    feeAmount
  } = _ref8;
  const tokenInfo0 = useTokenInfoFromActiveList(currency0);
  const tokenInfo1 = useTokenInfoFromActiveList(currency1);
  return /*#__PURE__*/_jsxs(PoolBadge, {
    children: [/*#__PURE__*/_jsx(Box, {
      margin: "0 5px 0 10px",
      children: /*#__PURE__*/_jsx(DoubleCurrencyLogo, {
        currency0: tokenInfo1,
        currency1: tokenInfo0,
        size: 20
      })
    }), /*#__PURE__*/_jsxs(ThemedText.Small, {
      fontSize: 12,
      children: [feeAmount / 10000, "%"]
    })]
  });
}