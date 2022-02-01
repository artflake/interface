import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Badge, { BadgeVariant } from "../Badge";
import { transparentize } from 'polished';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import { useColor } from "../../hooks/useColor";
import { unwrappedToken } from "../../utils/unwrappedToken";
import { ButtonEmpty } from "../Button";
import { LightCard } from "../Card";
import { AutoColumn } from "../Column";
import DoubleCurrencyLogo from "../DoubleLogo";
import { CardNoise } from "../earn/styled";
import { AutoRow, RowFixed } from "../Row";
import { Dots } from "../swap/styleds";
import { FixedHeightRow } from '.';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const StyledPositionCard = _styled(LightCard).withConfig({
  displayName: "Sushi__StyledPositionCard",
  componentId: "sc-8bwr12-0"
})(["border:none;background:", ";position:relative;overflow:hidden;"], _ref => {
  let {
    theme,
    bgColor
  } = _ref;
  return `radial-gradient(91.85% 100% at 1.84% 0%, ${transparentize(0.8, bgColor)} 0%, ${theme.bg3} 100%) `;
});

export default function SushiPositionCard(_ref2) {
  let {
    tokenA,
    tokenB,
    liquidityToken,
    border
  } = _ref2;
  const currency0 = unwrappedToken(tokenA);
  const currency1 = unwrappedToken(tokenB);
  const backgroundColor = useColor(tokenA);
  return /*#__PURE__*/_jsxs(StyledPositionCard, {
    border: border,
    bgColor: backgroundColor,
    children: [/*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(AutoColumn, {
      gap: "12px",
      children: /*#__PURE__*/_jsxs(FixedHeightRow, {
        children: [/*#__PURE__*/_jsxs(AutoRow, {
          gap: "8px",
          children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
            currency0: currency0,
            currency1: currency1,
            size: 20
          }), /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            children: !currency0 || !currency1 ? /*#__PURE__*/_jsx(Dots, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Loading"
              })
            }) : `${currency0.symbol}/${currency1.symbol}`
          }), /*#__PURE__*/_jsx(Badge, {
            variant: BadgeVariant.WARNING,
            children: "Sushi"
          })]
        }), /*#__PURE__*/_jsx(RowFixed, {
          gap: "8px",
          children: /*#__PURE__*/_jsx(ButtonEmpty, {
            padding: "0px 35px 0px 0px",
            $borderRadius: "12px",
            width: "fit-content",
            as: Link,
            to: `/migrate/v2/${liquidityToken.address}`,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Migrate"
            })
          })
        })]
      })
    })]
  });
}