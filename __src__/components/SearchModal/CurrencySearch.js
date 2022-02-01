import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import useDebounce from 'hooks/useDebounce';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import useTheme from 'hooks/useTheme';
import useToggle from 'hooks/useToggle';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Edit } from 'react-feather';
import ReactGA from 'react-ga';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Text } from 'rebass';
import { ExtendedEther } from '../../constants/tokens';
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from '../../hooks/Tokens';
import { useActiveWeb3React } from '../../hooks/web3';
import { ButtonText, CloseIcon, IconWrapper, ThemedText } from '../../theme';
import { isAddress } from '../../utils';
import Column from '../Column';
import Row, { RowBetween, RowFixed } from '../Row';
import CommonBases from './CommonBases';
import CurrencyList from './CurrencyList';
import { filterTokens, useSortedTokensByQuery } from './filtering';
import ImportRow from './ImportRow';
import { useTokenComparator } from './sorting';
import { PaddedColumn, SearchInput, Separator } from './styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ContentWrapper = _styled(Column).withConfig({
  displayName: "CurrencySearch__ContentWrapper",
  componentId: "sc-1it7zu4-0"
})(["width:100%;flex:1 1;position:relative;"]);

const Footer = _styled.div.withConfig({
  displayName: "CurrencySearch__Footer",
  componentId: "sc-1it7zu4-1"
})(["width:100%;border-radius:20px;padding:20px;border-top-left-radius:0;border-top-right-radius:0;background-color:", ";border-top:1px solid ", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
});

export function CurrencySearch(_ref3) {
  let {
    selectedCurrency,
    onCurrencySelect,
    otherSelectedCurrency,
    showCommonBases,
    showCurrencyAmount,
    disableNonToken,
    onDismiss,
    isOpen,
    showManageView,
    showImportView,
    setImportToken
  } = _ref3;
  const {
    chainId
  } = useActiveWeb3React();
  const theme = useTheme(); // refs for fixed size lists

  const fixedList = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);
  const [invertSearchOrder] = useState(false);
  const allTokens = useAllTokens(); // if they input an address, use it

  const isAddressSearch = isAddress(debouncedQuery);
  const searchToken = useToken(debouncedQuery);
  const searchTokenIsAdded = useIsUserAddedToken(searchToken);
  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch
      });
    }
  }, [isAddressSearch]);
  const tokenComparator = useTokenComparator(invertSearchOrder);
  const filteredTokens = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery);
  }, [allTokens, debouncedQuery]);
  const sortedTokens = useMemo(() => {
    return filteredTokens.sort(tokenComparator);
  }, [filteredTokens, tokenComparator]);
  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery);
  const ether = useMemo(() => chainId && ExtendedEther.onChain(chainId), [chainId]);
  const filteredSortedTokensWithETH = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim();

    if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens;
    }

    return filteredSortedTokens;
  }, [debouncedQuery, ether, filteredSortedTokens]);
  const handleCurrencySelect = useCallback(currency => {
    onCurrencySelect(currency);
    onDismiss();
  }, [onDismiss, onCurrencySelect]); // clear the input on open

  useEffect(() => {
    if (isOpen) setSearchQuery('');
  }, [isOpen]); // manage focus on modal show

  const inputRef = useRef();
  const handleInput = useCallback(event => {
    var _fixedList$current;

    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    (_fixedList$current = fixedList.current) === null || _fixedList$current === void 0 ? void 0 : _fixedList$current.scrollTo(0);
  }, []);
  const handleEnter = useCallback(e => {
    if (e.key === 'Enter') {
      const s = debouncedQuery.toLowerCase().trim();

      if (s === 'eth' && ether) {
        handleCurrencySelect(ether);
      } else if (filteredSortedTokensWithETH.length > 0) {
        var _filteredSortedTokens;

        if (((_filteredSortedTokens = filteredSortedTokensWithETH[0].symbol) === null || _filteredSortedTokens === void 0 ? void 0 : _filteredSortedTokens.toLowerCase()) === debouncedQuery.trim().toLowerCase() || filteredSortedTokensWithETH.length === 1) {
          handleCurrencySelect(filteredSortedTokensWithETH[0]);
        }
      }
    }
  }, [debouncedQuery, ether, filteredSortedTokensWithETH, handleCurrencySelect]); // menu ui

  const [open, toggle] = useToggle(false);
  const node = useRef();
  useOnClickOutside(node, open ? toggle : undefined); // if no results on main list, show option to expand into inactive

  const filteredInactiveTokens = useSearchInactiveTokenLists(filteredTokens.length === 0 || debouncedQuery.length > 2 && !isAddressSearch ? debouncedQuery : undefined);
  return /*#__PURE__*/_jsxs(ContentWrapper, {
    children: [/*#__PURE__*/_jsxs(PaddedColumn, {
      gap: "16px",
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 16,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Select a token"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      }), /*#__PURE__*/_jsx(Row, {
        children: /*#__PURE__*/_jsx(SearchInput, {
          type: "text",
          id: "token-search-input",
          placeholder:
          /*i18n*/
          i18n._("Search name or paste address"),
          autoComplete: "off",
          value: searchQuery,
          ref: inputRef,
          onChange: handleInput,
          onKeyDown: handleEnter
        })
      }), showCommonBases && /*#__PURE__*/_jsx(CommonBases, {
        chainId: chainId,
        onSelect: handleCurrencySelect,
        selectedCurrency: selectedCurrency
      })]
    }), /*#__PURE__*/_jsx(Separator, {}), searchToken && !searchTokenIsAdded ? /*#__PURE__*/_jsx(Column, {
      style: {
        padding: '20px 0',
        height: '100%'
      },
      children: /*#__PURE__*/_jsx(ImportRow, {
        token: searchToken,
        showImportView: showImportView,
        setImportToken: setImportToken
      })
    }) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 ? /*#__PURE__*/_jsx("div", {
      style: {
        flex: '1'
      },
      children: /*#__PURE__*/_jsx(AutoSizer, {
        disableWidth: true,
        children: _ref4 => {
          let {
            height
          } = _ref4;
          return /*#__PURE__*/_jsx(CurrencyList, {
            height: height,
            currencies: disableNonToken ? filteredSortedTokens : filteredSortedTokensWithETH,
            otherListTokens: filteredInactiveTokens,
            onCurrencySelect: handleCurrencySelect,
            otherCurrency: otherSelectedCurrency,
            selectedCurrency: selectedCurrency,
            fixedListRef: fixedList,
            showImportView: showImportView,
            setImportToken: setImportToken,
            showCurrencyAmount: showCurrencyAmount
          });
        }
      })
    }) : /*#__PURE__*/_jsx(Column, {
      style: {
        padding: '20px',
        height: '100%'
      },
      children: /*#__PURE__*/_jsx(ThemedText.Main, {
        color: theme.text3,
        textAlign: "center",
        mb: "20px",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "No results found."
        })
      })
    }), /*#__PURE__*/_jsx(Footer, {
      children: /*#__PURE__*/_jsx(Row, {
        justify: "center",
        children: /*#__PURE__*/_jsx(ButtonText, {
          onClick: showManageView,
          color: theme.primary1,
          className: "list-token-manage-button",
          children: /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(IconWrapper, {
              size: "16px",
              marginRight: "6px",
              stroke: theme.primaryText1,
              children: /*#__PURE__*/_jsx(Edit, {})
            }), /*#__PURE__*/_jsx(ThemedText.Main, {
              color: theme.primaryText1,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Manage Token Lists"
              })
            })]
          })
        })
      })
    })]
  });
}