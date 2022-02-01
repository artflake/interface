import { ThemeContext as _ThemeContext } from "styled-components";
import { Trans } from "@lingui/react";
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { Token } from '@uniswap/sdk-core';
import MigrateSushiPositionCard from "../../components/PositionCard/Sushi";
import MigrateV2PositionCard from "../../components/PositionCard/V2";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import { PairState, useV2Pairs } from "../../hooks/useV2Pairs";
import { useContext, useMemo } from 'react';
import { Text } from 'rebass';
import { LightCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import QuestionHelper from "../../components/QuestionHelper";
import { AutoRow } from "../../components/Row";
import { Dots } from "../../components/swap/styleds";
import { V2_FACTORY_ADDRESSES } from "../../constants/addresses";
import { useActiveWeb3React } from "../../hooks/web3";
import { toV2LiquidityToken, useTrackedTokenPairs } from "../../state/user/hooks";
import { useTokenBalancesWithLoadingIndicator } from "../../state/wallet/hooks";
import { BackArrow, StyledInternalLink, ThemedText } from "../../theme";
import { BodyWrapper } from "../AppBody";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

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
} // quick hack because sushi init code hash is different


const computeSushiPairAddress = _ref2 => {
  let {
    tokenA,
    tokenB
  } = _ref2;
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

  return getCreate2Address('0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac', keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]), '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303');
};
/**
 * Given two tokens return the sushiswap liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */


function toSushiLiquidityToken(_ref3) {
  let [tokenA, tokenB] = _ref3;
  return new Token(tokenA.chainId, computeSushiPairAddress({
    tokenA,
    tokenB
  }), 18, 'SLP', 'SushiSwap LP Token');
}

export default function MigrateV2() {
  const theme = useContext(_ThemeContext);
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const v2FactoryAddress = chainId ? V2_FACTORY_ADDRESSES[chainId] : undefined; // fetch the user's balances of all tracked V2 LP tokens

  const trackedTokenPairs = useTrackedTokenPairs(); // calculate v2 + sushi pair contract addresses for all token pairs

  const tokenPairsWithLiquidityTokens = useMemo(() => trackedTokenPairs.map(tokens => {
    // sushi liquidity token or null
    const sushiLiquidityToken = chainId === 1 ? toSushiLiquidityToken(tokens) : null;
    return {
      v2liquidityToken: v2FactoryAddress ? toV2LiquidityToken(tokens) : undefined,
      sushiLiquidityToken,
      tokens
    };
  }), [trackedTokenPairs, chainId, v2FactoryAddress]); //  get pair liquidity token addresses for balance-fetching purposes

  const allLiquidityTokens = useMemo(() => {
    const v2 = tokenPairsWithLiquidityTokens.map(_ref4 => {
      let {
        v2liquidityToken
      } = _ref4;
      return v2liquidityToken;
    });
    const sushi = tokenPairsWithLiquidityTokens.map(_ref5 => {
      let {
        sushiLiquidityToken
      } = _ref5;
      return sushiLiquidityToken;
    }).filter(token => !!token);
    return [...v2, ...sushi];
  }, [tokenPairsWithLiquidityTokens]); // fetch pair balances

  const [pairBalances, fetchingPairBalances] = useTokenBalancesWithLoadingIndicator(account !== null && account !== void 0 ? account : undefined, allLiquidityTokens); // filter for v2 liquidity tokens that the user has a balance in

  const tokenPairsWithV2Balance = useMemo(() => {
    if (fetchingPairBalances) return [];
    return tokenPairsWithLiquidityTokens.filter(_ref6 => {
      var _pairBalances$v2liqui;

      let {
        v2liquidityToken
      } = _ref6;
      return v2liquidityToken && ((_pairBalances$v2liqui = pairBalances[v2liquidityToken.address]) === null || _pairBalances$v2liqui === void 0 ? void 0 : _pairBalances$v2liqui.greaterThan(0));
    }).map(tokenPairsWithLiquidityTokens => tokenPairsWithLiquidityTokens.tokens);
  }, [fetchingPairBalances, tokenPairsWithLiquidityTokens, pairBalances]); // filter for v2 liquidity tokens that the user has a balance in

  const tokenPairsWithSushiBalance = useMemo(() => {
    if (fetchingPairBalances) return [];
    return tokenPairsWithLiquidityTokens.filter(_ref7 => {
      var _pairBalances$sushiLi;

      let {
        sushiLiquidityToken
      } = _ref7;
      return !!sushiLiquidityToken && ((_pairBalances$sushiLi = pairBalances[sushiLiquidityToken.address]) === null || _pairBalances$sushiLi === void 0 ? void 0 : _pairBalances$sushiLi.greaterThan(0));
    });
  }, [fetchingPairBalances, tokenPairsWithLiquidityTokens, pairBalances]);
  const v2Pairs = useV2Pairs(tokenPairsWithV2Balance);
  const v2IsLoading = fetchingPairBalances || v2Pairs.some(_ref8 => {
    let [pairState] = _ref8;
    return pairState === PairState.LOADING;
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BodyWrapper, {
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
            to: "/pool/v2"
          }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Migrate V2 Liquidity"
            })
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(QuestionHelper, {
              text: /*#__PURE__*/_jsx(Trans, {
                id: "Migrate your liquidity tokens from Uniswap V2 to Uniswap V3."
              })
            })
          })]
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          style: {
            marginBottom: 8,
            fontWeight: 400
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and deposit it into Uniswap V3."
          })
        }), !account ? /*#__PURE__*/_jsx(LightCard, {
          padding: "40px",
          children: /*#__PURE__*/_jsx(ThemedText.Body, {
            color: theme.text3,
            textAlign: "center",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Connect to a wallet to view your V2 liquidity."
            })
          })
        }) : v2IsLoading ? /*#__PURE__*/_jsx(LightCard, {
          padding: "40px",
          children: /*#__PURE__*/_jsx(ThemedText.Body, {
            color: theme.text3,
            textAlign: "center",
            children: /*#__PURE__*/_jsx(Dots, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Loading"
              })
            })
          })
        }) : v2Pairs.filter(_ref9 => {
          let [, pair] = _ref9;
          return !!pair;
        }).length > 0 ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [v2Pairs.filter(_ref10 => {
            let [, pair] = _ref10;
            return !!pair;
          }).map(_ref11 => {
            let [, pair] = _ref11;
            return /*#__PURE__*/_jsx(MigrateV2PositionCard, {
              pair: pair
            }, pair.liquidityToken.address);
          }), tokenPairsWithSushiBalance.map(_ref12 => {
            let {
              sushiLiquidityToken,
              tokens
            } = _ref12;
            return /*#__PURE__*/_jsx(MigrateSushiPositionCard, {
              tokenA: tokens[0],
              tokenB: tokens[1],
              liquidityToken: sushiLiquidityToken
            }, sushiLiquidityToken.address);
          })]
        }) : /*#__PURE__*/_jsx(EmptyState, {
          message: /*#__PURE__*/_jsx(Trans, {
            id: "No V2 Liquidity found."
          })
        }), /*#__PURE__*/_jsx(AutoColumn, {
          justify: 'center',
          gap: "md",
          children: /*#__PURE__*/_jsx(Text, {
            textAlign: "center",
            fontSize: 14,
            style: {
              padding: '.5rem 0 .5rem 0'
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Don\u2019t see one of your v2 positions? <0>Import it.</0>",
              components: {
                0: /*#__PURE__*/_jsx(StyledInternalLink, {
                  id: "import-pool-link",
                  to: '/find?origin=/migrate/v2'
                })
              }
            })
          })
        })]
      })
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}