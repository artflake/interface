import { Interface } from '@ethersproject/abi';
import { CurrencyAmount, Ether } from '@uniswap/sdk-core';
import ERC20ABI from 'abis/erc20.json';
import JSBI from 'jsbi';
import { useMemo } from 'react';
import { UNI } from '../../constants/tokens';
import { useAllTokens } from '../../hooks/Tokens';
import { useMulticall2Contract } from '../../hooks/useContract';
import { useActiveWeb3React } from '../../hooks/web3';
import { isAddress } from '../../utils';
import { useUserUnclaimedAmount } from '../claim/hooks';
import { useMultipleContractSingleData, useSingleContractMultipleData } from '../multicall/hooks';
import { useTotalUniEarned } from '../stake/hooks';
/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */

export function useETHBalances(uncheckedAddresses) {
  const {
    chainId
  } = useActiveWeb3React();
  const multicallContract = useMulticall2Contract();
  const addresses = useMemo(() => uncheckedAddresses ? uncheckedAddresses.map(isAddress).filter(a => a !== false).sort() : [], [uncheckedAddresses]);
  const results = useSingleContractMultipleData(multicallContract, 'getEthBalance', addresses.map(address => [address]));
  return useMemo(() => addresses.reduce((memo, address, i) => {
    var _results$i, _results$i$result;

    const value = results === null || results === void 0 ? void 0 : (_results$i = results[i]) === null || _results$i === void 0 ? void 0 : (_results$i$result = _results$i.result) === null || _results$i$result === void 0 ? void 0 : _results$i$result[0];
    if (value && chainId) memo[address] = CurrencyAmount.fromRawAmount(Ether.onChain(chainId), JSBI.BigInt(value.toString()));
    return memo;
  }, {}), [addresses, chainId, results]);
}
const ERC20Interface = new Interface(ERC20ABI);
const tokenBalancesGasRequirement = {
  gasRequired: 125000
};
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */

export function useTokenBalancesWithLoadingIndicator(address, tokens) {
  const validatedTokens = useMemo(() => {
    var _tokens$filter;

    return (_tokens$filter = tokens === null || tokens === void 0 ? void 0 : tokens.filter(t => isAddress(t === null || t === void 0 ? void 0 : t.address) !== false)) !== null && _tokens$filter !== void 0 ? _tokens$filter : [];
  }, [tokens]);
  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens]);
  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20Interface, 'balanceOf', useMemo(() => [address], [address]), tokenBalancesGasRequirement);
  const anyLoading = useMemo(() => balances.some(callState => callState.loading), [balances]);
  return useMemo(() => [address && validatedTokens.length > 0 ? validatedTokens.reduce((memo, token, i) => {
    var _balances$i, _balances$i$result;

    const value = balances === null || balances === void 0 ? void 0 : (_balances$i = balances[i]) === null || _balances$i === void 0 ? void 0 : (_balances$i$result = _balances$i.result) === null || _balances$i$result === void 0 ? void 0 : _balances$i$result[0];
    const amount = value ? JSBI.BigInt(value.toString()) : undefined;

    if (amount) {
      memo[token.address] = CurrencyAmount.fromRawAmount(token, amount);
    }

    return memo;
  }, {}) : {}, anyLoading], [address, validatedTokens, anyLoading, balances]);
}
export function useTokenBalances(address, tokens) {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
} // get the balance for a single token/account combo

export function useTokenBalance(account, token) {
  const tokenBalances = useTokenBalances(account, [token]);
  if (!token) return undefined;
  return tokenBalances[token.address];
}
export function useCurrencyBalances(account, currencies) {
  const tokens = useMemo(() => {
    var _currencies$filter;

    return (_currencies$filter = currencies === null || currencies === void 0 ? void 0 : currencies.filter(currency => {
      var _currency$isToken;

      return (_currency$isToken = currency === null || currency === void 0 ? void 0 : currency.isToken) !== null && _currency$isToken !== void 0 ? _currency$isToken : false;
    })) !== null && _currencies$filter !== void 0 ? _currencies$filter : [];
  }, [currencies]);
  const tokenBalances = useTokenBalances(account, tokens);
  const containsETH = useMemo(() => {
    var _currencies$some;

    return (_currencies$some = currencies === null || currencies === void 0 ? void 0 : currencies.some(currency => currency === null || currency === void 0 ? void 0 : currency.isNative)) !== null && _currencies$some !== void 0 ? _currencies$some : false;
  }, [currencies]);
  const ethBalance = useETHBalances(containsETH ? [account] : []);
  return useMemo(() => {
    var _currencies$map;

    return (_currencies$map = currencies === null || currencies === void 0 ? void 0 : currencies.map(currency => {
      if (!account || !currency) return undefined;
      if (currency.isToken) return tokenBalances[currency.address];
      if (currency.isNative) return ethBalance[account];
      return undefined;
    })) !== null && _currencies$map !== void 0 ? _currencies$map : [];
  }, [account, currencies, ethBalance, tokenBalances]);
}
export function useCurrencyBalance(account, currency) {
  return useCurrencyBalances(account, useMemo(() => [currency], [currency]))[0];
} // mimics useAllBalances

export function useAllTokenBalances() {
  const {
    account
  } = useActiveWeb3React();
  const allTokens = useAllTokens();
  const allTokensArray = useMemo(() => Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}), [allTokens]);
  const balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
  return balances !== null && balances !== void 0 ? balances : {};
} // get the total owned, unclaimed, and unharvested UNI for account

export function useAggregateUniBalance() {
  var _uniBalance$quotient, _uniUnclaimed$quotien, _uniUnHarvested$quoti;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const uni = chainId ? UNI[chainId] : undefined;
  const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, uni);
  const uniUnclaimed = useUserUnclaimedAmount(account);
  const uniUnHarvested = useTotalUniEarned();
  if (!uni) return undefined;
  return CurrencyAmount.fromRawAmount(uni, JSBI.add(JSBI.add((_uniBalance$quotient = uniBalance === null || uniBalance === void 0 ? void 0 : uniBalance.quotient) !== null && _uniBalance$quotient !== void 0 ? _uniBalance$quotient : JSBI.BigInt(0), (_uniUnclaimed$quotien = uniUnclaimed === null || uniUnclaimed === void 0 ? void 0 : uniUnclaimed.quotient) !== null && _uniUnclaimed$quotien !== void 0 ? _uniUnclaimed$quotien : JSBI.BigInt(0)), (_uniUnHarvested$quoti = uniUnHarvested === null || uniUnHarvested === void 0 ? void 0 : uniUnHarvested.quotient) !== null && _uniUnHarvested$quoti !== void 0 ? _uniUnHarvested$quoti : JSBI.BigInt(0)));
}