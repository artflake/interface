import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import RangeBadge from "../Badge/RangeBadge";
import { LightCard } from "../Card";
import { AutoColumn } from "../Column";
import CurrencyLogo from "../CurrencyLogo";
import DoubleCurrencyLogo from "../DoubleLogo";
import { Break } from "../earn/styled";
import RateToggle from "../RateToggle";
import { RowBetween, RowFixed } from "../Row";
import JSBI from 'jsbi';
import { useCallback, useContext, useState } from 'react';
import { Bound } from "../../state/mint/v3/actions";
import { ThemedText } from "../../theme";
import { formatTickPrice } from "../../utils/formatTickPrice";
import { unwrappedToken } from "../../utils/unwrappedToken";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const PositionPreview = _ref => {
  var _position$pool;

  let {
    position,
    title,
    inRange,
    baseCurrencyDefault,
    ticksAtLimit
  } = _ref;
  const theme = useContext(_ThemeContext);
  const currency0 = unwrappedToken(position.pool.token0);
  const currency1 = unwrappedToken(position.pool.token1); // track which currency should be base

  const [baseCurrency, setBaseCurrency] = useState(baseCurrencyDefault ? baseCurrencyDefault === currency0 ? currency0 : baseCurrencyDefault === currency1 ? currency1 : currency0 : currency0);
  const sorted = baseCurrency === currency0;
  const quoteCurrency = sorted ? currency1 : currency0;
  const price = sorted ? position.pool.priceOf(position.pool.token0) : position.pool.priceOf(position.pool.token1);
  const priceLower = sorted ? position.token0PriceLower : position.token0PriceUpper.invert();
  const priceUpper = sorted ? position.token0PriceUpper : position.token0PriceLower.invert();
  const handleRateChange = useCallback(() => {
    setBaseCurrency(quoteCurrency);
  }, [quoteCurrency]);
  const removed = (position === null || position === void 0 ? void 0 : position.liquidity) && JSBI.equal(position === null || position === void 0 ? void 0 : position.liquidity, JSBI.BigInt(0));
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "md",
    style: {
      marginTop: '0.5rem'
    },
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      style: {
        marginBottom: '0.5rem'
      },
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
          currency0: currency0 !== null && currency0 !== void 0 ? currency0 : undefined,
          currency1: currency1 !== null && currency1 !== void 0 ? currency1 : undefined,
          size: 24,
          margin: true
        }), /*#__PURE__*/_jsxs(ThemedText.Label, {
          ml: "10px",
          fontSize: "24px",
          children: [currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol, " / ", currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol]
        })]
      }), /*#__PURE__*/_jsx(RangeBadge, {
        removed: removed,
        inRange: inRange
      })]
    }), /*#__PURE__*/_jsx(LightCard, {
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "md",
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: currency0
            }), /*#__PURE__*/_jsx(ThemedText.Label, {
              ml: "8px",
              children: currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol
            })]
          }), /*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(ThemedText.Label, {
              mr: "8px",
              children: position.amount0.toSignificant(4)
            })
          })]
        }), /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: currency1
            }), /*#__PURE__*/_jsx(ThemedText.Label, {
              ml: "8px",
              children: currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol
            })]
          }), /*#__PURE__*/_jsx(RowFixed, {
            children: /*#__PURE__*/_jsx(ThemedText.Label, {
              mr: "8px",
              children: position.amount1.toSignificant(4)
            })
          })]
        }), /*#__PURE__*/_jsx(Break, {}), /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Label, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Fee Tier"
            })
          }), /*#__PURE__*/_jsx(ThemedText.Label, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0}%",
              values: {
                0: (position === null || position === void 0 ? void 0 : (_position$pool = position.pool) === null || _position$pool === void 0 ? void 0 : _position$pool.fee) / 10000
              }
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "md",
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [title ? /*#__PURE__*/_jsx(ThemedText.Main, {
          children: title
        }) : /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(RateToggle, {
          currencyA: sorted ? currency0 : currency1,
          currencyB: sorted ? currency1 : currency0,
          handleRateToggle: handleRateChange
        })]
      }), /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(LightCard, {
          width: "48%",
          padding: "8px",
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "4px",
            justify: "center",
            children: [/*#__PURE__*/_jsx(ThemedText.Main, {
              fontSize: "12px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Min Price"
              })
            }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              textAlign: "center",
              children: `${formatTickPrice(priceLower, ticksAtLimit, Bound.LOWER)}`
            }), /*#__PURE__*/_jsx(ThemedText.Main, {
              textAlign: "center",
              fontSize: "12px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{0} per {1}",
                values: {
                  0: quoteCurrency.symbol,
                  1: baseCurrency.symbol
                }
              })
            }), /*#__PURE__*/_jsx(ThemedText.Small, {
              textAlign: "center",
              color: theme.text3,
              style: {
                marginTop: '4px'
              },
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Your position will be 100% composed of {0} at this price",
                values: {
                  0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
                }
              })
            })]
          })
        }), /*#__PURE__*/_jsx(LightCard, {
          width: "48%",
          padding: "8px",
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "4px",
            justify: "center",
            children: [/*#__PURE__*/_jsx(ThemedText.Main, {
              fontSize: "12px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Max Price"
              })
            }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              textAlign: "center",
              children: `${formatTickPrice(priceUpper, ticksAtLimit, Bound.UPPER)}`
            }), /*#__PURE__*/_jsx(ThemedText.Main, {
              textAlign: "center",
              fontSize: "12px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{0} per {1}",
                values: {
                  0: quoteCurrency.symbol,
                  1: baseCurrency.symbol
                }
              })
            }), /*#__PURE__*/_jsx(ThemedText.Small, {
              textAlign: "center",
              color: theme.text3,
              style: {
                marginTop: '4px'
              },
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Your position will be 100% composed of {0} at this price",
                values: {
                  0: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
                }
              })
            })]
          })
        })]
      }), /*#__PURE__*/_jsx(LightCard, {
        padding: "12px ",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "4px",
          justify: "center",
          children: [/*#__PURE__*/_jsx(ThemedText.Main, {
            fontSize: "12px",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Current price"
            })
          }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            children: `${price.toSignificant(5)} `
          }), /*#__PURE__*/_jsx(ThemedText.Main, {
            textAlign: "center",
            fontSize: "12px",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} per {1}",
              values: {
                0: quoteCurrency.symbol,
                1: baseCurrency.symbol
              }
            })
          })]
        })
      })]
    })]
  });
};