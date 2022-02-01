import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { transparentize } from 'polished';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import { BIG_INT_ZERO } from "../../constants/misc";
import { useColor } from "../../hooks/useColor";
import { useTotalSupply } from "../../hooks/useTotalSupply";
import { useActiveWeb3React } from "../../hooks/web3";
import { useTokenBalance } from "../../state/wallet/hooks";
import { ExternalLink, ThemedText } from "../../theme";
import { currencyId } from "../../utils/currencyId";
import { unwrappedToken } from "../../utils/unwrappedToken";
import { ButtonEmpty, ButtonPrimary, ButtonSecondary } from "../Button";
import { GreyCard, LightCard } from "../Card";
import { AutoColumn } from "../Column";
import CurrencyLogo from "../CurrencyLogo";
import DoubleCurrencyLogo from "../DoubleLogo";
import { CardNoise } from "../earn/styled";
import { AutoRow, RowBetween, RowFixed } from "../Row";
import { Dots } from "../swap/styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export const FixedHeightRow = _styled(RowBetween).withConfig({
  displayName: "PositionCard__FixedHeightRow",
  componentId: "sc-1l6n3hl-0"
})(["height:24px;"]);

const StyledPositionCard = _styled(LightCard).withConfig({
  displayName: "PositionCard__StyledPositionCard",
  componentId: "sc-1l6n3hl-1"
})(["border:none;background:", ";position:relative;overflow:hidden;"], _ref => {
  let {
    theme,
    bgColor
  } = _ref;
  return `radial-gradient(91.85% 100% at 1.84% 0%, ${transparentize(0.8, bgColor)} 0%, ${theme.bg3} 100%) `;
});

export function MinimalPositionCard(_ref2) {
  let {
    pair,
    showUnwrapped = false,
    border
  } = _ref2;
  const {
    account
  } = useActiveWeb3React();
  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0);
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1);
  const [showMore, setShowMore] = useState(false);
  const userPoolBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
  const totalPoolTokens = useTotalSupply(pair.liquidityToken);
  const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient) ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient) : undefined;
  const [token0Deposited, token1Deposited] = !!pair && !!totalPoolTokens && !!userPoolBalance && // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
  JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient) ? [pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false), pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)] : [undefined, undefined];
  return /*#__PURE__*/_jsx(_Fragment, {
    children: userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0)) ? /*#__PURE__*/_jsx(GreyCard, {
      border: border,
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        children: [/*#__PURE__*/_jsx(FixedHeightRow, {
          children: /*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(Text, {
              fontWeight: 500,
              fontSize: 16,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Your position"
              })
            })
          })
        }), /*#__PURE__*/_jsxs(FixedHeightRow, {
          onClick: () => setShowMore(!showMore),
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
              currency0: currency0,
              currency1: currency1,
              margin: true,
              size: 20
            }), /*#__PURE__*/_jsxs(Text, {
              fontWeight: 500,
              fontSize: 20,
              children: [currency0.symbol, "/", currency1.symbol]
            })]
          }), /*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(Text, {
              fontWeight: 500,
              fontSize: 20,
              children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-'
            })
          })]
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "4px",
          children: [/*#__PURE__*/_jsxs(FixedHeightRow, {
            children: [/*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Your pool share:"
              })
            }), /*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'
            })]
          }), /*#__PURE__*/_jsxs(FixedHeightRow, {
            children: [/*#__PURE__*/_jsxs(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: [currency0.symbol, ":"]
            }), token0Deposited ? /*#__PURE__*/_jsx(RowFixed, {
              children: /*#__PURE__*/_jsx(Text, {
                fontSize: 16,
                fontWeight: 500,
                marginLeft: '6px',
                children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6)
              })
            }) : '-']
          }), /*#__PURE__*/_jsxs(FixedHeightRow, {
            children: [/*#__PURE__*/_jsxs(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: [currency1.symbol, ":"]
            }), token1Deposited ? /*#__PURE__*/_jsx(RowFixed, {
              children: /*#__PURE__*/_jsx(Text, {
                fontSize: 16,
                fontWeight: 500,
                marginLeft: '6px',
                children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6)
              })
            }) : '-']
          })]
        })]
      })
    }) : /*#__PURE__*/_jsx(LightCard, {
      children: /*#__PURE__*/_jsxs(ThemedText.SubHeader, {
        style: {
          textAlign: 'center'
        },
        children: [/*#__PURE__*/_jsx("span", {
          role: "img",
          "aria-label": "wizard-icon",
          children: "\u2B50\uFE0F"
        }), ' ', /*#__PURE__*/_jsx(Trans, {
          id: "By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity."
        }), ' ']
      })
    })
  });
}
export default function FullPositionCard(_ref3) {
  let {
    pair,
    border,
    stakedBalance
  } = _ref3;
  const {
    account
  } = useActiveWeb3React();
  const currency0 = unwrappedToken(pair.token0);
  const currency1 = unwrappedToken(pair.token1);
  const [showMore, setShowMore] = useState(false);
  const userDefaultPoolBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
  const totalPoolTokens = useTotalSupply(pair.liquidityToken); // if staked balance balance provided, add to standard liquidity amount

  const userPoolBalance = stakedBalance ? userDefaultPoolBalance === null || userDefaultPoolBalance === void 0 ? void 0 : userDefaultPoolBalance.add(stakedBalance) : userDefaultPoolBalance;
  const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient) ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient) : undefined;
  const [token0Deposited, token1Deposited] = !!pair && !!totalPoolTokens && !!userPoolBalance && // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
  JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient) ? [pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false), pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)] : [undefined, undefined];
  const backgroundColor = useColor(pair === null || pair === void 0 ? void 0 : pair.token0);
  return /*#__PURE__*/_jsxs(StyledPositionCard, {
    border: border,
    bgColor: backgroundColor,
    children: [/*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "12px",
      children: [/*#__PURE__*/_jsxs(FixedHeightRow, {
        children: [/*#__PURE__*/_jsxs(AutoRow, {
          gap: "8px",
          style: {
            marginLeft: '8px'
          },
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
          })]
        }), /*#__PURE__*/_jsx(RowFixed, {
          gap: "8px",
          style: {
            marginRight: '4px'
          },
          children: /*#__PURE__*/_jsx(ButtonEmpty, {
            padding: "6px 8px",
            $borderRadius: "12px",
            width: "100%",
            onClick: () => setShowMore(!showMore),
            children: showMore ? /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Trans, {
                id: "Manage"
              }), /*#__PURE__*/_jsx(ChevronUp, {
                size: "20",
                style: {
                  marginLeft: '8px',
                  height: '20px',
                  minWidth: '20px'
                }
              })]
            }) : /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Trans, {
                id: "Manage"
              }), /*#__PURE__*/_jsx(ChevronDown, {
                size: "20",
                style: {
                  marginLeft: '8px',
                  height: '20px',
                  minWidth: '20px'
                }
              })]
            })
          })
        })]
      }), showMore && /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "8px",
        children: [/*#__PURE__*/_jsxs(FixedHeightRow, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Your total pool tokens:"
            })
          }), /*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-'
          })]
        }), stakedBalance && /*#__PURE__*/_jsxs(FixedHeightRow, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Pool tokens in rewards pool:"
            })
          }), /*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: stakedBalance.toSignificant(4)
          })]
        }), /*#__PURE__*/_jsxs(FixedHeightRow, {
          children: [/*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Pooled {0}:",
                values: {
                  0: currency0.symbol
                }
              })
            })
          }), token0Deposited ? /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              marginLeft: '6px',
              children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6)
            }), /*#__PURE__*/_jsx(CurrencyLogo, {
              size: "20px",
              style: {
                marginLeft: '8px'
              },
              currency: currency0
            })]
          }) : '-']
        }), /*#__PURE__*/_jsxs(FixedHeightRow, {
          children: [/*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Pooled {0}:",
                values: {
                  0: currency1.symbol
                }
              })
            })
          }), token1Deposited ? /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              marginLeft: '6px',
              children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6)
            }), /*#__PURE__*/_jsx(CurrencyLogo, {
              size: "20px",
              style: {
                marginLeft: '8px'
              },
              currency: currency1
            })]
          }) : '-']
        }), /*#__PURE__*/_jsxs(FixedHeightRow, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Your pool share:"
            })
          }), /*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: poolTokenPercentage ? /*#__PURE__*/_jsx(Trans, {
              id: "{0} %",
              values: {
                0: poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)
              }
            }) : '-'
          })]
        }), /*#__PURE__*/_jsx(ButtonSecondary, {
          padding: "8px",
          $borderRadius: "8px",
          children: /*#__PURE__*/_jsx(ExternalLink, {
            style: {
              width: '100%',
              textAlign: 'center'
            },
            href: `https://v2.info.uniswap.org/account/${account}`,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View accrued fees and analytics<0>\u2197</0>",
              components: {
                0: /*#__PURE__*/_jsx("span", {
                  style: {
                    fontSize: '11px'
                  }
                })
              }
            })
          })
        }), userDefaultPoolBalance && JSBI.greaterThan(userDefaultPoolBalance.quotient, BIG_INT_ZERO) && /*#__PURE__*/_jsxs(RowBetween, {
          marginTop: "10px",
          children: [/*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            as: Link,
            to: `/migrate/v2/${pair.liquidityToken.address}`,
            width: "32%",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Migrate"
            })
          }), /*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            as: Link,
            to: `/add/v2/${currencyId(currency0)}/${currencyId(currency1)}`,
            width: "32%",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Add"
            })
          }), /*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            as: Link,
            width: "32%",
            to: `/remove/v2/${currencyId(currency0)}/${currencyId(currency1)}`,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Remove"
            })
          })]
        }), stakedBalance && JSBI.greaterThan(stakedBalance.quotient, BIG_INT_ZERO) && /*#__PURE__*/_jsx(ButtonPrimary, {
          padding: "8px",
          $borderRadius: "8px",
          as: Link,
          to: `/uni/${currencyId(currency0)}/${currencyId(currency1)}`,
          width: "100%",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Manage Liquidity in Rewards Pool"
          })
        })]
      })]
    })]
  });
}