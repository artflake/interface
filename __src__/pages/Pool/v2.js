import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { L2_CHAIN_IDS } from 'constants/chains';
import JSBI from 'jsbi';
import { useContext, useMemo } from 'react';
import { ChevronsRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import { ButtonOutlined, ButtonPrimary, ButtonSecondary } from '../../components/Button';
import Card from '../../components/Card';
import { AutoColumn } from '../../components/Column';
import { CardBGImage, CardNoise, CardSection, DataCard } from '../../components/earn/styled';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import FullPositionCard from '../../components/PositionCard';
import { RowBetween, RowFixed } from '../../components/Row';
import { Dots } from '../../components/swap/styleds';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink';
import { BIG_INT_ZERO } from '../../constants/misc';
import { useV2Pairs } from '../../hooks/useV2Pairs';
import { useActiveWeb3React } from '../../hooks/web3';
import { useStakingInfo } from '../../state/stake/hooks';
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { ExternalLink, HideSmall, ThemedText } from '../../theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "v2__PageWrapper",
  componentId: "sc-1a8iabs-0"
})(["max-width:640px;width:100%;"]);

const VoteCard = _styled(DataCard).withConfig({
  displayName: "v2__VoteCard",
  componentId: "sc-1a8iabs-1"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#27ae60 0%,#000000 100%);overflow:hidden;"]);

const TitleRow = _styled(RowBetween).withConfig({
  displayName: "v2__TitleRow",
  componentId: "sc-1a8iabs-2"
})(["", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `;
});

const ButtonRow = _styled(RowFixed).withConfig({
  displayName: "v2__ButtonRow",
  componentId: "sc-1a8iabs-3"
})(["gap:8px;", ";"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `;
});

const ResponsiveButtonPrimary = _styled(ButtonPrimary).withConfig({
  displayName: "v2__ResponsiveButtonPrimary",
  componentId: "sc-1a8iabs-4"
})(["width:fit-content;border-radius:12px;", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.mediaWidth.upToSmall`
    width: 48%;
  `;
});

const ResponsiveButtonSecondary = _styled(ButtonSecondary).withConfig({
  displayName: "v2__ResponsiveButtonSecondary",
  componentId: "sc-1a8iabs-5"
})(["width:fit-content;", ";"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    width: 48%;
  `;
});

const EmptyProposals = _styled.div.withConfig({
  displayName: "v2__EmptyProposals",
  componentId: "sc-1a8iabs-6"
})(["border:1px solid ", ";padding:16px 12px;border-radius:12px;display:flex;flex-direction:column;justify-content:center;align-items:center;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.text4;
});

const Layer2Prompt = _styled(EmptyProposals).withConfig({
  displayName: "v2__Layer2Prompt",
  componentId: "sc-1a8iabs-7"
})(["margin-top:16px;"]);

export default function Pool() {
  const theme = useContext(_ThemeContext);
  const {
    account,
    chainId
  } = useActiveWeb3React(); // fetch the user's balances of all tracked V2 LP tokens

  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(() => trackedTokenPairs.map(tokens => ({
    liquidityToken: toV2LiquidityToken(tokens),
    tokens
  })), [trackedTokenPairs]);
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [tokenPairsWithLiquidityTokens]);
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(account !== null && account !== void 0 ? account : undefined, liquidityTokens); // fetch the reserves for all V2 pools in which the user has a balance

  const liquidityTokensWithBalances = useMemo(() => tokenPairsWithLiquidityTokens.filter(_ref6 => {
    var _v2PairsBalances$liqu;

    let {
      liquidityToken
    } = _ref6;
    return (_v2PairsBalances$liqu = v2PairsBalances[liquidityToken.address]) === null || _v2PairsBalances$liqu === void 0 ? void 0 : _v2PairsBalances$liqu.greaterThan('0');
  }), [tokenPairsWithLiquidityTokens, v2PairsBalances]);
  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(_ref7 => {
    let {
      tokens
    } = _ref7;
    return tokens;
  }));
  const v2IsLoading = fetchingV2PairBalances || (v2Pairs === null || v2Pairs === void 0 ? void 0 : v2Pairs.length) < liquidityTokensWithBalances.length || (v2Pairs === null || v2Pairs === void 0 ? void 0 : v2Pairs.some(V2Pair => !V2Pair));
  const allV2PairsWithLiquidity = v2Pairs.map(_ref8 => {
    let [, pair] = _ref8;
    return pair;
  }).filter(v2Pair => Boolean(v2Pair)); // show liquidity even if its deposited in rewards contract

  const stakingInfo = useStakingInfo();
  const stakingInfosWithBalance = stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.filter(pool => JSBI.greaterThan(pool.stakedAmount.quotient, BIG_INT_ZERO));
  const stakingPairs = useV2Pairs(stakingInfosWithBalance === null || stakingInfosWithBalance === void 0 ? void 0 : stakingInfosWithBalance.map(stakingInfo => stakingInfo.tokens)); // remove any pairs that also are included in pairs with stake in mining pool

  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter(v2Pair => {
    return (stakingPairs === null || stakingPairs === void 0 ? void 0 : stakingPairs.map(stakingPair => stakingPair[1]).filter(stakingPair => (stakingPair === null || stakingPair === void 0 ? void 0 : stakingPair.liquidityToken.address) === v2Pair.liquidityToken.address).length) === 0;
  });
  const ON_L2 = chainId && L2_CHAIN_IDS.includes(chainId);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(PageWrapper, {
      children: [/*#__PURE__*/_jsx(SwapPoolTabs, {
        active: 'pool'
      }), /*#__PURE__*/_jsxs(VoteCard, {
        children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardSection, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "md",
            children: [/*#__PURE__*/_jsx(RowBetween, {
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontWeight: 600,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Liquidity provider rewards"
                })
              })
            }), /*#__PURE__*/_jsx(RowBetween, {
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity."
                })
              })
            }), /*#__PURE__*/_jsx(ExternalLink, {
              style: {
                color: 'white',
                textDecoration: 'underline'
              },
              target: "_blank",
              href: "https://uniswap.org/docs/v2/core-concepts/pools/",
              children: /*#__PURE__*/_jsx(ThemedText.White, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Read more about providing liquidity"
                })
              })
            })]
          })
        }), /*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {})]
      }), ON_L2 ? /*#__PURE__*/_jsx(AutoColumn, {
        gap: "lg",
        justify: "center",
        children: /*#__PURE__*/_jsx(AutoColumn, {
          gap: "md",
          style: {
            width: '100%'
          },
          children: /*#__PURE__*/_jsx(Layer2Prompt, {
            children: /*#__PURE__*/_jsx(ThemedText.Body, {
              color: theme.text3,
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "V2 is not available on Layer 2. Switch to Layer 1 Ethereum."
              })
            })
          })
        })
      }) : /*#__PURE__*/_jsx(AutoColumn, {
        gap: "lg",
        justify: "center",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/_jsxs(TitleRow, {
            style: {
              marginTop: '1rem'
            },
            padding: '0',
            children: [/*#__PURE__*/_jsx(HideSmall, {
              children: /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
                style: {
                  marginTop: '0.5rem',
                  justifySelf: 'flex-start'
                },
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Your V2 liquidity"
                })
              })
            }), /*#__PURE__*/_jsxs(ButtonRow, {
              children: [/*#__PURE__*/_jsx(ResponsiveButtonSecondary, {
                as: Link,
                padding: "6px 8px",
                to: "/add/v2/ETH",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Create a pair"
                })
              }), /*#__PURE__*/_jsx(ResponsiveButtonPrimary, {
                id: "find-pool-button",
                as: Link,
                to: "/pool/v2/find",
                padding: "6px 8px",
                children: /*#__PURE__*/_jsx(Text, {
                  fontWeight: 500,
                  fontSize: 16,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Import Pool"
                  })
                })
              }), /*#__PURE__*/_jsx(ResponsiveButtonPrimary, {
                id: "join-pool-button",
                as: Link,
                to: "/add/v2/ETH",
                padding: "6px 8px",
                children: /*#__PURE__*/_jsx(Text, {
                  fontWeight: 500,
                  fontSize: 16,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Add V2 Liquidity"
                  })
                })
              })]
            })]
          }), !account ? /*#__PURE__*/_jsx(Card, {
            padding: "40px",
            children: /*#__PURE__*/_jsx(ThemedText.Body, {
              color: theme.text3,
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Connect to a wallet to view your liquidity."
              })
            })
          }) : v2IsLoading ? /*#__PURE__*/_jsx(EmptyProposals, {
            children: /*#__PURE__*/_jsx(ThemedText.Body, {
              color: theme.text3,
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Dots, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Loading"
                })
              })
            })
          }) : (allV2PairsWithLiquidity === null || allV2PairsWithLiquidity === void 0 ? void 0 : allV2PairsWithLiquidity.length) > 0 || (stakingPairs === null || stakingPairs === void 0 ? void 0 : stakingPairs.length) > 0 ? /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ButtonSecondary, {
              children: /*#__PURE__*/_jsx(RowBetween, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "<0>Account analytics and accrued fees</0><1> \u2197 </1>",
                  components: {
                    0: /*#__PURE__*/_jsx(ExternalLink, {
                      href: 'https://v2.info.uniswap.org/account/' + account
                    }),
                    1: /*#__PURE__*/_jsx("span", {})
                  }
                })
              })
            }), v2PairsWithoutStakedAmount.map(v2Pair => /*#__PURE__*/_jsx(FullPositionCard, {
              pair: v2Pair
            }, v2Pair.liquidityToken.address)), stakingPairs.map((stakingPair, i) => stakingPair[1] &&
            /*#__PURE__*/
            // skip pairs that arent loaded
            _jsx(FullPositionCard, {
              pair: stakingPair[1],
              stakedBalance: stakingInfosWithBalance[i].stakedAmount
            }, stakingInfosWithBalance[i].stakingRewardAddress)), /*#__PURE__*/_jsx(RowFixed, {
              justify: "center",
              style: {
                width: '100%'
              },
              children: /*#__PURE__*/_jsxs(ButtonOutlined, {
                as: Link,
                to: "/migrate/v2",
                id: "import-pool-link",
                style: {
                  padding: '8px 16px',
                  margin: '0 4px',
                  borderRadius: '12px',
                  width: 'fit-content',
                  fontSize: '14px'
                },
                children: [/*#__PURE__*/_jsx(ChevronsRight, {
                  size: 16,
                  style: {
                    marginRight: '8px'
                  }
                }), /*#__PURE__*/_jsx(Trans, {
                  id: "Migrate Liquidity to V3"
                })]
              })
            })]
          }) : /*#__PURE__*/_jsx(EmptyProposals, {
            children: /*#__PURE__*/_jsx(ThemedText.Body, {
              color: theme.text3,
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "No liquidity found."
              })
            })
          })]
        })
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}