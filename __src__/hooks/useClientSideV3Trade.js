import { CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { SwapQuoter, Trade } from '@uniswap/v3-sdk';
import { SupportedChainId } from 'constants/chains';
import JSBI from 'jsbi';
import { useMemo } from 'react';
import { V3TradeState } from 'state/routing/types';
import { useSingleContractWithCallData } from '../state/multicall/hooks';
import { useAllV3Routes } from './useAllV3Routes';
import { useV3Quoter } from './useContract';
import { useActiveWeb3React } from './web3';
const QUOTE_GAS_OVERRIDES = {
  [SupportedChainId.ARBITRUM_ONE]: 25000000,
  [SupportedChainId.ARBITRUM_RINKEBY]: 25000000
};
const DEFAULT_GAS_QUOTE = 2000000;
/**
 * Returns the best v3 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */

export function useClientSideV3Trade(tradeType, amountSpecified, otherCurrency) {
  var _QUOTE_GAS_OVERRIDES$;

  const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [tradeType, amountSpecified, otherCurrency]);
  const {
    routes,
    loading: routesLoading
  } = useAllV3Routes(currencyIn, currencyOut);
  const quoter = useV3Quoter();
  const {
    chainId
  } = useActiveWeb3React();
  const quotesResults = useSingleContractWithCallData(quoter, amountSpecified ? routes.map(route => SwapQuoter.quoteCallParameters(route, amountSpecified, tradeType).calldata) : [], {
    gasRequired: chainId ? (_QUOTE_GAS_OVERRIDES$ = QUOTE_GAS_OVERRIDES[chainId]) !== null && _QUOTE_GAS_OVERRIDES$ !== void 0 ? _QUOTE_GAS_OVERRIDES$ : DEFAULT_GAS_QUOTE : undefined
  });
  return useMemo(() => {
    if (!amountSpecified || !currencyIn || !currencyOut || quotesResults.some(_ref => {
      let {
        valid
      } = _ref;
      return !valid;
    }) || ( // skip when tokens are the same
    tradeType === TradeType.EXACT_INPUT ? amountSpecified.currency.equals(currencyOut) : amountSpecified.currency.equals(currencyIn))) {
      return {
        state: V3TradeState.INVALID,
        trade: null
      };
    }

    if (routesLoading || quotesResults.some(_ref2 => {
      let {
        loading
      } = _ref2;
      return loading;
    })) {
      return {
        state: V3TradeState.LOADING,
        trade: null
      };
    }

    const {
      bestRoute,
      amountIn,
      amountOut
    } = quotesResults.reduce((currentBest, _ref3, i) => {
      let {
        result
      } = _ref3;
      if (!result) return currentBest; // overwrite the current best if it's not defined or if this route is better

      if (tradeType === TradeType.EXACT_INPUT) {
        const amountOut = CurrencyAmount.fromRawAmount(currencyOut, result.amountOut.toString());

        if (currentBest.amountOut === null || JSBI.lessThan(currentBest.amountOut.quotient, amountOut.quotient)) {
          return {
            bestRoute: routes[i],
            amountIn: amountSpecified,
            amountOut
          };
        }
      } else {
        const amountIn = CurrencyAmount.fromRawAmount(currencyIn, result.amountIn.toString());

        if (currentBest.amountIn === null || JSBI.greaterThan(currentBest.amountIn.quotient, amountIn.quotient)) {
          return {
            bestRoute: routes[i],
            amountIn,
            amountOut: amountSpecified
          };
        }
      }

      return currentBest;
    }, {
      bestRoute: null,
      amountIn: null,
      amountOut: null
    });

    if (!bestRoute || !amountIn || !amountOut) {
      return {
        state: V3TradeState.NO_ROUTE_FOUND,
        trade: null
      };
    }

    return {
      state: V3TradeState.VALID,
      trade: Trade.createUncheckedTrade({
        route: bestRoute,
        tradeType,
        inputAmount: amountIn,
        outputAmount: amountOut
      })
    };
  }, [amountSpecified, currencyIn, currencyOut, quotesResults, routes, routesLoading, tradeType]);
}