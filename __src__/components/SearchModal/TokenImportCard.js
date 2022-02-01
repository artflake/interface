import { useTheme as _useTheme } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Card from 'components/Card';
import { AutoColumn } from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import ListLogo from 'components/ListLogo';
import { RowFixed } from 'components/Row';
import { useActiveWeb3React } from 'hooks/web3';
import { transparentize } from 'polished';
import { AlertCircle } from 'react-feather';
import { ExternalLink, ThemedText } from 'theme';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const WarningWrapper = _styled(Card).withConfig({
  displayName: "TokenImportCard__WarningWrapper",
  componentId: "sc-1x9yxxr-0"
})(["background-color:", ";width:fit-content;"], _ref => {
  let {
    theme,
    highWarning
  } = _ref;
  return highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.yellow2);
});

const AddressText = _styled(ThemedText.Blue).withConfig({
  displayName: "TokenImportCard__AddressText",
  componentId: "sc-1x9yxxr-1"
})(["font-size:12px;word-break:break-all;", ""], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToSmall`
    font-size: 10px;
  `;
});

const TokenImportCard = _ref3 => {
  let {
    list,
    token
  } = _ref3;

  const theme = _useTheme();

  const {
    chainId
  } = useActiveWeb3React();
  return /*#__PURE__*/_jsx(Card, {
    backgroundColor: theme.bg2,
    padding: "2rem",
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "10px",
      justify: "center",
      children: [/*#__PURE__*/_jsx(CurrencyLogo, {
        currency: token,
        size: '32px'
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "4px",
        justify: "center",
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          ml: "8px",
          mr: "8px",
          fontWeight: 500,
          fontSize: 20,
          children: token.symbol
        }), /*#__PURE__*/_jsx(ThemedText.DarkGray, {
          fontWeight: 400,
          fontSize: 14,
          children: token.name
        })]
      }), chainId && /*#__PURE__*/_jsx(ExternalLink, {
        href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS),
        children: /*#__PURE__*/_jsx(AddressText, {
          fontSize: 12,
          children: token.address
        })
      }), list !== undefined ? /*#__PURE__*/_jsxs(RowFixed, {
        children: [list.logoURI && /*#__PURE__*/_jsx(ListLogo, {
          logoURI: list.logoURI,
          size: "16px"
        }), /*#__PURE__*/_jsx(ThemedText.Small, {
          ml: "6px",
          fontSize: 14,
          color: theme.text3,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "via {0} token list",
            values: {
              0: list.name
            }
          })
        })]
      }) : /*#__PURE__*/_jsx(WarningWrapper, {
        $borderRadius: "4px",
        padding: "4px",
        highWarning: true,
        children: /*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(AlertCircle, {
            stroke: theme.red1,
            size: "10px"
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            color: theme.red1,
            ml: "4px",
            fontSize: "10px",
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Unknown Source"
            })
          })]
        })
      })]
    })
  });
};

export default TokenImportCard;