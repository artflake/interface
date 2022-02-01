import { Trans } from "@lingui/react";
import { Text } from 'rebass';
import { ButtonPrimary } from "../../components/Button";
import CurrencyLogo from "../../components/CurrencyLogo";
import { RowBetween, RowFixed } from "../../components/Row";
import { Field } from "../../state/mint/actions";
import { ThemedText } from "../../theme";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function ConfirmAddModalBottom(_ref) {
  var _currencies$Field$CUR, _parsedAmounts$Field$, _currencies$Field$CUR2, _parsedAmounts$Field$2, _currencies$Field$CUR3, _currencies$Field$CUR4, _currencies$Field$CUR5, _currencies$Field$CUR6;

  let {
    noLiquidity,
    price,
    currencies,
    parsedAmounts,
    poolTokenPercentage,
    onAdd
  } = _ref;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0} Deposited",
          values: {
            0: (_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol
          }
        })
      }), /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          currency: currencies[Field.CURRENCY_A],
          style: {
            marginRight: '8px'
          }
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: (_parsedAmounts$Field$ = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$ === void 0 ? void 0 : _parsedAmounts$Field$.toSignificant(6)
        })]
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0} Deposited",
          values: {
            0: (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol
          }
        })
      }), /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          currency: currencies[Field.CURRENCY_B],
          style: {
            marginRight: '8px'
          }
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: (_parsedAmounts$Field$2 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : _parsedAmounts$Field$2.toSignificant(6)
        })]
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Rates"
        })
      }), /*#__PURE__*/_jsx(ThemedText.Body, {
        children: `1 ${(_currencies$Field$CUR3 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol} = ${price === null || price === void 0 ? void 0 : price.toSignificant(4)} ${(_currencies$Field$CUR4 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol}`
      })]
    }), /*#__PURE__*/_jsx(RowBetween, {
      style: {
        justifyContent: 'flex-end'
      },
      children: /*#__PURE__*/_jsx(ThemedText.Body, {
        children: `1 ${(_currencies$Field$CUR5 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR5 === void 0 ? void 0 : _currencies$Field$CUR5.symbol} = ${price === null || price === void 0 ? void 0 : price.invert().toSignificant(4)} ${(_currencies$Field$CUR6 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR6 === void 0 ? void 0 : _currencies$Field$CUR6.symbol}`
      })
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx(ThemedText.Body, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Share of Pool:"
        })
      }), /*#__PURE__*/_jsx(ThemedText.Body, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0}%",
          values: {
            0: noLiquidity ? '100' : poolTokenPercentage === null || poolTokenPercentage === void 0 ? void 0 : poolTokenPercentage.toSignificant(4)
          }
        })
      })]
    }), /*#__PURE__*/_jsx(ButtonPrimary, {
      style: {
        margin: '20px 0 0 0'
      },
      onClick: onAdd,
      children: /*#__PURE__*/_jsx(Text, {
        fontWeight: 500,
        fontSize: 20,
        children: noLiquidity ? /*#__PURE__*/_jsx(Trans, {
          id: "Create Pool & Supply"
        }) : /*#__PURE__*/_jsx(Trans, {
          id: "Confirm Supply"
        })
      })
    })]
  });
}