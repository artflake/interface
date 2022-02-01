import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonEmpty } from 'components/Button';
import Card, { OutlineCard } from 'components/Card';
import { AutoColumn } from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import Modal from 'components/Modal';
import { AutoRow, RowBetween } from 'components/Row';
import { useActiveWeb3React } from 'hooks/web3';
import { useState } from 'react';
import { CloseIcon, ExternalLink, ThemedText, Z_INDEX } from 'theme';
import { useUnsupportedTokens } from '../../hooks/Tokens';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const DetailsFooter = _styled.div.withConfig({
  displayName: "UnsupportedCurrencyFooter__DetailsFooter",
  componentId: "sc-1ya6914-0"
})(["padding-top:calc(16px + 2rem);padding-bottom:20px;margin-left:auto;margin-right:auto;margin-top:-2rem;width:100%;max-width:400px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;color:", ";background-color:", ";z-index:", ";transform:", ";transition:transform 300ms ease-in-out;text-align:center;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.advancedBG;
}, Z_INDEX.deprecated_zero, _ref3 => {
  let {
    show
  } = _ref3;
  return show ? 'translateY(0%)' : 'translateY(-100%)';
});

const StyledButtonEmpty = _styled(ButtonEmpty).withConfig({
  displayName: "UnsupportedCurrencyFooter__StyledButtonEmpty",
  componentId: "sc-1ya6914-1"
})(["text-decoration:none;"]);

const AddressText = _styled(ThemedText.Blue).withConfig({
  displayName: "UnsupportedCurrencyFooter__AddressText",
  componentId: "sc-1ya6914-2"
})(["font-size:12px;", ""], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    font-size: 10px;
`;
});

export default function UnsupportedCurrencyFooter(_ref5) {
  let {
    show,
    currencies
  } = _ref5;
  const {
    chainId
  } = useActiveWeb3React();
  const [showDetails, setShowDetails] = useState(false);
  const tokens = chainId && currencies ? currencies.map(currency => {
    return currency === null || currency === void 0 ? void 0 : currency.wrapped;
  }) : [];
  const unsupportedTokens = useUnsupportedTokens();
  return /*#__PURE__*/_jsxs(DetailsFooter, {
    show: show,
    children: [/*#__PURE__*/_jsx(Modal, {
      isOpen: showDetails,
      onDismiss: () => setShowDetails(false),
      children: /*#__PURE__*/_jsx(Card, {
        padding: "2rem",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "lg",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Unsupported Assets"
              })
            }), /*#__PURE__*/_jsx(CloseIcon, {
              onClick: () => setShowDetails(false)
            })]
          }), tokens.map(token => {
            var _token$address;

            return token && unsupportedTokens && Object.keys(unsupportedTokens).includes(token.address) && /*#__PURE__*/_jsx(OutlineCard, {
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "10px",
                children: [/*#__PURE__*/_jsxs(AutoRow, {
                  gap: "5px",
                  align: "center",
                  children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                    currency: token,
                    size: '24px'
                  }), /*#__PURE__*/_jsx(ThemedText.Body, {
                    fontWeight: 500,
                    children: token.symbol
                  })]
                }), chainId && /*#__PURE__*/_jsx(ExternalLink, {
                  href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS),
                  children: /*#__PURE__*/_jsx(AddressText, {
                    children: token.address
                  })
                })]
              })
            }, (_token$address = token.address) === null || _token$address === void 0 ? void 0 : _token$address.concat('not-supported'));
          }), /*#__PURE__*/_jsx(AutoColumn, {
            gap: "lg",
            children: /*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons."
              })
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsx(StyledButtonEmpty, {
      padding: '0',
      onClick: () => setShowDetails(true),
      children: /*#__PURE__*/_jsx(ThemedText.Blue, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Read more about unsupported assets"
        })
      })
    })]
  });
}