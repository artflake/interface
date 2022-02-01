import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Card from 'components/Card';
import Column from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import Row, { RowBetween, RowFixed } from 'components/Row';
import { useToken } from 'hooks/Tokens';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useRemoveUserAddedToken, useUserAddedTokens } from 'state/user/hooks';
import { ButtonText, ExternalLink, ExternalLinkIcon, ThemedText, TrashIcon } from 'theme';
import { isAddress } from 'utils';
import useTheme from '../../hooks/useTheme';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { CurrencyModalView } from './CurrencySearchModal';
import ImportRow from './ImportRow';
import { PaddedColumn, SearchInput, Separator } from './styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "ManageTokens__Wrapper",
  componentId: "sc-s3wxjn-0"
})(["width:100%;height:calc(100% - 60px);position:relative;padding-bottom:80px;"]);

const Footer = _styled.div.withConfig({
  displayName: "ManageTokens__Footer",
  componentId: "sc-s3wxjn-1"
})(["position:absolute;bottom:0;width:100%;border-radius:20px;border-top-right-radius:0;border-top-left-radius:0;border-top:1px solid ", ";padding:20px;text-align:center;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg3;
});

export default function ManageTokens(_ref2) {
  let {
    setModalView,
    setImportToken
  } = _ref2;
  const {
    chainId
  } = useActiveWeb3React();
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme(); // manage focus on modal show

  const inputRef = useRef();
  const handleInput = useCallback(event => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
  }, []); // if they input an address, use it

  const isAddressSearch = isAddress(searchQuery);
  const searchToken = useToken(searchQuery); // all tokens for local lisr

  const userAddedTokens = useUserAddedTokens();
  const removeToken = useRemoveUserAddedToken();
  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map(token => {
        return removeToken(chainId, token.address);
      });
    }
  }, [removeToken, userAddedTokens, chainId]);
  const tokenList = useMemo(() => {
    return chainId && userAddedTokens.map(token => /*#__PURE__*/_jsxs(RowBetween, {
      width: "100%",
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          currency: token,
          size: '20px'
        }), /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS),
          children: /*#__PURE__*/_jsx(ThemedText.Main, {
            ml: '10px',
            fontWeight: 600,
            children: token.symbol
          })
        })]
      }), /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(TrashIcon, {
          onClick: () => removeToken(chainId, token.address)
        }), /*#__PURE__*/_jsx(ExternalLinkIcon, {
          href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)
        })]
      })]
    }, token.address));
  }, [userAddedTokens, chainId, removeToken]);
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(Column, {
      style: {
        width: '100%',
        height: '100%',
        flex: '1 1'
      },
      children: [/*#__PURE__*/_jsxs(PaddedColumn, {
        gap: "14px",
        children: [/*#__PURE__*/_jsx(Row, {
          children: /*#__PURE__*/_jsx(SearchInput, {
            type: "text",
            id: "token-search-input",
            placeholder: '0x0000',
            value: searchQuery,
            autoComplete: "off",
            ref: inputRef,
            onChange: handleInput
          })
        }), searchQuery !== '' && !isAddressSearch && /*#__PURE__*/_jsx(ThemedText.Error, {
          error: true,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Enter valid token address"
          })
        }), searchToken && /*#__PURE__*/_jsx(Card, {
          backgroundColor: theme.bg2,
          padding: "10px 0",
          children: /*#__PURE__*/_jsx(ImportRow, {
            token: searchToken,
            showImportView: () => setModalView(CurrencyModalView.importToken),
            setImportToken: setImportToken,
            style: {
              height: 'fit-content'
            }
          })
        })]
      }), /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsxs(PaddedColumn, {
        gap: "lg",
        style: {
          overflow: 'auto',
          marginBottom: '10px'
        },
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Main, {
            fontWeight: 600,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} Custom Tokens",
              values: {
                0: userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length
              }
            })
          }), userAddedTokens.length > 0 && /*#__PURE__*/_jsx(ButtonText, {
            onClick: handleRemoveAll,
            children: /*#__PURE__*/_jsx(ThemedText.Blue, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Clear all"
              })
            })
          })]
        }), tokenList]
      })]
    }), /*#__PURE__*/_jsx(Footer, {
      children: /*#__PURE__*/_jsx(ThemedText.DarkGray, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Tip: Custom tokens are stored locally in your browser"
        })
      })
    })]
  });
}