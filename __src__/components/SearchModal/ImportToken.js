import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from "../Button";
import { AutoColumn } from "../Column";
import { RowBetween } from "../Row";
import { SectionBreak } from "../swap/styleds";
import { useUnsupportedTokens } from "../../hooks/Tokens";
import useTheme from "../../hooks/useTheme";
import { AlertCircle, ArrowLeft } from 'react-feather';
import { useAddUserToken } from "../../state/user/hooks";
import { CloseIcon, ThemedText } from "../../theme";
import BlockedToken from "./BlockedToken";
import { PaddedColumn } from "./styleds";
import TokenImportCard from "./TokenImportCard";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "ImportToken__Wrapper",
  componentId: "sc-7tqaay-0"
})(["position:relative;width:100%;overflow:auto;"]);

export function ImportToken(props) {
  const {
    tokens,
    list,
    onBack,
    onDismiss,
    handleCurrencySelect
  } = props;
  const theme = useTheme();
  const addToken = useAddUserToken();
  const unsupportedTokens = useUnsupportedTokens();
  const unsupportedSet = new Set(Object.keys(unsupportedTokens));
  const intersection = new Set(tokens.filter(token => unsupportedSet.has(token.address)));

  if (intersection.size > 0) {
    return /*#__PURE__*/_jsx(BlockedToken, {
      onBack: onBack,
      onDismiss: onDismiss,
      blockedTokens: Array.from(intersection)
    });
  }

  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsx(PaddedColumn, {
      gap: "14px",
      style: {
        width: '100%',
        flex: '1 1'
      },
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [onBack ? /*#__PURE__*/_jsx(ArrowLeft, {
          style: {
            cursor: 'pointer'
          },
          onClick: onBack
        }) : /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0, plural, one {Import token} other {Import tokens}}",
            values: {
              0: tokens.length
            }
          })
        }), onDismiss ? /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        }) : /*#__PURE__*/_jsx("div", {})]
      })
    }), /*#__PURE__*/_jsx(SectionBreak, {}), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "md",
      style: {
        marginBottom: '32px',
        padding: '1rem'
      },
      children: [/*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        style: {
          textAlign: 'center',
          gap: '16px',
          padding: '1rem'
        },
        children: [/*#__PURE__*/_jsx(AlertCircle, {
          size: 48,
          stroke: theme.text2,
          strokeWidth: 1
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 400,
          fontSize: 16,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade."
          })
        })]
      }), tokens.map(token => /*#__PURE__*/_jsx(TokenImportCard, {
        token: token,
        list: list
      }, 'import' + token.address)), /*#__PURE__*/_jsx(ButtonPrimary, {
        altDisabledStyle: true,
        $borderRadius: "20px",
        padding: "10px 1rem",
        onClick: () => {
          tokens.map(token => addToken(token));
          handleCurrencySelect && handleCurrencySelect(tokens[0]);
        },
        className: ".token-dismiss-button",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Import"
        })
      })]
    })]
  });
}