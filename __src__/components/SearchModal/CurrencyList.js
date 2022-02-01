import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { LightGreyCard } from 'components/Card';
import QuestionHelper from 'components/QuestionHelper';
import useTheme from 'hooks/useTheme';
import { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { Text } from 'rebass';
import TokenListLogo from '../../assets/svg/tokenlist.svg';
import { useIsUserAddedToken } from '../../hooks/Tokens';
import { useActiveWeb3React } from '../../hooks/web3';
import { useCombinedActiveList } from '../../state/lists/hooks';
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { ThemedText } from '../../theme';
import { isTokenOnList } from '../../utils';
import Column from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import Loader from '../Loader';
import { RowBetween, RowFixed } from '../Row';
import { MouseoverTooltip } from '../Tooltip';
import ImportRow from './ImportRow';
import { MenuItem } from './styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function currencyKey(currency) {
  return currency.isToken ? currency.address : 'ETHER';
}

const StyledBalanceText = _styled(Text).withConfig({
  displayName: "CurrencyList__StyledBalanceText",
  componentId: "sc-1fzrxat-0"
})(["white-space:nowrap;overflow:hidden;max-width:5rem;text-overflow:ellipsis;"]);

const Tag = _styled.div.withConfig({
  displayName: "CurrencyList__Tag",
  componentId: "sc-1fzrxat-1"
})(["background-color:", ";color:", ";font-size:14px;border-radius:4px;padding:0.25rem 0.3rem 0.25rem 0.3rem;max-width:6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;justify-self:flex-end;margin-right:4px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg3;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text2;
});

const FixedContentRow = _styled.div.withConfig({
  displayName: "CurrencyList__FixedContentRow",
  componentId: "sc-1fzrxat-2"
})(["padding:4px 20px;height:56px;display:grid;grid-gap:16px;align-items:center;"]);

function Balance(_ref3) {
  let {
    balance
  } = _ref3;
  return /*#__PURE__*/_jsx(StyledBalanceText, {
    title: balance.toExact(),
    children: balance.toSignificant(4)
  });
}

const TagContainer = _styled.div.withConfig({
  displayName: "CurrencyList__TagContainer",
  componentId: "sc-1fzrxat-3"
})(["display:flex;justify-content:flex-end;"]);

const TokenListLogoWrapper = _styled.img.withConfig({
  displayName: "CurrencyList__TokenListLogoWrapper",
  componentId: "sc-1fzrxat-4"
})(["height:20px;"]);

function TokenTags(_ref4) {
  let {
    currency
  } = _ref4;

  if (!(currency instanceof WrappedTokenInfo)) {
    return /*#__PURE__*/_jsx("span", {});
  }

  const tags = currency.tags;
  if (!tags || tags.length === 0) return /*#__PURE__*/_jsx("span", {});
  const tag = tags[0];
  return /*#__PURE__*/_jsxs(TagContainer, {
    children: [/*#__PURE__*/_jsx(MouseoverTooltip, {
      text: tag.description,
      children: /*#__PURE__*/_jsx(Tag, {
        children: tag.name
      }, tag.id)
    }), tags.length > 1 ? /*#__PURE__*/_jsx(MouseoverTooltip, {
      text: tags.slice(1).map(_ref5 => {
        let {
          name,
          description
        } = _ref5;
        return `${name}: ${description}`;
      }).join('; \n'),
      children: /*#__PURE__*/_jsx(Tag, {
        children: "..."
      })
    }) : null]
  });
}

function CurrencyRow(_ref6) {
  let {
    currency,
    onSelect,
    isSelected,
    otherSelected,
    style,
    showCurrencyAmount
  } = _ref6;
  const {
    account
  } = useActiveWeb3React();
  const key = currencyKey(currency);
  const selectedTokenList = useCombinedActiveList();
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency.isToken ? currency : undefined);
  const customAdded = useIsUserAddedToken(currency);
  const balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency); // only show add or remove buttons if not on selected list

  return /*#__PURE__*/_jsxs(MenuItem, {
    style: style,
    className: `token-item-${key}`,
    onClick: () => isSelected ? null : onSelect(),
    disabled: isSelected,
    selected: otherSelected,
    children: [/*#__PURE__*/_jsx(CurrencyLogo, {
      currency: currency,
      size: '24px'
    }), /*#__PURE__*/_jsxs(Column, {
      children: [/*#__PURE__*/_jsx(Text, {
        title: currency.name,
        fontWeight: 500,
        children: currency.symbol
      }), /*#__PURE__*/_jsx(ThemedText.DarkGray, {
        ml: "0px",
        fontSize: '12px',
        fontWeight: 300,
        children: !currency.isNative && !isOnSelectedList && customAdded ? /*#__PURE__*/_jsx(Trans, {
          id: "{0} \u2022 Added by user",
          values: {
            0: currency.name
          }
        }) : currency.name
      })]
    }), /*#__PURE__*/_jsx(TokenTags, {
      currency: currency
    }), showCurrencyAmount && /*#__PURE__*/_jsx(RowFixed, {
      style: {
        justifySelf: 'flex-end'
      },
      children: balance ? /*#__PURE__*/_jsx(Balance, {
        balance: balance
      }) : account ? /*#__PURE__*/_jsx(Loader, {}) : null
    })]
  });
}

const BREAK_LINE = 'BREAK';

function isBreakLine(x) {
  return x === BREAK_LINE;
}

function BreakLineComponent(_ref7) {
  let {
    style
  } = _ref7;
  const theme = useTheme();
  return /*#__PURE__*/_jsx(FixedContentRow, {
    style: style,
    children: /*#__PURE__*/_jsx(LightGreyCard, {
      padding: "8px 12px",
      $borderRadius: "8px",
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(TokenListLogoWrapper, {
            src: TokenListLogo
          }), /*#__PURE__*/_jsx(ThemedText.Main, {
            ml: "6px",
            fontSize: "12px",
            color: theme.text1,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Expanded results from inactive Token Lists"
            })
          })]
        }), /*#__PURE__*/_jsx(QuestionHelper, {
          text: /*#__PURE__*/_jsx(Trans, {
            id: "Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists."
          })
        })]
      })
    })
  });
}

export default function CurrencyList(_ref8) {
  let {
    height,
    currencies,
    otherListTokens,
    selectedCurrency,
    onCurrencySelect,
    otherCurrency,
    fixedListRef,
    showImportView,
    setImportToken,
    showCurrencyAmount
  } = _ref8;
  const itemData = useMemo(() => {
    if (otherListTokens && (otherListTokens === null || otherListTokens === void 0 ? void 0 : otherListTokens.length) > 0) {
      return [...currencies, BREAK_LINE, ...otherListTokens];
    }

    return currencies;
  }, [currencies, otherListTokens]);
  const Row = useCallback(function TokenRow(_ref9) {
    let {
      data,
      index,
      style
    } = _ref9;
    const row = data[index];

    if (isBreakLine(row)) {
      return /*#__PURE__*/_jsx(BreakLineComponent, {
        style: style
      });
    }

    const currency = row;
    const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency));
    const otherSelected = Boolean(currency && otherCurrency && otherCurrency.equals(currency));

    const handleSelect = () => currency && onCurrencySelect(currency);

    const token = currency === null || currency === void 0 ? void 0 : currency.wrapped;
    const showImport = index > currencies.length;

    if (showImport && token) {
      return /*#__PURE__*/_jsx(ImportRow, {
        style: style,
        token: token,
        showImportView: showImportView,
        setImportToken: setImportToken,
        dim: true
      });
    } else if (currency) {
      return /*#__PURE__*/_jsx(CurrencyRow, {
        style: style,
        currency: currency,
        isSelected: isSelected,
        onSelect: handleSelect,
        otherSelected: otherSelected,
        showCurrencyAmount: showCurrencyAmount
      });
    } else {
      return null;
    }
  }, [currencies.length, onCurrencySelect, otherCurrency, selectedCurrency, setImportToken, showImportView, showCurrencyAmount]);
  const itemKey = useCallback((index, data) => {
    const currency = data[index];
    if (isBreakLine(currency)) return BREAK_LINE;
    return currencyKey(currency);
  }, []);
  return /*#__PURE__*/_jsx(FixedSizeList, {
    height: height,
    ref: fixedListRef,
    width: "100%",
    itemData: itemData,
    itemCount: itemData.length,
    itemSize: 56,
    itemKey: itemKey,
    children: Row
  });
}