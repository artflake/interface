import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useContext } from 'react';
import { ArrowUpCircle } from 'react-feather';
import Circle from '../../assets/images/blue-loader.svg';
import { useActiveWeb3React } from '../../hooks/web3';
import { CloseIcon, CustomLightSpinner, ThemedText } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { AutoColumn, ColumnCenter } from '../Column';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ConfirmOrLoadingWrapper = _styled.div.withConfig({
  displayName: "ModalViews__ConfirmOrLoadingWrapper",
  componentId: "sc-o9qaeb-0"
})(["width:100%;padding:24px;"]);

const ConfirmedIcon = _styled(ColumnCenter).withConfig({
  displayName: "ModalViews__ConfirmedIcon",
  componentId: "sc-o9qaeb-1"
})(["padding:60px 0;"]);

export function LoadingView(_ref) {
  let {
    children,
    onDismiss
  } = _ref;
  return /*#__PURE__*/_jsxs(ConfirmOrLoadingWrapper, {
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(CloseIcon, {
        onClick: onDismiss
      })]
    }), /*#__PURE__*/_jsx(ConfirmedIcon, {
      children: /*#__PURE__*/_jsx(CustomLightSpinner, {
        src: Circle,
        alt: "loader",
        size: '90px'
      })
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "100px",
      justify: 'center',
      children: [children, /*#__PURE__*/_jsx(ThemedText.SubHeader, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Confirm this transaction in your wallet"
        })
      })]
    })]
  });
}
export function SubmittedView(_ref2) {
  let {
    children,
    onDismiss,
    hash
  } = _ref2;
  const theme = useContext(_ThemeContext);
  const {
    chainId
  } = useActiveWeb3React();
  return /*#__PURE__*/_jsxs(ConfirmOrLoadingWrapper, {
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(CloseIcon, {
        onClick: onDismiss
      })]
    }), /*#__PURE__*/_jsx(ConfirmedIcon, {
      children: /*#__PURE__*/_jsx(ArrowUpCircle, {
        strokeWidth: 0.5,
        size: 90,
        color: theme.primary1
      })
    }), /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "100px",
      justify: 'center',
      children: [children, chainId && hash && /*#__PURE__*/_jsx(ExternalLink, {
        href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
        style: {
          marginLeft: '4px'
        },
        children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "View transaction on Explorer"
          })
        })
      })]
    })]
  });
}