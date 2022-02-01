import { Fraction } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
const CURRENCY_AMOUNT_MIN = new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000000));
export default function FormattedCurrencyAmount(_ref) {
  let {
    currencyAmount,
    significantDigits = 4
  } = _ref;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: currencyAmount.equalTo(JSBI.BigInt(0)) ? '0' : currencyAmount.greaterThan(CURRENCY_AMOUNT_MIN) ? currencyAmount.toSignificant(significantDigits) : `<${CURRENCY_AMOUNT_MIN.toSignificant(1)}`
  });
}