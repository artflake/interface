import { warningSeverity } from "../../utils/prices";
import { ErrorText } from "./styleds";
/**
 * Formatted version of price impact text with warning colors
 */

import { jsx as _jsx } from "react/jsx-runtime";
export default function FormattedPriceImpact(_ref) {
  let {
    priceImpact
  } = _ref;
  return /*#__PURE__*/_jsx(ErrorText, {
    fontWeight: 500,
    fontSize: 14,
    severity: warningSeverity(priceImpact),
    children: priceImpact ? `${priceImpact.multiply(-1).toFixed(2)}%` : '-'
  });
}