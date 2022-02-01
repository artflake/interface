import { createReducer } from '@reduxjs/toolkit';
import { Field, resetMintState, typeInput } from './actions';
export const initialState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  startPriceTypedValue: '',
  leftRangeTypedValue: '',
  rightRangeTypedValue: ''
};
export default createReducer(initialState, builder => builder.addCase(resetMintState, () => initialState).addCase(typeInput, (state, _ref) => {
  let {
    payload: {
      field,
      typedValue,
      noLiquidity
    }
  } = _ref;

  if (noLiquidity) {
    // they're typing into the field they've last typed in
    if (field === state.independentField) {
      return { ...state,
        independentField: field,
        typedValue
      };
    } // they're typing into a new field, store the other value
    else {
      return { ...state,
        independentField: field,
        typedValue,
        otherTypedValue: state.typedValue
      };
    }
  } else {
    return { ...state,
      independentField: field,
      typedValue,
      otherTypedValue: ''
    };
  }
}));