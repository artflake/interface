import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { BIG_INT_SECONDS_IN_WEEK } from "../../constants/misc";
import { useColor } from "../../hooks/useColor";
import { useTotalSupply } from "../../hooks/useTotalSupply";
import useUSDCPrice from "../../hooks/useUSDCPrice";
import { useV2Pair } from "../../hooks/useV2Pairs";
import { StyledInternalLink, ThemedText } from "../../theme";
import { currencyId } from "../../utils/currencyId";
import { unwrappedToken } from "../../utils/unwrappedToken";
import { ButtonPrimary } from "../Button";
import { AutoColumn } from "../Column";
import DoubleCurrencyLogo from "../DoubleLogo";
import { RowBetween } from "../Row";
import { Break, CardBGImage, CardNoise } from "./styled";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const StatContainer = _styled.div.withConfig({
  displayName: "PoolCard__StatContainer",
  componentId: "sc-8opd0r-0"
})(["display:flex;justify-content:space-between;flex-direction:column;gap:12px;margin-bottom:1rem;margin-right:1rem;margin-left:1rem;", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
  display: none;
`;
});

const Wrapper = _styled(AutoColumn).withConfig({
  displayName: "PoolCard__Wrapper",
  componentId: "sc-8opd0r-1"
})(["border-radius:12px;width:100%;overflow:hidden;position:relative;opacity:", ";background:", ";color:", " !important;", ""], _ref2 => {
  let {
    showBackground
  } = _ref2;
  return showBackground ? '1' : '1';
}, _ref3 => {
  let {
    theme,
    bgColor,
    showBackground
  } = _ref3;
  return `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `;
}, _ref4 => {
  let {
    theme,
    showBackground
  } = _ref4;
  return showBackground ? theme.white : theme.text1;
}, _ref5 => {
  let {
    showBackground
  } = _ref5;
  return showBackground && `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`;
});

const TopSection = _styled.div.withConfig({
  displayName: "PoolCard__TopSection",
  componentId: "sc-8opd0r-2"
})(["display:grid;grid-template-columns:48px 1fr 120px;grid-gap:0px;align-items:center;padding:1rem;z-index:1;", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `;
});

const BottomSection = _styled.div.withConfig({
  displayName: "PoolCard__BottomSection",
  componentId: "sc-8opd0r-3"
})(["padding:12px 16px;opacity:", ";border-radius:0 0 12px 12px;display:flex;flex-direction:row;align-items:baseline;justify-content:space-between;z-index:1;"], _ref7 => {
  let {
    showBackground
  } = _ref7;
  return showBackground ? '1' : '0.4';
});

export default function PoolCard(_ref8) {
  var _valueOfTotalStakedAm, _valueOfTotalStakedAm2, _stakingInfo$totalRew, _stakingInfo$totalRew2, _stakingInfo$rewardRa, _stakingInfo$rewardRa2;

  let {
    stakingInfo
  } = _ref8;
  const token0 = stakingInfo.tokens[0];
  const token1 = stakingInfo.tokens[1];
  const currency0 = unwrappedToken(token0);
  const currency1 = unwrappedToken(token1);
  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0')); // get the color of the token

  const token = currency0.isNative ? token1 : token0;
  const WETH = currency0.isNative ? token0 : token1;
  const backgroundColor = useColor(token);
  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo.stakedAmount.currency);
  const [, stakingTokenPair] = useV2Pair(...stakingInfo.tokens); // let returnOverMonth: Percent = new Percent('0')

  let valueOfTotalStakedAmountInWETH;

  if (totalSupplyOfStakingToken && stakingTokenPair) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = CurrencyAmount.fromRawAmount(WETH, JSBI.divide(JSBI.multiply(JSBI.multiply(stakingInfo.totalStakedAmount.quotient, stakingTokenPair.reserveOf(WETH).quotient), JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
    ), totalSupplyOfStakingToken.quotient));
  } // get the USD value of staked WETH


  const USDPrice = useUSDCPrice(WETH);
  const valueOfTotalStakedAmountInUSDC = valueOfTotalStakedAmountInWETH && (USDPrice === null || USDPrice === void 0 ? void 0 : USDPrice.quote(valueOfTotalStakedAmountInWETH));
  return /*#__PURE__*/_jsxs(Wrapper, {
    showBackground: isStaking,
    bgColor: backgroundColor,
    children: [/*#__PURE__*/_jsx(CardBGImage, {
      desaturate: true
    }), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(TopSection, {
      children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
        currency0: currency0,
        currency1: currency1,
        size: 24
      }), /*#__PURE__*/_jsxs(ThemedText.White, {
        fontWeight: 600,
        fontSize: 24,
        style: {
          marginLeft: '8px'
        },
        children: [currency0.symbol, "-", currency1.symbol]
      }), /*#__PURE__*/_jsx(StyledInternalLink, {
        to: `/uni/${currencyId(currency0)}/${currencyId(currency1)}`,
        style: {
          width: '100%'
        },
        children: /*#__PURE__*/_jsx(ButtonPrimary, {
          padding: "8px",
          $borderRadius: "8px",
          children: isStaking ? /*#__PURE__*/_jsx(Trans, {
            id: "Manage"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Deposit"
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(StatContainer, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ThemedText.White, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Total deposited"
          })
        }), /*#__PURE__*/_jsx(ThemedText.White, {
          children: valueOfTotalStakedAmountInUSDC ? /*#__PURE__*/_jsx(Trans, {
            id: "${0}",
            values: {
              0: valueOfTotalStakedAmountInUSDC.toFixed(0, {
                groupSeparator: ','
              })
            }
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "{0} ETH",
            values: {
              0: (_valueOfTotalStakedAm = (_valueOfTotalStakedAm2 = valueOfTotalStakedAmountInWETH) === null || _valueOfTotalStakedAm2 === void 0 ? void 0 : _valueOfTotalStakedAm2.toSignificant(4, {
                groupSeparator: ','
              })) !== null && _valueOfTotalStakedAm !== void 0 ? _valueOfTotalStakedAm : '-'
            }
          })
        })]
      }), /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ThemedText.White, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Pool rate"
          })
        }), /*#__PURE__*/_jsx(ThemedText.White, {
          children: stakingInfo ? stakingInfo.active ? /*#__PURE__*/_jsx(Trans, {
            id: "{0} UNI / week",
            values: {
              0: (_stakingInfo$totalRew = stakingInfo.totalRewardRate) === null || _stakingInfo$totalRew === void 0 ? void 0 : (_stakingInfo$totalRew2 = _stakingInfo$totalRew.multiply(BIG_INT_SECONDS_IN_WEEK)) === null || _stakingInfo$totalRew2 === void 0 ? void 0 : _stakingInfo$totalRew2.toFixed(0, {
                groupSeparator: ','
              })
            }
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "0 UNI / week"
          }) : '-'
        })]
      })]
    }), isStaking && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Break, {}), /*#__PURE__*/_jsxs(BottomSection, {
        showBackground: true,
        children: [/*#__PURE__*/_jsx(ThemedText.Black, {
          color: 'white',
          fontWeight: 500,
          children: /*#__PURE__*/_jsx("span", {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Your rate"
            })
          })
        }), /*#__PURE__*/_jsxs(ThemedText.Black, {
          style: {
            textAlign: 'right'
          },
          color: 'white',
          fontWeight: 500,
          children: [/*#__PURE__*/_jsx("span", {
            role: "img",
            "aria-label": "wizard-icon",
            style: {
              marginRight: '0.5rem'
            },
            children: "\u26A1"
          }), stakingInfo ? stakingInfo.active ? /*#__PURE__*/_jsx(Trans, {
            id: "{0} UNI / week",
            values: {
              0: (_stakingInfo$rewardRa = stakingInfo.rewardRate) === null || _stakingInfo$rewardRa === void 0 ? void 0 : (_stakingInfo$rewardRa2 = _stakingInfo$rewardRa.multiply(BIG_INT_SECONDS_IN_WEEK)) === null || _stakingInfo$rewardRa2 === void 0 ? void 0 : _stakingInfo$rewardRa2.toSignificant(4, {
                groupSeparator: ','
              })
            }
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "0 UNI / week"
          }) : '-']
        })]
      })]
    })]
  });
}