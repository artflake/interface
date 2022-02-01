import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from 'components/Button';
import { AutoColumn } from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import ListLogo from 'components/ListLogo';
import { AutoRow, RowFixed } from 'components/Row';
import { useIsTokenActive, useIsUserAddedToken } from 'hooks/Tokens';
import useTheme from 'hooks/useTheme';
import { CheckCircle } from 'react-feather';
import { ThemedText } from 'theme';
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const TokenSection = _styled.div.withConfig({
  displayName: "ImportRow__TokenSection",
  componentId: "sc-1x3jvxb-0"
})(["padding:4px 20px;height:56px;display:grid;grid-template-columns:auto minmax(auto,1fr) auto;grid-gap:16px;align-items:center;opacity:", ";"], _ref => {
  let {
    dim
  } = _ref;
  return dim ? '0.4' : '1';
});

const CheckIcon = _styled(CheckCircle).withConfig({
  displayName: "ImportRow__CheckIcon",
  componentId: "sc-1x3jvxb-1"
})(["height:16px;width:16px;margin-right:6px;stroke:", ";"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.green1;
});

const NameOverflow = _styled.div.withConfig({
  displayName: "ImportRow__NameOverflow",
  componentId: "sc-1x3jvxb-2"
})(["white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-overflow:ellipsis;max-width:140px;font-size:12px;"]);

export default function ImportRow(_ref3) {
  let {
    token,
    style,
    dim,
    showImportView,
    setImportToken
  } = _ref3;
  const theme = useTheme(); // check if already active on list or local storage tokens

  const isAdded = useIsUserAddedToken(token);
  const isActive = useIsTokenActive(token);
  const list = token instanceof WrappedTokenInfo ? token.list : undefined;
  return /*#__PURE__*/_jsxs(TokenSection, {
    style: style,
    children: [/*#__PURE__*/_jsx(CurrencyLogo, {
      currency: token,
      size: '24px',
      style: {
        opacity: dim ? '0.6' : '1'
      }
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "4px",
      style: {
        opacity: dim ? '0.6' : '1'
      },
      children: [/*#__PURE__*/_jsxs(AutoRow, {
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 500,
          children: token.symbol
        }), /*#__PURE__*/_jsx(ThemedText.DarkGray, {
          ml: "8px",
          fontWeight: 300,
          children: /*#__PURE__*/_jsx(NameOverflow, {
            title: token.name,
            children: token.name
          })
        })]
      }), list && list.logoURI && /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(ThemedText.Small, {
          mr: "4px",
          color: theme.text3,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "via {0}",
            values: {
              0: list.name
            }
          })
        }), /*#__PURE__*/_jsx(ListLogo, {
          logoURI: list.logoURI,
          size: "12px"
        })]
      })]
    }), !isActive && !isAdded ? /*#__PURE__*/_jsx(ButtonPrimary, {
      width: "fit-content",
      padding: "6px 12px",
      fontWeight: 500,
      fontSize: "14px",
      onClick: () => {
        setImportToken && setImportToken(token);
        showImportView();
      },
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Import"
      })
    }) : /*#__PURE__*/_jsxs(RowFixed, {
      style: {
        minWidth: 'fit-content'
      },
      children: [/*#__PURE__*/_jsx(CheckIcon, {}), /*#__PURE__*/_jsx(ThemedText.Main, {
        color: theme.green1,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Active"
        })
      })]
    })]
  });
}