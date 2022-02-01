import { createSlice, nanoid } from '@reduxjs/toolkit';
import { DEFAULT_TXN_DISMISS_MS } from "../../constants/misc";
export let ApplicationModal;

(function (ApplicationModal) {
  ApplicationModal[ApplicationModal["WALLET"] = 0] = "WALLET";
  ApplicationModal[ApplicationModal["SETTINGS"] = 1] = "SETTINGS";
  ApplicationModal[ApplicationModal["SELF_CLAIM"] = 2] = "SELF_CLAIM";
  ApplicationModal[ApplicationModal["ADDRESS_CLAIM"] = 3] = "ADDRESS_CLAIM";
  ApplicationModal[ApplicationModal["CLAIM_POPUP"] = 4] = "CLAIM_POPUP";
  ApplicationModal[ApplicationModal["MENU"] = 5] = "MENU";
  ApplicationModal[ApplicationModal["DELEGATE"] = 6] = "DELEGATE";
  ApplicationModal[ApplicationModal["VOTE"] = 7] = "VOTE";
  ApplicationModal[ApplicationModal["POOL_OVERVIEW_OPTIONS"] = 8] = "POOL_OVERVIEW_OPTIONS";
  ApplicationModal[ApplicationModal["NETWORK_SELECTOR"] = 9] = "NETWORK_SELECTOR";
  ApplicationModal[ApplicationModal["PRIVACY_POLICY"] = 10] = "PRIVACY_POLICY";
})(ApplicationModal || (ApplicationModal = {}));

const initialState = {
  blockNumber: {},
  chainId: null,
  implements3085: false,
  openModal: null,
  popupList: []
};
const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const {
        chainId
      } = action.payload;
      state.chainId = chainId;
    },

    updateBlockNumber(state, action) {
      const {
        chainId,
        blockNumber
      } = action.payload;

      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    },

    setOpenModal(state, action) {
      state.openModal = action.payload;
    },

    addPopup(state, _ref) {
      let {
        payload: {
          content,
          key,
          removeAfterMs = DEFAULT_TXN_DISMISS_MS
        }
      } = _ref;
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([{
        key: key || nanoid(),
        show: true,
        content,
        removeAfterMs
      }]);
    },

    removePopup(state, _ref2) {
      let {
        payload: {
          key
        }
      } = _ref2;
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false;
        }
      });
    },

    setImplements3085(state, _ref3) {
      let {
        payload: {
          implements3085
        }
      } = _ref3;
      state.implements3085 = implements3085;
    }

  }
});
export const {
  updateChainId,
  updateBlockNumber,
  setOpenModal,
  addPopup,
  removePopup,
  setImplements3085
} = applicationSlice.actions;
export default applicationSlice.reducer;