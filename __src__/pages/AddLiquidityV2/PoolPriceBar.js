import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { useContext } from 'react';
import { Text } from 'rebass';
import { AutoColumn } from '../../components/Column';
import { AutoRow } from '../../components/Row';
import { ONE_BIPS } from '../../constants/misc';
import { Field } from '../../state/mint/actions';
import { ThemedText } from '../../theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PoolPriceBar(_ref) {
  var _price$toSignificant, _currencies$Field$CUR, _currencies$Field$CUR2, _price$invert$toSigni, _price$invert, _currencies$Field$CUR3, _currencies$Field$CUR4, _ref2;

  let {
    currencies,
    noLiquidity,
    poolTokenPercentage,
    price
  } = _ref;
  const theme = useContext(_ThemeContext);
  return /*#__PURE__*/_jsx(AutoColumn, {
    gap: "md",
    children: /*#__PURE__*/_jsxs(AutoRow, {
      justify: "space-around",
      gap: "4px",
      children: [/*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        children: [/*#__PURE__*/_jsx(ThemedText.Black, {
          children: (_price$toSignificant = price === null || price === void 0 ? void 0 : price.toSignificant(6)) !== null && _price$toSignificant !== void 0 ? _price$toSignificant : '-'
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 14,
          color: theme.text2,
          pt: 1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0} per {1}",
            values: {
              0: (_currencies$Field$CUR = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol,
              1: (_currencies$Field$CUR2 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol
            }
          })
        })]
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        children: [/*#__PURE__*/_jsx(ThemedText.Black, {
          children: (_price$invert$toSigni = price === null || price === void 0 ? void 0 : (_price$invert = price.invert()) === null || _price$invert === void 0 ? void 0 : _price$invert.toSignificant(6)) !== null && _price$invert$toSigni !== void 0 ? _price$invert$toSigni : '-'
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 14,
          color: theme.text2,
          pt: 1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0} per {1}",
            values: {
              0: (_currencies$Field$CUR3 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol,
              1: (_currencies$Field$CUR4 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol
            }
          })
        })]
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        children: [/*#__PURE__*/_jsxs(ThemedText.Black, {
          children: [noLiquidity && price ? '100' : (_ref2 = poolTokenPercentage !== null && poolTokenPercentage !== void 0 && poolTokenPercentage.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage === null || poolTokenPercentage === void 0 ? void 0 : poolTokenPercentage.toFixed(2)) !== null && _ref2 !== void 0 ? _ref2 : '0', "%"]
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 14,
          color: theme.text2,
          pt: 1,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Share of Pool"
          })
        })]
      })]
    })
  });
}