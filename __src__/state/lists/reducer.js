import { createReducer } from '@reduxjs/toolkit';
import { getVersionUpgrade, VersionUpgrade } from '@uniswap/token-lists';
import { DEFAULT_ACTIVE_LIST_URLS } from '../../constants/lists';
import { DEFAULT_LIST_OF_LISTS } from '../../constants/lists';
import { updateVersion } from '../global/actions';
import { acceptListUpdate, addList, disableList, enableList, fetchTokenList, removeList } from './actions';
const NEW_LIST_STATE = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
};
const initialState = {
  lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUrl: { ...DEFAULT_LIST_OF_LISTS.reduce((memo, listUrl) => {
      memo[listUrl] = NEW_LIST_STATE;
      return memo;
    }, {})
  },
  activeListUrls: DEFAULT_ACTIVE_LIST_URLS
};
export default createReducer(initialState, builder => builder.addCase(fetchTokenList.pending, (state, _ref) => {
  var _state$byUrl$url$curr, _state$byUrl$url, _state$byUrl$url$pend, _state$byUrl$url2;

  let {
    payload: {
      requestId,
      url
    }
  } = _ref;
  const current = (_state$byUrl$url$curr = (_state$byUrl$url = state.byUrl[url]) === null || _state$byUrl$url === void 0 ? void 0 : _state$byUrl$url.current) !== null && _state$byUrl$url$curr !== void 0 ? _state$byUrl$url$curr : null;
  const pendingUpdate = (_state$byUrl$url$pend = (_state$byUrl$url2 = state.byUrl[url]) === null || _state$byUrl$url2 === void 0 ? void 0 : _state$byUrl$url2.pendingUpdate) !== null && _state$byUrl$url$pend !== void 0 ? _state$byUrl$url$pend : null;
  state.byUrl[url] = {
    current,
    pendingUpdate,
    loadingRequestId: requestId,
    error: null
  };
}).addCase(fetchTokenList.fulfilled, (state, _ref2) => {
  var _state$byUrl$url3, _state$byUrl$url4;

  let {
    payload: {
      requestId,
      tokenList,
      url
    }
  } = _ref2;
  const current = (_state$byUrl$url3 = state.byUrl[url]) === null || _state$byUrl$url3 === void 0 ? void 0 : _state$byUrl$url3.current;
  const loadingRequestId = (_state$byUrl$url4 = state.byUrl[url]) === null || _state$byUrl$url4 === void 0 ? void 0 : _state$byUrl$url4.loadingRequestId; // no-op if update does nothing

  if (current) {
    const upgradeType = getVersionUpgrade(current.version, tokenList.version);
    if (upgradeType === VersionUpgrade.NONE) return;

    if (loadingRequestId === null || loadingRequestId === requestId) {
      state.byUrl[url] = {
        current,
        pendingUpdate: tokenList,
        loadingRequestId: null,
        error: null
      };
    }
  } else {
    // activate if on default active
    if (DEFAULT_ACTIVE_LIST_URLS.includes(url)) {
      var _state$activeListUrls;

      (_state$activeListUrls = state.activeListUrls) === null || _state$activeListUrls === void 0 ? void 0 : _state$activeListUrls.push(url);
    }

    state.byUrl[url] = {
      current: tokenList,
      pendingUpdate: null,
      loadingRequestId: null,
      error: null
    };
  }
}).addCase(fetchTokenList.rejected, (state, _ref3) => {
  var _state$byUrl$url5;

  let {
    payload: {
      url,
      requestId,
      errorMessage
    }
  } = _ref3;

  if (((_state$byUrl$url5 = state.byUrl[url]) === null || _state$byUrl$url5 === void 0 ? void 0 : _state$byUrl$url5.loadingRequestId) !== requestId) {
    // no-op since it's not the latest request
    return;
  }

  state.byUrl[url] = {
    current: state.byUrl[url].current ? state.byUrl[url].current : null,
    pendingUpdate: null,
    loadingRequestId: null,
    error: errorMessage
  };
}).addCase(addList, (state, _ref4) => {
  let {
    payload: url
  } = _ref4;

  if (!state.byUrl[url]) {
    state.byUrl[url] = NEW_LIST_STATE;
  }
}).addCase(removeList, (state, _ref5) => {
  let {
    payload: url
  } = _ref5;

  if (state.byUrl[url]) {
    delete state.byUrl[url];
  } // remove list from active urls if needed


  if (state.activeListUrls && state.activeListUrls.includes(url)) {
    state.activeListUrls = state.activeListUrls.filter(u => u !== url);
  }
}).addCase(enableList, (state, _ref6) => {
  let {
    payload: url
  } = _ref6;

  if (!state.byUrl[url]) {
    state.byUrl[url] = NEW_LIST_STATE;
  }

  if (state.activeListUrls && !state.activeListUrls.includes(url)) {
    state.activeListUrls.push(url);
  }

  if (!state.activeListUrls) {
    state.activeListUrls = [url];
  }
}).addCase(disableList, (state, _ref7) => {
  let {
    payload: url
  } = _ref7;

  if (state.activeListUrls && state.activeListUrls.includes(url)) {
    state.activeListUrls = state.activeListUrls.filter(u => u !== url);
  }
}).addCase(acceptListUpdate, (state, _ref8) => {
  var _state$byUrl$url6;

  let {
    payload: url
  } = _ref8;

  if (!((_state$byUrl$url6 = state.byUrl[url]) !== null && _state$byUrl$url6 !== void 0 && _state$byUrl$url6.pendingUpdate)) {
    throw new Error('accept list update called without pending update');
  }

  state.byUrl[url] = { ...state.byUrl[url],
    current: state.byUrl[url].pendingUpdate,
    pendingUpdate: null
  };
}).addCase(updateVersion, state => {
  // state loaded from localStorage, but new lists have never been initialized
  if (!state.lastInitializedDefaultListOfLists) {
    state.byUrl = initialState.byUrl;
    state.activeListUrls = initialState.activeListUrls;
  } else if (state.lastInitializedDefaultListOfLists) {
    const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce((s, l) => s.add(l), new Set());
    const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), new Set());
    DEFAULT_LIST_OF_LISTS.forEach(listUrl => {
      if (!lastInitializedSet.has(listUrl)) {
        state.byUrl[listUrl] = NEW_LIST_STATE;
      }
    });
    state.lastInitializedDefaultListOfLists.forEach(listUrl => {
      if (!newListOfListsSet.has(listUrl)) {
        delete state.byUrl[listUrl];
      }
    });
  }

  state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS; // if no active lists, activate defaults

  if (!state.activeListUrls) {
    state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS; // for each list on default list, initialize if needed

    DEFAULT_ACTIVE_LIST_URLS.map(listUrl => {
      if (!state.byUrl[listUrl]) {
        state.byUrl[listUrl] = NEW_LIST_STATE;
      }

      return true;
    });
  }
}));