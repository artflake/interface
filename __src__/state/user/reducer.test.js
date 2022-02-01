import { createStore } from 'redux';
import { DEFAULT_DEADLINE_FROM_NOW } from '../../constants/misc';
import { updateVersion } from '../global/actions';
import reducer, { initialState } from './reducer';
describe('swap reducer', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, initialState);
  });
  describe('updateVersion', () => {
    it('has no timestamp originally', () => {
      expect(store.getState().lastUpdateVersionTimestamp).toBeUndefined();
    });
    it('sets the lastUpdateVersionTimestamp', () => {
      const time = new Date().getTime();
      store.dispatch(updateVersion());
      expect(store.getState().lastUpdateVersionTimestamp).toBeGreaterThanOrEqual(time);
    });
    it('sets allowed slippage and deadline', () => {
      store = createStore(reducer, { ...initialState,
        userDeadline: undefined,
        userSlippageTolerance: undefined
      });
      store.dispatch(updateVersion());
      expect(store.getState().userDeadline).toEqual(DEFAULT_DEADLINE_FROM_NOW);
      expect(store.getState().userSlippageTolerance).toEqual('auto');
    });
  });
});