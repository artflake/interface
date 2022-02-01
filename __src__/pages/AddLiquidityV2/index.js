import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { BigNumber } from '@ethersproject/bignumber';
import { Percent } from '@uniswap/sdk-core';
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter';
import { SwitchLocaleLink } from 'components/SwitchLocaleLink';
import { useCallback, useContext, useState } from 'react';
import { Plus } from 'react-feather';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import { BlueCard, LightCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import DoubleCurrencyLogo from '../../components/DoubleLogo';
import { AddRemoveTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row, { RowBetween, RowFlat } from '../../components/Row';
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal';
import { ZERO_PERCENT } from '../../constants/misc';
import { WETH9_EXTENDED } from '../../constants/tokens';
import { useCurrency } from '../../hooks/Tokens';
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback';
import { useV2RouterContract } from '../../hooks/useContract';
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported';
import useTransactionDeadline from '../../hooks/useTransactionDeadline';
import { PairState } from '../../hooks/useV2Pairs';
import { useActiveWeb3React } from '../../hooks/web3';
import { useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/mint/actions';
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks';
import { TransactionType } from '../../state/transactions/actions';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { useIsExpertMode, useUserSlippageToleranceWithDefault } from '../../state/user/hooks';
import { ThemedText } from '../../theme';
import { calculateGasMargin } from '../../utils/calculateGasMargin';
import { calculateSlippageAmount } from '../../utils/calculateSlippageAmount';
import { currencyId } from '../../utils/currencyId';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import AppBody from '../AppBody';
import { Dots, Wrapper } from '../Pool/styleds';
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom';
import { PoolPriceBar } from './PoolPriceBar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE = new Percent(50, 10000);
export default function AddLiquidity(_ref) {
  var _parsedAmounts$depend, _parsedAmounts$depend2, _parsedAmounts$Field$5, _currencies$Field$CUR7, _parsedAmounts$Field$6, _currencies$Field$CUR8, _currencies$Field$CUR9, _currencies$Field$CUR10, _currencies$Field$CUR11, _currencies$Field$CUR12, _currencies$Field$CUR13, _currencies$Field$CUR14;

  let {
    match: {
      params: {
        currencyIdA,
        currencyIdB
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
  const currencyA = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB);
  const oneCurrencyIsWETH = Boolean(chainId && (currencyA && currencyA.equals(WETH9_EXTENDED[chainId]) || currencyB && currencyB.equals(WETH9_EXTENDED[chainId])));
  const toggleWalletModal = useWalletModalToggle(); // toggle wallet when disconnected

  const expertMode = useIsExpertMode(); // mint state

  const {
    independentField,
    typedValue,
    otherTypedValue
  } = useMintState();
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error
  } = useDerivedMintInfo(currencyA !== null && currencyA !== void 0 ? currencyA : undefined, currencyB !== null && currencyB !== void 0 ? currencyB : undefined);
  const {
    onFieldAInput,
    onFieldBInput
  } = useMintActionHandlers(noLiquidity);
  const isValid = !error; // modal and loading

  const [showConfirm, setShowConfirm] = useState(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm
  // txn values

  const deadline = useTransactionDeadline(); // custom from users settings

  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE); // custom from users

  const [txHash, setTxHash] = useState(''); // get formatted amounts

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : (_parsedAmounts$depend = (_parsedAmounts$depend2 = parsedAmounts[dependentField]) === null || _parsedAmounts$depend2 === void 0 ? void 0 : _parsedAmounts$depend2.toSignificant(6)) !== null && _parsedAmounts$depend !== void 0 ? _parsedAmounts$depend : ''
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
  const router = useV2RouterContract(); // check whether the user has approved the router on the tokens

  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], router === null || router === void 0 ? void 0 : router.address);
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], router === null || router === void 0 ? void 0 : router.address);
  const addTransaction = useTransactionAdder();

  async function onAdd() {
    if (!chainId || !library || !account || !router) return;
    const {
      [Field.CURRENCY_A]: parsedAmountA,
      [Field.CURRENCY_B]: parsedAmountB
    } = parsedAmounts;

    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return;
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0]
    };
    let estimate, method, args, value;

    if (currencyA.isNative || currencyB.isNative) {
      var _wrapped$address, _ref2, _ref2$wrapped;

      const tokenBIsETH = currencyB.isNative;
      estimate = router.estimateGas.addLiquidityETH;
      method = router.addLiquidityETH;
      args = [(_wrapped$address = (_ref2 = tokenBIsETH ? currencyA : currencyB) === null || _ref2 === void 0 ? void 0 : (_ref2$wrapped = _ref2.wrapped) === null || _ref2$wrapped === void 0 ? void 0 : _ref2$wrapped.address) !== null && _wrapped$address !== void 0 ? _wrapped$address : '', // token
      (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
      amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
      amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
      account, deadline.toHexString()];
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString());
    } else {
      var _currencyA$wrapped$ad, _currencyA$wrapped, _currencyB$wrapped$ad, _currencyB$wrapped;

      estimate = router.estimateGas.addLiquidity;
      method = router.addLiquidity;
      args = [(_currencyA$wrapped$ad = currencyA === null || currencyA === void 0 ? void 0 : (_currencyA$wrapped = currencyA.wrapped) === null || _currencyA$wrapped === void 0 ? void 0 : _currencyA$wrapped.address) !== null && _currencyA$wrapped$ad !== void 0 ? _currencyA$wrapped$ad : '', (_currencyB$wrapped$ad = currencyB === null || currencyB === void 0 ? void 0 : (_currencyB$wrapped = currencyB.wrapped) === null || _currencyB$wrapped === void 0 ? void 0 : _currencyB$wrapped.address) !== null && _currencyB$wrapped$ad !== void 0 ? _currencyB$wrapped$ad : '', parsedAmountA.quotient.toString(), parsedAmountB.quotient.toString(), amountsMin[Field.CURRENCY_A].toString(), amountsMin[Field.CURRENCY_B].toString(), account, deadline.toHexString()];
      value = null;
    }

    setAttemptingTxn(true);
    await estimate(...args, value ? {
      value
    } : {}).then(estimatedGasLimit => method(...args, { ...(value ? {
        value
      } : {}),
      gasLimit: calculateGasMargin(estimatedGasLimit)
    }).then(response => {
      var _parsedAmounts$Field$, _parsedAmounts$Field$2, _parsedAmounts$Field$3, _parsedAmounts$Field$4, _currencies$Field$CUR, _currencies$Field$CUR2;

      setAttemptingTxn(false);
      addTransaction(response, {
        type: TransactionType.ADD_LIQUIDITY_V2_POOL,
        baseCurrencyId: currencyId(currencyA),
        expectedAmountBaseRaw: (_parsedAmounts$Field$ = (_parsedAmounts$Field$2 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : _parsedAmounts$Field$2.quotient.toString()) !== null && _parsedAmounts$Field$ !== void 0 ? _parsedAmounts$Field$ : '0',
        quoteCurrencyId: currencyId(currencyB),
        expectedAmountQuoteRaw: (_parsedAmounts$Field$3 = (_parsedAmounts$Field$4 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$4 === void 0 ? void 0 : _parsedAmounts$Field$4.quotient.toString()) !== null && _parsedAmounts$Field$3 !== void 0 ? _parsedAmounts$Field$3 : '0'
      });
      setTxHash(response.hash);
      ReactGA.event({
        category: 'Liquidity',
        action: 'Add',
        label: [(_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol, (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol].join('/')
      });
    })).catch(error => {
      setAttemptingTxn(false); // we only care if the error is something _other_ than the user rejected the tx

      if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
        console.error(error);
      }
    });
  }

  const modalHeader = () => {
    var _currencies$Field$CUR3, _currencies$Field$CUR4, _currencies$Field$CUR5, _currencies$Field$CUR6;

    return noLiquidity ? /*#__PURE__*/_jsx(AutoColumn, {
      gap: "20px",
      children: /*#__PURE__*/_jsx(LightCard, {
        mt: "20px",
        $borderRadius: "20px",
        children: /*#__PURE__*/_jsxs(RowFlat, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: "42px",
            marginRight: 10,
            children: ((_currencies$Field$CUR3 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol) + '/' + ((_currencies$Field$CUR4 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol)
          }), /*#__PURE__*/_jsx(DoubleCurrencyLogo, {
            currency0: currencies[Field.CURRENCY_A],
            currency1: currencies[Field.CURRENCY_B],
            size: 30
          })]
        })
      })
    }) : /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "20px",
      children: [/*#__PURE__*/_jsxs(RowFlat, {
        style: {
          marginTop: '20px'
        },
        children: [/*#__PURE__*/_jsx(Text, {
          fontSize: "48px",
          fontWeight: 500,
          lineHeight: "42px",
          marginRight: 10,
          children: liquidityMinted === null || liquidityMinted === void 0 ? void 0 : liquidityMinted.toSignificant(6)
        }), /*#__PURE__*/_jsx(DoubleCurrencyLogo, {
          currency0: currencies[Field.CURRENCY_A],
          currency1: currencies[Field.CURRENCY_B],
          size: 30
        })]
      }), /*#__PURE__*/_jsx(Row, {
        children: /*#__PURE__*/_jsx(Text, {
          fontSize: "24px",
          children: ((_currencies$Field$CUR5 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR5 === void 0 ? void 0 : _currencies$Field$CUR5.symbol) + '/' + ((_currencies$Field$CUR6 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR6 === void 0 ? void 0 : _currencies$Field$CUR6.symbol) + ' Pool Tokens'
        })
      }), /*#__PURE__*/_jsx(ThemedText.Italic, {
        fontSize: 12,
        textAlign: "left",
        padding: '8px 0 0 0 ',
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Output is estimated. If the price changes by more than {0}% your transaction will revert.",
          values: {
            0: allowedSlippage.toSignificant(4)
          }
        })
      })]
    });
  };

  const modalBottom = () => {
    return /*#__PURE__*/_jsx(ConfirmAddModalBottom, {
      price: price,
      currencies: currencies,
      parsedAmounts: parsedAmounts,
      noLiquidity: noLiquidity,
      onAdd: onAdd,
      poolTokenPercentage: poolTokenPercentage
    });
  };

  const pendingText = /*#__PURE__*/_jsx(Trans, {
    id: "Supplying {0} {1} and {2} {3}",
    values: {
      0: (_parsedAmounts$Field$5 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$5 === void 0 ? void 0 : _parsedAmounts$Field$5.toSignificant(6),
      1: (_currencies$Field$CUR7 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR7 === void 0 ? void 0 : _currencies$Field$CUR7.symbol,
      2: (_parsedAmounts$Field$6 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$6 === void 0 ? void 0 : _parsedAmounts$Field$6.toSignificant(6),
      3: (_currencies$Field$CUR8 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR8 === void 0 ? void 0 : _currencies$Field$CUR8.symbol
    }
  });

  const handleCurrencyASelect = useCallback(currencyA => {
    const newCurrencyIdA = currencyId(currencyA);

    if (newCurrencyIdA === currencyIdB) {
      history.push(`/add/v2/${currencyIdB}/${currencyIdA}`);
    } else {
      history.push(`/add/v2/${newCurrencyIdA}/${currencyIdB}`);
    }
  }, [currencyIdB, history, currencyIdA]);
  const handleCurrencyBSelect = useCallback(currencyB => {
    const newCurrencyIdB = currencyId(currencyB);

    if (currencyIdA === newCurrencyIdB) {
      if (currencyIdB) {
        history.push(`/add/v2/${currencyIdB}/${newCurrencyIdB}`);
      } else {
        history.push(`/add/v2/${newCurrencyIdB}`);
      }
    } else {
      history.push(`/add/v2/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`);
    }
  }, [currencyIdA, history, currencyIdB]);
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false); // if there was a tx hash, we want to clear the input

    if (txHash) {
      onFieldAInput('');
    }

    setTxHash('');
  }, [onFieldAInput, txHash]);
  const isCreate = history.location.pathname.includes('/create');
  const addIsUnsupported = useIsSwapUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_A, currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_B);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(AppBody, {
      children: [/*#__PURE__*/_jsx(AddRemoveTabs, {
        creating: isCreate,
        adding: true,
        defaultSlippage: DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE
      }), /*#__PURE__*/_jsxs(Wrapper, {
        children: [/*#__PURE__*/_jsx(TransactionConfirmationModal, {
          isOpen: showConfirm,
          onDismiss: handleDismissConfirmation,
          attemptingTxn: attemptingTxn,
          hash: txHash,
          content: () => /*#__PURE__*/_jsx(ConfirmationModalContent, {
            title: noLiquidity ? /*#__PURE__*/_jsx(Trans, {
              id: "You are creating a pool"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "You will receive"
            }),
            onDismiss: handleDismissConfirmation,
            topContent: modalHeader,
            bottomContent: modalBottom
          }),
          pendingText: pendingText,
          currencyToAdd: pair === null || pair === void 0 ? void 0 : pair.liquidityToken
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "20px",
          children: [noLiquidity || (isCreate ? /*#__PURE__*/_jsx(ColumnCenter, {
            children: /*#__PURE__*/_jsx(BlueCard, {
              children: /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "10px",
                children: [/*#__PURE__*/_jsx(ThemedText.Link, {
                  fontWeight: 600,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "You are the first liquidity provider."
                  })
                }), /*#__PURE__*/_jsx(ThemedText.Link, {
                  fontWeight: 400,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "The ratio of tokens you add will set the price of this pool."
                  })
                }), /*#__PURE__*/_jsx(ThemedText.Link, {
                  fontWeight: 400,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Once you are happy with the rate click supply to review."
                  })
                })]
              })
            })
          }) : /*#__PURE__*/_jsx(ColumnCenter, {
            children: /*#__PURE__*/_jsx(BlueCard, {
              children: /*#__PURE__*/_jsx(AutoColumn, {
                gap: "10px",
                children: /*#__PURE__*/_jsx(ThemedText.Link, {
                  fontWeight: 400,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.",
                    components: {
                      0: /*#__PURE__*/_jsx("b", {})
                    }
                  })
                })
              })
            })
          })), /*#__PURE__*/_jsx(CurrencyInputPanel, {
            value: formattedAmounts[Field.CURRENCY_A],
            onUserInput: onFieldAInput,
            onMax: () => {
              var _maxAmounts$Field$CUR, _maxAmounts$Field$CUR2;

              onFieldAInput((_maxAmounts$Field$CUR = (_maxAmounts$Field$CUR2 = maxAmounts[Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR2 === void 0 ? void 0 : _maxAmounts$Field$CUR2.toExact()) !== null && _maxAmounts$Field$CUR !== void 0 ? _maxAmounts$Field$CUR : '');
            },
            onCurrencySelect: handleCurrencyASelect,
            showMaxButton: !atMaxAmounts[Field.CURRENCY_A],
            currency: (_currencies$Field$CUR9 = currencies[Field.CURRENCY_A]) !== null && _currencies$Field$CUR9 !== void 0 ? _currencies$Field$CUR9 : null,
            id: "add-liquidity-input-tokena",
            showCommonBases: true
          }), /*#__PURE__*/_jsx(ColumnCenter, {
            children: /*#__PURE__*/_jsx(Plus, {
              size: "16",
              color: theme.text2
            })
          }), /*#__PURE__*/_jsx(CurrencyInputPanel, {
            value: formattedAmounts[Field.CURRENCY_B],
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
          }), currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && /*#__PURE__*/_jsx(_Fragment, {
            children: /*#__PURE__*/_jsxs(LightCard, {
              padding: "0px",
              $borderRadius: '20px',
              children: [/*#__PURE__*/_jsx(RowBetween, {
                padding: "1rem",
                children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
                  fontWeight: 500,
                  fontSize: 14,
                  children: noLiquidity ? /*#__PURE__*/_jsx(Trans, {
                    id: "Initial prices and pool share"
                  }) : /*#__PURE__*/_jsx(Trans, {
                    id: "Prices and pool share"
                  })
                })
              }), ' ', /*#__PURE__*/_jsx(LightCard, {
                padding: "1rem",
                $borderRadius: '20px',
                children: /*#__PURE__*/_jsx(PoolPriceBar, {
                  currencies: currencies,
                  poolTokenPercentage: poolTokenPercentage,
                  noLiquidity: noLiquidity,
                  price: price
                })
              })]
            })
          }), addIsUnsupported ? /*#__PURE__*/_jsx(ButtonPrimary, {
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
          }) : /*#__PURE__*/_jsxs(AutoColumn, {
            gap: 'md',
            children: [(approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING || approvalB === ApprovalState.NOT_APPROVED || approvalB === ApprovalState.PENDING) && isValid && /*#__PURE__*/_jsxs(RowBetween, {
              children: [approvalA !== ApprovalState.APPROVED && /*#__PURE__*/_jsx(ButtonPrimary, {
                onClick: approveACallback,
                disabled: approvalA === ApprovalState.PENDING,
                width: approvalB !== ApprovalState.APPROVED ? '48%' : '100%',
                children: approvalA === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Approving {0}",
                    values: {
                      0: (_currencies$Field$CUR11 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR11 === void 0 ? void 0 : _currencies$Field$CUR11.symbol
                    }
                  })
                }) : /*#__PURE__*/_jsx(Trans, {
                  id: "Approve {0}",
                  values: {
                    0: (_currencies$Field$CUR12 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR12 === void 0 ? void 0 : _currencies$Field$CUR12.symbol
                  }
                })
              }), approvalB !== ApprovalState.APPROVED && /*#__PURE__*/_jsx(ButtonPrimary, {
                onClick: approveBCallback,
                disabled: approvalB === ApprovalState.PENDING,
                width: approvalA !== ApprovalState.APPROVED ? '48%' : '100%',
                children: approvalB === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Approving {0}",
                    values: {
                      0: (_currencies$Field$CUR13 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR13 === void 0 ? void 0 : _currencies$Field$CUR13.symbol
                    }
                  })
                }) : /*#__PURE__*/_jsx(Trans, {
                  id: "Approve {0}",
                  values: {
                    0: (_currencies$Field$CUR14 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR14 === void 0 ? void 0 : _currencies$Field$CUR14.symbol
                  }
                })
              })]
            }), /*#__PURE__*/_jsx(ButtonError, {
              onClick: () => {
                expertMode ? onAdd() : setShowConfirm(true);
              },
              disabled: !isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED,
              error: !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B],
              children: /*#__PURE__*/_jsx(Text, {
                fontSize: 20,
                fontWeight: 500,
                children: error !== null && error !== void 0 ? error : /*#__PURE__*/_jsx(Trans, {
                  id: "Supply"
                })
              })
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {}), !addIsUnsupported ? pair && !noLiquidity && pairState !== PairState.INVALID ? /*#__PURE__*/_jsx(AutoColumn, {
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
    }) : null : /*#__PURE__*/_jsx(UnsupportedCurrencyFooter, {
      show: addIsUnsupported,
      currencies: [currencies.CURRENCY_A, currencies.CURRENCY_B]
    })]
  });
}