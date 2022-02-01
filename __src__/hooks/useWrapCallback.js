import { useMemo } from 'react';
import { WETH9_EXTENDED } from '../constants/tokens';
import { tryParseAmount } from '../state/swap/hooks';
import { TransactionType } from '../state/transactions/actions';
import { useTransactionAdder } from '../state/transactions/hooks';
import { useCurrencyBalance } from '../state/wallet/hooks';
import { useWETHContract } from './useContract';
import { useActiveWeb3React } from './web3';
export let WrapType;

(function (WrapType) {
  WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
  WrapType[WrapType["WRAP"] = 1] = "WRAP";
  WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
})(WrapType || (WrapType = {}));

const NOT_APPLICABLE = {
  wrapType: WrapType.NOT_APPLICABLE
};
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */

export default function useWrapCallback(inputCurrency, outputCurrency, typedValue) {
  const {
    chainId,
    account
  } = useActiveWeb3React();
  const wethContract = useWETHContract();
  const balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined); // we can always parse the amount typed as the input currency, since wrapping is 1:1

  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined), [inputCurrency, typedValue]);
  const addTransaction = useTransactionAdder();
  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE;
    const weth = WETH9_EXTENDED[chainId];
    if (!weth) return NOT_APPLICABLE;
    const hasInputAmount = Boolean(inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.greaterThan('0'));
    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);

    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute: sufficientBalance && inputAmount ? async () => {
          try {
            const txReceipt = await wethContract.deposit({
              value: `0x${inputAmount.quotient.toString(16)}`
            });
            addTransaction(txReceipt, {
              type: TransactionType.WRAP,
              unwrapped: false,
              currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString()
            });
          } catch (error) {
            console.error('Could not deposit', error);
          }
        } : undefined,
        inputError: sufficientBalance ? undefined : hasInputAmount ? 'Insufficient ETH balance' : 'Enter ETH amount'
      };
    } else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
      return {
        wrapType: WrapType.UNWRAP,
        execute: sufficientBalance && inputAmount ? async () => {
          try {
            const txReceipt = await wethContract.withdraw(`0x${inputAmount.quotient.toString(16)}`);
            addTransaction(txReceipt, {
              type: TransactionType.WRAP,
              unwrapped: true,
              currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString()
            });
          } catch (error) {
            console.error('Could not withdraw', error);
          }
        } : undefined,
        inputError: sufficientBalance ? undefined : hasInputAmount ? 'Insufficient WETH balance' : 'Enter WETH amount'
      };
    } else {
      return NOT_APPLICABLE;
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}