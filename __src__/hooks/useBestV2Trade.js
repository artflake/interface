import { TradeType } from '@uniswap/sdk-core';
import { Trade } from '@uniswap/v2-sdk';
import { useMemo } from 'react';
import { isTradeBetter } from 'utils/isTradeBetter';
import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../constants/misc';
import { useAllCurrencyCombinations } from './useAllCurrencyCombinations';
import { PairState, useV2Pairs } from './useV2Pairs';

function useAllCommonPairs(currencyA, currencyB) {
  const allCurrencyCombinations = useAllCurrencyCombinations(currencyA, currencyB);
  const allPairs = useV2Pairs(allCurrencyCombinations);
  return useMemo(() => Object.values(allPairs // filter out invalid pairs
  .filter(result => Boolean(result[0] === PairState.EXISTS && result[1])).map(_ref => {
    let [, pair] = _ref;
    return pair;
  })), [allPairs]);
}

const MAX_HOPS = 3;
/**
 * Returns the best v2 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */

export function useBestV2Trade(tradeType, amountSpecified, otherCurrency) {
  let {
    maxHops = MAX_HOPS
  } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [tradeType, amountSpecified, otherCurrency]);
  const allowedPairs = useAllCommonPairs(currencyIn, currencyOut);
  return useMemo(() => {
    if (amountSpecified && currencyIn && currencyOut && allowedPairs.length > 0) {
      if (maxHops === 1) {
        const options = {
          maxHops: 1,
          maxNumResults: 1
        };

        if (tradeType === TradeType.EXACT_INPUT) {
          var _Trade$bestTradeExact;

          const amountIn = amountSpecified;
          return (_Trade$bestTradeExact = Trade.bestTradeExactIn(allowedPairs, amountIn, currencyOut, options)[0]) !== null && _Trade$bestTradeExact !== void 0 ? _Trade$bestTradeExact : null;
        } else {
          var _Trade$bestTradeExact2;

          const amountOut = amountSpecified;
          return (_Trade$bestTradeExact2 = Trade.bestTradeExactOut(allowedPairs, currencyIn, amountOut, options)[0]) !== null && _Trade$bestTradeExact2 !== void 0 ? _Trade$bestTradeExact2 : null;
        }
      } // search through trades with varying hops, find best trade out of them


      let bestTradeSoFar = null;

      for (let i = 1; i <= maxHops; i++) {
        const options = {
          maxHops: i,
          maxNumResults: 1
        };
        let currentTrade;

        if (tradeType === TradeType.EXACT_INPUT) {
          var _Trade$bestTradeExact3;

          const amountIn = amountSpecified;
          currentTrade = (_Trade$bestTradeExact3 = Trade.bestTradeExactIn(allowedPairs, amountIn, currencyOut, options)[0]) !== null && _Trade$bestTradeExact3 !== void 0 ? _Trade$bestTradeExact3 : null;
        } else {
          var _Trade$bestTradeExact4;

          const amountOut = amountSpecified;
          currentTrade = (_Trade$bestTradeExact4 = Trade.bestTradeExactOut(allowedPairs, currencyIn, amountOut, options)[0]) !== null && _Trade$bestTradeExact4 !== void 0 ? _Trade$bestTradeExact4 : null;
        } // if current trade is best yet, save it


        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade;
        }
      }

      return bestTradeSoFar;
    }

    return null;
  }, [tradeType, amountSpecified, currencyIn, currencyOut, allowedPairs, maxHops]);
}