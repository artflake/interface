import { Trans } from "@lingui/react";
import { AutoColumn } from 'components/Column';
import StepCounter from 'components/InputStepCounter/InputStepCounter';
import { RowBetween } from 'components/Row';
import { Bound } from 'state/mint/v3/actions'; // currencyA is the base token

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function RangeSelector(_ref) {
  var _ref2, _ref3, _leftPrice$toSignific, _rightPrice$toSignifi;

  let {
    priceLower,
    priceUpper,
    onLeftRangeInput,
    onRightRangeInput,
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
    currencyA,
    currencyB,
    feeAmount,
    ticksAtLimit
  } = _ref;
  const tokenA = (_ref2 = currencyA !== null && currencyA !== void 0 ? currencyA : undefined) === null || _ref2 === void 0 ? void 0 : _ref2.wrapped;
  const tokenB = (_ref3 = currencyB !== null && currencyB !== void 0 ? currencyB : undefined) === null || _ref3 === void 0 ? void 0 : _ref3.wrapped;
  const isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB);
  const leftPrice = isSorted ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert();
  const rightPrice = isSorted ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert();
  return /*#__PURE__*/_jsx(AutoColumn, {
    gap: "md",
    children: /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(StepCounter, {
        value: ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER] ? '0' : (_leftPrice$toSignific = leftPrice === null || leftPrice === void 0 ? void 0 : leftPrice.toSignificant(5)) !== null && _leftPrice$toSignific !== void 0 ? _leftPrice$toSignific : '',
        onUserInput: onLeftRangeInput,
        width: "48%",
        decrement: isSorted ? getDecrementLower : getIncrementUpper,
        increment: isSorted ? getIncrementLower : getDecrementUpper,
        decrementDisabled: ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER],
        incrementDisabled: ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER],
        feeAmount: feeAmount,
        label: leftPrice ? `${currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol}` : '-',
        title: /*#__PURE__*/_jsx(Trans, {
          id: "Min Price"
        }),
        tokenA: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
        tokenB: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
      }), /*#__PURE__*/_jsx(StepCounter, {
        value: ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER] ? '∞' : (_rightPrice$toSignifi = rightPrice === null || rightPrice === void 0 ? void 0 : rightPrice.toSignificant(5)) !== null && _rightPrice$toSignifi !== void 0 ? _rightPrice$toSignifi : '',
        onUserInput: onRightRangeInput,
        width: "48%",
        decrement: isSorted ? getDecrementUpper : getIncrementLower,
        increment: isSorted ? getIncrementUpper : getDecrementLower,
        incrementDisabled: ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER],
        decrementDisabled: ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER],
        feeAmount: feeAmount,
        label: rightPrice ? `${currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol}` : '-',
        tokenA: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
        tokenB: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol,
        title: /*#__PURE__*/_jsx(Trans, {
          id: "Max Price"
        })
      })]
    })
  });
}