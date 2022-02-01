import { Trans } from "@lingui/react";
import { BigNumber } from '@ethersproject/bignumber';
import { Percent } from '@uniswap/sdk-core';
import { NonfungiblePositionManager } from '@uniswap/v3-sdk';
import RangeBadge from 'components/Badge/RangeBadge';
import { ButtonConfirmed, ButtonPrimary } from 'components/Button';
import { LightCard } from 'components/Card';
import { AutoColumn } from 'components/Column';
import CurrencyLogo from 'components/CurrencyLogo';
import DoubleCurrencyLogo from 'components/DoubleLogo';
import { Break } from 'components/earn/styled';
import FormattedCurrencyAmount from 'components/FormattedCurrencyAmount';
import Loader from 'components/Loader';
import { AddRemoveTabs } from 'components/NavigationTabs';
import { AutoRow, RowBetween, RowFixed } from 'components/Row';
import Slider from 'components/Slider';
import Toggle from 'components/Toggle';
import { useV3NFTPositionManagerContract } from 'hooks/useContract';
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler';
import useTheme from 'hooks/useTheme';
import useTransactionDeadline from 'hooks/useTransactionDeadline';
import { useV3PositionFromTokenId } from 'hooks/useV3Positions';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useMemo, useState } from 'react';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router-dom';
import { Text } from 'rebass';
import { useBurnV3ActionHandlers, useBurnV3State, useDerivedV3BurnInfo } from 'state/burn/v3/hooks';
import { useTransactionAdder } from 'state/transactions/hooks';
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks';
import { ThemedText } from 'theme';
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal';
import { WETH9_EXTENDED } from '../../constants/tokens';
import { TransactionType } from '../../state/transactions/actions';
import { calculateGasMargin } from '../../utils/calculateGasMargin';
import { currencyId } from '../../utils/currencyId';
import AppBody from '../AppBody';
import { ResponsiveHeaderText, SmallMaxButton, Wrapper } from './styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100); // redirect invalid tokenIds

export default function RemoveLiquidityV3(_ref) {
  let {
    location,
    match: {
      params: {
        tokenId
      }
    }
  } = _ref;
  const parsedTokenId = useMemo(() => {
    try {
      return BigNumber.from(tokenId);
    } catch {
      return null;
    }
  }, [tokenId]);

  if (parsedTokenId === null || parsedTokenId.eq(0)) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: { ...location,
        pathname: '/pool'
      }
    });
  }

  return /*#__PURE__*/_jsx(Remove, {
    tokenId: parsedTokenId
  });
}

function Remove(_ref2) {
  var _position$liquidity, _liquidityValue0$curr, _liquidityValue1$curr, _feeValue0$currency2, _feeValue1$currency2, _liquidityValue0$curr3, _liquidityValue1$curr3, _feeValue0$currency3, _feeValue1$currency3;

  let {
    tokenId
  } = _ref2;
  const {
    position
  } = useV3PositionFromTokenId(tokenId);
  const theme = useTheme();
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React(); // flag for receiving WETH

  const [receiveWETH, setReceiveWETH] = useState(false); // burn state

  const {
    percent
  } = useBurnV3State();
  const {
    position: positionSDK,
    liquidityPercentage,
    liquidityValue0,
    liquidityValue1,
    feeValue0,
    feeValue1,
    outOfRange,
    error
  } = useDerivedV3BurnInfo(position, receiveWETH);
  const {
    onPercentSelect
  } = useBurnV3ActionHandlers();
  const removed = position === null || position === void 0 ? void 0 : (_position$liquidity = position.liquidity) === null || _position$liquidity === void 0 ? void 0 : _position$liquidity.eq(0); // boilerplate for the slider

  const [percentForSlider, onPercentSelectForSlider] = useDebouncedChangeHandler(percent, onPercentSelect);
  const deadline = useTransactionDeadline(); // custom from users settings

  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE); // custom from users

  const [showConfirm, setShowConfirm] = useState(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false);
  const [txnHash, setTxnHash] = useState();
  const addTransaction = useTransactionAdder();
  const positionManager = useV3NFTPositionManagerContract();
  const burn = useCallback(async () => {
    setAttemptingTxn(true);

    if (!positionManager || !liquidityValue0 || !liquidityValue1 || !deadline || !account || !chainId || !feeValue0 || !feeValue1 || !positionSDK || !liquidityPercentage || !library) {
      return;
    }

    const {
      calldata,
      value
    } = NonfungiblePositionManager.removeCallParameters(positionSDK, {
      tokenId: tokenId.toString(),
      liquidityPercentage,
      slippageTolerance: allowedSlippage,
      deadline: deadline.toString(),
      collectOptions: {
        expectedCurrencyOwed0: feeValue0,
        expectedCurrencyOwed1: feeValue1,
        recipient: account
      }
    });
    const txn = {
      to: positionManager.address,
      data: calldata,
      value
    };
    library.getSigner().estimateGas(txn).then(estimate => {
      const newTxn = { ...txn,
        gasLimit: calculateGasMargin(estimate)
      };
      return library.getSigner().sendTransaction(newTxn).then(response => {
        ReactGA.event({
          category: 'Liquidity',
          action: 'RemoveV3',
          label: [liquidityValue0.currency.symbol, liquidityValue1.currency.symbol].join('/')
        });
        setTxnHash(response.hash);
        setAttemptingTxn(false);
        addTransaction(response, {
          type: TransactionType.REMOVE_LIQUIDITY_V3,
          baseCurrencyId: currencyId(liquidityValue0.currency),
          quoteCurrencyId: currencyId(liquidityValue1.currency),
          expectedAmountBaseRaw: liquidityValue0.quotient.toString(),
          expectedAmountQuoteRaw: liquidityValue1.quotient.toString()
        });
      });
    }).catch(error => {
      setAttemptingTxn(false);
      console.error(error);
    });
  }, [positionManager, liquidityValue0, liquidityValue1, deadline, account, chainId, feeValue0, feeValue1, positionSDK, liquidityPercentage, library, tokenId, allowedSlippage, addTransaction]);
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false); // if there was a tx hash, we want to clear the input

    if (txnHash) {
      onPercentSelectForSlider(0);
    }

    setAttemptingTxn(false);
    setTxnHash('');
  }, [onPercentSelectForSlider, txnHash]);

  const pendingText = /*#__PURE__*/_jsx(Trans, {
    id: "Removing {0} {1} and {2} {3}",
    values: {
      0: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : liquidityValue0.toSignificant(6),
      1: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : (_liquidityValue0$curr = liquidityValue0.currency) === null || _liquidityValue0$curr === void 0 ? void 0 : _liquidityValue0$curr.symbol,
      2: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : liquidityValue1.toSignificant(6),
      3: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : (_liquidityValue1$curr = liquidityValue1.currency) === null || _liquidityValue1$curr === void 0 ? void 0 : _liquidityValue1$curr.symbol
    }
  });

  function modalHeader() {
    var _liquidityValue0$curr2, _liquidityValue1$curr2, _feeValue0$currency, _feeValue1$currency;

    return /*#__PURE__*/_jsxs(AutoColumn, {
      gap: 'sm',
      style: {
        padding: '16px'
      },
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        align: "flex-end",
        children: [/*#__PURE__*/_jsx(Text, {
          fontSize: 16,
          fontWeight: 500,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Pooled {0}:",
            values: {
              0: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : (_liquidityValue0$curr2 = liquidityValue0.currency) === null || _liquidityValue0$curr2 === void 0 ? void 0 : _liquidityValue0$curr2.symbol
            }
          })
        }), /*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            marginLeft: '6px',
            children: liquidityValue0 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
              currencyAmount: liquidityValue0
            })
          }), /*#__PURE__*/_jsx(CurrencyLogo, {
            size: "20px",
            style: {
              marginLeft: '8px'
            },
            currency: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : liquidityValue0.currency
          })]
        })]
      }), /*#__PURE__*/_jsxs(RowBetween, {
        align: "flex-end",
        children: [/*#__PURE__*/_jsx(Text, {
          fontSize: 16,
          fontWeight: 500,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Pooled {0}:",
            values: {
              0: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : (_liquidityValue1$curr2 = liquidityValue1.currency) === null || _liquidityValue1$curr2 === void 0 ? void 0 : _liquidityValue1$curr2.symbol
            }
          })
        }), /*#__PURE__*/_jsxs(RowFixed, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            marginLeft: '6px',
            children: liquidityValue1 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
              currencyAmount: liquidityValue1
            })
          }), /*#__PURE__*/_jsx(CurrencyLogo, {
            size: "20px",
            style: {
              marginLeft: '8px'
            },
            currency: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : liquidityValue1.currency
          })]
        })]
      }), feeValue0 !== null && feeValue0 !== void 0 && feeValue0.greaterThan(0) || feeValue1 !== null && feeValue1 !== void 0 && feeValue1.greaterThan(0) ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ThemedText.Italic, {
          fontSize: 12,
          color: theme.text2,
          textAlign: "left",
          padding: '8px 0 0 0',
          children: /*#__PURE__*/_jsx(Trans, {
            id: "You will also collect fees earned from this position."
          })
        }), /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} Fees Earned:",
              values: {
                0: feeValue0 === null || feeValue0 === void 0 ? void 0 : (_feeValue0$currency = feeValue0.currency) === null || _feeValue0$currency === void 0 ? void 0 : _feeValue0$currency.symbol
              }
            })
          }), /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              marginLeft: '6px',
              children: feeValue0 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                currencyAmount: feeValue0
              })
            }), /*#__PURE__*/_jsx(CurrencyLogo, {
              size: "20px",
              style: {
                marginLeft: '8px'
              },
              currency: feeValue0 === null || feeValue0 === void 0 ? void 0 : feeValue0.currency
            })]
          })]
        }), /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(Text, {
            fontSize: 16,
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} Fees Earned:",
              values: {
                0: feeValue1 === null || feeValue1 === void 0 ? void 0 : (_feeValue1$currency = feeValue1.currency) === null || _feeValue1$currency === void 0 ? void 0 : _feeValue1$currency.symbol
              }
            })
          }), /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(Text, {
              fontSize: 16,
              fontWeight: 500,
              marginLeft: '6px',
              children: feeValue1 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                currencyAmount: feeValue1
              })
            }), /*#__PURE__*/_jsx(CurrencyLogo, {
              size: "20px",
              style: {
                marginLeft: '8px'
              },
              currency: feeValue1 === null || feeValue1 === void 0 ? void 0 : feeValue1.currency
            })]
          })]
        })]
      }) : null, /*#__PURE__*/_jsx(ButtonPrimary, {
        mt: "16px",
        onClick: burn,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Remove"
        })
      })]
    });
  }

  const showCollectAsWeth = Boolean((liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : liquidityValue0.currency) && (liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : liquidityValue1.currency) && (liquidityValue0.currency.isNative || liquidityValue1.currency.isNative || liquidityValue0.currency.wrapped.equals(WETH9_EXTENDED[liquidityValue0.currency.chainId]) || liquidityValue1.currency.wrapped.equals(WETH9_EXTENDED[liquidityValue1.currency.chainId])));
  return /*#__PURE__*/_jsxs(AutoColumn, {
    children: [/*#__PURE__*/_jsx(TransactionConfirmationModal, {
      isOpen: showConfirm,
      onDismiss: handleDismissConfirmation,
      attemptingTxn: attemptingTxn,
      hash: txnHash !== null && txnHash !== void 0 ? txnHash : '',
      content: () => /*#__PURE__*/_jsx(ConfirmationModalContent, {
        title: /*#__PURE__*/_jsx(Trans, {
          id: "Remove Liquidity"
        }),
        onDismiss: handleDismissConfirmation,
        topContent: modalHeader
      }),
      pendingText: pendingText
    }), /*#__PURE__*/_jsxs(AppBody, {
      children: [/*#__PURE__*/_jsx(AddRemoveTabs, {
        creating: false,
        adding: false,
        positionID: tokenId.toString(),
        defaultSlippage: DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE
      }), /*#__PURE__*/_jsx(Wrapper, {
        children: position ? /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "lg",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
                currency0: feeValue0 === null || feeValue0 === void 0 ? void 0 : feeValue0.currency,
                currency1: feeValue1 === null || feeValue1 === void 0 ? void 0 : feeValue1.currency,
                size: 20,
                margin: true
              }), /*#__PURE__*/_jsx(ThemedText.Label, {
                ml: "10px",
                fontSize: "20px",
                children: `${feeValue0 === null || feeValue0 === void 0 ? void 0 : (_feeValue0$currency2 = feeValue0.currency) === null || _feeValue0$currency2 === void 0 ? void 0 : _feeValue0$currency2.symbol}/${feeValue1 === null || feeValue1 === void 0 ? void 0 : (_feeValue1$currency2 = feeValue1.currency) === null || _feeValue1$currency2 === void 0 ? void 0 : _feeValue1$currency2.symbol}`
              })]
            }), /*#__PURE__*/_jsx(RangeBadge, {
              removed: removed,
              inRange: !outOfRange
            })]
          }), /*#__PURE__*/_jsx(LightCard, {
            children: /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "md",
              children: [/*#__PURE__*/_jsx(ThemedText.Main, {
                fontWeight: 400,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Amount"
                })
              }), /*#__PURE__*/_jsxs(RowBetween, {
                children: [/*#__PURE__*/_jsx(ResponsiveHeaderText, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "{percentForSlider}%",
                    values: {
                      percentForSlider: percentForSlider
                    }
                  })
                }), /*#__PURE__*/_jsxs(AutoRow, {
                  gap: "4px",
                  justify: "flex-end",
                  children: [/*#__PURE__*/_jsx(SmallMaxButton, {
                    onClick: () => onPercentSelect(25),
                    width: "20%",
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "25%"
                    })
                  }), /*#__PURE__*/_jsx(SmallMaxButton, {
                    onClick: () => onPercentSelect(50),
                    width: "20%",
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "50%"
                    })
                  }), /*#__PURE__*/_jsx(SmallMaxButton, {
                    onClick: () => onPercentSelect(75),
                    width: "20%",
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "75%"
                    })
                  }), /*#__PURE__*/_jsx(SmallMaxButton, {
                    onClick: () => onPercentSelect(100),
                    width: "20%",
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Max"
                    })
                  })]
                })]
              }), /*#__PURE__*/_jsx(Slider, {
                value: percentForSlider,
                onChange: onPercentSelectForSlider
              })]
            })
          }), /*#__PURE__*/_jsx(LightCard, {
            children: /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "md",
              children: [/*#__PURE__*/_jsxs(RowBetween, {
                children: [/*#__PURE__*/_jsx(Text, {
                  fontSize: 16,
                  fontWeight: 500,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Pooled {0}:",
                    values: {
                      0: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : (_liquidityValue0$curr3 = liquidityValue0.currency) === null || _liquidityValue0$curr3 === void 0 ? void 0 : _liquidityValue0$curr3.symbol
                    }
                  })
                }), /*#__PURE__*/_jsxs(RowFixed, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 16,
                    fontWeight: 500,
                    marginLeft: '6px',
                    children: liquidityValue0 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                      currencyAmount: liquidityValue0
                    })
                  }), /*#__PURE__*/_jsx(CurrencyLogo, {
                    size: "20px",
                    style: {
                      marginLeft: '8px'
                    },
                    currency: liquidityValue0 === null || liquidityValue0 === void 0 ? void 0 : liquidityValue0.currency
                  })]
                })]
              }), /*#__PURE__*/_jsxs(RowBetween, {
                children: [/*#__PURE__*/_jsx(Text, {
                  fontSize: 16,
                  fontWeight: 500,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Pooled {0}:",
                    values: {
                      0: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : (_liquidityValue1$curr3 = liquidityValue1.currency) === null || _liquidityValue1$curr3 === void 0 ? void 0 : _liquidityValue1$curr3.symbol
                    }
                  })
                }), /*#__PURE__*/_jsxs(RowFixed, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 16,
                    fontWeight: 500,
                    marginLeft: '6px',
                    children: liquidityValue1 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                      currencyAmount: liquidityValue1
                    })
                  }), /*#__PURE__*/_jsx(CurrencyLogo, {
                    size: "20px",
                    style: {
                      marginLeft: '8px'
                    },
                    currency: liquidityValue1 === null || liquidityValue1 === void 0 ? void 0 : liquidityValue1.currency
                  })]
                })]
              }), feeValue0 !== null && feeValue0 !== void 0 && feeValue0.greaterThan(0) || feeValue1 !== null && feeValue1 !== void 0 && feeValue1.greaterThan(0) ? /*#__PURE__*/_jsxs(_Fragment, {
                children: [/*#__PURE__*/_jsx(Break, {}), /*#__PURE__*/_jsxs(RowBetween, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 16,
                    fontWeight: 500,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "{0} Fees Earned:",
                      values: {
                        0: feeValue0 === null || feeValue0 === void 0 ? void 0 : (_feeValue0$currency3 = feeValue0.currency) === null || _feeValue0$currency3 === void 0 ? void 0 : _feeValue0$currency3.symbol
                      }
                    })
                  }), /*#__PURE__*/_jsxs(RowFixed, {
                    children: [/*#__PURE__*/_jsx(Text, {
                      fontSize: 16,
                      fontWeight: 500,
                      marginLeft: '6px',
                      children: feeValue0 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                        currencyAmount: feeValue0
                      })
                    }), /*#__PURE__*/_jsx(CurrencyLogo, {
                      size: "20px",
                      style: {
                        marginLeft: '8px'
                      },
                      currency: feeValue0 === null || feeValue0 === void 0 ? void 0 : feeValue0.currency
                    })]
                  })]
                }), /*#__PURE__*/_jsxs(RowBetween, {
                  children: [/*#__PURE__*/_jsx(Text, {
                    fontSize: 16,
                    fontWeight: 500,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "{0} Fees Earned:",
                      values: {
                        0: feeValue1 === null || feeValue1 === void 0 ? void 0 : (_feeValue1$currency3 = feeValue1.currency) === null || _feeValue1$currency3 === void 0 ? void 0 : _feeValue1$currency3.symbol
                      }
                    })
                  }), /*#__PURE__*/_jsxs(RowFixed, {
                    children: [/*#__PURE__*/_jsx(Text, {
                      fontSize: 16,
                      fontWeight: 500,
                      marginLeft: '6px',
                      children: feeValue1 && /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                        currencyAmount: feeValue1
                      })
                    }), /*#__PURE__*/_jsx(CurrencyLogo, {
                      size: "20px",
                      style: {
                        marginLeft: '8px'
                      },
                      currency: feeValue1 === null || feeValue1 === void 0 ? void 0 : feeValue1.currency
                    })]
                  })]
                })]
              }) : null]
            })
          }), showCollectAsWeth && /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.Main, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Collect as WETH"
              })
            }), /*#__PURE__*/_jsx(Toggle, {
              id: "receive-as-weth",
              isActive: receiveWETH,
              toggle: () => setReceiveWETH(receiveWETH => !receiveWETH)
            })]
          }), /*#__PURE__*/_jsx("div", {
            style: {
              display: 'flex'
            },
            children: /*#__PURE__*/_jsx(AutoColumn, {
              gap: "12px",
              style: {
                flex: '1'
              },
              children: /*#__PURE__*/_jsx(ButtonConfirmed, {
                confirmed: false,
                disabled: removed || percent === 0 || !liquidityValue0,
                onClick: () => setShowConfirm(true),
                children: removed ? /*#__PURE__*/_jsx(Trans, {
                  id: "Closed"
                }) : error !== null && error !== void 0 ? error : /*#__PURE__*/_jsx(Trans, {
                  id: "Remove"
                })
              })
            })
          })]
        }) : /*#__PURE__*/_jsx(Loader, {})
      })]
    })]
  });
}