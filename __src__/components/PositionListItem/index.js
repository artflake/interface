import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { Percent } from '@uniswap/sdk-core';
import { Position } from '@uniswap/v3-sdk';
import Badge from 'components/Badge';
import RangeBadge from 'components/Badge/RangeBadge';
import DoubleCurrencyLogo from 'components/DoubleLogo';
import HoverInlineText from 'components/HoverInlineText';
import Loader from 'components/Loader';
import { RowBetween } from 'components/Row';
import { useToken } from 'hooks/Tokens';
import useIsTickAtLimit from 'hooks/useIsTickAtLimit';
import { usePool } from 'hooks/usePools';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bound } from 'state/mint/v3/actions';
import { HideSmall, MEDIA_WIDTHS, SmallOnly } from 'theme';
import { formatTickPrice } from 'utils/formatTickPrice';
import { unwrappedToken } from 'utils/unwrappedToken';
import { DAI, USDC, USDT, WBTC, WETH9_EXTENDED } from '../../constants/tokens';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const LinkRow = _styled(Link).withConfig({
  displayName: "PositionListItem__LinkRow",
  componentId: "sc-1bp9uni-0"
})(["align-items:center;border-radius:20px;display:flex;cursor:pointer;user-select:none;display:flex;flex-direction:column;justify-content:space-between;color:", ";margin:8px 0;padding:16px;text-decoration:none;font-weight:500;background-color:", ";&:last-of-type{margin:8px 0 0 0;}& > div:not(:first-child){text-align:center;}:hover{background-color:", ";}@media screen and (min-width:", "px){}", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg2;
}, MEDIA_WIDTHS.upToSmall, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    flex-direction: column;
    row-gap: 12px;
  `;
});

const BadgeText = _styled.div.withConfig({
  displayName: "PositionListItem__BadgeText",
  componentId: "sc-1bp9uni-1"
})(["font-weight:500;font-size:14px;", ";"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToSmall`
    font-size: 12px;
  `;
});

const DataLineItem = _styled.div.withConfig({
  displayName: "PositionListItem__DataLineItem",
  componentId: "sc-1bp9uni-2"
})(["font-size:14px;"]);

const RangeLineItem = _styled(DataLineItem).withConfig({
  displayName: "PositionListItem__RangeLineItem",
  componentId: "sc-1bp9uni-3"
})(["display:flex;flex-direction:row;align-items:center;margin-top:4px;width:100%;", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
  background-color: ${_ref7 => {
    let {
      theme
    } = _ref7;
    return theme.bg2;
  }};
    border-radius: 12px;
    padding: 8px 0;
`;
});

const DoubleArrow = _styled.span.withConfig({
  displayName: "PositionListItem__DoubleArrow",
  componentId: "sc-1bp9uni-4"
})(["margin:0 2px;color:", ";", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.text3;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.mediaWidth.upToSmall`
    margin: 4px;
    padding: 20px;
  `;
});

const RangeText = _styled.span.withConfig({
  displayName: "PositionListItem__RangeText",
  componentId: "sc-1bp9uni-5"
})(["padding:0.25rem 0.5rem;border-radius:8px;"]);

const ExtentsText = _styled.span.withConfig({
  displayName: "PositionListItem__ExtentsText",
  componentId: "sc-1bp9uni-6"
})(["color:", ";font-size:14px;margin-right:4px;", ";"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.text3;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.mediaWidth.upToSmall`
    display: none;
  `;
});

const PrimaryPositionIdData = _styled.div.withConfig({
  displayName: "PositionListItem__PrimaryPositionIdData",
  componentId: "sc-1bp9uni-7"
})(["display:flex;flex-direction:row;align-items:center;> *{margin-right:8px;}"]);

const DataText = _styled.div.withConfig({
  displayName: "PositionListItem__DataText",
  componentId: "sc-1bp9uni-8"
})(["font-weight:600;font-size:18px;", ";"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.mediaWidth.upToSmall`
    font-size: 14px;
  `;
});

export function getPriceOrderingFromPositionForUI(position) {
  if (!position) {
    return {};
  }

  const token0 = position.amount0.currency;
  const token1 = position.amount1.currency; // if token0 is a dollar-stable asset, set it as the quote token

  const stables = [DAI, USDC, USDT];

  if (stables.some(stable => stable.equals(token0))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  } // if token1 is an ETH-/BTC-stable asset, set it as the base token


  const bases = [...Object.values(WETH9_EXTENDED), WBTC];

  if (bases.some(base => base.equals(token1))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  } // if both prices are below 1, invert


  if (position.token0PriceUpper.lessThan(1)) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  } // otherwise, just return the default


  return {
    priceLower: position.token0PriceLower,
    priceUpper: position.token0PriceUpper,
    quote: token1,
    base: token0
  };
}
export default function PositionListItem(_ref13) {
  var _currencyBase$symbol;

  let {
    positionDetails
  } = _ref13;
  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper
  } = positionDetails;
  const token0 = useToken(token0Address);
  const token1 = useToken(token1Address);
  const currency0 = token0 ? unwrappedToken(token0) : undefined;
  const currency1 = token1 ? unwrappedToken(token1) : undefined; // construct Position from details returned

  const [, pool] = usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, feeAmount);
  const position = useMemo(() => {
    if (pool) {
      return new Position({
        pool,
        liquidity: liquidity.toString(),
        tickLower,
        tickUpper
      });
    }

    return undefined;
  }, [liquidity, pool, tickLower, tickUpper]);
  const tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper); // prices

  const {
    priceLower,
    priceUpper,
    quote,
    base
  } = getPriceOrderingFromPositionForUI(position);
  const currencyQuote = quote && unwrappedToken(quote);
  const currencyBase = base && unwrappedToken(base); // check if price is within range

  const outOfRange = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false;
  const positionSummaryLink = '/pool/' + positionDetails.tokenId;
  const removed = liquidity === null || liquidity === void 0 ? void 0 : liquidity.eq(0);
  return /*#__PURE__*/_jsxs(LinkRow, {
    to: positionSummaryLink,
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsxs(PrimaryPositionIdData, {
        children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
          currency0: currencyBase,
          currency1: currencyQuote,
          size: 18,
          margin: true
        }), /*#__PURE__*/_jsxs(DataText, {
          children: ["\xA0", currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol, "\xA0/\xA0", currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol]
        }), "\xA0", /*#__PURE__*/_jsx(Badge, {
          children: /*#__PURE__*/_jsx(BadgeText, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0}%",
              values: {
                0: new Percent(feeAmount, 1000000).toSignificant()
              }
            })
          })
        })]
      }), /*#__PURE__*/_jsx(RangeBadge, {
        removed: removed,
        inRange: !outOfRange
      })]
    }), priceLower && priceUpper ? /*#__PURE__*/_jsxs(RangeLineItem, {
      children: [/*#__PURE__*/_jsxs(RangeText, {
        children: [/*#__PURE__*/_jsx(ExtentsText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Min:"
          })
        }), /*#__PURE__*/_jsx(Trans, {
          id: "{0} <0/> per <1/>",
          values: {
            0: formatTickPrice(priceLower, tickAtLimit, Bound.LOWER)
          },
          components: {
            0: /*#__PURE__*/_jsx(HoverInlineText, {
              text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
            }),
            1: /*#__PURE__*/_jsx(HoverInlineText, {
              text: (_currencyBase$symbol = currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol) !== null && _currencyBase$symbol !== void 0 ? _currencyBase$symbol : ''
            })
          }
        })]
      }), ' ', /*#__PURE__*/_jsxs(HideSmall, {
        children: [/*#__PURE__*/_jsx(DoubleArrow, {
          children: "\u27F7"
        }), ' ']
      }), /*#__PURE__*/_jsxs(SmallOnly, {
        children: [/*#__PURE__*/_jsx(DoubleArrow, {
          children: "\u27F7"
        }), ' ']
      }), /*#__PURE__*/_jsxs(RangeText, {
        children: [/*#__PURE__*/_jsx(ExtentsText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Max:"
          })
        }), /*#__PURE__*/_jsx(Trans, {
          id: "{0} <0/> per <1/>",
          values: {
            0: formatTickPrice(priceUpper, tickAtLimit, Bound.UPPER)
          },
          components: {
            0: /*#__PURE__*/_jsx(HoverInlineText, {
              text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
            }),
            1: /*#__PURE__*/_jsx(HoverInlineText, {
              maxCharacters: 10,
              text: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
            })
          }
        })]
      })]
    }) : /*#__PURE__*/_jsx(Loader, {})]
  });
}