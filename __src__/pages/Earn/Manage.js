import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CountUp } from 'use-count-up';
import { ButtonEmpty, ButtonPrimary } from "../../components/Button";
import { AutoColumn } from "../../components/Column";
import DoubleCurrencyLogo from "../../components/DoubleLogo";
import ClaimRewardModal from "../../components/earn/ClaimRewardModal";
import StakingModal from "../../components/earn/StakingModal";
import { CardBGImage, CardNoise, CardSection, DataCard } from "../../components/earn/styled";
import UnstakingModal from "../../components/earn/UnstakingModal";
import { RowBetween } from "../../components/Row";
import { BIG_INT_SECONDS_IN_WEEK, BIG_INT_ZERO } from "../../constants/misc";
import { useCurrency } from "../../hooks/Tokens";
import { useColor } from "../../hooks/useColor";
import usePrevious from "../../hooks/usePrevious";
import { useTotalSupply } from "../../hooks/useTotalSupply";
import useUSDCPrice from "../../hooks/useUSDCPrice";
import { useV2Pair } from "../../hooks/useV2Pairs";
import { useActiveWeb3React } from "../../hooks/web3";
import { useWalletModalToggle } from "../../state/application/hooks";
import { useStakingInfo } from "../../state/stake/hooks";
import { useTokenBalance } from "../../state/wallet/hooks";
import { ThemedText } from "../../theme";
import { currencyId } from "../../utils/currencyId";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "Manage__PageWrapper",
  componentId: "sc-j87c2z-0"
})(["max-width:640px;width:100%;"]);

const PositionInfo = _styled(AutoColumn).withConfig({
  displayName: "Manage__PositionInfo",
  componentId: "sc-j87c2z-1"
})(["position:relative;max-width:640px;width:100%;opacity:", ";"], _ref => {
  let {
    dim
  } = _ref;
  return dim ? 0.6 : 1;
});

const BottomSection = _styled(AutoColumn).withConfig({
  displayName: "Manage__BottomSection",
  componentId: "sc-j87c2z-2"
})(["border-radius:12px;width:100%;position:relative;"]);

const StyledDataCard = _styled(DataCard).withConfig({
  displayName: "Manage__StyledDataCard",
  componentId: "sc-j87c2z-3"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#1e1a31 0%,#3d51a5 100%);z-index:2;box-shadow:0px 4px 10px rgba(0,0,0,0.1);background:", ";"], _ref2 => {
  let {
    theme,
    bgColor,
    showBackground
  } = _ref2;
  return `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `;
});

const StyledBottomCard = _styled(DataCard).withConfig({
  displayName: "Manage__StyledBottomCard",
  componentId: "sc-j87c2z-4"
})(["background:", ";opacity:", ";margin-top:-40px;padding:0 1.25rem 1rem 1.25rem;padding-top:32px;z-index:1;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg3;
}, _ref4 => {
  let {
    dim
  } = _ref4;
  return dim ? 0.4 : 1;
});

const PoolData = _styled(DataCard).withConfig({
  displayName: "Manage__PoolData",
  componentId: "sc-j87c2z-5"
})(["background:none;border:1px solid ", ";padding:1rem;z-index:1;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg4;
});

const VoteCard = _styled(DataCard).withConfig({
  displayName: "Manage__VoteCard",
  componentId: "sc-j87c2z-6"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#27ae60 0%,#000000 100%);overflow:hidden;"]);

const DataRow = _styled(RowBetween).withConfig({
  displayName: "Manage__DataRow",
  componentId: "sc-j87c2z-7"
})(["justify-content:center;gap:12px;", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `;
});

export default function Manage(_ref7) {
  var _ref8, _ref9, _useStakingInfo, _stakingInfo$stakedAm, _stakingInfo$stakedAm2, _stakingInfo$stakedAm3, _stakingInfo$earnedAm, _stakingInfo$earnedAm2, _usePrevious, _valueOfTotalStakedAm, _valueOfTotalStakedAm2, _stakingInfo$totalRew, _stakingInfo$totalRew2, _stakingInfo$stakedAm4, _stakingInfo$stakedAm5, _stakingInfo$stakedAm6, _stakingInfo$earnedAm3, _stakingInfo$rewardRa, _stakingInfo$rewardRa2, _stakingInfo$stakedAm7, _stakingInfo$stakedAm8;

  let {
    match: {
      params: {
        currencyIdA,
        currencyIdB
      }
    }
  } = _ref7;
  const {
    account
  } = useActiveWeb3React(); // get currencies and pair

  const [currencyA, currencyB] = [useCurrency(currencyIdA), useCurrency(currencyIdB)];
  const tokenA = (_ref8 = currencyA !== null && currencyA !== void 0 ? currencyA : undefined) === null || _ref8 === void 0 ? void 0 : _ref8.wrapped;
  const tokenB = (_ref9 = currencyB !== null && currencyB !== void 0 ? currencyB : undefined) === null || _ref9 === void 0 ? void 0 : _ref9.wrapped;
  const [, stakingTokenPair] = useV2Pair(tokenA, tokenB);
  const stakingInfo = (_useStakingInfo = useStakingInfo(stakingTokenPair)) === null || _useStakingInfo === void 0 ? void 0 : _useStakingInfo[0]; // detect existing unstaked LP position to show add button if none found

  const userLiquidityUnstaked = useTokenBalance(account !== null && account !== void 0 ? account : undefined, stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm === void 0 ? void 0 : _stakingInfo$stakedAm.currency);
  const showAddLiquidityButton = Boolean((stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm2 = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm2 === void 0 ? void 0 : _stakingInfo$stakedAm2.equalTo('0')) && (userLiquidityUnstaked === null || userLiquidityUnstaked === void 0 ? void 0 : userLiquidityUnstaked.equalTo('0'))); // toggle for staking modal and unstaking modal

  const [showStakingModal, setShowStakingModal] = useState(false);
  const [showUnstakingModal, setShowUnstakingModal] = useState(false);
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false); // fade cards if nothing staked or nothing earned yet

  const disableTop = !(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount) || stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0));
  const token = currencyA !== null && currencyA !== void 0 && currencyA.isNative ? tokenB : tokenA;
  const WETH = currencyA !== null && currencyA !== void 0 && currencyA.isNative ? tokenA : tokenB;
  const backgroundColor = useColor(token); // get WETH value of staked LP tokens

  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm3 = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm3 === void 0 ? void 0 : _stakingInfo$stakedAm3.currency);
  let valueOfTotalStakedAmountInWETH;

  if (totalSupplyOfStakingToken && stakingTokenPair && stakingInfo && WETH) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = CurrencyAmount.fromRawAmount(WETH, JSBI.divide(JSBI.multiply(JSBI.multiply(stakingInfo.totalStakedAmount.quotient, stakingTokenPair.reserveOf(WETH).quotient), JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
    ), totalSupplyOfStakingToken.quotient));
  }

  const countUpAmount = (_stakingInfo$earnedAm = stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$earnedAm2 = stakingInfo.earnedAmount) === null || _stakingInfo$earnedAm2 === void 0 ? void 0 : _stakingInfo$earnedAm2.toFixed(6)) !== null && _stakingInfo$earnedAm !== void 0 ? _stakingInfo$earnedAm : '0';
  const countUpAmountPrevious = (_usePrevious = usePrevious(countUpAmount)) !== null && _usePrevious !== void 0 ? _usePrevious : '0'; // get the USD value of staked WETH

  const USDPrice = useUSDCPrice(WETH);
  const valueOfTotalStakedAmountInUSDC = valueOfTotalStakedAmountInWETH && (USDPrice === null || USDPrice === void 0 ? void 0 : USDPrice.quote(valueOfTotalStakedAmountInWETH));
  const toggleWalletModal = useWalletModalToggle();
  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true);
    } else {
      toggleWalletModal();
    }
  }, [account, toggleWalletModal]);
  return /*#__PURE__*/_jsxs(PageWrapper, {
    gap: "lg",
    justify: "center",
    children: [/*#__PURE__*/_jsxs(RowBetween, {
      style: {
        gap: '24px'
      },
      children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
        style: {
          margin: 0
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0}-{1} Liquidity Mining",
          values: {
            0: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
            1: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
          }
        })
      }), /*#__PURE__*/_jsx(DoubleCurrencyLogo, {
        currency0: currencyA !== null && currencyA !== void 0 ? currencyA : undefined,
        currency1: currencyB !== null && currencyB !== void 0 ? currencyB : undefined,
        size: 24
      })]
    }), /*#__PURE__*/_jsxs(DataRow, {
      style: {
        gap: '24px'
      },
      children: [/*#__PURE__*/_jsx(PoolData, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "sm",
          children: [/*#__PURE__*/_jsx(ThemedText.Body, {
            style: {
              margin: 0
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Total deposits"
            })
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 24,
            fontWeight: 500,
            children: valueOfTotalStakedAmountInUSDC ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, {
              groupSeparator: ','
            })}` : `${(_valueOfTotalStakedAm = (_valueOfTotalStakedAm2 = valueOfTotalStakedAmountInWETH) === null || _valueOfTotalStakedAm2 === void 0 ? void 0 : _valueOfTotalStakedAm2.toSignificant(4, {
              groupSeparator: ','
            })) !== null && _valueOfTotalStakedAm !== void 0 ? _valueOfTotalStakedAm : '-'} ETH`
          })]
        })
      }), /*#__PURE__*/_jsx(PoolData, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "sm",
          children: [/*#__PURE__*/_jsx(ThemedText.Body, {
            style: {
              margin: 0
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Pool Rate"
            })
          }), /*#__PURE__*/_jsx(ThemedText.Body, {
            fontSize: 24,
            fontWeight: 500,
            children: stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.active ? /*#__PURE__*/_jsx(Trans, {
              id: "{0} UNI / week",
              values: {
                0: (_stakingInfo$totalRew = stakingInfo.totalRewardRate) === null || _stakingInfo$totalRew === void 0 ? void 0 : (_stakingInfo$totalRew2 = _stakingInfo$totalRew.multiply(BIG_INT_SECONDS_IN_WEEK)) === null || _stakingInfo$totalRew2 === void 0 ? void 0 : _stakingInfo$totalRew2.toFixed(0, {
                  groupSeparator: ','
                })
              }
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "0 UNI / week"
            })
          })]
        })
      })]
    }), showAddLiquidityButton && /*#__PURE__*/_jsxs(VoteCard, {
      children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardSection, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsx(RowBetween, {
            children: /*#__PURE__*/_jsx(ThemedText.White, {
              fontWeight: 600,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Step 1. Get UNI-V2 Liquidity tokens"
              })
            })
          }), /*#__PURE__*/_jsx(RowBetween, {
            style: {
              marginBottom: '1rem'
            },
            children: /*#__PURE__*/_jsx(ThemedText.White, {
              fontSize: 14,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "UNI-V2 LP tokens are required. Once you've added liquidity to the {0}-{1} pool you can stake your liquidity tokens on this page.",
                values: {
                  0: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
                  1: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
                }
              })
            })
          }), /*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            width: 'fit-content',
            as: Link,
            to: `/add/${currencyA && currencyId(currencyA)}/${currencyB && currencyId(currencyB)}`,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Add {0}-{1} liquidity",
              values: {
                0: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
                1: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
              }
            })
          })]
        })
      }), /*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {})]
    }), stakingInfo && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(StakingModal, {
        isOpen: showStakingModal,
        onDismiss: () => setShowStakingModal(false),
        stakingInfo: stakingInfo,
        userLiquidityUnstaked: userLiquidityUnstaked
      }), /*#__PURE__*/_jsx(UnstakingModal, {
        isOpen: showUnstakingModal,
        onDismiss: () => setShowUnstakingModal(false),
        stakingInfo: stakingInfo
      }), /*#__PURE__*/_jsx(ClaimRewardModal, {
        isOpen: showClaimRewardModal,
        onDismiss: () => setShowClaimRewardModal(false),
        stakingInfo: stakingInfo
      })]
    }), /*#__PURE__*/_jsxs(PositionInfo, {
      gap: "lg",
      justify: "center",
      dim: showAddLiquidityButton,
      children: [/*#__PURE__*/_jsxs(BottomSection, {
        gap: "lg",
        justify: "center",
        children: [/*#__PURE__*/_jsx(StyledDataCard, {
          disabled: disableTop,
          bgColor: backgroundColor,
          showBackground: !showAddLiquidityButton,
          children: /*#__PURE__*/_jsxs(CardSection, {
            children: [/*#__PURE__*/_jsx(CardBGImage, {
              desaturate: true
            }), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "md",
              children: [/*#__PURE__*/_jsx(RowBetween, {
                children: /*#__PURE__*/_jsx(ThemedText.White, {
                  fontWeight: 600,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Your liquidity deposits"
                  })
                })
              }), /*#__PURE__*/_jsxs(RowBetween, {
                style: {
                  alignItems: 'baseline'
                },
                children: [/*#__PURE__*/_jsx(ThemedText.White, {
                  fontSize: 36,
                  fontWeight: 600,
                  children: (_stakingInfo$stakedAm4 = stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm5 = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm5 === void 0 ? void 0 : _stakingInfo$stakedAm5.toSignificant(6)) !== null && _stakingInfo$stakedAm4 !== void 0 ? _stakingInfo$stakedAm4 : '-'
                }), /*#__PURE__*/_jsx(ThemedText.White, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "UNI-V2 {0}-{1}",
                    values: {
                      0: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
                      1: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
                    }
                  })
                })]
              })]
            })]
          })
        }), /*#__PURE__*/_jsxs(StyledBottomCard, {
          dim: stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm6 = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm6 === void 0 ? void 0 : _stakingInfo$stakedAm6.equalTo(JSBI.BigInt(0)),
          children: [/*#__PURE__*/_jsx(CardBGImage, {
            desaturate: true
          }), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "sm",
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(ThemedText.Black, {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Your unclaimed UNI"
                  })
                })
              }), (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.earnedAmount) && JSBI.notEqual(BIG_INT_ZERO, stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$earnedAm3 = stakingInfo.earnedAmount) === null || _stakingInfo$earnedAm3 === void 0 ? void 0 : _stakingInfo$earnedAm3.quotient) && /*#__PURE__*/_jsx(ButtonEmpty, {
                padding: "8px",
                $borderRadius: "8px",
                width: "fit-content",
                onClick: () => setShowClaimRewardModal(true),
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Claim"
                })
              })]
            }), /*#__PURE__*/_jsxs(RowBetween, {
              style: {
                alignItems: 'baseline'
              },
              children: [/*#__PURE__*/_jsx(ThemedText.LargeHeader, {
                fontSize: 36,
                fontWeight: 600,
                children: /*#__PURE__*/_jsx(CountUp, {
                  isCounting: true,
                  decimalPlaces: 4,
                  start: parseFloat(countUpAmountPrevious),
                  end: parseFloat(countUpAmount),
                  thousandsSeparator: ',',
                  duration: 1
                }, countUpAmount)
              }), /*#__PURE__*/_jsxs(ThemedText.Black, {
                fontSize: 16,
                fontWeight: 500,
                children: [/*#__PURE__*/_jsx("span", {
                  role: "img",
                  "aria-label": "wizard-icon",
                  style: {
                    marginRight: '8px '
                  },
                  children: "\u26A1"
                }), stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.active ? /*#__PURE__*/_jsx(Trans, {
                  id: "{0} UNI / week",
                  values: {
                    0: (_stakingInfo$rewardRa = stakingInfo.rewardRate) === null || _stakingInfo$rewardRa === void 0 ? void 0 : (_stakingInfo$rewardRa2 = _stakingInfo$rewardRa.multiply(BIG_INT_SECONDS_IN_WEEK)) === null || _stakingInfo$rewardRa2 === void 0 ? void 0 : _stakingInfo$rewardRa2.toFixed(0, {
                      groupSeparator: ','
                    })
                  }
                }) : /*#__PURE__*/_jsx(Trans, {
                  id: "0 UNI / week"
                })]
              })]
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(ThemedText.Main, {
        style: {
          textAlign: 'center'
        },
        fontSize: 14,
        children: [/*#__PURE__*/_jsx("span", {
          role: "img",
          "aria-label": "wizard-icon",
          style: {
            marginRight: '8px'
          },
          children: "\u2B50\uFE0F"
        }), /*#__PURE__*/_jsx(Trans, {
          id: "When you withdraw, the contract will automagically claim UNI on your behalf!"
        })]
      }), !showAddLiquidityButton && /*#__PURE__*/_jsxs(DataRow, {
        style: {
          marginBottom: '1rem'
        },
        children: [stakingInfo && stakingInfo.active && /*#__PURE__*/_jsx(ButtonPrimary, {
          padding: "8px",
          $borderRadius: "8px",
          width: "160px",
          onClick: handleDepositClick,
          children: stakingInfo !== null && stakingInfo !== void 0 && (_stakingInfo$stakedAm7 = stakingInfo.stakedAmount) !== null && _stakingInfo$stakedAm7 !== void 0 && _stakingInfo$stakedAm7.greaterThan(JSBI.BigInt(0)) ? /*#__PURE__*/_jsx(Trans, {
            id: "Deposit"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Deposit UNI-V2 LP Tokens"
          })
        }), (stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm8 = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm8 === void 0 ? void 0 : _stakingInfo$stakedAm8.greaterThan(JSBI.BigInt(0))) && /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            width: "160px",
            onClick: () => setShowUnstakingModal(true),
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Withdraw"
            })
          })
        })]
      }), !userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo('0') ? null : !(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.active) ? null : /*#__PURE__*/_jsx(ThemedText.Main, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{0} UNI-V2 LP tokens available",
          values: {
            0: userLiquidityUnstaked.toSignificant(6)
          }
        })
      })]
    })]
  });
}