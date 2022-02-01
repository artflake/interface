import { Trans } from "@lingui/react";
import { CurrencyAmount, Percent, Price, Token } from '@uniswap/sdk-core';
import { FeeAmount, Pool, Position, priceToClosestTick, TickMath } from '@uniswap/v3-sdk';
import Badge, { BadgeVariant } from 'components/Badge';
import { ButtonConfirmed } from 'components/Button';
import { BlueCard, DarkGreyCard, LightCard, YellowCard } from 'components/Card';
import DoubleCurrencyLogo from 'components/DoubleLogo';
import FeeSelector from 'components/FeeSelector';
import RangeSelector from 'components/RangeSelector';
import RateToggle from 'components/RateToggle';
import SettingsTab from 'components/Settings';
import { Dots } from 'components/swap/styleds';
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback';
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp';
import { PoolState, usePool } from 'hooks/usePools';
import useTheme from 'hooks/useTheme';
import useTransactionDeadline from 'hooks/useTransactionDeadline';
import JSBI from 'jsbi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, AlertTriangle, ArrowDown } from 'react-feather';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router';
import { Text } from 'rebass';
import { useAppDispatch } from 'state/hooks';
import { Bound, resetMintState } from 'state/mint/v3/actions';
import { useRangeHopCallbacks, useV3DerivedMintInfo, useV3MintActionHandlers } from 'state/mint/v3/hooks';
import { useIsTransactionPending, useTransactionAdder } from 'state/transactions/hooks';
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks';
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount';
import { unwrappedToken } from 'utils/unwrappedToken';
import { AutoColumn } from '../../components/Column';
import CurrencyLogo from '../../components/CurrencyLogo';
import FormattedCurrencyAmount from '../../components/FormattedCurrencyAmount';
import { AutoRow, RowBetween, RowFixed } from '../../components/Row';
import { V2_FACTORY_ADDRESSES } from '../../constants/addresses';
import { WETH9_EXTENDED } from '../../constants/tokens';
import { useToken } from '../../hooks/Tokens';
import { usePairContract, useV2MigratorContract } from '../../hooks/useContract';
import { useV2LiquidityTokenPermit } from '../../hooks/useERC20Permit';
import useIsArgentWallet from '../../hooks/useIsArgentWallet';
import { useTotalSupply } from '../../hooks/useTotalSupply';
import { useActiveWeb3React } from '../../hooks/web3';
import { NEVER_RELOAD, useSingleCallResult } from '../../state/multicall/hooks';
import { TransactionType } from '../../state/transactions/actions';
import { useTokenBalance } from '../../state/wallet/hooks';
import { BackArrow, ExternalLink, ThemedText } from '../../theme';
import { isAddress } from '../../utils';
import { calculateGasMargin } from '../../utils/calculateGasMargin';
import { currencyId } from '../../utils/currencyId';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { BodyWrapper } from '../AppBody';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ZERO = JSBI.BigInt(0);
const DEFAULT_MIGRATE_SLIPPAGE_TOLERANCE = new Percent(75, 10000);

function EmptyState(_ref) {
  let {
    message
  } = _ref;
  return /*#__PURE__*/_jsx(AutoColumn, {
    style: {
      minHeight: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    children: /*#__PURE__*/_jsx(ThemedText.Body, {
      children: message
    })
  });
}

function LiquidityInfo(_ref2) {
  let {
    token0Amount,
    token1Amount
  } = _ref2;
  const currency0 = unwrappedToken(token0Amount.currency);
  const currency1 = unwrappedToken(token1Amount.currency);
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "8px",
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          size: "20px",
          style: {
            marginRight: '8px'
          },
          currency: currency0
        }), /*#__PURE__*/_jsx(Text, {
          fontSize: 16,
          fontWeight: 500,
          children: currency0.symbol
        })]
      }), /*#__PURE__*/_jsx(Text, {
        fontSize: 16,
        fontWeight: 500,
        children: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
          currencyAmount: token0Amount
        })
      })]
    }), /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(CurrencyLogo, {
          size: "20px",
          style: {
            marginRight: '8px'
          },
          currency: currency1
        }), /*#__PURE__*/_jsx(Text, {
          fontSize: 16,
          fontWeight: 500,
          children: currency1.symbol
        })]
      }), /*#__PURE__*/_jsx(Text, {
        fontSize: 16,
        fontWeight: 500,
        children: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
          currencyAmount: token1Amount
        })
      })]
    })]
  });
} // hard-code this for now


const percentageToMigrate = 100;

function V2PairMigration(_ref3) {
  var _pairFactory$result, _priceDifferenceFract, _priceDifferenceFract2, _pool$tickCurrent, _pool$sqrtRatioX, _v2SpotPrice$invert, _v2SpotPrice$invert2, _v3SpotPrice$invert, _priceDifferenceFract3, _v3SpotPrice$invert2;

  let {
    pair,
    pairBalance,
    totalSupply,
    reserve0,
    reserve1,
    token0,
    token1
  } = _ref3;
  const {
    chainId,
    account
  } = useActiveWeb3React();
  const theme = useTheme();
  const v2FactoryAddress = chainId ? V2_FACTORY_ADDRESSES[chainId] : undefined;
  const pairFactory = useSingleCallResult(pair, 'factory');
  const isNotUniswap = ((_pairFactory$result = pairFactory.result) === null || _pairFactory$result === void 0 ? void 0 : _pairFactory$result[0]) && pairFactory.result[0] !== v2FactoryAddress;
  const deadline = useTransactionDeadline(); // custom from users settings

  const blockTimestamp = useCurrentBlockTimestamp();
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_MIGRATE_SLIPPAGE_TOLERANCE); // custom from users

  const currency0 = unwrappedToken(token0);
  const currency1 = unwrappedToken(token1); // this is just getLiquidityValue with the fee off, but for the passed pair

  const token0Value = useMemo(() => CurrencyAmount.fromRawAmount(token0, JSBI.divide(JSBI.multiply(pairBalance.quotient, reserve0.quotient), totalSupply.quotient)), [token0, pairBalance, reserve0, totalSupply]);
  const token1Value = useMemo(() => CurrencyAmount.fromRawAmount(token1, JSBI.divide(JSBI.multiply(pairBalance.quotient, reserve1.quotient), totalSupply.quotient)), [token1, pairBalance, reserve1, totalSupply]); // set up v3 pool

  const [feeAmount, setFeeAmount] = useState(FeeAmount.MEDIUM);
  const [poolState, pool] = usePool(token0, token1, feeAmount);
  const noLiquidity = poolState === PoolState.NOT_EXISTS; // get spot prices + price difference

  const v2SpotPrice = useMemo(() => new Price(token0, token1, reserve0.quotient, reserve1.quotient), [token0, token1, reserve0, reserve1]);
  const v3SpotPrice = poolState === PoolState.EXISTS ? pool === null || pool === void 0 ? void 0 : pool.token0Price : undefined;
  let priceDifferenceFraction = v2SpotPrice && v3SpotPrice ? v3SpotPrice.divide(v2SpotPrice).subtract(1).multiply(100) : undefined;

  if ((_priceDifferenceFract = priceDifferenceFraction) !== null && _priceDifferenceFract !== void 0 && _priceDifferenceFract.lessThan(ZERO)) {
    priceDifferenceFraction = priceDifferenceFraction.multiply(-1);
  }

  const largePriceDifference = priceDifferenceFraction && !((_priceDifferenceFract2 = priceDifferenceFraction) !== null && _priceDifferenceFract2 !== void 0 && _priceDifferenceFract2.lessThan(JSBI.BigInt(2))); // the following is a small hack to get access to price range data/input handlers

  const [baseToken, setBaseToken] = useState(token0);
  const {
    ticks,
    pricesAtTicks,
    invertPrice,
    invalidRange,
    outOfRange,
    ticksAtLimit
  } = useV3DerivedMintInfo(token0, token1, feeAmount, baseToken); // get value and prices at ticks

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
    getIncrementUpper
  } = useRangeHopCallbacks(baseToken, baseToken.equals(token0) ? token1 : token0, feeAmount, tickLower, tickUpper);
  const {
    onLeftRangeInput,
    onRightRangeInput
  } = useV3MintActionHandlers(noLiquidity); // the v3 tick is either the pool's tickCurrent, or the tick closest to the v2 spot price

  const tick = (_pool$tickCurrent = pool === null || pool === void 0 ? void 0 : pool.tickCurrent) !== null && _pool$tickCurrent !== void 0 ? _pool$tickCurrent : priceToClosestTick(v2SpotPrice); // the price is either the current v3 price, or the price at the tick

  const sqrtPrice = (_pool$sqrtRatioX = pool === null || pool === void 0 ? void 0 : pool.sqrtRatioX96) !== null && _pool$sqrtRatioX !== void 0 ? _pool$sqrtRatioX : TickMath.getSqrtRatioAtTick(tick);
  const position = typeof tickLower === 'number' && typeof tickUpper === 'number' && !invalidRange ? Position.fromAmounts({
    pool: pool !== null && pool !== void 0 ? pool : new Pool(token0, token1, feeAmount, sqrtPrice, 0, tick, []),
    tickLower,
    tickUpper,
    amount0: token0Value.quotient,
    amount1: token1Value.quotient,
    useFullPrecision: true // we want full precision for the theoretical position

  }) : undefined;
  const {
    amount0: v3Amount0Min,
    amount1: v3Amount1Min
  } = useMemo(() => position ? position.mintAmountsWithSlippage(allowedSlippage) : {
    amount0: undefined,
    amount1: undefined
  }, [position, allowedSlippage]);
  const refund0 = useMemo(() => position && CurrencyAmount.fromRawAmount(token0, JSBI.subtract(token0Value.quotient, position.amount0.quotient)), [token0Value, position, token0]);
  const refund1 = useMemo(() => position && CurrencyAmount.fromRawAmount(token1, JSBI.subtract(token1Value.quotient, position.amount1.quotient)), [token1Value, position, token1]);
  const [confirmingMigration, setConfirmingMigration] = useState(false);
  const [pendingMigrationHash, setPendingMigrationHash] = useState(null);
  const migrator = useV2MigratorContract(); // approvals

  const [approval, approveManually] = useApproveCallback(pairBalance, migrator === null || migrator === void 0 ? void 0 : migrator.address);
  const {
    signatureData,
    gatherPermitSignature
  } = useV2LiquidityTokenPermit(pairBalance, migrator === null || migrator === void 0 ? void 0 : migrator.address);
  const isArgentWallet = useIsArgentWallet();
  const approve = useCallback(async () => {
    if (isNotUniswap || isArgentWallet) {
      // sushi has to be manually approved
      await approveManually();
    } else if (gatherPermitSignature) {
      try {
        await gatherPermitSignature();
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
          await approveManually();
        }
      }
    } else {
      await approveManually();
    }
  }, [isNotUniswap, isArgentWallet, gatherPermitSignature, approveManually]);
  const addTransaction = useTransactionAdder();
  const isMigrationPending = useIsTransactionPending(pendingMigrationHash !== null && pendingMigrationHash !== void 0 ? pendingMigrationHash : undefined);
  const migrate = useCallback(() => {
    var _signatureData$deadli;

    if (!migrator || !account || !deadline || !blockTimestamp || typeof tickLower !== 'number' || typeof tickUpper !== 'number' || !v3Amount0Min || !v3Amount1Min || !chainId) return;
    const deadlineToUse = (_signatureData$deadli = signatureData === null || signatureData === void 0 ? void 0 : signatureData.deadline) !== null && _signatureData$deadli !== void 0 ? _signatureData$deadli : deadline;
    const data = []; // permit if necessary

    if (signatureData) {
      data.push(migrator.interface.encodeFunctionData('selfPermit', [pair.address, `0x${pairBalance.quotient.toString(16)}`, deadlineToUse, signatureData.v, signatureData.r, signatureData.s]));
    } // create/initialize pool if necessary


    if (noLiquidity) {
      data.push(migrator.interface.encodeFunctionData('createAndInitializePoolIfNecessary', [token0.address, token1.address, feeAmount, `0x${sqrtPrice.toString(16)}`]));
    } // TODO could save gas by not doing this in multicall


    data.push(migrator.interface.encodeFunctionData('migrate', [{
      pair: pair.address,
      liquidityToMigrate: `0x${pairBalance.quotient.toString(16)}`,
      percentageToMigrate,
      token0: token0.address,
      token1: token1.address,
      fee: feeAmount,
      tickLower,
      tickUpper,
      amount0Min: `0x${v3Amount0Min.toString(16)}`,
      amount1Min: `0x${v3Amount1Min.toString(16)}`,
      recipient: account,
      deadline: deadlineToUse,
      refundAsETH: true // hard-code this for now

    }]));
    setConfirmingMigration(true);
    migrator.estimateGas.multicall(data).then(gasEstimate => {
      return migrator.multicall(data, {
        gasLimit: calculateGasMargin(gasEstimate)
      }).then(response => {
        ReactGA.event({
          category: 'Migrate',
          action: `${isNotUniswap ? 'SushiSwap' : 'V2'}->V3`,
          label: `${currency0.symbol}/${currency1.symbol}`
        });
        addTransaction(response, {
          type: TransactionType.MIGRATE_LIQUIDITY_V3,
          baseCurrencyId: currencyId(currency0),
          quoteCurrencyId: currencyId(currency1),
          isFork: isNotUniswap
        });
        setPendingMigrationHash(response.hash);
      });
    }).catch(() => {
      setConfirmingMigration(false);
    });
  }, [chainId, isNotUniswap, migrator, noLiquidity, blockTimestamp, token0, token1, feeAmount, pairBalance, tickLower, tickUpper, sqrtPrice, v3Amount0Min, v3Amount1Min, account, deadline, signatureData, addTransaction, pair, currency0, currency1]);
  const isSuccessfullyMigrated = !!pendingMigrationHash && JSBI.equal(pairBalance.quotient, ZERO);
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "20px",
    children: [/*#__PURE__*/_jsxs(ThemedText.Body, {
      my: 9,
      style: {
        fontWeight: 400
      },
      children: [/*#__PURE__*/_jsx(Trans, {
        id: "This tool will safely migrate your {0} liquidity to V3. The process is completely trustless thanks to the",
        values: {
          0: isNotUniswap ? 'SushiSwap' : 'V2'
        }
      }), chainId && migrator && /*#__PURE__*/_jsx(ExternalLink, {
        href: getExplorerLink(chainId, migrator.address, ExplorerDataType.ADDRESS),
        children: /*#__PURE__*/_jsx(ThemedText.Blue, {
          display: "inline",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Uniswap migration contract\u2197"
          })
        })
      }), "."]
    }), /*#__PURE__*/_jsx(LightCard, {
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "lg",
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            style: {
              marginLeft: '8px'
            },
            children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
              currency0: currency0,
              currency1: currency1,
              margin: false,
              size: 20
            }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              style: {
                marginLeft: '8px'
              },
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{0}/{1} LP Tokens",
                values: {
                  0: currency0.symbol,
                  1: currency1.symbol
                }
              })
            })]
          }), /*#__PURE__*/_jsx(Badge, {
            variant: BadgeVariant.WARNING,
            children: isNotUniswap ? 'Sushi' : 'V2'
          })]
        }), /*#__PURE__*/_jsx(LiquidityInfo, {
          token0Amount: token0Value,
          token1Amount: token1Value
        })]
      })
    }), /*#__PURE__*/_jsx("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      },
      children: /*#__PURE__*/_jsx(ArrowDown, {
        size: 24
      })
    }), /*#__PURE__*/_jsx(LightCard, {
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "lg",
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            style: {
              marginLeft: '8px'
            },
            children: [/*#__PURE__*/_jsx(DoubleCurrencyLogo, {
              currency0: currency0,
              currency1: currency1,
              margin: false,
              size: 20
            }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              style: {
                marginLeft: '8px'
              },
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{0}/{1} LP NFT",
                values: {
                  0: currency0.symbol,
                  1: currency1.symbol
                }
              })
            })]
          }), /*#__PURE__*/_jsx(Badge, {
            variant: BadgeVariant.PRIMARY,
            children: "V3"
          })]
        }), /*#__PURE__*/_jsx(FeeSelector, {
          feeAmount: feeAmount,
          handleFeePoolSelect: setFeeAmount
        }), noLiquidity && /*#__PURE__*/_jsxs(BlueCard, {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          children: [/*#__PURE__*/_jsx(AlertCircle, {
            color: theme.text1,
            style: {
              marginBottom: '12px',
              opacity: 0.8
            }
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 14,
            style: {
              marginBottom: 8,
              fontWeight: 500,
              opacity: 0.8
            },
            textAlign: "center",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "You are the first liquidity provider for this Uniswap V3 pool. Your liquidity will migrate at the current {0} price.",
              values: {
                0: isNotUniswap ? 'SushiSwap' : 'V2'
              }
            })
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontWeight: 500,
            textAlign: "center",
            fontSize: 14,
            style: {
              marginTop: '8px',
              opacity: 0.8
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Your transaction cost will be much higher as it includes the gas to create the pool."
            })
          }), v2SpotPrice && /*#__PURE__*/_jsx(AutoColumn, {
            gap: "8px",
            style: {
              marginTop: '12px'
            },
            children: /*#__PURE__*/_jsx(RowBetween, {
              children: /*#__PURE__*/_jsxs(ThemedText.Body, {
                fontWeight: 500,
                fontSize: 14,
                children: [/*#__PURE__*/_jsx(Trans, {
                  id: "{0} {1} Price:",
                  values: {
                    0: isNotUniswap ? 'SushiSwap' : 'V2',
                    1: invertPrice ? currency1.symbol : currency0.symbol
                  }
                }), ' ', invertPrice ? `${v2SpotPrice === null || v2SpotPrice === void 0 ? void 0 : (_v2SpotPrice$invert = v2SpotPrice.invert()) === null || _v2SpotPrice$invert === void 0 ? void 0 : _v2SpotPrice$invert.toSignificant(6)} ${currency0.symbol}` : `${v2SpotPrice === null || v2SpotPrice === void 0 ? void 0 : v2SpotPrice.toSignificant(6)} ${currency1.symbol}`]
              })
            })
          })]
        }), largePriceDifference ? /*#__PURE__*/_jsxs(YellowCard, {
          children: [/*#__PURE__*/_jsxs(AutoColumn, {
            gap: "8px",
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ThemedText.Body, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "{0} {1} Price:",
                  values: {
                    0: isNotUniswap ? 'SushiSwap' : 'V2',
                    1: invertPrice ? currency1.symbol : currency0.symbol
                  }
                })
              }), /*#__PURE__*/_jsx(ThemedText.Black, {
                fontSize: 14,
                children: invertPrice ? `${v2SpotPrice === null || v2SpotPrice === void 0 ? void 0 : (_v2SpotPrice$invert2 = v2SpotPrice.invert()) === null || _v2SpotPrice$invert2 === void 0 ? void 0 : _v2SpotPrice$invert2.toSignificant(6)} ${currency0.symbol}` : `${v2SpotPrice === null || v2SpotPrice === void 0 ? void 0 : v2SpotPrice.toSignificant(6)} ${currency1.symbol}`
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ThemedText.Body, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "V3 {0} Price:",
                  values: {
                    0: invertPrice ? currency1.symbol : currency0.symbol
                  }
                })
              }), /*#__PURE__*/_jsx(ThemedText.Black, {
                fontSize: 14,
                children: invertPrice ? `${v3SpotPrice === null || v3SpotPrice === void 0 ? void 0 : (_v3SpotPrice$invert = v3SpotPrice.invert()) === null || _v3SpotPrice$invert === void 0 ? void 0 : _v3SpotPrice$invert.toSignificant(6)} ${currency0.symbol}` : `${v3SpotPrice === null || v3SpotPrice === void 0 ? void 0 : v3SpotPrice.toSignificant(6)} ${currency1.symbol}`
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx(ThemedText.Body, {
                fontSize: 14,
                color: "inherit",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Price Difference:"
                })
              }), /*#__PURE__*/_jsx(ThemedText.Black, {
                fontSize: 14,
                color: "inherit",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "{0}%",
                  values: {
                    0: (_priceDifferenceFract3 = priceDifferenceFraction) === null || _priceDifferenceFract3 === void 0 ? void 0 : _priceDifferenceFract3.toSignificant(4)
                  }
                })
              })]
            })]
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 14,
            style: {
              marginTop: 8,
              fontWeight: 400
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "You should only deposit liquidity into Uniswap V3 at a price you believe is correct. <0/>If the price seems incorrect, you can either make a swap to move the price or wait for someone else to do so.",
              components: {
                0: /*#__PURE__*/_jsx("br", {})
              }
            })
          })]
        }) : !noLiquidity && v3SpotPrice ? /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 14,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "V3 {0} Price:",
              values: {
                0: invertPrice ? currency1.symbol : currency0.symbol
              }
            })
          }), /*#__PURE__*/_jsx(ThemedText.Black, {
            fontSize: 14,
            children: invertPrice ? `${v3SpotPrice === null || v3SpotPrice === void 0 ? void 0 : (_v3SpotPrice$invert2 = v3SpotPrice.invert()) === null || _v3SpotPrice$invert2 === void 0 ? void 0 : _v3SpotPrice$invert2.toSignificant(6)} ${currency0.symbol}` : `${v3SpotPrice === null || v3SpotPrice === void 0 ? void 0 : v3SpotPrice.toSignificant(6)} ${currency1.symbol}`
          })]
        }) : null, /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.Label, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Set Price Range"
            })
          }), /*#__PURE__*/_jsx(RateToggle, {
            currencyA: invertPrice ? currency1 : currency0,
            currencyB: invertPrice ? currency0 : currency1,
            handleRateToggle: () => {
              onLeftRangeInput('');
              onRightRangeInput('');
              setBaseToken(base => base.equals(token0) ? token1 : token0);
            }
          })]
        }), /*#__PURE__*/_jsx(RangeSelector, {
          priceLower: priceLower,
          priceUpper: priceUpper,
          getDecrementLower: getDecrementLower,
          getIncrementLower: getIncrementLower,
          getDecrementUpper: getDecrementUpper,
          getIncrementUpper: getIncrementUpper,
          onLeftRangeInput: onLeftRangeInput,
          onRightRangeInput: onRightRangeInput,
          currencyA: invertPrice ? currency1 : currency0,
          currencyB: invertPrice ? currency0 : currency1,
          feeAmount: feeAmount,
          ticksAtLimit: ticksAtLimit
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
        }) : null, position ? /*#__PURE__*/_jsx(DarkGreyCard, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            children: [/*#__PURE__*/_jsx(LiquidityInfo, {
              token0Amount: position.amount0,
              token1Amount: position.amount1
            }), chainId && refund0 && refund1 ? /*#__PURE__*/_jsx(ThemedText.Black, {
              fontSize: 12,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "At least {0} {1} and {2} {3} will be refunded to your wallet due to selected price range.",
                values: {
                  0: formatCurrencyAmount(refund0, 4),
                  1: token0.equals(WETH9_EXTENDED[chainId]) ? 'ETH' : token0.symbol,
                  2: formatCurrencyAmount(refund1, 4),
                  3: token1.equals(WETH9_EXTENDED[chainId]) ? 'ETH' : token1.symbol
                }
              })
            }) : null]
          })
        }) : null, /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "12px",
          children: [!isSuccessfullyMigrated && !isMigrationPending ? /*#__PURE__*/_jsx(AutoColumn, {
            gap: "12px",
            style: {
              flex: '1'
            },
            children: /*#__PURE__*/_jsx(ButtonConfirmed, {
              confirmed: approval === ApprovalState.APPROVED || signatureData !== null,
              disabled: approval !== ApprovalState.NOT_APPROVED || signatureData !== null || !v3Amount0Min || !v3Amount1Min || invalidRange || confirmingMigration,
              onClick: approve,
              children: approval === ApprovalState.PENDING ? /*#__PURE__*/_jsx(Dots, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Approving"
                })
              }) : approval === ApprovalState.APPROVED || signatureData !== null ? /*#__PURE__*/_jsx(Trans, {
                id: "Allowed"
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "Allow LP token migration"
              })
            })
          }) : null, /*#__PURE__*/_jsx(AutoColumn, {
            gap: "12px",
            style: {
              flex: '1'
            },
            children: /*#__PURE__*/_jsx(ButtonConfirmed, {
              confirmed: isSuccessfullyMigrated,
              disabled: !v3Amount0Min || !v3Amount1Min || invalidRange || approval !== ApprovalState.APPROVED && signatureData === null || confirmingMigration || isMigrationPending || isSuccessfullyMigrated,
              onClick: migrate,
              children: isSuccessfullyMigrated ? 'Success!' : isMigrationPending ? /*#__PURE__*/_jsx(Dots, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Migrating"
                })
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "Migrate"
              })
            })
          })]
        })]
      })
    })]
  });
}

export default function MigrateV2Pair(_ref4) {
  var _token0AddressCallSta, _useSingleCallResult, _useSingleCallResult$, _useSingleCallResult$2, _useSingleCallResult2;

  let {
    match: {
      params: {
        address
      }
    }
  } = _ref4;
  // reset mint state on component mount, and as a cleanup (on unmount)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetMintState());
    return () => {
      dispatch(resetMintState());
    };
  }, [dispatch]);
  const {
    chainId,
    account
  } = useActiveWeb3React(); // get pair contract

  const validatedAddress = isAddress(address);
  const pair = usePairContract(validatedAddress ? validatedAddress : undefined); // get token addresses from pair contract

  const token0AddressCallState = useSingleCallResult(pair, 'token0', undefined, NEVER_RELOAD);
  const token0Address = token0AddressCallState === null || token0AddressCallState === void 0 ? void 0 : (_token0AddressCallSta = token0AddressCallState.result) === null || _token0AddressCallSta === void 0 ? void 0 : _token0AddressCallSta[0];
  const token1Address = (_useSingleCallResult = useSingleCallResult(pair, 'token1', undefined, NEVER_RELOAD)) === null || _useSingleCallResult === void 0 ? void 0 : (_useSingleCallResult$ = _useSingleCallResult.result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0]; // get tokens

  const token0 = useToken(token0Address);
  const token1 = useToken(token1Address); // get liquidity token balance

  const liquidityToken = useMemo(() => chainId && validatedAddress ? new Token(chainId, validatedAddress, 18) : undefined, [chainId, validatedAddress]); // get data required for V2 pair migration

  const pairBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, liquidityToken);
  const totalSupply = useTotalSupply(liquidityToken);
  const [reserve0Raw, reserve1Raw] = (_useSingleCallResult$2 = (_useSingleCallResult2 = useSingleCallResult(pair, 'getReserves')) === null || _useSingleCallResult2 === void 0 ? void 0 : _useSingleCallResult2.result) !== null && _useSingleCallResult$2 !== void 0 ? _useSingleCallResult$2 : [];
  const reserve0 = useMemo(() => token0 && reserve0Raw ? CurrencyAmount.fromRawAmount(token0, reserve0Raw) : undefined, [token0, reserve0Raw]);
  const reserve1 = useMemo(() => token1 && reserve1Raw ? CurrencyAmount.fromRawAmount(token1, reserve1Raw) : undefined, [token1, reserve1Raw]); // redirect for invalid url params

  if (!validatedAddress || !pair || pair && token0AddressCallState !== null && token0AddressCallState !== void 0 && token0AddressCallState.valid && !(token0AddressCallState !== null && token0AddressCallState !== void 0 && token0AddressCallState.loading) && !(token0AddressCallState !== null && token0AddressCallState !== void 0 && token0AddressCallState.error) && !token0Address) {
    console.error('Invalid pair address');
    return /*#__PURE__*/_jsx(Redirect, {
      to: "/migrate/v2"
    });
  }

  return /*#__PURE__*/_jsx(BodyWrapper, {
    style: {
      padding: 24
    },
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "16px",
      children: [/*#__PURE__*/_jsxs(AutoRow, {
        style: {
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        gap: "8px",
        children: [/*#__PURE__*/_jsx(BackArrow, {
          to: "/migrate/v2"
        }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Migrate V2 Liquidity"
          })
        }), /*#__PURE__*/_jsx(SettingsTab, {
          placeholderSlippage: DEFAULT_MIGRATE_SLIPPAGE_TOLERANCE
        })]
      }), !account ? /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "You must connect an account."
        })
      }) : pairBalance && totalSupply && reserve0 && reserve1 && token0 && token1 ? /*#__PURE__*/_jsx(V2PairMigration, {
        pair: pair,
        pairBalance: pairBalance,
        totalSupply: totalSupply,
        reserve0: reserve0,
        reserve1: reserve1,
        token0: token0,
        token1: token1
      }) : /*#__PURE__*/_jsx(EmptyState, {
        message: /*#__PURE__*/_jsx(Trans, {
          id: "Loading"
        })
      })]
    })
  });
}