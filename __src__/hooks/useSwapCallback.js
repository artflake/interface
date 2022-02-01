import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { TradeType } from '@uniswap/sdk-core';
import { Router, Trade as V2Trade } from '@uniswap/v2-sdk';
import { SwapRouter } from '@uniswap/v3-sdk';
import { useMemo } from 'react';
import { SWAP_ROUTER_ADDRESSES } from "../constants/addresses";
import { TransactionType } from "../state/transactions/actions";
import { useTransactionAdder } from "../state/transactions/hooks";
import approveAmountCalldata from "../utils/approveAmountCalldata";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { currencyId } from "../utils/currencyId";
import isZero from "../utils/isZero";
import { useArgentWalletContract } from "./useArgentWalletContract";
import { useV2RouterContract } from "./useContract";
import useENS from "./useENS";
import useTransactionDeadline from "./useTransactionDeadline";
import { useActiveWeb3React } from "./web3";
import { jsx as _jsx } from "react/jsx-runtime";
var SwapCallbackState;

(function (SwapCallbackState) {
  SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
  SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
  SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState || (SwapCallbackState = {}));

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
function useSwapCallArguments(trade, // trade to execute, required
allowedSlippage, // in bips
recipientAddressOrName, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
signatureData) {
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const {
    address: recipientAddress
  } = useENS(recipientAddressOrName);
  const recipient = recipientAddressOrName === null ? account : recipientAddress;
  const deadline = useTransactionDeadline();
  const routerContract = useV2RouterContract();
  const argentWalletContract = useArgentWalletContract();
  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return [];

    if (trade instanceof V2Trade) {
      if (!routerContract) return [];
      const swapMethods = [];
      swapMethods.push(Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage,
        recipient,
        deadline: deadline.toNumber()
      }));

      if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage,
          recipient,
          deadline: deadline.toNumber()
        }));
      }

      return swapMethods.map(_ref => {
        let {
          methodName,
          args,
          value
        } = _ref;

        if (argentWalletContract && trade.inputAmount.currency.isToken) {
          return {
            address: argentWalletContract.address,
            calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [[approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address), {
              to: routerContract.address,
              value,
              data: routerContract.interface.encodeFunctionData(methodName, args)
            }]]),
            value: '0x0'
          };
        } else {
          return {
            address: routerContract.address,
            calldata: routerContract.interface.encodeFunctionData(methodName, args),
            value
          };
        }
      });
    } else {
      // trade is V3Trade
      const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
      if (!swapRouterAddress) return [];
      const {
        value,
        calldata
      } = SwapRouter.swapCallParameters(trade, {
        recipient,
        slippageTolerance: allowedSlippage,
        deadline: deadline.toString(),
        ...(signatureData ? {
          inputTokenPermit: 'allowed' in signatureData ? {
            expiry: signatureData.deadline,
            nonce: signatureData.nonce,
            s: signatureData.s,
            r: signatureData.r,
            v: signatureData.v
          } : {
            deadline: signatureData.deadline,
            amount: signatureData.amount,
            s: signatureData.s,
            r: signatureData.r,
            v: signatureData.v
          }
        } : {})
      });

      if (argentWalletContract && trade.inputAmount.currency.isToken) {
        return [{
          address: argentWalletContract.address,
          calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [[approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), swapRouterAddress), {
            to: swapRouterAddress,
            value,
            data: calldata
          }]]),
          value: '0x0'
        }];
      }

      return [{
        address: swapRouterAddress,
        calldata,
        value
      }];
    }
  }, [account, allowedSlippage, argentWalletContract, chainId, deadline, library, recipient, routerContract, signatureData, trade]);
}
/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */


function swapErrorToUserReadableMessage(error) {
  var _reason, _reason2;

  let reason;

  while (Boolean(error)) {
    var _ref2, _error$reason, _error$error, _error$data;

    reason = (_ref2 = (_error$reason = error.reason) !== null && _error$reason !== void 0 ? _error$reason : error.message) !== null && _ref2 !== void 0 ? _ref2 : reason;
    error = (_error$error = error.error) !== null && _error$error !== void 0 ? _error$error : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.originalError;
  }

  if (((_reason = reason) === null || _reason === void 0 ? void 0 : _reason.indexOf('execution reverted: ')) === 0) reason = reason.substr('execution reverted: '.length);

  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return /*#__PURE__*/_jsx(Trans, {
        id: "The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low."
      });

    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return /*#__PURE__*/_jsx(Trans, {
        id: "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance."
      });

    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return /*#__PURE__*/_jsx(Trans, {
        id: "The input token cannot be transferred. There may be an issue with the input token."
      });

    case 'UniswapV2: TRANSFER_FAILED':
      return /*#__PURE__*/_jsx(Trans, {
        id: "The output token cannot be transferred. There may be an issue with the output token."
      });

    case 'UniswapV2: K':
      return /*#__PURE__*/_jsx(Trans, {
        id: "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer."
      });

    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return /*#__PURE__*/_jsx(Trans, {
        id: "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });

    case 'TF':
      return /*#__PURE__*/_jsx(Trans, {
        id: "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });

    default:
      if (((_reason2 = reason) === null || _reason2 === void 0 ? void 0 : _reason2.indexOf('undefined is not an object')) !== -1) {
        console.error(error, reason);
        return /*#__PURE__*/_jsx(Trans, {
          id: "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
        });
      }

      return /*#__PURE__*/_jsx(Trans, {
        id: "Unknown error{0}. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.",
        values: {
          0: reason ? `: "${reason}"` : ''
        }
      });
  }
} // returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade


export function useSwapCallback(trade, // trade to execute, required
allowedSlippage, // in bips
recipientAddressOrName, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
signatureData) {
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName, signatureData);
  const addTransaction = useTransactionAdder();
  const {
    address: recipientAddress
  } = useENS(recipientAddressOrName);
  const recipient = recipientAddressOrName === null ? account : recipientAddress;
  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return {
        state: SwapCallbackState.INVALID,
        callback: null,
        error: /*#__PURE__*/_jsx(Trans, {
          id: "Missing dependencies"
        })
      };
    }

    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return {
          state: SwapCallbackState.INVALID,
          callback: null,
          error: /*#__PURE__*/_jsx(Trans, {
            id: "Invalid recipient"
          })
        };
      } else {
        return {
          state: SwapCallbackState.LOADING,
          callback: null,
          error: null
        };
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap() {
        const estimatedCalls = await Promise.all(swapCalls.map(call => {
          const {
            address,
            calldata,
            value
          } = call;
          const tx = !value || isZero(value) ? {
            from: account,
            to: address,
            data: calldata
          } : {
            from: account,
            to: address,
            data: calldata,
            value
          };
          return library.estimateGas(tx).then(gasEstimate => {
            return {
              call,
              gasEstimate
            };
          }).catch(gasError => {
            console.debug('Gas estimate failed, trying eth_call to extract error', call);
            return library.call(tx).then(result => {
              console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
              return {
                call,
                error: /*#__PURE__*/_jsx(Trans, {
                  id: "Unexpected issue with estimating the gas. Please try again."
                })
              };
            }).catch(callError => {
              console.debug('Call threw error', call, callError);
              return {
                call,
                error: swapErrorToUserReadableMessage(callError)
              };
            });
          });
        })); // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate

        let bestCallOption = estimatedCalls.find((el, ix, list) => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])); // check if any calls errored with a recognizable error

        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter(call => 'error' in call);
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find(call => !('error' in call));
          if (!firstNoErrorCall) throw new Error(
          /*i18n*/
          i18n._("Unexpected error. Could not estimate gas for the swap."));
          bestCallOption = firstNoErrorCall;
        }

        const {
          call: {
            address,
            calldata,
            value
          }
        } = bestCallOption;
        return library.getSigner().sendTransaction({
          from: account,
          to: address,
          data: calldata,
          // let the wallet try if we can't estimate the gas
          ...('gasEstimate' in bestCallOption ? {
            gasLimit: calculateGasMargin(bestCallOption.gasEstimate)
          } : {}),
          ...(value && !isZero(value) ? {
            value
          } : {})
        }).then(response => {
          addTransaction(response, trade.tradeType === TradeType.EXACT_INPUT ? {
            type: TransactionType.SWAP,
            tradeType: TradeType.EXACT_INPUT,
            inputCurrencyId: currencyId(trade.inputAmount.currency),
            inputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
            expectedOutputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
            outputCurrencyId: currencyId(trade.outputAmount.currency),
            minimumOutputCurrencyAmountRaw: trade.minimumAmountOut(allowedSlippage).quotient.toString()
          } : {
            type: TransactionType.SWAP,
            tradeType: TradeType.EXACT_OUTPUT,
            inputCurrencyId: currencyId(trade.inputAmount.currency),
            maximumInputCurrencyAmountRaw: trade.maximumAmountIn(allowedSlippage).quotient.toString(),
            outputCurrencyId: currencyId(trade.outputAmount.currency),
            outputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
            expectedInputCurrencyAmountRaw: trade.inputAmount.quotient.toString()
          });
          return response.hash;
        }).catch(error => {
          // if the user rejected the tx, pass this along
          if ((error === null || error === void 0 ? void 0 : error.code) === 4001) {
            throw new Error(
            /*i18n*/
            i18n._("Transaction rejected."));
          } else {
            // otherwise, the error was unexpected and we need to convey that
            console.error(`Swap failed`, error, address, calldata, value);
            throw new Error(
            /*i18n*/
            i18n._("Swap failed: {0}", {
              0: swapErrorToUserReadableMessage(error)
            }));
          }
        });
      },
      error: null
    };
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction, allowedSlippage]);
}