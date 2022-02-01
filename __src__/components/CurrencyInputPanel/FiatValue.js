import { Trans } from "@lingui/react";
import HoverInlineText from 'components/HoverInlineText';
import { useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { ThemedText } from '../../theme';
import { warningSeverity } from '../../utils/prices';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function FiatValue(_ref) {
  let {
    fiatValue,
    priceImpact
  } = _ref;
  const theme = useTheme();
  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined;
    if (priceImpact.lessThan('0')) return theme.green1;
    const severity = warningSeverity(priceImpact);
    if (severity < 1) return theme.text3;
    if (severity < 3) return theme.yellow1;
    return theme.red1;
  }, [priceImpact, theme.green1, theme.red1, theme.text3, theme.yellow1]);
  return /*#__PURE__*/_jsxs(ThemedText.Body, {
    fontSize: 14,
    color: fiatValue ? theme.text2 : theme.text4,
    children: [fiatValue ? /*#__PURE__*/_jsx(Trans, {
      id: "~$ <0/>",
      components: {
        0: /*#__PURE__*/_jsx(HoverInlineText, {
          text: fiatValue === null || fiatValue === void 0 ? void 0 : fiatValue.toSignificant(6, {
            groupSeparator: ','
          })
        })
      }
    }) : '', priceImpact ? /*#__PURE__*/_jsxs("span", {
      style: {
        color: priceImpactColor
      },
      children: [' ', "(", /*#__PURE__*/_jsx(Trans, {
        id: "{0}%",
        values: {
          0: priceImpact.multiply(-1).toSignificant(3)
        }
      }), ")"]
    }) : null]
  });
}