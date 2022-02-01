import { skipToken } from '@reduxjs/toolkit/query/react';
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Trade } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { useBlockNumber } from 'state/application/hooks';
import { useGetQuoteQuery } from 'state/routing/slice';
import { V3TradeState } from './types';
import { computeRoutes } from './utils';

function useFreshData(data, dataBlockNumber) {
  let maxBlockAge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  const localBlockNumber = useBlockNumber();
  if (!localBlockNumber) return undefined;

  if (localBlockNumber - dataBlockNumber > maxBlockAge) {
    return undefined;
  }

  return data;
}
/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped.
 */


function useRoutingAPIArguments(_ref) {
  let {
    tokenIn,
    tokenOut,
    amount,
    tradeType
  } = _ref;

  if (!tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut)) {
    return undefined;
  }

  return {
    tokenInAddress: tokenIn.wrapped.address,
    tokenInChainId: tokenIn.chainId,
    tokenOutAddress: tokenOut.wrapped.address,
    tokenOutChainId: tokenOut.chainId,
    amount: amount.quotient.toString(),
    type: tradeType === TradeType.EXACT_INPUT ? 'exactIn' : 'exactOut'
  };
}
/**
 * Returns the best v3 trade by invoking the routing api
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */


export function useRoutingAPITrade(tradeType, amountSpecified, otherCurrency) {
  const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [amountSpecified, otherCurrency, tradeType]);
  const queryArgs = useRoutingAPIArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    tradeType
  });
  const {
    isLoading,
    isError,
    data
  } = useGetQuoteQuery(queryArgs !== null && queryArgs !== void 0 ? queryArgs : skipToken, {
    pollingInterval: 10000,
    refetchOnFocus: true
  });
  const quoteResult = useFreshData(data, Number(data === null || data === void 0 ? void 0 : data.blockNumber) || 0);
  const routes = useMemo(() => computeRoutes(currencyIn, currencyOut, quoteResult), [currencyIn, currencyOut, quoteResult]);
  return useMemo(() => {
    if (!currencyIn || !currencyOut) {
      return {
        state: V3TradeState.INVALID,
        trade: null
      };
    }

    if (isLoading && !quoteResult) {
      // only on first hook render
      return {
        state: V3TradeState.LOADING,
        trade: null
      };
    }

    const otherAmount = tradeType === TradeType.EXACT_INPUT ? currencyOut && quoteResult ? CurrencyAmount.fromRawAmount(currencyOut, quoteResult.quote) : undefined : currencyIn && quoteResult ? CurrencyAmount.fromRawAmount(currencyIn, quoteResult.quote) : undefined;

    if (isError || !otherAmount || !routes || routes.length === 0 || !queryArgs) {
      return {
        state: V3TradeState.NO_ROUTE_FOUND,
        trade: null
      };
    }

    const trade = Trade.createUncheckedTradeWithMultipleRoutes({
      routes,
      tradeType
    });
    return {
      // always return VALID regardless of isFetching status
      state: V3TradeState.VALID,
      trade
    };
  }, [currencyIn, currencyOut, isLoading, quoteResult, isError, routes, queryArgs, tradeType]);
}