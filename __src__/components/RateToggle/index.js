import { Trans } from "@lingui/react";
import { ToggleElement, ToggleWrapper } from "../Toggle/MultiToggle"; // the order of displayed base currencies from left to right is always in sort order
// currencyA is treated as the preferred base currency

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function RateToggle(_ref) {
  let {
    currencyA,
    currencyB,
    handleRateToggle
  } = _ref;
  const tokenA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
  const tokenB = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped;
  const isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB);
  return tokenA && tokenB ? /*#__PURE__*/_jsx("div", {
    style: {
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center'
    },
    onClick: handleRateToggle,
    children: /*#__PURE__*/_jsxs(ToggleWrapper, {
      width: "fit-content",
      children: [/*#__PURE__*/_jsx(ToggleElement, {
        isActive: isSorted,
        fontSize: "12px",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0}",
          values: {
            0: isSorted ? currencyA.symbol : currencyB.symbol
          }
        })
      }), /*#__PURE__*/_jsx(ToggleElement, {
        isActive: !isSorted,
        fontSize: "12px",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0}",
          values: {
            0: isSorted ? currencyB.symbol : currencyA.symbol
          }
        })
      })]
    })
  }) : null;
}