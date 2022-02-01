import { createReducer } from '@reduxjs/toolkit';
import { Field, typeInput } from "./actions";
const initialState = {
  independentField: Field.LIQUIDITY_PERCENT,
  typedValue: '0'
};
export default createReducer(initialState, builder => builder.addCase(typeInput, (state, _ref) => {
  let {
    payload: {
      field,
      typedValue
    }
  } = _ref;
  return { ...state,
    independentField: field,
    typedValue
  };
}));