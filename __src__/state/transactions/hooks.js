import { useTransactionMonitoringEventCallback } from 'hooks/useMonitoringEventCallback';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { useActiveWeb3React } from '../../hooks/web3';
import { addTransaction, TransactionType } from './actions';
// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder() {
  const {
    chainId,
    account
  } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const logMonitoringEvent = useTransactionMonitoringEventCallback();
  return useCallback((response, info) => {
    if (!account) return;
    if (!chainId) return;
    const {
      hash
    } = response;

    if (!hash) {
      throw Error('No transaction hash found.');
    }

    dispatch(addTransaction({
      hash,
      from: account,
      info,
      chainId
    }));
    logMonitoringEvent(info, response);
  }, [account, chainId, dispatch, logMonitoringEvent]);
} // returns all the transactions for the current chain

export function useAllTransactions() {
  var _state$chainId;

  const {
    chainId
  } = useActiveWeb3React();
  const state = useAppSelector(state => state.transactions);
  return chainId ? (_state$chainId = state[chainId]) !== null && _state$chainId !== void 0 ? _state$chainId : {} : {};
}
export function useTransaction(transactionHash) {
  const allTransactions = useAllTransactions();

  if (!transactionHash) {
    return undefined;
  }

  return allTransactions[transactionHash];
}
export function useIsTransactionPending(transactionHash) {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return !transactions[transactionHash].receipt;
}
export function useIsTransactionConfirmed(transactionHash) {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return Boolean(transactions[transactionHash].receipt);
}
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */

export function isTransactionRecent(tx) {
  return new Date().getTime() - tx.addedTime < 86400000;
} // returns whether a token has a pending approval transaction

export function useHasPendingApproval(tokenAddress, spender) {
  const allTransactions = useAllTransactions();
  return useMemo(() => typeof tokenAddress === 'string' && typeof spender === 'string' && Object.keys(allTransactions).some(hash => {
    const tx = allTransactions[hash];
    if (!tx) return false;

    if (tx.receipt) {
      return false;
    } else {
      if (tx.info.type !== TransactionType.APPROVAL) return false;
      return tx.info.spender === spender && tx.info.tokenAddress === tokenAddress && isTransactionRecent(tx);
    }
  }), [allTransactions, spender, tokenAddress]);
} // watch for submissions to claim
// return null if not done loading, return undefined if not found

export function useUserHasSubmittedClaim(account) {
  const allTransactions = useAllTransactions(); // get the txn if it has been submitted

  const claimTxn = useMemo(() => {
    const txnIndex = Object.keys(allTransactions).find(hash => {
      const tx = allTransactions[hash];
      return tx.info.type === TransactionType.CLAIM && tx.info.recipient === account;
    });
    return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined;
  }, [account, allTransactions]);
  return {
    claimSubmitted: Boolean(claimTxn),
    claimTxn
  };
}