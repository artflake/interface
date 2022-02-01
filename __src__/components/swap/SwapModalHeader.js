import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { TradeType } from '@uniswap/sdk-core';
import { useContext, useState } from 'react';
import { AlertTriangle, ArrowDown } from 'react-feather';
import { Text } from 'rebass';
import { useUSDCValue } from "../../hooks/useUSDCPrice";
import { ThemedText } from "../../theme";
import { isAddress, shortenAddress } from "../../utils";
import { computeFiatValuePriceImpact } from "../../utils/computeFiatValuePriceImpact";
import { ButtonPrimary } from "../Button";
import { LightCard } from "../Card";
import { AutoColumn } from "../Column";
import { FiatValue } from "../CurrencyInputPanel/FiatValue";
import CurrencyLogo from "../CurrencyLogo";
import { RowBetween, RowFixed } from "../Row";
import TradePrice from "../swap/TradePrice";
import { AdvancedSwapDetails } from "./AdvancedSwapDetails";
import { SwapShowAcceptChanges, TruncatedText } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ArrowWrapper = _styled.div.withConfig({
  displayName: "SwapModalHeader__ArrowWrapper",
  componentId: "sc-1zwhh3-0"
})(["padding:4px;border-radius:12px;height:32px;width:32px;position:relative;margin-top:-18px;margin-bottom:-18px;left:calc(50% - 16px);display:flex;justify-content:center;align-items:center;background-color:", ";border:4px solid;border-color:", ";z-index:2;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg0;
});

export default function SwapModalHeader(_ref3) {
  let {
    trade,
    allowedSlippage,
    recipient,
    showAcceptChanges,
    onAcceptChanges
  } = _ref3;
  const theme = useContext(_ThemeContext);
  const [showInverted, setShowInverted] = useState(false);
  const fiatValueInput = useUSDCValue(trade.inputAmount);
  const fiatValueOutput = useUSDCValue(trade.outputAmount);
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: '4px',
    style: {
      marginTop: '1rem'
    },
    children: [/*#__PURE__*/_jsx(LightCard, {
      padding: "0.75rem 1rem",
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: '8px',
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Body, {
            color: theme.text3,
            fontWeight: 500,
            fontSize: 14,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "From"
            })
          }), /*#__PURE__*/_jsx(FiatValue, {
            fiatValue: fiatValueInput
          })]
        }), /*#__PURE__*/_jsxs(RowBetween, {
          align: "center",
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            gap: '0px',
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: trade.inputAmount.currency,
              size: '20px',
              style: {
                marginRight: '12px'
              }
            }), /*#__PURE__*/_jsx(Text, {
              fontSize: 20,
              fontWeight: 500,
              children: trade.inputAmount.currency.symbol
            })]
          }), /*#__PURE__*/_jsx(RowFixed, {
            gap: '0px',
            children: /*#__PURE__*/_jsx(TruncatedText, {
              fontSize: 24,
              fontWeight: 500,
              color: showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.primary1 : '',
              children: trade.inputAmount.toSignificant(6)
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(ArrowWrapper, {
      children: /*#__PURE__*/_jsx(ArrowDown, {
        size: "16",
        color: theme.text2
      })
    }), /*#__PURE__*/_jsx(LightCard, {
      padding: "0.75rem 1rem",
      style: {
        marginBottom: '0.25rem'
      },
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: '8px',
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Body, {
            color: theme.text3,
            fontWeight: 500,
            fontSize: 14,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "To"
            })
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 14,
            color: theme.text3,
            children: /*#__PURE__*/_jsx(FiatValue, {
              fiatValue: fiatValueOutput,
              priceImpact: computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)
            })
          })]
        }), /*#__PURE__*/_jsxs(RowBetween, {
          align: "flex-end",
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            gap: '0px',
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: trade.outputAmount.currency,
              size: '20px',
              style: {
                marginRight: '12px'
              }
            }), /*#__PURE__*/_jsx(Text, {
              fontSize: 20,
              fontWeight: 500,
              children: trade.outputAmount.currency.symbol
            })]
          }), /*#__PURE__*/_jsx(RowFixed, {
            gap: '0px',
            children: /*#__PURE__*/_jsx(TruncatedText, {
              fontSize: 24,
              fontWeight: 500,
              children: trade.outputAmount.toSignificant(6)
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsxs(RowBetween, {
      style: {
        marginTop: '0.25rem',
        padding: '0 1rem'
      },
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        color: theme.text2,
        fontWeight: 500,
        fontSize: 14,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Price"
        })
      }), /*#__PURE__*/_jsx(TradePrice, {
        price: trade.executionPrice,
        showInverted: showInverted,
        setShowInverted: setShowInverted
      })]
    }), /*#__PURE__*/_jsx(LightCard, {
      style: {
        padding: '.75rem',
        marginTop: '0.5rem'
      },
      children: /*#__PURE__*/_jsx(AdvancedSwapDetails, {
        trade: trade,
        allowedSlippage: allowedSlippage
      })
    }), showAcceptChanges ? /*#__PURE__*/_jsx(SwapShowAcceptChanges, {
      justify: "flex-start",
      gap: '0px',
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(AlertTriangle, {
            size: 20,
            style: {
              marginRight: '8px',
              minWidth: 24
            }
          }), /*#__PURE__*/_jsx(ThemedText.Main, {
            color: theme.primary1,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Price Updated"
            })
          })]
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          style: {
            padding: '.5rem',
            width: 'fit-content',
            fontSize: '0.825rem',
            borderRadius: '12px'
          },
          onClick: onAcceptChanges,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Accept"
          })
        })]
      })
    }) : null, /*#__PURE__*/_jsx(AutoColumn, {
      justify: "flex-start",
      gap: "sm",
      style: {
        padding: '.75rem 1rem'
      },
      children: trade.tradeType === TradeType.EXACT_INPUT ? /*#__PURE__*/_jsx(ThemedText.Italic, {
        fontWeight: 400,
        textAlign: "left",
        style: {
          width: '100%'
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Output is estimated. You will receive at least <0>{0} {1}</0> or the transaction will revert.",
          values: {
            0: trade.minimumAmountOut(allowedSlippage).toSignificant(6),
            1: trade.outputAmount.currency.symbol
          },
          components: {
            0: /*#__PURE__*/_jsx("b", {})
          }
        })
      }) : /*#__PURE__*/_jsx(ThemedText.Italic, {
        fontWeight: 400,
        textAlign: "left",
        style: {
          width: '100%'
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Input is estimated. You will sell at most <0>{0} {1}</0> or the transaction will revert.",
          values: {
            0: trade.maximumAmountIn(allowedSlippage).toSignificant(6),
            1: trade.inputAmount.currency.symbol
          },
          components: {
            0: /*#__PURE__*/_jsx("b", {})
          }
        })
      })
    }), recipient !== null ? /*#__PURE__*/_jsx(AutoColumn, {
      justify: "flex-start",
      gap: "sm",
      style: {
        padding: '12px 0 0 0px'
      },
      children: /*#__PURE__*/_jsx(ThemedText.Main, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Output will be sent to <0>{0}</0>",
          values: {
            0: isAddress(recipient) ? shortenAddress(recipient) : recipient
          },
          components: {
            0: /*#__PURE__*/_jsx("b", {
              title: recipient
            })
          }
        })
      })
    }) : null]
  });
}