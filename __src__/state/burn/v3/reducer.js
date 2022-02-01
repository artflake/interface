import { createReducer } from '@reduxjs/toolkit';
import { selectPercent } from "./actions";
const initialState = {
  percent: 0
};
export default createReducer(initialState, builder => builder.addCase(selectPercent, (state, _ref) => {
  let {
    payload: {
      percent
    }
  } = _ref;
  return { ...state,
    percent
  };
}));