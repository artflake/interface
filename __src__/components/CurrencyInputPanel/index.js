import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { AutoColumn } from 'components/Column';
import { LoadingOpacityContainer, loadingOpacityMixin } from 'components/Loader/styled';
import { darken } from 'polished';
import { useCallback, useState } from 'react';
import { Lock } from 'react-feather';
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';
import useTheme from '../../hooks/useTheme';
import { useActiveWeb3React } from '../../hooks/web3';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { ThemedText } from '../../theme';
import { ButtonGray } from '../Button';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { Input as NumericalInput } from '../NumericalInput';
import { RowBetween, RowFixed } from '../Row';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import { FiatValue } from './FiatValue';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const InputPanel = _styled.div.withConfig({
  displayName: "CurrencyInputPanel__InputPanel",
  componentId: "sc-33m4yg-0"
})(["", " position:relative;border-radius:", ";background-color:", ";z-index:1;width:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexColumnNoWrap;
}, _ref2 => {
  let {
    hideInput
  } = _ref2;
  return hideInput ? '16px' : '20px';
}, _ref3 => {
  let {
    theme,
    hideInput
  } = _ref3;
  return hideInput ? 'transparent' : theme.bg2;
}, _ref4 => {
  let {
    hideInput
  } = _ref4;
  return hideInput ? '100%' : 'initial';
});

const FixedContainer = _styled.div.withConfig({
  displayName: "CurrencyInputPanel__FixedContainer",
  componentId: "sc-33m4yg-1"
})(["width:100%;height:100%;position:absolute;border-radius:20px;background-color:", ";opacity:0.95;display:flex;align-items:center;justify-content:center;z-index:2;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg1;
});

const Container = _styled.div.withConfig({
  displayName: "CurrencyInputPanel__Container",
  componentId: "sc-33m4yg-2"
})(["border-radius:", ";border:1px solid ", ";background-color:", ";width:", ";:focus,:hover{border:1px solid ", ";}"], _ref6 => {
  let {
    hideInput
  } = _ref6;
  return hideInput ? '16px' : '20px';
}, _ref7 => {
  let {
    theme,
    hideInput
  } = _ref7;
  return hideInput ? ' transparent' : theme.bg2;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg1;
}, _ref9 => {
  let {
    hideInput
  } = _ref9;
  return hideInput ? '100%' : 'initial';
}, _ref10 => {
  let {
    theme,
    hideInput
  } = _ref10;
  return hideInput ? ' transparent' : theme.bg3;
});

const CurrencySelect = _styled(ButtonGray).withConfig({
  displayName: "CurrencyInputPanel__CurrencySelect",
  componentId: "sc-33m4yg-3"
})(["visibility:", ";align-items:center;font-size:24px;font-weight:500;background-color:", ";color:", ";border-radius:16px;box-shadow:", ";box-shadow:0px 6px 10px rgba(0,0,0,0.075);outline:none;cursor:pointer;user-select:none;border:none;height:", ";width:", ";padding:0 8px;justify-content:space-between;margin-right:", ";:focus,:hover{background-color:", ";}"], _ref11 => {
  let {
    visible
  } = _ref11;
  return visible ? 'visible' : 'hidden';
}, _ref12 => {
  let {
    selected,
    theme
  } = _ref12;
  return selected ? theme.bg0 : theme.primary1;
}, _ref13 => {
  let {
    selected,
    theme
  } = _ref13;
  return selected ? theme.text1 : theme.white;
}, _ref14 => {
  let {
    selected
  } = _ref14;
  return selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)';
}, _ref15 => {
  let {
    hideInput
  } = _ref15;
  return hideInput ? '2.8rem' : '2.4rem';
}, _ref16 => {
  let {
    hideInput
  } = _ref16;
  return hideInput ? '100%' : 'initial';
}, _ref17 => {
  let {
    hideInput
  } = _ref17;
  return hideInput ? '0' : '12px';
}, _ref18 => {
  let {
    selected,
    theme
  } = _ref18;
  return selected ? theme.bg2 : darken(0.05, theme.primary1);
});

const InputRow = _styled.div.withConfig({
  displayName: "CurrencyInputPanel__InputRow",
  componentId: "sc-33m4yg-4"
})(["", " align-items:center;justify-content:space-between;padding:", ";"], _ref19 => {
  let {
    theme
  } = _ref19;
  return theme.flexRowNoWrap;
}, _ref20 => {
  let {
    selected
  } = _ref20;
  return selected ? ' 1rem 1rem 0.75rem 1rem' : '1rem 1rem 0.75rem 1rem';
});

const LabelRow = _styled.div.withConfig({
  displayName: "CurrencyInputPanel__LabelRow",
  componentId: "sc-33m4yg-5"
})(["", " align-items:center;color:", ";font-size:0.75rem;line-height:1rem;padding:0 1rem 1rem;span:hover{cursor:pointer;color:", ";}"], _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.flexRowNoWrap;
}, _ref22 => {
  let {
    theme
  } = _ref22;
  return theme.text1;
}, _ref23 => {
  let {
    theme
  } = _ref23;
  return darken(0.2, theme.text2);
});

const FiatRow = _styled(LabelRow).withConfig({
  displayName: "CurrencyInputPanel__FiatRow",
  componentId: "sc-33m4yg-6"
})(["justify-content:flex-end;"]);

const Aligner = _styled.span.withConfig({
  displayName: "CurrencyInputPanel__Aligner",
  componentId: "sc-33m4yg-7"
})(["display:flex;align-items:center;justify-content:space-between;width:100%;"]);

const StyledDropDown = _styled(DropDown).withConfig({
  displayName: "CurrencyInputPanel__StyledDropDown",
  componentId: "sc-33m4yg-8"
})(["margin:0 0.25rem 0 0.35rem;height:35%;path{stroke:", ";stroke-width:1.5px;}"], _ref24 => {
  let {
    selected,
    theme
  } = _ref24;
  return selected ? theme.text1 : theme.white;
});

const StyledTokenName = _styled.span.withConfig({
  displayName: "CurrencyInputPanel__StyledTokenName",
  componentId: "sc-33m4yg-9"
})(["", " font-size:", ";"], _ref25 => {
  let {
    active
  } = _ref25;
  return active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;';
}, _ref26 => {
  let {
    active
  } = _ref26;
  return active ? '18px' : '18px';
});

const StyledBalanceMax = _styled.button.withConfig({
  displayName: "CurrencyInputPanel__StyledBalanceMax",
  componentId: "sc-33m4yg-10"
})(["background-color:transparent;border:none;border-radius:12px;font-size:14px;font-weight:500;cursor:pointer;padding:0;color:", ";opacity:", ";pointer-events:", ";margin-left:0.25rem;:focus{outline:none;}", ";"], _ref27 => {
  let {
    theme
  } = _ref27;
  return theme.primaryText1;
}, _ref28 => {
  let {
    disabled
  } = _ref28;
  return !disabled ? 1 : 0.4;
}, _ref29 => {
  let {
    disabled
  } = _ref29;
  return !disabled ? 'initial' : 'none';
}, _ref30 => {
  let {
    theme
  } = _ref30;
  return theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `;
});

const StyledNumericalInput = _styled(NumericalInput).withConfig({
  displayName: "CurrencyInputPanel__StyledNumericalInput",
  componentId: "sc-33m4yg-11"
})(["", ""], loadingOpacityMixin);

export default function CurrencyInputPanel(_ref31) {
  let {
    value,
    onUserInput,
    onMax,
    showMaxButton,
    onCurrencySelect,
    currency,
    otherCurrency,
    id,
    showCommonBases,
    showCurrencyAmount,
    disableNonToken,
    renderBalance,
    fiatValue,
    priceImpact,
    hideBalance = false,
    pair = null,
    // used for double token logo
    hideInput = false,
    locked = false,
    loading = false,
    ...rest
  } = _ref31;
  const [modalOpen, setModalOpen] = useState(false);
  const {
    account
  } = useActiveWeb3React();
  const selectedCurrencyBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
  const theme = useTheme();
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  return /*#__PURE__*/_jsxs(InputPanel, {
    id: id,
    hideInput: hideInput,
    ...rest,
    children: [locked && /*#__PURE__*/_jsx(FixedContainer, {
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "sm",
        justify: "center",
        children: [/*#__PURE__*/_jsx(Lock, {}), /*#__PURE__*/_jsx(ThemedText.Label, {
          fontSize: "12px",
          textAlign: "center",
          padding: "0 12px",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "The market price is outside your specified price range. Single-asset deposit only."
          })
        })]
      })
    }), /*#__PURE__*/_jsxs(Container, {
      hideInput: hideInput,
      children: [/*#__PURE__*/_jsxs(InputRow, {
        style: hideInput ? {
          padding: '0',
          borderRadius: '8px'
        } : {},
        selected: !onCurrencySelect,
        children: [/*#__PURE__*/_jsx(CurrencySelect, {
          visible: currency !== undefined,
          selected: !!currency,
          hideInput: hideInput,
          className: "open-currency-select-button",
          onClick: () => {
            if (onCurrencySelect) {
              setModalOpen(true);
            }
          },
          children: /*#__PURE__*/_jsxs(Aligner, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [pair ? /*#__PURE__*/_jsx("span", {
                style: {
                  marginRight: '0.5rem'
                },
                children: /*#__PURE__*/_jsx(DoubleCurrencyLogo, {
                  currency0: pair.token0,
                  currency1: pair.token1,
                  size: 24,
                  margin: true
                })
              }) : currency ? /*#__PURE__*/_jsx(CurrencyLogo, {
                style: {
                  marginRight: '0.5rem'
                },
                currency: currency,
                size: '24px'
              }) : null, pair ? /*#__PURE__*/_jsxs(StyledTokenName, {
                className: "pair-name-container",
                children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol]
              }) : /*#__PURE__*/_jsx(StyledTokenName, {
                className: "token-symbol-container",
                active: Boolean(currency && currency.symbol),
                children: (currency && currency.symbol && currency.symbol.length > 20 ? currency.symbol.slice(0, 4) + '...' + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length) : currency === null || currency === void 0 ? void 0 : currency.symbol) || /*#__PURE__*/_jsx(Trans, {
                  id: "Select a token"
                })
              })]
            }), onCurrencySelect && /*#__PURE__*/_jsx(StyledDropDown, {
              selected: !!currency
            })]
          })
        }), !hideInput && /*#__PURE__*/_jsx(StyledNumericalInput, {
          className: "token-amount-input",
          value: value,
          onUserInput: onUserInput,
          $loading: loading
        })]
      }), !hideInput && !hideBalance && /*#__PURE__*/_jsx(FiatRow, {
        children: /*#__PURE__*/_jsxs(RowBetween, {
          children: [account ? /*#__PURE__*/_jsxs(RowFixed, {
            style: {
              height: '17px'
            },
            children: [/*#__PURE__*/_jsx(ThemedText.Body, {
              onClick: onMax,
              color: theme.text2,
              fontWeight: 400,
              fontSize: 14,
              style: {
                display: 'inline',
                cursor: 'pointer'
              },
              children: !hideBalance && currency && selectedCurrencyBalance ? renderBalance ? renderBalance(selectedCurrencyBalance) : /*#__PURE__*/_jsx(Trans, {
                id: "Balance: {0} {1}",
                values: {
                  0: formatCurrencyAmount(selectedCurrencyBalance, 4),
                  1: currency.symbol
                }
              }) : null
            }), showMaxButton && selectedCurrencyBalance ? /*#__PURE__*/_jsx(StyledBalanceMax, {
              onClick: onMax,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "(Max)"
              })
            }) : null]
          }) : /*#__PURE__*/_jsx("span", {}), /*#__PURE__*/_jsx(LoadingOpacityContainer, {
            $loading: loading,
            children: /*#__PURE__*/_jsx(FiatValue, {
              fiatValue: fiatValue,
              priceImpact: priceImpact
            })
          })]
        })
      })]
    }), onCurrencySelect && /*#__PURE__*/_jsx(CurrencySearchModal, {
      isOpen: modalOpen,
      onDismiss: handleDismissSearch,
      onCurrencySelect: onCurrencySelect,
      selectedCurrency: currency,
      otherSelectedCurrency: otherCurrency,
      showCommonBases: showCommonBases,
      showCurrencyAmount: showCurrencyAmount,
      disableNonToken: disableNonToken
    })]
  });
}