import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { BigNumber } from '@ethersproject/bignumber';
import { Percent } from '@uniswap/sdk-core';
import { useCallback, useContext, useMemo, useState } from 'react';
import { ArrowDown, Plus } from 'react-feather';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import { BlueCard, LightCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import CurrencyLogo from '../../components/CurrencyLogo';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { AddRemoveTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row, { RowBetween, RowFixed } from '../../components/Row';
import Slider from '../../components/Slider';
import { Dots } from '../../components/swap/styleds';
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal';
import { WETH9_EXTENDED } from '../../constants/tokens';
import { useCurrency } from '../../hooks/Tokens';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { usePairContract, useV2RouterContract } from '../../hooks/useContract';
import useDebouncedChangeHandler from '../../hooks/useDebouncedChangeHandler';
import { useV2LiquidityTokenPermit } from '../../hooks/useERC20Permit';
import useTransactionDeadline from '../../hooks/useTransactionDeadline';
import { useActiveWeb3React } from '../../hooks/web3';
import { useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/burn/actions';
import { useBurnActionHandlers, useBurnState, useDerivedBurnInfo } from '../../state/burn/hooks';
import { TransactionType } from '../../state/transactions/actions';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useUserSlippageToleranceWithDefault } from '../../state/user/hooks';
import { StyledInternalLink, ThemedText } from '../../theme';
import { calculateGasMargin } from '../../utils/calculateGasMargin';
import { calculateSlippageAmount } from '../../utils/calculateSlippageAmount';
import { currencyId } from '../../utils/currencyId';
import AppBody from '../AppBody';
import { ClickableText, MaxButton, Wrapper } from '../Pool/styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100);
export default function RemoveLiquidity(_ref) {
  var _useCurrency, _useCurrency2, _parsedAmounts$Field$, _parsedAmounts$Field$2, _parsedAmounts$Field$3, _parsedAmounts$Field$4, _parsedAmounts$Field$5, _parsedAmounts$Field$6, _parsedAmounts$Field$7, _pair$liquidityToken, _parsedAmounts$Field$15, _parsedAmounts$Field$16;

  let {
    history,
    match: {
      params: {
        currencyIdA,
        currencyIdB
      }
    }
  } = _ref;
  const [currencyA, currencyB] = [(_useCurrency = useCurrency(currencyIdA)) !== null && _useCurrency !== void 0 ? _useCurrency : undefined, (_useCurrency2 = useCurrency(currencyIdB)) !== null && _useCurrency2 !== void 0 ? _useCurrency2 : undefined];
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const [tokenA, tokenB] = useMemo(() => [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped], [currencyA, currencyB]);
  const theme = useContext(_ThemeContext); // toggle wallet when disconnected

  const toggleWalletModal = useWalletModalToggle(); // burn state

  const {
    independentField,
    typedValue
  } = useBurnState();
  const {
    pair,
    parsedAmounts,
    error
  } = useDerivedBurnInfo(currencyA !== null && currencyA !== void 0 ? currencyA : undefined, currencyB !== null && currencyB !== void 0 ? currencyB : undefined);
  const {
    onUserInput: _onUserInput
  } = useBurnActionHandlers();
  const isValid = !error; // modal and loading

  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm
  // txn values

  const [txHash, setTxHash] = useState('');
  const deadline = useTransactionDeadline();
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE);
  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0') ? '0' : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100')) ? '<1' : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]: independentField === Field.LIQUIDITY ? typedValue : (_parsedAmounts$Field$ = (_parsedAmounts$Field$2 = parsedAmounts[Field.LIQUIDITY]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : _parsedAmounts$Field$2.toSignificant(6)) !== null && _parsedAmounts$Field$ !== void 0 ? _parsedAmounts$Field$ : '',
    [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? typedValue : (_parsedAmounts$Field$3 = (_parsedAmounts$Field$4 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$4 === void 0 ? void 0 : _parsedAmounts$Field$4.toSignificant(6)) !== null && _parsedAmounts$Field$3 !== void 0 ? _parsedAmounts$Field$3 : '',
    [Field.CURRENCY_B]: independentField === Field.CURRENCY_B ? typedValue : (_parsedAmounts$Field$5 = (_parsedAmounts$Field$6 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$6 === void 0 ? void 0 : _parsedAmounts$Field$6.toSignificant(6)) !== null && _parsedAmounts$Field$5 !== void 0 ? _parsedAmounts$Field$5 : ''
  };
  const atMaxAmount = (_parsedAmounts$Field$7 = parsedAmounts[Field.LIQUIDITY_PERCENT]) === null || _parsedAmounts$Field$7 === void 0 ? void 0 : _parsedAmounts$Field$7.equalTo(new Percent('1')); // pair contract

  const pairContract = usePairContract(pair === null || pair === void 0 ? void 0 : (_pair$liquidityToken = pair.liquidityToken) === null || _pair$liquidityToken === void 0 ? void 0 : _pair$liquidityToken.address);
  const router = useV2RouterContract(); // allowance handling

  const {
    gatherPermitSignature,
    signatureData
  } = useV2LiquidityTokenPermit(parsedAmounts[Field.LIQUIDITY], router === null || router === void 0 ? void 0 : router.address);
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], router === null || router === void 0 ? void 0 : router.address);

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    if (gatherPermitSignature) {
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
    }
  } // wrapped onUserInput to clear signatures


  const onUserInput = useCallback((field, typedValue) => {
    return _onUserInput(field, typedValue);
  }, [_onUserInput]);
  const onLiquidityInput = useCallback(typedValue => onUserInput(Field.LIQUIDITY, typedValue), [onUserInput]);
  const onCurrencyAInput = useCallback(typedValue => onUserInput(Field.CURRENCY_A, typedValue), [onUserInput]);
  const onCurrencyBInput = useCallback(typedValue => onUserInput(Field.CURRENCY_B, typedValue), [onUserInput]); // tx sending

  const addTransaction = useTransactionAdder();

  async function onRemove() {
    if (!chainId || !library || !account || !deadline || !router) throw new Error('missing dependencies');
    const {
      [Field.CURRENCY_A]: currencyAmountA,
      [Field.CURRENCY_B]: currencyAmountB
    } = parsedAmounts;

    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts');
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0]
    };
    if (!currencyA || !currencyB) throw new Error('missing tokens');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');
    const currencyBIsETH = currencyB.isNative;
    const oneCurrencyIsETH = currencyA.isNative || currencyBIsETH;
    if (!tokenA || !tokenB) throw new Error('could not wrap');
    let methodNames, args; // we have approval, use normal remove liquidity

    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens'];
        args = [currencyBIsETH ? tokenA.address : tokenB.address, liquidityAmount.quotient.toString(), amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), account, deadline.toHexString()];
      } // removeLiquidity
      else {
        methodNames = ['removeLiquidity'];
        args = [tokenA.address, tokenB.address, liquidityAmount.quotient.toString(), amountsMin[Field.CURRENCY_A].toString(), amountsMin[Field.CURRENCY_B].toString(), account, deadline.toHexString()];
      }
    } // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'];
        args = [currencyBIsETH ? tokenA.address : tokenB.address, liquidityAmount.quotient.toString(), amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), account, signatureData.deadline, false, signatureData.v, signatureData.r, signatureData.s];
      } // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit'];
        args = [tokenA.address, tokenB.address, liquidityAmount.quotient.toString(), amountsMin[Field.CURRENCY_A].toString(), amountsMin[Field.CURRENCY_B].toString(), account, signatureData.deadline, false, signatureData.v, signatureData.r, signatureData.s];
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.');
    }

    const safeGasEstimates = await Promise.all(methodNames.map(methodName => router.estimateGas[methodName](...args).then(estimateGas => calculateGasMargin(estimateGas)).catch(error => {
      console.error(`estimateGas failed`, methodName, args, error);
      return undefined;
    })));
    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex(safeGasEstimate => BigNumber.isBigNumber(safeGasEstimate)); // all estimations failed...

    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.');
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation];
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];
      setAttemptingTxn(true);
      await router[methodName](...args, {
        gasLimit: safeGasEstimate
      }).then(response => {
        var _parsedAmounts$Field$8, _parsedAmounts$Field$9, _parsedAmounts$Field$10, _parsedAmounts$Field$11;

        setAttemptingTxn(false);
        addTransaction(response, {
          type: TransactionType.REMOVE_LIQUIDITY_V3,
          baseCurrencyId: currencyId(currencyA),
          quoteCurrencyId: currencyId(currencyB),
          expectedAmountBaseRaw: (_parsedAmounts$Field$8 = (_parsedAmounts$Field$9 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$9 === void 0 ? void 0 : _parsedAmounts$Field$9.quotient.toString()) !== null && _parsedAmounts$Field$8 !== void 0 ? _parsedAmounts$Field$8 : '0',
          expectedAmountQuoteRaw: (_parsedAmounts$Field$10 = (_parsedAmounts$Field$11 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$11 === void 0 ? void 0 : _parsedAmounts$Field$11.quotient.toString()) !== null && _parsedAmounts$Field$10 !== void 0 ? _parsedAmounts$Field$10 : '0'
        });
        setTxHash(response.hash);
        ReactGA.event({
          category: 'Liquidity',
          action: 'Remove',
          label: [currencyA.symbol, currencyB.symbol].join('/')
        });
      }).catch(error => {
        setAttemptingTxn(false); // we only care if the error is something _other_ than the user rejected the tx

        console.error(error);
      });
    }
  }

  function modalHeader() {
    var _parsedAmounts$Field$12, _parsedAmounts$Field$13;

    return /*#__PURE__*/_jsxs(AutoColumn, {
      gap: 'md',
      style: {
        marginTop: '20px'
      },
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        align: "flex-end",
        children: [/*#__PURE__*/_jsx(Text, {
          fontSize: 24,
          fontWeight: 500,
          children: (_parsedAmounts$Field$12 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$12 === void 0 ? void 0 : _parsedAmounts$Field$12.toSignificant(6)
        }), /*#__PURE__*/_jsxs(RowFixed, {
          gap: "4px",
          children: [/*#__PURE__*/_jsx(CurrencyLogo, {
            currency: currencyA,
            size: '24px'
          }), /*#__PURE__*/_jsx(Text, {
            fontSize: 24,
            fontWeight: 500,
            style: {
              marginLeft: '10px'
            },
            children: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol
          })]
        })]
      }), /*#__PURE__*/_jsx(RowFixed, {
        children: /*#__PURE__*/_jsx(Plus, {
          size: "16",
          color: theme.text2
        })
      }), /*#__PURE__*/_jsxs(RowBetween, {
        align: "flex-end",
        children: [/*#__PURE__*/_jsx(Text, {
          fontSize: 24,
          fontWeight: 500,
          children: (_parsedAmounts$Field$13 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$13 === void 0 ? void 0 : _parsedAmounts$Field$13.toSignificant(6)
        }), /*#__PURE__*/_jsxs(RowFixed, {
          gap: "4px",
          children: [/*#__PURE__*/_jsx(CurrencyLogo, {
            currency: currencyB,
            size: '24px'
          }), /*#__PURE__*/_jsx(Text, {
            fontSize: 24,
            fontWeight: 500,
            style: {
              marginLeft: '10px'
            },
            children: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
          })]
        })]
      }), /*#__PURE__*/_jsx(ThemedText.Italic, {
        fontSize: 12,
        color: theme.text2,
        textAlign: "left",
        padding: '12px 0 0 0',
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Output is estimated. If the price changes by more than {0}% your transaction will revert.",
          values: {
            0: allowedSlippage.toSignificant(4)
          }
        })
      })]
    });
  }

  function modalBottom() {
    var _parsedAmounts$Field$14;

    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Text, {
          color: theme.text2,
          fontWeight: 500,
          fontSize: 16,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "UNI {0}/{1} Burned",
            values: {
              0: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
              1: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
            }
          })
        }), /*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
            currency0: currencyA,
            currency1: currencyB,
            margin: true
          }), /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 16,
            children: (_parsedAmounts$Field$14 = parsedAmounts[Field.LIQUIDITY]) === null || _parsedAmounts$Field$14 === void 0 ? void 0 : _parsedAmounts$Field$14.toSignificant(6)
          })]
        })]
      }), pair && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(Text, {
            color: theme.text2,
            fontWeight: 500,
            fontSize: 16,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Price"
            })
          }), /*#__PURE__*/_jsxs(Text, {
            fontWeight: 500,
            fontSize: 16,
            color: theme.text1,
            children: ["1 ", currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol, " = ", tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-', " ", currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol]
          })]
        }), /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsxs(Text, {
            fontWeight: 500,
            fontSize: 16,
            color: theme.text1,
            children: ["1 ", currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol, " = ", tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-', " ", currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol]
          })]
        })]
      }), /*#__PURE__*/_jsx(ButtonPrimary, {
        disabled: !(approval === ApprovalState.APPROVED || signatureData !== null),
        onClick: onRemove,
        children: /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm"
          })
        })
      })]
    });
  }

  const pendingText = /*#__PURE__*/_jsx(Trans, {
    id: "Removing {0} {1} and{2} {3}",
    values: {
      0: (_parsedAmounts$Field$15 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$15 === void 0 ? void 0 : _parsedAmounts$Field$15.toSignificant(6),
      1: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
      2: (_parsedAmounts$Field$16 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$16 === void 0 ? void 0 : _parsedAmounts$Field$16.toSignificant(6),
      3: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
    }
  });

  const liquidityPercentChangeCallback = useCallback(value => {
    onUserInput(Field.LIQUIDITY_PERCENT, value.toString());
  }, [onUserInput]);
  const oneCurrencyIsETH = (currencyA === null || currencyA === void 0 ? void 0 : currencyA.isNative) || (currencyB === null || currencyB === void 0 ? void 0 : currencyB.isNative);
  const oneCurrencyIsWETH = Boolean(chainId && WETH9_EXTENDED[chainId] && ((currencyA === null || currencyA === void 0 ? void 0 : currencyA.equals(WETH9_EXTENDED[chainId])) || (currencyB === null || currencyB === void 0 ? void 0 : currencyB.equals(WETH9_EXTENDED[chainId]))));
  const handleSelectCurrencyA = useCallback(currency => {
    if (currencyIdB && currencyId(currency) === currencyIdB) {
      history.push(`/remove/v2/${currencyId(currency)}/${currencyIdA}`);
    } else {
      history.push(`/remove/v2/${currencyId(currency)}/${currencyIdB}`);
    }
  }, [currencyIdA, currencyIdB, history]);
  const handleSelectCurrencyB = useCallback(currency => {
    if (currencyIdA && currencyId(currency) === currencyIdA) {
      history.push(`/remove/v2/${currencyIdB}/${currencyId(currency)}`);
    } else {
      history.push(`/remove/v2/${currencyIdA}/${currencyId(currency)}`);
    }
  }, [currencyIdA, currencyIdB, history]);
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false); // if there was a tx hash, we want to clear the input

    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0');
    }

    setTxHash('');
  }, [onUserInput, txHash]);
  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)), liquidityPercentChangeCallback);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(AppBody, {
      children: [/*#__PURE__*/_jsx(AddRemoveTabs, {
        creating: false,
        adding: false,
        defaultSlippage: DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE
      }), /*#__PURE__*/_jsxs(Wrapper, {
        children: [/*#__PURE__*/_jsx(TransactionConfirmationModal, {
          isOpen: showConfirm,
          onDismiss: handleDismissConfirmation,
          attemptingTxn: attemptingTxn,
          hash: txHash ? txHash : '',
          content: () => /*#__PURE__*/_jsx(ConfirmationModalContent, {
            title: /*#__PURE__*/_jsx(Trans, {
              id: "You will receive"
            }),
            onDismiss: handleDismissConfirmation,
            topContent: modalHeader,
            bottomContent: modalBottom
          }),
          pendingText: pendingText
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsx(BlueCard, {
            children: /*#__PURE__*/_jsx(AutoColumn, {
              gap: "10px",
              children: /*#__PURE__*/_jsx(ThemedText.Link, {
                fontWeight: 400,
                color: 'primaryText1',
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "<0>Tip:</0> Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.",
                  components: {
                    0: /*#__PURE__*/_jsx("b", {})
                  }
                })
              })
            })
          }), /*#__PURE__*/_jsx(LightCard, {
            children: /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "20px",
              children: [/*#__PURE__*/_jsxs(RowBetween, {
                children: [/*#__PURE__*/_jsx(Text, {
                  fontWeight: 500,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Remove Amount"
                  })
                }), /*#__PURE__*/_jsx(ClickableText, {
                  fontWeight: 500,
                  onClick: () => {
                    setShowDetailed(!showDetailed);
                  },
                  children: showDetailed ? /*#__PURE__*/_jsx(Trans, {
                    id: "Simple"
                  }) : /*#__PURE__*/_jsx(Trans, {
                    id: "Detailed"
                  })
                })]
              }), /*#__PURE__*/_jsx(Row, {
                style: {
                  alignItems: 'flex-end'
                },
                children: /*#__PURE__*/_jsxs(Text, {
                  fontSize: 72,
                  fontWeight: 500,
                  children: [formattedAmounts[Field.LIQUIDITY_PERCENT], "%"]
                })
              }), !showDetailed && /*#__PURE__*/_jsxs(_Fragment, {
                children: [/*#__PURE__*/_jsx(Slider, {
                  value: innerLiquidityPercentage,
                  onChange: setInnerLiquidityPercentage
                }), /*#__PURE__*/_jsxs(RowBetween, {
                  children: [/*#__PURE__*/_jsx(MaxButton, {
                    onClick: () => onUserInput(Field.LIQUIDITY_PERCENT, '25'),
                    width: "20%",
                    children: "25%"
                  }), /*#__PURE__*/_jsx(MaxButton, {
                    onClick: () => onUserInput(Field.LIQUIDITY_PERCENT, '50'),
                    width: "20%",
                    children: "50%"
                  }), /*#__PURE__*/_jsx(MaxButton, {
                    onClick: () => onUserInput(Field.LIQUIDITY_PERCENT, '75'),
                    width: "20%",
                    children: "75%"
                  }), /*#__PURE__*/_jsx(MaxButton, {
                    onClick: () => onUserInput(Field.LIQUIDITY_PERCENT, '100'),
                    width: "20%",
                    children: "Max"
                  })]
                })]
              })]
            })
          }), !showDetailed && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ColumnCenter, {
              children: /*#__PURE__*/_jsx(ArrowDown, {
                size: "16",
                color: theme.text2
              })
            }), /*#__PURE__*/_jsx(LightCard, {
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "10px",
                children: [/*#__PURE__*/_jsxs(RowBetween, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 24,
                    fontWeight: 500,
                    children: formattedAmounts[Field.CURRENCY_A] || '-'
                  }), /*#__PURE__*/_jsxs(RowFixed, {
                    children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                      currency: currencyA,
                      style: {
                        marginRight: '12px'
                      }
                    }), /*#__PURE__*/_jsx(Text, {
                      fontSize: 24,
                      fontWeight: 500,
                      id: "remove-liquidity-tokena-symbol",
                      children: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol
                    })]
                  })]
                }), /*#__PURE__*/_jsxs(RowBetween, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 24,
                    fontWeight: 500,
                    children: formattedAmounts[Field.CURRENCY_B] || '-'
                  }), /*#__PURE__*/_jsxs(RowFixed, {
                    children: [/*#__PURE__*/_jsx(CurrencyLogo, {
                      currency: currencyB,
                      style: {
                        marginRight: '12px'
                      }
                    }), /*#__PURE__*/_jsx(Text, {
                      fontSize: 24,
                      fontWeight: 500,
                      id: "remove-liquidity-tokenb-symbol",
                      children: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
                    })]
                  })]
                }), chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? /*#__PURE__*/_jsx(RowBetween, {
                  style: {
                    justifyContent: 'flex-end'
                  },
                  children: oneCurrencyIsETH ? /*#__PURE__*/_jsx(StyledInternalLink, {
                    to: `/remove/v2/${currencyA !== null && currencyA !== void 0 && currencyA.isNative ? WETH9_EXTENDED[chainId].address : currencyIdA}/${currencyB !== null && currencyB !== void 0 && currencyB.isNative ? WETH9_EXTENDED[chainId].address : currencyIdB}`,
                    children: "Receive WETH"
                  }) : oneCurrencyIsWETH ? /*#__PURE__*/_jsx(StyledInternalLink, {
                    to: `/remove/v2/${currencyA !== null && currencyA !== void 0 && currencyA.equals(WETH9_EXTENDED[chainId]) ? 'ETH' : currencyIdA}/${currencyB !== null && currencyB !== void 0 && currencyB.equals(WETH9_EXTENDED[chainId]) ? 'ETH' : currencyIdB}`,
                    children: "Receive ETH"
                  }) : null
                }) : null]
              })
            })]
          }), showDetailed && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(CurrencyInputPanel, {
              value: formattedAmounts[Field.LIQUIDITY],
              onUserInput: onLiquidityInput,
              onMax: () => {
                onUserInput(Field.LIQUIDITY_PERCENT, '100');
              },
              showMaxButton: !atMaxAmount,
              currency: pair === null || pair === void 0 ? void 0 : pair.liquidityToken,
              pair: pair,
              id: "liquidity-amount"
            }), /*#__PURE__*/_jsx(ColumnCenter, {
              children: /*#__PURE__*/_jsx(ArrowDown, {
                size: "16",
                color: theme.text2
              })
            }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
              hideBalance: true,
              value: formattedAmounts[Field.CURRENCY_A],
              onUserInput: onCurrencyAInput,
              onMax: () => onUserInput(Field.LIQUIDITY_PERCENT, '100'),
              showMaxButton: !atMaxAmount,
              currency: currencyA,
              label: 'Output',
              onCurrencySelect: handleSelectCurrencyA,
              id: "remove-liquidity-tokena"
            }), /*#__PURE__*/_jsx(ColumnCenter, {
              children: /*#__PURE__*/_jsx(Plus, {
                size: "16",
                color: theme.text2
              })
            }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
              hideBalance: true,
              value: formattedAmounts[Field.CURRENCY_B],
              onUserInput: onCurrencyBInput,
              onMax: () => onUserInput(Field.LIQUIDITY_PERCENT, '100'),
              showMaxButton: !atMaxAmount,
              currency: currencyB,
              label: 'Output',
              onCurrencySelect: handleSelectCurrencyB,
              id: "remove-liquidity-tokenb"
            })]
          }), pair && /*#__PURE__*/_jsxs("div", {
            style: {
              padding: '10px 20px'
            },
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(Trans, {
                id: "Price:"
              }), /*#__PURE__*/_jsxs("div", {
                children: ["1 ", currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol, " = ", tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-', " ", currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol]
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsxs("div", {
                children: ["1 ", currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol, " = ", tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-', " ", currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            style: {
              position: 'relative'
            },
            children: !account ? /*#__PURE__*/_jsx(ButtonLight, {
              onClick: toggleWalletModal,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Connect Wallet"
              })
            }) : /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ButtonConfirmed, {
                onClick: onAttemptToApprove,
                confirmed: approval === ApprovalState.APPROVED || signatureData !== null,
                disabled: approval !== ApprovalState.NOT_APPROVED || signatureData !== null,
                mr: "0.5rem",
                fontWeight: 500,
                fontSize: 16,
                children: approval === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Approving"
                  })
                }) : approval === ApprovalState.APPROVED || signatureData !== null ? /*#__PURE__*/_jsx(Trans, {
                  id: "Approved"
                }) : /*#__PURE__*/_jsx(Trans, {
                  id: "Approve"
                })
              }), /*#__PURE__*/_jsx(ButtonError, {
                onClick: () => {
                  setShowConfirm(true);
                },
                disabled: !isValid || signatureData === null && approval !== ApprovalState.APPROVED,
                error: !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B],
                children: /*#__PURE__*/_jsx(Text, {
                  fontSize: 16,
                  fontWeight: 500,
                  children: error || /*#__PURE__*/_jsx(Trans, {
                    id: "Remove"
                  })
                })
              })]
            })
          })]
        })]
      })]
    }), pair ? /*#__PURE__*/_jsx(AutoColumn, {
      style: {
        minWidth: '20rem',
        width: '100%',
        maxWidth: '400px',
        marginTop: '1rem'
      },
      children: /*#__PURE__*/_jsx(MinimalPositionCard, {
        showUnwrapped: oneCurrencyIsWETH,
        pair: pair
      })
    }) : null]
  });
}