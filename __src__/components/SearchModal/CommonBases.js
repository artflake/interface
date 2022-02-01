import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { AutoColumn } from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import QuestionHelper from 'components/QuestionHelper';
import { AutoRow } from 'components/Row';
import { COMMON_BASES } from 'constants/routing';
import { useTokenInfoFromActiveList } from 'hooks/useTokenInfoFromActiveList';
import { Text } from 'rebass';
import { currencyId } from 'utils/currencyId';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const MobileWrapper = _styled(AutoColumn).withConfig({
  displayName: "CommonBases__MobileWrapper",
  componentId: "sc-jm24e0-0"
})(["", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
    display: none;
  `;
});

const BaseWrapper = _styled.div.withConfig({
  displayName: "CommonBases__BaseWrapper",
  componentId: "sc-jm24e0-1"
})(["border:1px solid ", ";border-radius:10px;display:flex;padding:6px;align-items:center;:hover{cursor:", ";background-color:", ";}color:", ";background-color:", ";filter:", ";"], _ref2 => {
  let {
    theme,
    disable
  } = _ref2;
  return disable ? 'transparent' : theme.bg3;
}, _ref3 => {
  let {
    disable
  } = _ref3;
  return !disable && 'pointer';
}, _ref4 => {
  let {
    theme,
    disable
  } = _ref4;
  return !disable && theme.bg2;
}, _ref5 => {
  let {
    theme,
    disable
  } = _ref5;
  return disable && theme.text3;
}, _ref6 => {
  let {
    theme,
    disable
  } = _ref6;
  return disable && theme.bg3;
}, _ref7 => {
  let {
    disable
  } = _ref7;
  return disable && 'grayscale(1)';
});

export default function CommonBases(_ref8) {
  var _COMMON_BASES$chainId;

  let {
    chainId,
    onSelect,
    selectedCurrency
  } = _ref8;
  const bases = typeof chainId !== 'undefined' ? (_COMMON_BASES$chainId = COMMON_BASES[chainId]) !== null && _COMMON_BASES$chainId !== void 0 ? _COMMON_BASES$chainId : [] : [];
  return bases.length > 0 ? /*#__PURE__*/_jsxs(MobileWrapper, {
    gap: "md",
    children: [/*#__PURE__*/_jsxs(AutoRow, {
      children: [/*#__PURE__*/_jsx(Text, {
        fontWeight: 500,
        fontSize: 14,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Common bases"
        })
      }), /*#__PURE__*/_jsx(QuestionHelper, {
        text: /*#__PURE__*/_jsx(Trans, {
          id: "These tokens are commonly paired with other tokens."
        })
      })]
    }), /*#__PURE__*/_jsx(AutoRow, {
      gap: "4px",
      children: bases.map(currency => {
        const isSelected = selectedCurrency === null || selectedCurrency === void 0 ? void 0 : selectedCurrency.equals(currency);
        return /*#__PURE__*/_jsxs(BaseWrapper, {
          onClick: () => !isSelected && onSelect(currency),
          disable: isSelected,
          children: [/*#__PURE__*/_jsx(CurrencyLogoFromList, {
            currency: currency
          }), /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 16,
            children: currency.symbol
          })]
        }, currencyId(currency));
      })
    })]
  }) : null;
}
/** helper component to retrieve a base currency from the active token lists */

function CurrencyLogoFromList(_ref9) {
  let {
    currency
  } = _ref9;
  const token = useTokenInfoFromActiveList(currency);
  return /*#__PURE__*/_jsx(CurrencyLogo, {
    currency: token,
    style: {
      marginRight: 8
    }
  });
}