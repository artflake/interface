import { createReducer } from '@reduxjs/toolkit';
import { Field, resetMintState, setFullRange, typeInput, typeLeftRangeInput, typeRightRangeInput, typeStartPriceInput } from './actions';
const initialState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  startPriceTypedValue: '',
  leftRangeTypedValue: '',
  rightRangeTypedValue: ''
};
export default createReducer(initialState, builder => builder.addCase(resetMintState, () => initialState).addCase(setFullRange, state => {
  return { ...state,
    leftRangeTypedValue: true,
    rightRangeTypedValue: true
  };
}).addCase(typeStartPriceInput, (state, _ref) => {
  let {
    payload: {
      typedValue
    }
  } = _ref;
  return { ...state,
    startPriceTypedValue: typedValue
  };
}).addCase(typeLeftRangeInput, (state, _ref2) => {
  let {
    payload: {
      typedValue
    }
  } = _ref2;
  return { ...state,
    leftRangeTypedValue: typedValue
  };
}).addCase(typeRightRangeInput, (state, _ref3) => {
  let {
    payload: {
      typedValue
    }
  } = _ref3;
  return { ...state,
    rightRangeTypedValue: typedValue
  };
}).addCase(typeInput, (state, _ref4) => {
  let {
    payload: {
      field,
      typedValue,
      noLiquidity
    }
  } = _ref4;

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
        typedValue
      };
    }
  } else {
    return { ...state,
      independentField: field,
      typedValue
    };
  }
}));