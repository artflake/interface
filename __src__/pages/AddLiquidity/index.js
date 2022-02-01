import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { BigNumber } from '@ethersproject/bignumber';
import { Percent } from '@uniswap/sdk-core';
import { FeeAmount, NonfungiblePositionManager } from '@uniswap/v3-sdk';
import DowntimeWarning from "../../components/DowntimeWarning";
import UnsupportedCurrencyFooter from "../../components/swap/UnsupportedCurrencyFooter";
import { useCallback, useContext, useEffect, useState } from 'react';
import { AlertTriangle } from 'react-feather';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { useRangeHopCallbacks, useV3DerivedMintInfo, useV3MintActionHandlers, useV3MintState } from "../../state/mint/v3/hooks";
import { ButtonError, ButtonLight, ButtonPrimary, ButtonText, ButtonYellow } from "../../components/Button";
import { BlueCard, OutlineCard, YellowCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import FeeSelector from "../../components/FeeSelector";
import HoverInlineText from "../../components/HoverInlineText";
import LiquidityChartRangeInput from "../../components/LiquidityChartRangeInput";
import { AddRemoveTabs } from "../../components/NavigationTabs";
import { PositionPreview } from "../../components/PositionPreview";
import RangeSelector from "../../components/RangeSelector";
import PresetsButtons from "../../components/RangeSelector/PresetsButtons";
import RateToggle from "../../components/RateToggle";
import Row, { AutoRow, RowBetween, RowFixed } from "../../components/Row";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import TransactionConfirmationModal, { ConfirmationModalContent } from "../../components/TransactionConfirmationModal";
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from "../../constants/addresses";
import { ZERO_PERCENT } from "../../constants/misc";
import { WETH9_EXTENDED } from "../../constants/tokens";
import { useCurrency } from "../../hooks/Tokens";
import { ApprovalState, useApproveCallback } from "../../hooks/useApproveCallback";
import { useArgentWalletContract } from "../../hooks/useArgentWalletContract";
import { useV3NFTPositionManagerContract } from "../../hooks/useContract";
import { useDerivedPositionInfo } from "../../hooks/useDerivedPositionInfo";
import { useIsSwapUnsupported } from "../../hooks/useIsSwapUnsupported";
import useTransactionDeadline from "../../hooks/useTransactionDeadline";
import { useUSDCValue } from "../../hooks/useUSDCPrice";
import { useV3PositionFromTokenId } from "../../hooks/useV3Positions";
import { useActiveWeb3React } from "../../hooks/web3";
import { useWalletModalToggle } from "../../state/application/hooks";
import { Bound, Field } from "../../state/mint/v3/actions";
import { TransactionType } from "../../state/transactions/actions";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { useIsExpertMode, useUserSlippageToleranceWithDefault } from "../../state/user/hooks";
import { ExternalLink, ThemedText } from "../../theme";
import approveAmountCalldata from "../../utils/approveAmountCalldata";
import { calculateGasMargin } from "../../utils/calculateGasMargin";
import { currencyId } from "../../utils/currencyId";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { Dots } from "../Pool/styleds";
import { Review } from "./Review";
import { CurrencyDropdown, DynamicSection, HideMedium, MediumOnly, PageWrapper, ResponsiveTwoColumns, RightContainer, ScrollablePage, StackedContainer, StackedItem, StyledInput, Wrapper } from "./styled";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10000);
export default function AddLiquidity(_ref) {
  var _parsedAmounts$depend, _parsedAmounts$depend2, _parsedAmounts$Field$7, _currencies$Field$CUR3, _parsedAmounts$Field$8, _currencies$Field$CUR4, _currencies$Field$CUR9, _currencies$Field$CUR10, _currencies$Field$CUR11, _currencies$Field$CUR12, _price$invert;

  let {
    match: {
      params: {
        currencyIdA,
        currencyIdB,
        feeAmount: feeAmountFromUrl,
        tokenId
      }
    },
    history
  } = _ref;
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const theme = useContext(_ThemeContext);
  const toggleWalletModal = useWalletModalToggle(); // toggle wallet when disconnected

  const expertMode = useIsExpertMode();
  const addTransaction = useTransactionAdder();
  const positionManager = useV3NFTPositionManagerContract(); // check for existing position if tokenId in url

  const {
    position: existingPositionDetails,
    loading: positionLoading
  } = useV3PositionFromTokenId(tokenId ? BigNumber.from(tokenId) : undefined);
  const hasExistingPosition = !!existingPositionDetails && !positionLoading;
  const {
    position: existingPosition
  } = useDerivedPositionInfo(existingPositionDetails); // fee selection from url

  const feeAmount = feeAmountFromUrl && Object.values(FeeAmount).includes(parseFloat(feeAmountFromUrl)) ? parseFloat(feeAmountFromUrl) : undefined;
  const baseCurrency = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB); // prevent an error if they input ETH/WETH

  const quoteCurrency = baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB; // mint state

  const {
    independentField,
    typedValue,
    startPriceTypedValue
  } = useV3MintState();
  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    parsedAmounts,
    currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit
  } = useV3DerivedMintInfo(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, existingPosition);
  const {
    onFieldAInput,
    onFieldBInput,
    onLeftRangeInput,
    onRightRangeInput,
    onStartPriceInput
  } = useV3MintActionHandlers(noLiquidity);
  const isValid = !errorMessage && !invalidRange; // modal and loading

  const [showConfirm, setShowConfirm] = useState(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm
  // capital efficiency warning

  const [showCapitalEfficiencyWarning, setShowCapitalEfficiencyWarning] = useState(false);
  useEffect(() => setShowCapitalEfficiencyWarning(false), [baseCurrency, quoteCurrency, feeAmount]); // txn values

  const deadline = useTransactionDeadline(); // custom from users settings

  const [txHash, setTxHash] = useState(''); // get formatted amounts

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: (_parsedAmounts$depend = (_parsedAmounts$depend2 = parsedAmounts[dependentField]) === null || _parsedAmounts$depend2 === void 0 ? void 0 : _parsedAmounts$depend2.toSignificant(6)) !== null && _parsedAmounts$depend !== void 0 ? _parsedAmounts$depend : ''
  };
  const usdcValues = {
    [Field.CURRENCY_A]: useUSDCValue(parsedAmounts[Field.CURRENCY_A]),
    [Field.CURRENCY_B]: useUSDCValue(parsedAmounts[Field.CURRENCY_B])
  }; // get the max amounts user can add

  const maxAmounts = [Field.CURRENCY_A, Field.CURRENCY_B].reduce((accumulator, field) => {
    return { ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field])
    };
  }, {});
  const atMaxAmounts = [Field.CURRENCY_A, Field.CURRENCY_B].reduce((accumulator, field) => {
    var _maxAmounts$field, _parsedAmounts$field;

    return { ...accumulator,
      [field]: (_maxAmounts$field = maxAmounts[field]) === null || _maxAmounts$field === void 0 ? void 0 : _maxAmounts$field.equalTo((_parsedAmounts$field = parsedAmounts[field]) !== null && _parsedAmounts$field !== void 0 ? _parsedAmounts$field : '0')
    };
  }, {});
  const argentWalletContract = useArgentWalletContract(); // check whether the user has approved the router on the tokens

  const [approvalA, approveACallback] = useApproveCallback(argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_A], chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined);
  const [approvalB, approveBCallback] = useApproveCallback(argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_B], chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined);
  const allowedSlippage = useUserSlippageToleranceWithDefault(outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE);

  async function onAdd() {
    if (!chainId || !library || !account) return;

    if (!positionManager || !baseCurrency || !quoteCurrency) {
      return;
    }

    if (position && account && deadline) {
      const useNative = baseCurrency.isNative ? baseCurrency : quoteCurrency.isNative ? quoteCurrency : undefined;
      const {
        calldata,
        value
      } = hasExistingPosition && tokenId ? NonfungiblePositionManager.addCallParameters(position, {
        tokenId,
        slippageTolerance: allowedSlippage,
        deadline: deadline.toString(),
        useNative
      }) : NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: allowedSlippage,
        recipient: account,
        deadline: deadline.toString(),
        useNative,
        createPool: noLiquidity
      });
      let txn = {
        to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
        data: calldata,
        value
      };

      if (argentWalletContract) {
        const amountA = parsedAmounts[Field.CURRENCY_A];
        const amountB = parsedAmounts[Field.CURRENCY_B];
        const batch = [...(amountA && amountA.currency.isToken ? [approveAmountCalldata(amountA, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), ...(amountB && amountB.currency.isToken ? [approveAmountCalldata(amountB, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), {
          to: txn.to,
          data: txn.data,
          value: txn.value
        }];
        const data = argentWalletContract.interface.encodeFunctionData('wc_multiCall', [batch]);
        txn = {
          to: argentWalletContract.address,
          data,
          value: '0x0'
        };
      }

      setAttemptingTxn(true);
      library.getSigner().estimateGas(txn).then(estimate => {
        const newTxn = { ...txn,
          gasLimit: calculateGasMargin(estimate)
        };
        return library.getSigner().sendTransaction(newTxn).then(response => {
          var _parsedAmounts$Field$, _parsedAmounts$Field$2, _parsedAmounts$Field$3, _parsedAmounts$Field$4, _parsedAmounts$Field$5, _parsedAmounts$Field$6, _currencies$Field$CUR, _currencies$Field$CUR2;

          setAttemptingTxn(false);
          addTransaction(response, {
            type: TransactionType.ADD_LIQUIDITY_V3_POOL,
            baseCurrencyId: currencyId(baseCurrency),
            quoteCurrencyId: currencyId(quoteCurrency),
            createPool: Boolean(noLiquidity),
            expectedAmountBaseRaw: (_parsedAmounts$Field$ = (_parsedAmounts$Field$2 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : (_parsedAmounts$Field$3 = _parsedAmounts$Field$2.quotient) === null || _parsedAmounts$Field$3 === void 0 ? void 0 : _parsedAmounts$Field$3.toString()) !== null && _parsedAmounts$Field$ !== void 0 ? _parsedAmounts$Field$ : '0',
            expectedAmountQuoteRaw: (_parsedAmounts$Field$4 = (_parsedAmounts$Field$5 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$5 === void 0 ? void 0 : (_parsedAmounts$Field$6 = _parsedAmounts$Field$5.quotient) === null || _parsedAmounts$Field$6 === void 0 ? void 0 : _parsedAmounts$Field$6.toString()) !== null && _parsedAmounts$Field$4 !== void 0 ? _parsedAmounts$Field$4 : '0',
            feeAmount: position.pool.fee
          });
          setTxHash(response.hash);
          ReactGA.event({
            category: 'Liquidity',
            action: 'Add',
            label: [(_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol, (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol].join('/')
          });
        });
      }).catch(error => {
        console.error('Failed to send transaction', error);
        setAttemptingTxn(false); // we only care if the error is something _other_ than the user rejected the tx

        if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
          console.error(error);
        }
      });
    } else {
      return;
    }
  }

  const handleCurrencySelect = useCallback((currencyNew, currencyIdOther) => {
    const currencyIdNew = currencyId(currencyNew);

    if (currencyIdNew === currencyIdOther) {
      // not ideal, but for now clobber the other if the currency ids are equal
      return [currencyIdNew, undefined];
    } else {
      var _WETH9_EXTENDED$chain, _WETH9_EXTENDED$chain2;

      // prevent weth + eth
      const isETHOrWETHNew = currencyIdNew === 'ETH' || chainId !== undefined && currencyIdNew === ((_WETH9_EXTENDED$chain = WETH9_EXTENDED[chainId]) === null || _WETH9_EXTENDED$chain === void 0 ? void 0 : _WETH9_EXTENDED$chain.address);
      const isETHOrWETHOther = currencyIdOther !== undefined && (currencyIdOther === 'ETH' || chainId !== undefined && currencyIdOther === ((_WETH9_EXTENDED$chain2 = WETH9_EXTENDED[chainId]) === null || _WETH9_EXTENDED$chain2 === void 0 ? void 0 : _WETH9_EXTENDED$chain2.address));

      if (isETHOrWETHNew && isETHOrWETHOther) {
        return [currencyIdNew, undefined];
      } else {
        return [currencyIdNew, currencyIdOther];
      }
    }
  }, [chainId]);
  const handleCurrencyASelect = useCallback(currencyANew => {
    const [idA, idB] = handleCurrencySelect(currencyANew, currencyIdB);

    if (idB === undefined) {
      history.push(`/add/${idA}`);
    } else {
      history.push(`/add/${idA}/${idB}`);
    }
  }, [handleCurrencySelect, currencyIdB, history]);
  const handleCurrencyBSelect = useCallback(currencyBNew => {
    const [idB, idA] = handleCurrencySelect(currencyBNew, currencyIdA);

    if (idA === undefined) {
      history.push(`/add/${idB}`);
    } else {
      history.push(`/add/${idA}/${idB}`);
    }
  }, [handleCurrencySelect, currencyIdA, history]);
  const handleFeePoolSelect = useCallback(newFeeAmount => {
    onLeftRangeInput('');
    onRightRangeInput('');
    history.push(`/add/${currencyIdA}/${currencyIdB}/${newFeeAmount}`);
  }, [currencyIdA, currencyIdB, history, onLeftRangeInput, onRightRangeInput]);
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false); // if there was a tx hash, we want to clear the input

    if (txHash) {
      onFieldAInput(''); // dont jump to pool page if creating

      history.push('/pool');
    }

    setTxHash('');
  }, [history, onFieldAInput, txHash]);
  const addIsUnsupported = useIsSwapUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_A, currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_B);
  const clearAll = useCallback(() => {
    onFieldAInput('');
    onFieldBInput('');
    onLeftRangeInput('');
    onRightRangeInput('');
    history.push(`/add`);
  }, [history, onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput]); // get value and prices at ticks

  const {
    [Bound.LOWER]: tickLower,
    [Bound.UPPER]: tickUpper
  } = ticks;
  const {
    [Bound.LOWER]: priceLower,
    [Bound.UPPER]: priceUpper
  } = pricesAtTicks;
  const {
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
    getSetFullRange
  } = useRangeHopCallbacks(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, tickLower, tickUpper, pool); // we need an existence check on parsed amounts for single-asset deposits

  const showApprovalA = !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A];
  const showApprovalB = !argentWalletContract && approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B];
  const pendingText = `Supplying ${!depositADisabled ? (_parsedAmounts$Field$7 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$7 === void 0 ? void 0 : _parsedAmounts$Field$7.toSignificant(6) : ''} ${!depositADisabled ? (_currencies$Field$CUR3 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol : ''} ${!outOfRange ? 'and' : ''} ${!depositBDisabled ? (_parsedAmounts$Field$8 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$8 === void 0 ? void 0 : _parsedAmounts$Field$8.toSignificant(6) : ''} ${!depositBDisabled ? (_currencies$Field$CUR4 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol : ''}`;

  const Buttons = () => {
    var _currencies$Field$CUR5, _currencies$Field$CUR6, _currencies$Field$CUR7, _currencies$Field$CUR8;

    return addIsUnsupported ? /*#__PURE__*/_jsx(ButtonPrimary, {
      disabled: true,
      $borderRadius: "12px",
      padding: '12px',
      children: /*#__PURE__*/_jsx(ThemedText.Main, {
        mb: "4px",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Unsupported Asset"
        })
      })
    }) : !account ? /*#__PURE__*/_jsx(ButtonLight, {
      onClick: toggleWalletModal,
      $borderRadius: "12px",
      padding: '12px',
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Connect Wallet"
      })
    }) : /*#__PURE__*/_jsxs(AutoColumn, {
      gap: 'md',
      children: [(approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING || approvalB === ApprovalState.NOT_APPROVED || approvalB === ApprovalState.PENDING) && isValid && /*#__PURE__*/_jsxs(RowBetween, {
        children: [showApprovalA && /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: approveACallback,
          disabled: approvalA === ApprovalState.PENDING,
          width: showApprovalB ? '48%' : '100%',
          children: approvalA === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Approving {0}",
              values: {
                0: (_currencies$Field$CUR5 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR5 === void 0 ? void 0 : _currencies$Field$CUR5.symbol
              }
            })
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Approve {0}",
            values: {
              0: (_currencies$Field$CUR6 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR6 === void 0 ? void 0 : _currencies$Field$CUR6.symbol
            }
          })
        }), showApprovalB && /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: approveBCallback,
          disabled: approvalB === ApprovalState.PENDING,
          width: showApprovalA ? '48%' : '100%',
          children: approvalB === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Approving {0}",
              values: {
                0: (_currencies$Field$CUR7 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR7 === void 0 ? void 0 : _currencies$Field$CUR7.symbol
              }
            })
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Approve {0}",
            values: {
              0: (_currencies$Field$CUR8 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR8 === void 0 ? void 0 : _currencies$Field$CUR8.symbol
            }
          })
        })]
      }), /*#__PURE__*/_jsx(ButtonError, {
        onClick: () => {
          expertMode ? onAdd() : setShowConfirm(true);
        },
        disabled: !isValid || !argentWalletContract && approvalA !== ApprovalState.APPROVED && !depositADisabled || !argentWalletContract && approvalB !== ApprovalState.APPROVED && !depositBDisabled,
        error: !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B],
        children: /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          children: errorMessage ? errorMessage : /*#__PURE__*/_jsx(Trans, {
            id: "Preview"
          })
        })
      })]
    });
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(ScrollablePage, {
      children: [/*#__PURE__*/_jsx(DowntimeWarning, {}), /*#__PURE__*/_jsx(TransactionConfirmationModal, {
        isOpen: showConfirm,
        onDismiss: handleDismissConfirmation,
        attemptingTxn: attemptingTxn,
        hash: txHash,
        content: () => /*#__PURE__*/_jsx(ConfirmationModalContent, {
          title: /*#__PURE__*/_jsx(Trans, {
            id: "Add Liquidity"
          }),
          onDismiss: handleDismissConfirmation,
          topContent: () => /*#__PURE__*/_jsx(Review, {
            parsedAmounts: parsedAmounts,
            position: position,
            existingPosition: existingPosition,
            priceLower: priceLower,
            priceUpper: priceUpper,
            outOfRange: outOfRange,
            ticksAtLimit: ticksAtLimit
          }),
          bottomContent: () => /*#__PURE__*/_jsx(ButtonPrimary, {
            style: {
              marginTop: '1rem'
            },
            onClick: onAdd,
            children: /*#__PURE__*/_jsx(Text, {
              fontWeight: 500,
              fontSize: 20,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Add"
              })
            })
          })
        }),
        pendingText: pendingText
      }), /*#__PURE__*/_jsxs(PageWrapper, {
        wide: !hasExistingPosition,
        children: [/*#__PURE__*/_jsx(AddRemoveTabs, {
          creating: false,
          adding: true,
          positionID: tokenId,
          defaultSlippage: DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
          showBackLink: !hasExistingPosition,
          children: !hasExistingPosition && /*#__PURE__*/_jsxs(Row, {
            justifyContent: "flex-end",
            style: {
              width: 'fit-content',
              minWidth: 'fit-content'
            },
            children: [/*#__PURE__*/_jsx(MediumOnly, {
              children: /*#__PURE__*/_jsx(ButtonText, {
                onClick: clearAll,
                margin: "0 15px 0 0",
                children: /*#__PURE__*/_jsx(ThemedText.Blue, {
                  fontSize: "12px",
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Clear All"
                  })
                })
              })
            }), baseCurrency && quoteCurrency ? /*#__PURE__*/_jsx(RateToggle, {
              currencyA: baseCurrency,
              currencyB: quoteCurrency,
              handleRateToggle: () => {
                if (!ticksAtLimit[Bound.LOWER] && !ticksAtLimit[Bound.UPPER]) {
                  var _toSignificant, _ref2, _toSignificant2, _ref3, _formattedAmounts$Fie;

                  onLeftRangeInput((_toSignificant = (_ref2 = invertPrice ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert()) === null || _ref2 === void 0 ? void 0 : _ref2.toSignificant(6)) !== null && _toSignificant !== void 0 ? _toSignificant : '');
                  onRightRangeInput((_toSignificant2 = (_ref3 = invertPrice ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert()) === null || _ref3 === void 0 ? void 0 : _ref3.toSignificant(6)) !== null && _toSignificant2 !== void 0 ? _toSignificant2 : '');
                  onFieldAInput((_formattedAmounts$Fie = formattedAmounts[Field.CURRENCY_B]) !== null && _formattedAmounts$Fie !== void 0 ? _formattedAmounts$Fie : '');
                }

                history.push(`/add/${currencyIdB}/${currencyIdA}${feeAmount ? '/' + feeAmount : ''}`);
              }
            }) : null]
          })
        }), /*#__PURE__*/_jsx(Wrapper, {
          children: /*#__PURE__*/_jsxs(ResponsiveTwoColumns, {
            wide: !hasExistingPosition,
            children: [/*#__PURE__*/_jsxs(AutoColumn, {
              gap: "lg",
              children: [!hasExistingPosition && /*#__PURE__*/_jsxs(_Fragment, {
                children: [/*#__PURE__*/_jsxs(AutoColumn, {
                  gap: "md",
                  children: [/*#__PURE__*/_jsx(RowBetween, {
                    paddingBottom: "20px",
                    children: /*#__PURE__*/_jsx(ThemedText.Label, {
                      children: /*#__PURE__*/_jsx(Trans, {
                        id: "Select Pair"
                      })
                    })
                  }), /*#__PURE__*/_jsxs(RowBetween, {
                    children: [/*#__PURE__*/_jsx(CurrencyDropdown, {
                      value: formattedAmounts[Field.CURRENCY_A],
                      onUserInput: onFieldAInput,
                      hideInput: true,
                      onMax: () => {
                        var _maxAmounts$Field$CUR, _maxAmounts$Field$CUR2;

                        onFieldAInput((_maxAmounts$Field$CUR = (_maxAmounts$Field$CUR2 = maxAmounts[Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR2 === void 0 ? void 0 : _maxAmounts$Field$CUR2.toExact()) !== null && _maxAmounts$Field$CUR !== void 0 ? _maxAmounts$Field$CUR : '');
                      },
                      onCurrencySelect: handleCurrencyASelect,
                      showMaxButton: !atMaxAmounts[Field.CURRENCY_A],
                      currency: (_currencies$Field$CUR9 = currencies[Field.CURRENCY_A]) !== null && _currencies$Field$CUR9 !== void 0 ? _currencies$Field$CUR9 : null,
                      id: "add-liquidity-input-tokena",
                      showCommonBases: true
                    }), /*#__PURE__*/_jsx("div", {
                      style: {
                        width: '12px'
                      }
                    }), /*#__PURE__*/_jsx(CurrencyDropdown, {
                      value: formattedAmounts[Field.CURRENCY_B],
                      hideInput: true,
                      onUserInput: onFieldBInput,
                      onCurrencySelect: handleCurrencyBSelect,
                      onMax: () => {
                        var _maxAmounts$Field$CUR3, _maxAmounts$Field$CUR4;

                        onFieldBInput((_maxAmounts$Field$CUR3 = (_maxAmounts$Field$CUR4 = maxAmounts[Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR4 === void 0 ? void 0 : _maxAmounts$Field$CUR4.toExact()) !== null && _maxAmounts$Field$CUR3 !== void 0 ? _maxAmounts$Field$CUR3 : '');
                      },
                      showMaxButton: !atMaxAmounts[Field.CURRENCY_B],
                      currency: (_currencies$Field$CUR10 = currencies[Field.CURRENCY_B]) !== null && _currencies$Field$CUR10 !== void 0 ? _currencies$Field$CUR10 : null,
                      id: "add-liquidity-input-tokenb",
                      showCommonBases: true
                    })]
                  }), /*#__PURE__*/_jsx(FeeSelector, {
                    disabled: !quoteCurrency || !baseCurrency,
                    feeAmount: feeAmount,
                    handleFeePoolSelect: handleFeePoolSelect,
                    currencyA: baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined,
                    currencyB: quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined
                  })]
                }), ' ']
              }), hasExistingPosition && existingPosition && /*#__PURE__*/_jsx(PositionPreview, {
                position: existingPosition,
                title: /*#__PURE__*/_jsx(Trans, {
                  id: "Selected Range"
                }),
                inRange: !outOfRange,
                ticksAtLimit: ticksAtLimit
              })]
            }), /*#__PURE__*/_jsx("div", {
              children: /*#__PURE__*/_jsx(DynamicSection, {
                disabled: tickLower === undefined || tickUpper === undefined || invalidPool || invalidRange,
                children: /*#__PURE__*/_jsxs(AutoColumn, {
                  gap: "md",
                  children: [/*#__PURE__*/_jsx(ThemedText.Label, {
                    children: hasExistingPosition ? /*#__PURE__*/_jsx(Trans, {
                      id: "Add more liquidity"
                    }) : /*#__PURE__*/_jsx(Trans, {
                      id: "Deposit Amounts"
                    })
                  }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
                    value: formattedAmounts[Field.CURRENCY_A],
                    onUserInput: onFieldAInput,
                    onMax: () => {
                      var _maxAmounts$Field$CUR5, _maxAmounts$Field$CUR6;

                      onFieldAInput((_maxAmounts$Field$CUR5 = (_maxAmounts$Field$CUR6 = maxAmounts[Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR6 === void 0 ? void 0 : _maxAmounts$Field$CUR6.toExact()) !== null && _maxAmounts$Field$CUR5 !== void 0 ? _maxAmounts$Field$CUR5 : '');
                    },
                    showMaxButton: !atMaxAmounts[Field.CURRENCY_A],
                    currency: (_currencies$Field$CUR11 = currencies[Field.CURRENCY_A]) !== null && _currencies$Field$CUR11 !== void 0 ? _currencies$Field$CUR11 : null,
                    id: "add-liquidity-input-tokena",
                    fiatValue: usdcValues[Field.CURRENCY_A],
                    showCommonBases: true,
                    locked: depositADisabled
                  }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
                    value: formattedAmounts[Field.CURRENCY_B],
                    onUserInput: onFieldBInput,
                    onMax: () => {
                      var _maxAmounts$Field$CUR7, _maxAmounts$Field$CUR8;

                      onFieldBInput((_maxAmounts$Field$CUR7 = (_maxAmounts$Field$CUR8 = maxAmounts[Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR8 === void 0 ? void 0 : _maxAmounts$Field$CUR8.toExact()) !== null && _maxAmounts$Field$CUR7 !== void 0 ? _maxAmounts$Field$CUR7 : '');
                    },
                    showMaxButton: !atMaxAmounts[Field.CURRENCY_B],
                    fiatValue: usdcValues[Field.CURRENCY_B],
                    currency: (_currencies$Field$CUR12 = currencies[Field.CURRENCY_B]) !== null && _currencies$Field$CUR12 !== void 0 ? _currencies$Field$CUR12 : null,
                    id: "add-liquidity-input-tokenb",
                    showCommonBases: true,
                    locked: depositBDisabled
                  })]
                })
              })
            }), !hasExistingPosition ? /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(HideMedium, {
                children: /*#__PURE__*/_jsx(Buttons, {})
              }), /*#__PURE__*/_jsxs(RightContainer, {
                gap: "lg",
                children: [/*#__PURE__*/_jsx(DynamicSection, {
                  gap: "md",
                  disabled: !feeAmount || invalidPool,
                  children: !noLiquidity ? /*#__PURE__*/_jsxs(_Fragment, {
                    children: [/*#__PURE__*/_jsx(RowBetween, {
                      children: /*#__PURE__*/_jsx(ThemedText.Label, {
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Set Price Range"
                        })
                      })
                    }), price && baseCurrency && quoteCurrency && !noLiquidity && /*#__PURE__*/_jsx(AutoRow, {
                      gap: "4px",
                      justify: "center",
                      style: {
                        marginTop: '0.5rem'
                      },
                      children: /*#__PURE__*/_jsx(Trans, {
                        id: "<0>Current Price:</0><1><2/></1><3>{0} per {1}</3>",
                        values: {
                          0: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol,
                          1: baseCurrency.symbol
                        },
                        components: {
                          0: /*#__PURE__*/_jsx(ThemedText.Main, {
                            fontWeight: 500,
                            textAlign: "center",
                            fontSize: 12,
                            color: "text1"
                          }),
                          1: /*#__PURE__*/_jsx(ThemedText.Body, {
                            fontWeight: 500,
                            textAlign: "center",
                            fontSize: 12,
                            color: "text1"
                          }),
                          2: /*#__PURE__*/_jsx(HoverInlineText, {
                            maxCharacters: 20,
                            text: invertPrice ? price.invert().toSignificant(6) : price.toSignificant(6)
                          }),
                          3: /*#__PURE__*/_jsx(ThemedText.Body, {
                            color: "text2",
                            fontSize: 12
                          })
                        }
                      })
                    }), /*#__PURE__*/_jsx(LiquidityChartRangeInput, {
                      currencyA: baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined,
                      currencyB: quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined,
                      feeAmount: feeAmount,
                      ticksAtLimit: ticksAtLimit,
                      price: price ? parseFloat((invertPrice ? price.invert() : price).toSignificant(8)) : undefined,
                      priceLower: priceLower,
                      priceUpper: priceUpper,
                      onLeftRangeInput: onLeftRangeInput,
                      onRightRangeInput: onRightRangeInput,
                      interactive: !hasExistingPosition
                    })]
                  }) : /*#__PURE__*/_jsxs(AutoColumn, {
                    gap: "md",
                    children: [/*#__PURE__*/_jsx(RowBetween, {
                      children: /*#__PURE__*/_jsx(ThemedText.Label, {
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Set Starting Price"
                        })
                      })
                    }), noLiquidity && /*#__PURE__*/_jsx(BlueCard, {
                      style: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '1rem 1rem'
                      },
                      children: /*#__PURE__*/_jsx(ThemedText.Body, {
                        fontSize: 14,
                        style: {
                          fontWeight: 500
                        },
                        textAlign: "left",
                        color: theme.primaryText1,
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction."
                        })
                      })
                    }), /*#__PURE__*/_jsx(OutlineCard, {
                      padding: "12px",
                      children: /*#__PURE__*/_jsx(StyledInput, {
                        className: "start-price-input",
                        value: startPriceTypedValue,
                        onUserInput: onStartPriceInput
                      })
                    }), /*#__PURE__*/_jsxs(RowBetween, {
                      style: {
                        backgroundColor: theme.bg1,
                        padding: '12px',
                        borderRadius: '12px'
                      },
                      children: [/*#__PURE__*/_jsx(ThemedText.Main, {
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Current {0} Price:",
                          values: {
                            0: baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
                          }
                        })
                      }), /*#__PURE__*/_jsx(ThemedText.Main, {
                        children: price ? /*#__PURE__*/_jsx(ThemedText.Main, {
                          children: /*#__PURE__*/_jsxs(RowFixed, {
                            children: [/*#__PURE__*/_jsx(HoverInlineText, {
                              maxCharacters: 20,
                              text: invertPrice ? price === null || price === void 0 ? void 0 : (_price$invert = price.invert()) === null || _price$invert === void 0 ? void 0 : _price$invert.toSignificant(5) : price === null || price === void 0 ? void 0 : price.toSignificant(5)
                            }), ' ', /*#__PURE__*/_jsx("span", {
                              style: {
                                marginLeft: '4px'
                              },
                              children: quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
                            })]
                          })
                        }) : '-'
                      })]
                    })]
                  })
                }), /*#__PURE__*/_jsxs(DynamicSection, {
                  gap: "md",
                  disabled: !feeAmount || invalidPool || noLiquidity && !startPriceTypedValue,
                  children: [/*#__PURE__*/_jsxs(StackedContainer, {
                    children: [/*#__PURE__*/_jsx(StackedItem, {
                      style: {
                        opacity: showCapitalEfficiencyWarning ? '0.05' : 1
                      },
                      children: /*#__PURE__*/_jsxs(AutoColumn, {
                        gap: "md",
                        children: [noLiquidity && /*#__PURE__*/_jsx(RowBetween, {
                          children: /*#__PURE__*/_jsx(ThemedText.Label, {
                            children: /*#__PURE__*/_jsx(Trans, {
                              id: "Set Price Range"
                            })
                          })
                        }), /*#__PURE__*/_jsx(RangeSelector, {
                          priceLower: priceLower,
                          priceUpper: priceUpper,
                          getDecrementLower: getDecrementLower,
                          getIncrementLower: getIncrementLower,
                          getDecrementUpper: getDecrementUpper,
                          getIncrementUpper: getIncrementUpper,
                          onLeftRangeInput: onLeftRangeInput,
                          onRightRangeInput: onRightRangeInput,
                          currencyA: baseCurrency,
                          currencyB: quoteCurrency,
                          feeAmount: feeAmount,
                          ticksAtLimit: ticksAtLimit
                        }), !noLiquidity && /*#__PURE__*/_jsx(PresetsButtons, {
                          setFullRange: () => {
                            setShowCapitalEfficiencyWarning(true);
                          }
                        })]
                      })
                    }), showCapitalEfficiencyWarning && /*#__PURE__*/_jsx(StackedItem, {
                      zIndex: 1,
                      children: /*#__PURE__*/_jsx(YellowCard, {
                        padding: "15px",
                        $borderRadius: "12px",
                        height: "100%",
                        style: {
                          borderColor: theme.yellow3,
                          border: '1px solid'
                        },
                        children: /*#__PURE__*/_jsxs(AutoColumn, {
                          gap: "8px",
                          style: {
                            height: '100%'
                          },
                          children: [/*#__PURE__*/_jsxs(RowFixed, {
                            children: [/*#__PURE__*/_jsx(AlertTriangle, {
                              stroke: theme.yellow3,
                              size: "16px"
                            }), /*#__PURE__*/_jsx(ThemedText.Yellow, {
                              ml: "12px",
                              fontSize: "15px",
                              children: /*#__PURE__*/_jsx(Trans, {
                                id: "Efficiency Comparison"
                              })
                            })]
                          }), /*#__PURE__*/_jsx(RowFixed, {
                            children: /*#__PURE__*/_jsx(ThemedText.Yellow, {
                              ml: "12px",
                              fontSize: "13px",
                              margin: 0,
                              fontWeight: 400,
                              children: /*#__PURE__*/_jsx(Trans, {
                                id: "Full range positions may earn less fees than concentrated positions. Learn more <0>here</0>.",
                                components: {
                                  0: /*#__PURE__*/_jsx(ExternalLink, {
                                    style: {
                                      color: theme.yellow3,
                                      textDecoration: 'underline'
                                    },
                                    href: 'https://help.uniswap.org/en/articles/5434296-can-i-provide-liquidity-over-the-full-range-in-v3'
                                  })
                                }
                              })
                            })
                          }), /*#__PURE__*/_jsx(Row, {
                            children: /*#__PURE__*/_jsx(ButtonYellow, {
                              padding: "8px",
                              marginRight: "8px",
                              $borderRadius: "8px",
                              width: "auto",
                              onClick: () => {
                                setShowCapitalEfficiencyWarning(false);
                                getSetFullRange();
                              },
                              children: /*#__PURE__*/_jsx(ThemedText.Black, {
                                fontSize: 13,
                                color: "black",
                                children: /*#__PURE__*/_jsx(Trans, {
                                  id: "I understand"
                                })
                              })
                            })
                          })]
                        })
                      })
                    })]
                  }), outOfRange ? /*#__PURE__*/_jsx(YellowCard, {
                    padding: "8px 12px",
                    $borderRadius: "12px",
                    children: /*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsx(AlertTriangle, {
                        stroke: theme.yellow3,
                        size: "16px"
                      }), /*#__PURE__*/_jsx(ThemedText.Yellow, {
                        ml: "12px",
                        fontSize: "12px",
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Your position will not earn fees or be used in trades until the market price moves into your range."
                        })
                      })]
                    })
                  }) : null, invalidRange ? /*#__PURE__*/_jsx(YellowCard, {
                    padding: "8px 12px",
                    $borderRadius: "12px",
                    children: /*#__PURE__*/_jsxs(RowBetween, {
                      children: [/*#__PURE__*/_jsx(AlertTriangle, {
                        stroke: theme.yellow3,
                        size: "16px"
                      }), /*#__PURE__*/_jsx(ThemedText.Yellow, {
                        ml: "12px",
                        fontSize: "12px",
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Invalid range selected. The min price must be lower than the max price."
                        })
                      })]
                    })
                  }) : null]
                }), /*#__PURE__*/_jsx(MediumOnly, {
                  children: /*#__PURE__*/_jsx(Buttons, {})
                })]
              })]
            }) : /*#__PURE__*/_jsx(Buttons, {})]
          })
        })]
      }), addIsUnsupported && /*#__PURE__*/_jsx(UnsupportedCurrencyFooter, {
        show: addIsUnsupported,
        currencies: [currencies.CURRENCY_A, currencies.CURRENCY_B]
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}