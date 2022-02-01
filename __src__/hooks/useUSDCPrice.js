import { CurrencyAmount, Price, TradeType } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { SupportedChainId } from '../constants/chains';
import { DAI_OPTIMISM, USDC, USDC_ARBITRUM } from '../constants/tokens';
import { useBestV2Trade } from './useBestV2Trade';
import { useClientSideV3Trade } from './useClientSideV3Trade';
import { useActiveWeb3React } from './web3'; // Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.

const STABLECOIN_AMOUNT_OUT = {
  [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(USDC, 100000e6),
  [SupportedChainId.ARBITRUM_ONE]: CurrencyAmount.fromRawAmount(USDC_ARBITRUM, 10000e6),
  [SupportedChainId.OPTIMISM]: CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10000e18)
};
/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */

export default function useUSDCPrice(currency) {
  const {
    chainId
  } = useActiveWeb3React();
  const amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined;
  const stablecoin = amountOut === null || amountOut === void 0 ? void 0 : amountOut.currency;
  const v2USDCTrade = useBestV2Trade(TradeType.EXACT_OUTPUT, amountOut, currency, {
    maxHops: 2
  });
  const v3USDCTrade = useClientSideV3Trade(TradeType.EXACT_OUTPUT, amountOut, currency);
  return useMemo(() => {
    if (!currency || !stablecoin) {
      return undefined;
    } // handle usdc


    if (currency !== null && currency !== void 0 && currency.wrapped.equals(stablecoin)) {
      return new Price(stablecoin, stablecoin, '1', '1');
    } // use v2 price if available, v3 as fallback


    if (v2USDCTrade) {
      const {
        numerator,
        denominator
      } = v2USDCTrade.route.midPrice;
      return new Price(currency, stablecoin, denominator, numerator);
    } else if (v3USDCTrade.trade) {
      const {
        numerator,
        denominator
      } = v3USDCTrade.trade.route.midPrice;
      return new Price(currency, stablecoin, denominator, numerator);
    }

    return undefined;
  }, [currency, stablecoin, v2USDCTrade, v3USDCTrade.trade]);
}
export function useUSDCValue(currencyAmount) {
  const price = useUSDCPrice(currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency);
  return useMemo(() => {
    if (!price || !currencyAmount) return null;

    try {
      return price.quote(currencyAmount);
    } catch (error) {
      return null;
    }
  }, [currencyAmount, price]);
}