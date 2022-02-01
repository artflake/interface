import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import useUSDCPrice from 'hooks/useUSDCPrice';
import { useCallback, useContext } from 'react';
import { Text } from 'rebass';
import { ThemedText } from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const StyledPriceContainer = _styled.button.withConfig({
  displayName: "TradePrice__StyledPriceContainer",
  componentId: "sc-19ug97y-0"
})(["align-items:center;background-color:transparent;border:none;cursor:pointer;display:grid;height:24px;justify-content:center;padding:0;grid-template-columns:1fr auto;grid-gap:0.25rem;"]);

export default function TradePrice(_ref) {
  var _price$quoteCurrency, _price$baseCurrency, _price$baseCurrency2, _price$quoteCurrency2, _ref2;

  let {
    price,
    showInverted,
    setShowInverted
  } = _ref;
  const theme = useContext(_ThemeContext);
  const usdcPrice = useUSDCPrice(showInverted ? price.baseCurrency : price.quoteCurrency);
  let formattedPrice;

  try {
    var _price$invert;

    formattedPrice = showInverted ? price.toSignificant(4) : (_price$invert = price.invert()) === null || _price$invert === void 0 ? void 0 : _price$invert.toSignificant(4);
  } catch (error) {
    formattedPrice = '0';
  }

  const label = showInverted ? `${(_price$quoteCurrency = price.quoteCurrency) === null || _price$quoteCurrency === void 0 ? void 0 : _price$quoteCurrency.symbol}` : `${(_price$baseCurrency = price.baseCurrency) === null || _price$baseCurrency === void 0 ? void 0 : _price$baseCurrency.symbol} `;
  const labelInverted = showInverted ? `${(_price$baseCurrency2 = price.baseCurrency) === null || _price$baseCurrency2 === void 0 ? void 0 : _price$baseCurrency2.symbol} ` : `${(_price$quoteCurrency2 = price.quoteCurrency) === null || _price$quoteCurrency2 === void 0 ? void 0 : _price$quoteCurrency2.symbol}`;
  const flipPrice = useCallback(() => setShowInverted(!showInverted), [setShowInverted, showInverted]);
  const text = `${(_ref2 = '1 ' + labelInverted + ' = ' + formattedPrice) !== null && _ref2 !== void 0 ? _ref2 : '-'} ${label}`;
  return /*#__PURE__*/_jsxs(StyledPriceContainer, {
    onClick: flipPrice,
    title: text,
    children: [/*#__PURE__*/_jsx(Text, {
      fontWeight: 500,
      fontSize: 14,
      color: theme.text1,
      children: text
    }), ' ', usdcPrice && /*#__PURE__*/_jsx(ThemedText.DarkGray, {
      children: /*#__PURE__*/_jsx(Trans, {
        id: "(${0})",
        values: {
          0: usdcPrice.toSignificant(6, {
            groupSeparator: ','
          })
        }
      })
    })]
  });
}