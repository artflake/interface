import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { Trade as V3Trade } from '@uniswap/v3-sdk';
import { LoadingOpacityContainer } from "../../components/Loader/styled";
import { NetworkAlert } from "../../components/NetworkAlert/NetworkAlert";
import { AdvancedSwapDetails } from "../../components/swap/AdvancedSwapDetails";
import { AutoRouterLogo } from "../../components/swap/RouterLabel";
import SwapRoute from "../../components/swap/SwapRoute";
import TradePrice from "../../components/swap/TradePrice";
import UnsupportedCurrencyFooter from "../../components/swap/UnsupportedCurrencyFooter";
import { MouseoverTooltip, MouseoverTooltipContent } from "../../components/Tooltip";
import JSBI from 'jsbi';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ArrowDown, CheckCircle, HelpCircle, Info } from 'react-feather';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { V3TradeState } from "../../state/routing/types";
import AddressInputPanel from "../../components/AddressInputPanel";
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from "../../components/Button";
import { GreyCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import CurrencyLogo from "../../components/CurrencyLogo";
import Loader from "../../components/Loader";
import Row, { AutoRow, RowFixed } from "../../components/Row";
import confirmPriceImpactWithoutFee from "../../components/swap/confirmPriceImpactWithoutFee";
import ConfirmSwapModal from "../../components/swap/ConfirmSwapModal";
import { ArrowWrapper, Dots, ResponsiveTooltipContainer, SwapCallbackError, Wrapper } from "../../components/swap/styleds";
import SwapHeader from "../../components/swap/SwapHeader";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import TokenWarningModal from "../../components/TokenWarningModal";
import { useAllTokens, useCurrency } from "../../hooks/Tokens";
import { ApprovalState, useApproveCallbackFromTrade } from "../../hooks/useApproveCallback";
import useENSAddress from "../../hooks/useENSAddress";
import { useERC20PermitFromTrade, UseERC20PermitState } from "../../hooks/useERC20Permit";
import useIsArgentWallet from "../../hooks/useIsArgentWallet";
import { useIsSwapUnsupported } from "../../hooks/useIsSwapUnsupported";
import { useSwapCallback } from "../../hooks/useSwapCallback";
import useToggledVersion from "../../hooks/useToggledVersion";
import { useUSDCValue } from "../../hooks/useUSDCPrice";
import useWrapCallback, { WrapType } from "../../hooks/useWrapCallback";
import { useActiveWeb3React } from "../../hooks/web3";
import { useWalletModalToggle } from "../../state/application/hooks";
import { Field } from "../../state/swap/actions";
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from "../../state/swap/hooks";
import { useExpertModeManager } from "../../state/user/hooks";
import { LinkStyledButton, ThemedText } from "../../theme";
import { computeFiatValuePriceImpact } from "../../utils/computeFiatValuePriceImpact";
import { getTradeVersion } from "../../utils/getTradeVersion";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { warningSeverity } from "../../utils/prices";
import AppBody from "../AppBody";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const StyledInfo = _styled(Info).withConfig({
  displayName: "Swap__StyledInfo",
  componentId: "sc-1es900k-0"
})(["height:16px;width:16px;margin-left:4px;color:", ";:hover{color:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text3;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text1;
});

export default function Swap(_ref3) {
  var _parsedAmounts$indepe3, _parsedAmounts$Field$, _currencies$Field$INP, _currencies$Field$INP2, _currencies$Field$INP3;

  let {
    history
  } = _ref3;
  const {
    account
  } = useActiveWeb3React();
  const loadedUrlParams = useDefaultsFromURLSearch(); // token warning stuff

  const [loadedInputCurrency, loadedOutputCurrency] = [useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.inputCurrencyId), useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.outputCurrencyId)];
  const [dismissTokenWarning, setDismissTokenWarning] = useState(false);
  const urlLoadedTokens = useMemo(() => {
    var _filter, _ref4;

    return (_filter = (_ref4 = [loadedInputCurrency, loadedOutputCurrency]) === null || _ref4 === void 0 ? void 0 : _ref4.filter(c => {
      var _c$isToken;

      return (_c$isToken = c === null || c === void 0 ? void 0 : c.isToken) !== null && _c$isToken !== void 0 ? _c$isToken : false;
    })) !== null && _filter !== void 0 ? _filter : [];
  }, [loadedInputCurrency, loadedOutputCurrency]);
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true);
  }, []); // dismiss warning if all imported tokens are in active lists

  const defaultTokens = useAllTokens();
  const importTokensNotInDefault = useMemo(() => urlLoadedTokens && urlLoadedTokens.filter(token => {
    return !Boolean(token.address in defaultTokens);
  }), [defaultTokens, urlLoadedTokens]);
  const theme = useContext(_ThemeContext); // toggle wallet when disconnected

  const toggleWalletModal = useWalletModalToggle(); // for expert mode

  const [isExpertMode] = useExpertModeManager(); // get version from the url

  const toggledVersion = useToggledVersion(); // swap state

  const {
    independentField,
    typedValue,
    recipient
  } = useSwapState();
  const {
    v3Trade: {
      state: v3TradeState
    },
    bestTrade: trade,
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError
  } = useDerivedSwapInfo(toggledVersion);
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue);
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE;
  const {
    address: recipientAddress
  } = useENSAddress(recipient);
  const parsedAmounts = useMemo(() => showWrap ? {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: parsedAmount
  } : {
    [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount,
    [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.outputAmount
  }, [independentField, parsedAmount, showWrap, trade]);
  const [routeNotFound, routeIsLoading, routeIsSyncing] = useMemo(() => [trade instanceof V3Trade ? !(trade !== null && trade !== void 0 && trade.swaps) : !(trade !== null && trade !== void 0 && trade.route), V3TradeState.LOADING === v3TradeState, V3TradeState.SYNCING === v3TradeState], [trade, v3TradeState]);
  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT]);
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT]);
  const priceImpact = routeIsSyncing ? undefined : computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput);
  const {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient
  } = useSwapActionHandlers();
  const isValid = !swapInputError;
  const dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
  const handleTypeInput = useCallback(value => {
    onUserInput(Field.INPUT, value);
  }, [onUserInput]);
  const handleTypeOutput = useCallback(value => {
    onUserInput(Field.OUTPUT, value);
  }, [onUserInput]); // reset if they close warning without tokens in params

  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true);
    history.push('/swap/');
  }, [history]); // modal and loading

  const [{
    showConfirm,
    tradeToConfirm,
    swapErrorMessage,
    attemptingTxn,
    txHash
  }, setSwapState] = useState({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined
  });
  const formattedAmounts = useMemo(() => {
    var _parsedAmounts$indepe, _parsedAmounts$indepe2, _parsedAmounts$depend, _parsedAmounts$depend2;

    return {
      [independentField]: typedValue,
      [dependentField]: showWrap ? (_parsedAmounts$indepe = (_parsedAmounts$indepe2 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe2 === void 0 ? void 0 : _parsedAmounts$indepe2.toExact()) !== null && _parsedAmounts$indepe !== void 0 ? _parsedAmounts$indepe : '' : (_parsedAmounts$depend = (_parsedAmounts$depend2 = parsedAmounts[dependentField]) === null || _parsedAmounts$depend2 === void 0 ? void 0 : _parsedAmounts$depend2.toSignificant(6)) !== null && _parsedAmounts$depend !== void 0 ? _parsedAmounts$depend : ''
    };
  }, [dependentField, independentField, parsedAmounts, showWrap, typedValue]);
  const userHasSpecifiedInputOutput = Boolean(currencies[Field.INPUT] && currencies[Field.OUTPUT] && ((_parsedAmounts$indepe3 = parsedAmounts[independentField]) === null || _parsedAmounts$indepe3 === void 0 ? void 0 : _parsedAmounts$indepe3.greaterThan(JSBI.BigInt(0)))); // check whether the user has approved the router on the input token

  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);
  const {
    state: signatureState,
    signatureData,
    gatherPermitSignature
  } = useERC20PermitFromTrade(trade, allowedSlippage);
  const handleApprove = useCallback(async () => {
    if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
      try {
        await gatherPermitSignature();
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
          await approveCallback();
        }
      }
    } else {
      await approveCallback();
      ReactGA.event({
        category: 'Swap',
        action: 'Approve',
        label: [trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency.symbol, toggledVersion].join('/')
      });
    }
  }, [approveCallback, gatherPermitSignature, signatureState, toggledVersion, trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency.symbol]); // check if user has gone through approval process, used to show two step buttons, reset on token change

  const [approvalSubmitted, setApprovalSubmitted] = useState(false); // mark when a user has submitted an approval, reset onTokenSelection for input field

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState, approvalSubmitted]);
  const maxInputAmount = useMemo(() => maxAmountSpend(currencyBalances[Field.INPUT]), [currencyBalances]);
  const showMaxButton = Boolean((maxInputAmount === null || maxInputAmount === void 0 ? void 0 : maxInputAmount.greaterThan(0)) && !((_parsedAmounts$Field$ = parsedAmounts[Field.INPUT]) !== null && _parsedAmounts$Field$ !== void 0 && _parsedAmounts$Field$.equalTo(maxInputAmount))); // the callback to execute the swap

  const {
    callback: swapCallback,
    error: swapCallbackError
  } = useSwapCallback(trade, allowedSlippage, recipient, signatureData);
  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return;
    }

    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return;
    }

    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      showConfirm,
      swapErrorMessage: undefined,
      txHash: undefined
    });
    swapCallback().then(hash => {
      var _trade$inputAmount, _trade$inputAmount$cu, _trade$outputAmount, _trade$outputAmount$c;

      setSwapState({
        attemptingTxn: false,
        tradeToConfirm,
        showConfirm,
        swapErrorMessage: undefined,
        txHash: hash
      });
      ReactGA.event({
        category: 'Swap',
        action: recipient === null ? 'Swap w/o Send' : (recipientAddress !== null && recipientAddress !== void 0 ? recipientAddress : recipient) === account ? 'Swap w/o Send + recipient' : 'Swap w/ Send',
        label: [trade === null || trade === void 0 ? void 0 : (_trade$inputAmount = trade.inputAmount) === null || _trade$inputAmount === void 0 ? void 0 : (_trade$inputAmount$cu = _trade$inputAmount.currency) === null || _trade$inputAmount$cu === void 0 ? void 0 : _trade$inputAmount$cu.symbol, trade === null || trade === void 0 ? void 0 : (_trade$outputAmount = trade.outputAmount) === null || _trade$outputAmount === void 0 ? void 0 : (_trade$outputAmount$c = _trade$outputAmount.currency) === null || _trade$outputAmount$c === void 0 ? void 0 : _trade$outputAmount$c.symbol, getTradeVersion(trade), 'MH'].join('/')
      });
    }).catch(error => {
      setSwapState({
        attemptingTxn: false,
        tradeToConfirm,
        showConfirm,
        swapErrorMessage: error.message,
        txHash: undefined
      });
    });
  }, [swapCallback, priceImpact, tradeToConfirm, showConfirm, recipient, recipientAddress, account, trade]); // errors

  const [showInverted, setShowInverted] = useState(false); // warnings on the greater of fiat value price impact and execution price impact

  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade === null || trade === void 0 ? void 0 : trade.priceImpact;
    return warningSeverity(executionPriceImpact && priceImpact ? executionPriceImpact.greaterThan(priceImpact) ? executionPriceImpact : priceImpact : executionPriceImpact !== null && executionPriceImpact !== void 0 ? executionPriceImpact : priceImpact);
  }, [priceImpact, trade]);
  const isArgentWallet = useIsArgentWallet(); // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode

  const showApproveFlow = !isArgentWallet && !swapInputError && (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING || approvalSubmitted && approvalState === ApprovalState.APPROVED) && !(priceImpactSeverity > 3 && !isExpertMode);
  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash
    }); // if there was a tx hash, we want to clear the input

    if (txHash) {
      onUserInput(Field.INPUT, '');
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
      showConfirm
    });
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash]);
  const handleInputSelect = useCallback(inputCurrency => {
    setApprovalSubmitted(false); // reset 2 step UI for approvals

    onCurrencySelection(Field.INPUT, inputCurrency);
  }, [onCurrencySelection]);
  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact());
    ReactGA.event({
      category: 'Swap',
      action: 'Max'
    });
  }, [maxInputAmount, onUserInput]);
  const handleOutputSelect = useCallback(outputCurrency => onCurrencySelection(Field.OUTPUT, outputCurrency), [onCurrencySelection]);
  const swapIsUnsupported = useIsSwapUnsupported(currencies[Field.INPUT], currencies[Field.OUTPUT]);
  const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(TokenWarningModal, {
      isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning,
      tokens: importTokensNotInDefault,
      onConfirm: handleConfirmTokenWarning,
      onDismiss: handleDismissTokenWarning
    }), /*#__PURE__*/_jsx(NetworkAlert, {}), /*#__PURE__*/_jsxs(AppBody, {
      children: [/*#__PURE__*/_jsx(SwapHeader, {
        allowedSlippage: allowedSlippage
      }), /*#__PURE__*/_jsxs(Wrapper, {
        id: "swap-page",
        children: [/*#__PURE__*/_jsx(ConfirmSwapModal, {
          isOpen: showConfirm,
          trade: trade,
          originalTrade: tradeToConfirm,
          onAcceptChanges: handleAcceptChanges,
          attemptingTxn: attemptingTxn,
          txHash: txHash,
          recipient: recipient,
          allowedSlippage: allowedSlippage,
          onConfirm: handleSwap,
          swapErrorMessage: swapErrorMessage,
          onDismiss: handleConfirmDismiss
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: 'sm',
          children: [/*#__PURE__*/_jsxs("div", {
            style: {
              display: 'relative'
            },
            children: [/*#__PURE__*/_jsx(CurrencyInputPanel, {
              label: independentField === Field.OUTPUT && !showWrap ? /*#__PURE__*/_jsx(Trans, {
                id: "From (at most)"
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "From"
              }),
              value: formattedAmounts[Field.INPUT],
              showMaxButton: showMaxButton,
              currency: currencies[Field.INPUT],
              onUserInput: handleTypeInput,
              onMax: handleMaxInput,
              fiatValue: fiatValueInput !== null && fiatValueInput !== void 0 ? fiatValueInput : undefined,
              onCurrencySelect: handleInputSelect,
              otherCurrency: currencies[Field.OUTPUT],
              showCommonBases: true,
              id: "swap-currency-input",
              loading: independentField === Field.OUTPUT && routeIsSyncing
            }), /*#__PURE__*/_jsx(ArrowWrapper, {
              clickable: true,
              children: /*#__PURE__*/_jsx(ArrowDown, {
                size: "16",
                onClick: () => {
                  setApprovalSubmitted(false); // reset 2 step UI for approvals

                  onSwitchTokens();
                },
                color: currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.text1 : theme.text3
              })
            }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
              value: formattedAmounts[Field.OUTPUT],
              onUserInput: handleTypeOutput,
              label: independentField === Field.INPUT && !showWrap ? /*#__PURE__*/_jsx(Trans, {
                id: "To (at least)"
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "To"
              }),
              showMaxButton: false,
              hideBalance: false,
              fiatValue: fiatValueOutput !== null && fiatValueOutput !== void 0 ? fiatValueOutput : undefined,
              priceImpact: priceImpact,
              currency: currencies[Field.OUTPUT],
              onCurrencySelect: handleOutputSelect,
              otherCurrency: currencies[Field.INPUT],
              showCommonBases: true,
              id: "swap-currency-output",
              loading: independentField === Field.INPUT && routeIsSyncing
            })]
          }), recipient !== null && !showWrap ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsxs(AutoRow, {
              justify: "space-between",
              style: {
                padding: '0 1rem'
              },
              children: [/*#__PURE__*/_jsx(ArrowWrapper, {
                clickable: false,
                children: /*#__PURE__*/_jsx(ArrowDown, {
                  size: "16",
                  color: theme.text2
                })
              }), /*#__PURE__*/_jsx(LinkStyledButton, {
                id: "remove-recipient-button",
                onClick: () => onChangeRecipient(null),
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "- Remove recipient"
                })
              })]
            }), /*#__PURE__*/_jsx(AddressInputPanel, {
              id: "recipient",
              value: recipient,
              onChange: onChangeRecipient
            })]
          }) : null, !showWrap && trade && /*#__PURE__*/_jsxs(Row, {
            justify: !trade ? 'center' : 'space-between',
            children: [/*#__PURE__*/_jsx(RowFixed, {
              style: {
                position: 'relative'
              },
              children: /*#__PURE__*/_jsx(MouseoverTooltipContent, {
                wrap: false,
                content: /*#__PURE__*/_jsx(ResponsiveTooltipContainer, {
                  children: /*#__PURE__*/_jsx(SwapRoute, {
                    trade: trade,
                    syncing: routeIsSyncing
                  })
                }),
                placement: "bottom",
                onOpen: () => ReactGA.event({
                  category: 'Swap',
                  action: 'Router Tooltip Open'
                }),
                children: /*#__PURE__*/_jsxs(AutoRow, {
                  gap: "4px",
                  width: "auto",
                  children: [/*#__PURE__*/_jsx(AutoRouterLogo, {}), /*#__PURE__*/_jsx(LoadingOpacityContainer, {
                    $loading: routeIsSyncing,
                    children: trade instanceof V3Trade && trade.swaps.length > 1 && /*#__PURE__*/_jsxs(ThemedText.Blue, {
                      fontSize: 14,
                      children: [trade.swaps.length, " routes"]
                    })
                  })]
                })
              })
            }), /*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(LoadingOpacityContainer, {
                $loading: routeIsSyncing,
                children: /*#__PURE__*/_jsx(TradePrice, {
                  price: trade.executionPrice,
                  showInverted: showInverted,
                  setShowInverted: setShowInverted
                })
              }), /*#__PURE__*/_jsx(MouseoverTooltipContent, {
                wrap: false,
                content: /*#__PURE__*/_jsx(ResponsiveTooltipContainer, {
                  origin: "top right",
                  width: '295px',
                  children: /*#__PURE__*/_jsx(AdvancedSwapDetails, {
                    trade: trade,
                    allowedSlippage: allowedSlippage,
                    syncing: routeIsSyncing
                  })
                }),
                placement: "bottom",
                onOpen: () => ReactGA.event({
                  category: 'Swap',
                  action: 'Transaction Details Tooltip Open'
                }),
                children: /*#__PURE__*/_jsx(StyledInfo, {})
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [swapIsUnsupported ? /*#__PURE__*/_jsx(ButtonPrimary, {
              disabled: true,
              children: /*#__PURE__*/_jsx(ThemedText.Main, {
                mb: "4px",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Unsupported Asset"
                })
              })
            }) : !account ? /*#__PURE__*/_jsx(ButtonLight, {
              onClick: toggleWalletModal,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Connect Wallet"
              })
            }) : showWrap ? /*#__PURE__*/_jsx(ButtonPrimary, {
              disabled: Boolean(wrapInputError),
              onClick: onWrap,
              children: wrapInputError !== null && wrapInputError !== void 0 ? wrapInputError : wrapType === WrapType.WRAP ? /*#__PURE__*/_jsx(Trans, {
                id: "Wrap"
              }) : wrapType === WrapType.UNWRAP ? /*#__PURE__*/_jsx(Trans, {
                id: "Unwrap"
              }) : null
            }) : routeIsSyncing || routeIsLoading ? /*#__PURE__*/_jsx(GreyCard, {
              style: {
                textAlign: 'center'
              },
              children: /*#__PURE__*/_jsx(ThemedText.Main, {
                mb: "4px",
                children: /*#__PURE__*/_jsx(Dots, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Loading"
                  })
                })
              })
            }) : routeNotFound && userHasSpecifiedInputOutput ? /*#__PURE__*/_jsx(GreyCard, {
              style: {
                textAlign: 'center'
              },
              children: /*#__PURE__*/_jsx(ThemedText.Main, {
                mb: "4px",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Insufficient liquidity for this trade."
                })
              })
            }) : showApproveFlow ? /*#__PURE__*/_jsx(AutoRow, {
              style: {
                flexWrap: 'nowrap',
                width: '100%'
              },
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                style: {
                  width: '100%'
                },
                gap: "12px",
                children: [/*#__PURE__*/_jsx(ButtonConfirmed, {
                  onClick: handleApprove,
                  disabled: approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted || signatureState === UseERC20PermitState.SIGNED,
                  width: "100%",
                  altDisabledStyle: approvalState === ApprovalState.PENDING // show solid button while waiting
                  ,
                  confirmed: approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED,
                  children: /*#__PURE__*/_jsxs(AutoRow, {
                    justify: "space-between",
                    style: {
                      flexWrap: 'nowrap'
                    },
                    children: [/*#__PURE__*/_jsxs("span", {
                      style: {
                        display: 'flex',
                        alignItems: 'center'
                      },
                      children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                        currency: currencies[Field.INPUT],
                        size: '20px',
                        style: {
                          marginRight: '8px',
                          flexShrink: 0
                        }
                      }), approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? /*#__PURE__*/_jsx(Trans, {
                        id: "You can now trade {0}",
                        values: {
                          0: (_currencies$Field$INP = currencies[Field.INPUT]) === null || _currencies$Field$INP === void 0 ? void 0 : _currencies$Field$INP.symbol
                        }
                      }) : /*#__PURE__*/_jsx(Trans, {
                        id: "Allow the Uniswap Protocol to use your {0}",
                        values: {
                          0: (_currencies$Field$INP2 = currencies[Field.INPUT]) === null || _currencies$Field$INP2 === void 0 ? void 0 : _currencies$Field$INP2.symbol
                        }
                      })]
                    }), approvalState === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Loader, {
                      stroke: "white"
                    }) : approvalSubmitted && approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? /*#__PURE__*/_jsx(CheckCircle, {
                      size: "20",
                      color: theme.green1
                    }) : /*#__PURE__*/_jsx(MouseoverTooltip, {
                      text: /*#__PURE__*/_jsx(Trans, {
                        id: "You must give the Uniswap smart contracts permission to use your {0}. You only have to do this once per token.",
                        values: {
                          0: (_currencies$Field$INP3 = currencies[Field.INPUT]) === null || _currencies$Field$INP3 === void 0 ? void 0 : _currencies$Field$INP3.symbol
                        }
                      }),
                      children: /*#__PURE__*/_jsx(HelpCircle, {
                        size: "20",
                        color: 'white',
                        style: {
                          marginLeft: '8px'
                        }
                      })
                    })]
                  })
                }), /*#__PURE__*/_jsx(ButtonError, {
                  onClick: () => {
                    if (isExpertMode) {
                      handleSwap();
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined
                      });
                    }
                  },
                  width: "100%",
                  id: "swap-button",
                  disabled: !isValid || approvalState !== ApprovalState.APPROVED && signatureState !== UseERC20PermitState.SIGNED || priceImpactTooHigh,
                  error: isValid && priceImpactSeverity > 2,
                  children: /*#__PURE__*/_jsx(Text, {
                    fontSize: 16,
                    fontWeight: 500,
                    children: priceImpactTooHigh ? /*#__PURE__*/_jsx(Trans, {
                      id: "High Price Impact"
                    }) : priceImpactSeverity > 2 ? /*#__PURE__*/_jsx(Trans, {
                      id: "Swap Anyway"
                    }) : /*#__PURE__*/_jsx(Trans, {
                      id: "Swap"
                    })
                  })
                })]
              })
            }) : /*#__PURE__*/_jsx(ButtonError, {
              onClick: () => {
                if (isExpertMode) {
                  handleSwap();
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    showConfirm: true,
                    txHash: undefined
                  });
                }
              },
              id: "swap-button",
              disabled: !isValid || priceImpactTooHigh || !!swapCallbackError,
              error: isValid && priceImpactSeverity > 2 && !swapCallbackError,
              children: /*#__PURE__*/_jsx(Text, {
                fontSize: 20,
                fontWeight: 500,
                children: swapInputError ? swapInputError : priceImpactTooHigh ? /*#__PURE__*/_jsx(Trans, {
                  id: "Price Impact Too High"
                }) : priceImpactSeverity > 2 ? /*#__PURE__*/_jsx(Trans, {
                  id: "Swap Anyway"
                }) : /*#__PURE__*/_jsx(Trans, {
                  id: "Swap"
                })
              })
            }), isExpertMode && swapErrorMessage ? /*#__PURE__*/_jsx(SwapCallbackError, {
              error: swapErrorMessage
            }) : null]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {}), !swapIsUnsupported ? null : /*#__PURE__*/_jsx(UnsupportedCurrencyFooter, {
      show: swapIsUnsupported,
      currencies: [currencies[Field.INPUT], currencies[Field.OUTPUT]]
    })]
  });
}