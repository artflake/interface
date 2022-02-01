import { createStore } from 'redux';
import { updateVersion } from "../global/actions";
import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction, TransactionType } from "./actions";
import reducer, { initialState } from "./reducer";
describe('transaction reducer', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, initialState);
  });
  describe('updateVersion', () => {
    it('clears old format transactions that do not have info', () => {
      store = createStore(reducer, {
        1: {
          abc: {
            hash: 'abc'
          }
        }
      });
      store.dispatch(updateVersion());
      expect(store.getState()[1]['abc']).toBeUndefined();
    });
    it('keeps old format transactions that do have info', () => {
      store = createStore(reducer, {
        1: {
          abc: {
            hash: 'abc',
            info: {}
          }
        }
      });
      store.dispatch(updateVersion());
      expect(store.getState()[1]['abc']).toBeTruthy();
    });
  });
  describe('addTransaction', () => {
    it('adds the transaction', () => {
      var _txs$, _txs$2;

      const beforeTime = new Date().getTime();
      store.dispatch(addTransaction({
        chainId: 1,
        hash: '0x0',
        from: 'abc',
        info: {
          type: TransactionType.APPROVAL,
          tokenAddress: 'abc',
          spender: 'def'
        }
      }));
      const txs = store.getState();
      expect(txs[1]).toBeTruthy();
      expect((_txs$ = txs[1]) === null || _txs$ === void 0 ? void 0 : _txs$['0x0']).toBeTruthy();
      const tx = (_txs$2 = txs[1]) === null || _txs$2 === void 0 ? void 0 : _txs$2['0x0'];
      expect(tx).toBeTruthy();
      expect(tx === null || tx === void 0 ? void 0 : tx.hash).toEqual('0x0');
      expect(tx === null || tx === void 0 ? void 0 : tx.from).toEqual('abc');
      expect(tx === null || tx === void 0 ? void 0 : tx.addedTime).toBeGreaterThanOrEqual(beforeTime);
      expect(tx === null || tx === void 0 ? void 0 : tx.info).toEqual({
        type: TransactionType.APPROVAL,
        tokenAddress: 'abc',
        spender: 'def'
      });
    });
  });
  describe('finalizeTransaction', () => {
    it('no op if not valid transaction', () => {
      store.dispatch(finalizeTransaction({
        chainId: 4,
        hash: '0x0',
        receipt: {
          status: 1,
          transactionIndex: 1,
          transactionHash: '0x0',
          to: '0x0',
          from: '0x0',
          contractAddress: '0x0',
          blockHash: '0x0',
          blockNumber: 1
        }
      }));
      expect(store.getState()).toEqual({});
    });
    it('sets receipt', () => {
      var _store$getState$;

      store.dispatch(addTransaction({
        hash: '0x0',
        chainId: 4,
        info: {
          type: TransactionType.APPROVAL,
          spender: '0x0',
          tokenAddress: '0x0'
        },
        from: '0x0'
      }));
      const beforeTime = new Date().getTime();
      store.dispatch(finalizeTransaction({
        chainId: 4,
        hash: '0x0',
        receipt: {
          status: 1,
          transactionIndex: 1,
          transactionHash: '0x0',
          to: '0x0',
          from: '0x0',
          contractAddress: '0x0',
          blockHash: '0x0',
          blockNumber: 1
        }
      }));
      const tx = (_store$getState$ = store.getState()[4]) === null || _store$getState$ === void 0 ? void 0 : _store$getState$['0x0'];
      expect(tx === null || tx === void 0 ? void 0 : tx.confirmedTime).toBeGreaterThanOrEqual(beforeTime);
      expect(tx === null || tx === void 0 ? void 0 : tx.receipt).toEqual({
        status: 1,
        transactionIndex: 1,
        transactionHash: '0x0',
        to: '0x0',
        from: '0x0',
        contractAddress: '0x0',
        blockHash: '0x0',
        blockNumber: 1
      });
    });
  });
  describe('checkedTransaction', () => {
    it('no op if not valid transaction', () => {
      store.dispatch(checkedTransaction({
        chainId: 4,
        hash: '0x0',
        blockNumber: 1
      }));
      expect(store.getState()).toEqual({});
    });
    it('sets lastCheckedBlockNumber', () => {
      var _store$getState$2;

      store.dispatch(addTransaction({
        hash: '0x0',
        chainId: 4,
        info: {
          type: TransactionType.APPROVAL,
          spender: '0x0',
          tokenAddress: '0x0'
        },
        from: '0x0'
      }));
      store.dispatch(checkedTransaction({
        chainId: 4,
        hash: '0x0',
        blockNumber: 1
      }));
      const tx = (_store$getState$2 = store.getState()[4]) === null || _store$getState$2 === void 0 ? void 0 : _store$getState$2['0x0'];
      expect(tx === null || tx === void 0 ? void 0 : tx.lastCheckedBlockNumber).toEqual(1);
    });
    it('never decreases', () => {
      var _store$getState$3;

      store.dispatch(addTransaction({
        hash: '0x0',
        chainId: 4,
        info: {
          type: TransactionType.APPROVAL,
          spender: '0x0',
          tokenAddress: '0x0'
        },
        from: '0x0'
      }));
      store.dispatch(checkedTransaction({
        chainId: 4,
        hash: '0x0',
        blockNumber: 3
      }));
      store.dispatch(checkedTransaction({
        chainId: 4,
        hash: '0x0',
        blockNumber: 1
      }));
      const tx = (_store$getState$3 = store.getState()[4]) === null || _store$getState$3 === void 0 ? void 0 : _store$getState$3['0x0'];
      expect(tx === null || tx === void 0 ? void 0 : tx.lastCheckedBlockNumber).toEqual(3);
    });
  });
  describe('clearAllTransactions', () => {
    it('removes all transactions for the chain', () => {
      var _store$getState$4, _store$getState$5, _store$getState$6, _store$getState$7;

      store.dispatch(addTransaction({
        chainId: 1,
        hash: '0x0',
        info: {
          type: TransactionType.APPROVAL,
          spender: 'abc',
          tokenAddress: 'def'
        },
        from: 'abc'
      }));
      store.dispatch(addTransaction({
        chainId: 4,
        hash: '0x1',
        info: {
          type: TransactionType.APPROVAL,
          spender: 'abc',
          tokenAddress: 'def'
        },
        from: 'abc'
      }));
      expect(Object.keys(store.getState())).toHaveLength(2);
      expect(Object.keys(store.getState())).toEqual([String(1), String(4)]);
      expect(Object.keys((_store$getState$4 = store.getState()[1]) !== null && _store$getState$4 !== void 0 ? _store$getState$4 : {})).toEqual(['0x0']);
      expect(Object.keys((_store$getState$5 = store.getState()[4]) !== null && _store$getState$5 !== void 0 ? _store$getState$5 : {})).toEqual(['0x1']);
      store.dispatch(clearAllTransactions({
        chainId: 1
      }));
      expect(Object.keys(store.getState())).toHaveLength(2);
      expect(Object.keys(store.getState())).toEqual([String(1), String(4)]);
      expect(Object.keys((_store$getState$6 = store.getState()[1]) !== null && _store$getState$6 !== void 0 ? _store$getState$6 : {})).toEqual([]);
      expect(Object.keys((_store$getState$7 = store.getState()[4]) !== null && _store$getState$7 !== void 0 ? _store$getState$7 : {})).toEqual(['0x1']);
    });
  });
});