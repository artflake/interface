import { Trans } from "@lingui/react";
import { parseUnits } from '@ethersproject/units';
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Trade as V2Trade } from '@uniswap/v2-sdk';
import { TWO_PERCENT } from 'constants/misc';
import { useBestV2Trade } from 'hooks/useBestV2Trade';
import { useBestV3Trade } from 'hooks/useBestV3Trade';
import JSBI from 'jsbi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { V3TradeState } from 'state/routing/types';
import { isTradeBetter } from 'utils/isTradeBetter';
import { useCurrency } from '../../hooks/Tokens';
import useENS from '../../hooks/useENS';
import useParsedQueryString from '../../hooks/useParsedQueryString';
import useSwapSlippageTolerance from '../../hooks/useSwapSlippageTolerance';
import { Version } from '../../hooks/useToggledVersion';
import { useActiveWeb3React } from '../../hooks/web3';
import { isAddress } from '../../utils';
import { useCurrencyBalances } from '../wallet/hooks';
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions';
import { jsx as _jsx } from "react/jsx-runtime";
export function useSwapState() {
  return useAppSelector(state => state.swap);
}
export function useSwapActionHandlers() {
  const dispatch = useAppDispatch();
  const onCurrencySelection = useCallback((field, currency) => {
    dispatch(selectCurrency({
      field,
      currencyId: currency.isToken ? currency.address : currency.isNative ? 'ETH' : ''
    }));
  }, [dispatch]);
  const onSwitchTokens = useCallback(() => {
    dispatch(switchCurrencies());
  }, [dispatch]);
  const onUserInput = useCallback((field, typedValue) => {
    dispatch(typeInput({
      field,
      typedValue
    }));
  }, [dispatch]);
  const onChangeRecipient = useCallback(recipient => {
    dispatch(setRecipient({
      recipient
    }));
  }, [dispatch]);
  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient
  };
} // try to parse a user entered amount for a given token

export function tryParseAmount(value, currency) {
  if (!value || !currency) {
    return undefined;
  }

  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();

    if (typedValueParsed !== '0') {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  } // necessary for all paths to return a value


  return undefined;
}
const BAD_RECIPIENT_ADDRESSES = {
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f': true,
  // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a': true,
  // v2 router 01
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': true // v2 router 02

};
/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */

function involvesAddress(trade, checksummedAddress) {
  const path = trade instanceof V2Trade ? trade.route.path : trade.route.tokenPath;
  return path.some(token => token.address === checksummedAddress) || (trade instanceof V2Trade ? trade.route.pairs.some(pair => pair.liquidityToken.address === checksummedAddress) : false);
} // from the current swap inputs, compute the best trade and return it.


export function useDerivedSwapInfo(toggledVersion) {
  var _ref, _ref3, _ref4;

  const {
    account
  } = useActiveWeb3React();
  const {
    independentField,
    typedValue,
    [Field.INPUT]: {
      currencyId: inputCurrencyId
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrencyId
    },
    recipient
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);
  const recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
  const to = (_ref = recipient === null ? account : recipientLookup.address) !== null && _ref !== void 0 ? _ref : null;
  const relevantTokenBalances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, useMemo(() => [inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined], [inputCurrency, outputCurrency]));
  const isExactIn = independentField === Field.INPUT;
  const parsedAmount = useMemo(() => {
    var _ref2;

    return tryParseAmount(typedValue, (_ref2 = isExactIn ? inputCurrency : outputCurrency) !== null && _ref2 !== void 0 ? _ref2 : undefined);
  }, [inputCurrency, isExactIn, outputCurrency, typedValue]); // get v2 and v3 quotes
  // skip if other version is toggled

  const v2Trade = useBestV2Trade(isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT, toggledVersion !== Version.v3 ? parsedAmount : undefined, (_ref3 = isExactIn ? outputCurrency : inputCurrency) !== null && _ref3 !== void 0 ? _ref3 : undefined);
  const v3Trade = useBestV3Trade(isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT, toggledVersion !== Version.v2 ? parsedAmount : undefined, (_ref4 = isExactIn ? outputCurrency : inputCurrency) !== null && _ref4 !== void 0 ? _ref4 : undefined);
  const isV2TradeBetter = useMemo(() => {
    try {
      // avoids comparing trades when V3Trade is not in a ready state.
      return toggledVersion === Version.v2 || [V3TradeState.VALID, V3TradeState.SYNCING, V3TradeState.NO_ROUTE_FOUND].includes(v3Trade.state) ? isTradeBetter(v3Trade.trade, v2Trade, TWO_PERCENT) : undefined;
    } catch (e) {
      // v3 trade may be debouncing or fetching and have different
      // inputs/ouputs than v2
      return undefined;
    }
  }, [toggledVersion, v2Trade, v3Trade.state, v3Trade.trade]);
  const bestTrade = isV2TradeBetter === undefined ? undefined : isV2TradeBetter ? v2Trade : v3Trade.trade;
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1]
  };
  const currencies = {
    [Field.INPUT]: inputCurrency,
    [Field.OUTPUT]: outputCurrency
  };
  let inputError;

  if (!account) {
    inputError = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (!parsedAmount) {
    var _inputError;

    inputError = (_inputError = inputError) !== null && _inputError !== void 0 ? _inputError : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    var _inputError2;

    inputError = (_inputError2 = inputError) !== null && _inputError2 !== void 0 ? _inputError2 : /*#__PURE__*/_jsx(Trans, {
      id: "Select a token"
    });
  }

  const formattedTo = isAddress(to);

  if (!to || !formattedTo) {
    var _inputError3;

    inputError = (_inputError3 = inputError) !== null && _inputError3 !== void 0 ? _inputError3 : /*#__PURE__*/_jsx(Trans, {
      id: "Enter a recipient"
    });
  } else {
    if (BAD_RECIPIENT_ADDRESSES[formattedTo] || v2Trade && involvesAddress(v2Trade, formattedTo)) {
      var _inputError4;

      inputError = (_inputError4 = inputError) !== null && _inputError4 !== void 0 ? _inputError4 : /*#__PURE__*/_jsx(Trans, {
        id: "Invalid recipient"
      });
    }
  }

  const allowedSlippage = useSwapSlippageTolerance(bestTrade !== null && bestTrade !== void 0 ? bestTrade : undefined); // compare input balance to max input based on version

  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], bestTrade === null || bestTrade === void 0 ? void 0 : bestTrade.maximumAmountIn(allowedSlippage)];

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = /*#__PURE__*/_jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: amountIn.currency.symbol
      }
    });
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    inputError,
    v2Trade: v2Trade !== null && v2Trade !== void 0 ? v2Trade : undefined,
    v3Trade,
    bestTrade: bestTrade !== null && bestTrade !== void 0 ? bestTrade : undefined,
    allowedSlippage
  };
}

function parseCurrencyFromURLParameter(urlParam) {
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam);
    if (valid) return valid;
    if (urlParam.toUpperCase() === 'ETH') return 'ETH';
  }

  return '';
}

function parseTokenAmountURLParameter(urlParam) {
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}

function parseIndependentFieldURLParameter(urlParam) {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT;
}

const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

function validatedRecipient(recipient) {
  if (typeof recipient !== 'string') return null;
  const address = isAddress(recipient);
  if (address) return address;
  if (ENS_NAME_REGEX.test(recipient)) return recipient;
  if (ADDRESS_REGEX.test(recipient)) return recipient;
  return null;
}

export function queryParametersToSwapState(parsedQs) {
  var _inputCurrency, _outputCurrency;

  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);

  if (inputCurrency === '' && outputCurrency === '') {
    // default to ETH input
    inputCurrency = 'ETH';
  } else if (inputCurrency === outputCurrency) {
    // clear output if identical
    outputCurrency = '';
  }

  const recipient = validatedRecipient(parsedQs.recipient);
  return {
    [Field.INPUT]: {
      currencyId: inputCurrency === '' ? null : (_inputCurrency = inputCurrency) !== null && _inputCurrency !== void 0 ? _inputCurrency : null
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency === '' ? null : (_outputCurrency = outputCurrency) !== null && _outputCurrency !== void 0 ? _outputCurrency : null
    },
    typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
    recipient
  };
} // updates the swap state to use the defaults for a given network

export function useDefaultsFromURLSearch() {
  const {
    chainId
  } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const parsedQs = useParsedQueryString();
  const [result, setResult] = useState();
  useEffect(() => {
    var _parsed$Field$INPUT$c, _parsed$Field$OUTPUT$;

    if (!chainId) return;
    const parsed = queryParametersToSwapState(parsedQs);
    const inputCurrencyId = (_parsed$Field$INPUT$c = parsed[Field.INPUT].currencyId) !== null && _parsed$Field$INPUT$c !== void 0 ? _parsed$Field$INPUT$c : undefined;
    const outputCurrencyId = (_parsed$Field$OUTPUT$ = parsed[Field.OUTPUT].currencyId) !== null && _parsed$Field$OUTPUT$ !== void 0 ? _parsed$Field$OUTPUT$ : undefined;
    dispatch(replaceSwapState({
      typedValue: parsed.typedValue,
      field: parsed.independentField,
      inputCurrencyId,
      outputCurrencyId,
      recipient: parsed.recipient
    }));
    setResult({
      inputCurrencyId,
      outputCurrencyId
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId]);
  return result;
}