import { createReducer } from '@reduxjs/toolkit';
import { updateVersion } from '../global/actions';
import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction } from './actions';

const now = () => new Date().getTime();

export const initialState = {};
export default createReducer(initialState, builder => builder.addCase(updateVersion, transactions => {
  // in case there are any transactions in the store with the old format, remove them
  Object.keys(transactions).forEach(chainId => {
    const chainTransactions = transactions[chainId];
    Object.keys(chainTransactions).forEach(hash => {
      if (!('info' in chainTransactions[hash])) {
        // clear old transactions that don't have the right format
        delete chainTransactions[hash];
      }
    });
  });
}).addCase(addTransaction, (transactions, _ref) => {
  var _transactions$chainId, _transactions$chainId2;

  let {
    payload: {
      chainId,
      from,
      hash,
      info
    }
  } = _ref;

  if ((_transactions$chainId = transactions[chainId]) !== null && _transactions$chainId !== void 0 && _transactions$chainId[hash]) {
    throw Error('Attempted to add existing transaction.');
  }

  const txs = (_transactions$chainId2 = transactions[chainId]) !== null && _transactions$chainId2 !== void 0 ? _transactions$chainId2 : {};
  txs[hash] = {
    hash,
    info,
    from,
    addedTime: now()
  };
  transactions[chainId] = txs;
}).addCase(clearAllTransactions, (transactions, _ref2) => {
  let {
    payload: {
      chainId
    }
  } = _ref2;
  if (!transactions[chainId]) return;
  transactions[chainId] = {};
}).addCase(checkedTransaction, (transactions, _ref3) => {
  var _transactions$chainId3;

  let {
    payload: {
      chainId,
      hash,
      blockNumber
    }
  } = _ref3;
  const tx = (_transactions$chainId3 = transactions[chainId]) === null || _transactions$chainId3 === void 0 ? void 0 : _transactions$chainId3[hash];

  if (!tx) {
    return;
  }

  if (!tx.lastCheckedBlockNumber) {
    tx.lastCheckedBlockNumber = blockNumber;
  } else {
    tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
  }
}).addCase(finalizeTransaction, (transactions, _ref4) => {
  var _transactions$chainId4;

  let {
    payload: {
      hash,
      chainId,
      receipt
    }
  } = _ref4;
  const tx = (_transactions$chainId4 = transactions[chainId]) === null || _transactions$chainId4 === void 0 ? void 0 : _transactions$chainId4[hash];

  if (!tx) {
    return;
  }

  tx.receipt = receipt;
  tx.confirmedTime = now();
}));