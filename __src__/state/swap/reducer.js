import { createReducer } from '@reduxjs/toolkit';
import { parsedQueryString } from 'hooks/useParsedQueryString';
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions';
import { queryParametersToSwapState } from './hooks';
const initialState = queryParametersToSwapState(parsedQueryString());
export default createReducer(initialState, builder => builder.addCase(replaceSwapState, (state, _ref) => {
  let {
    payload: {
      typedValue,
      recipient,
      field,
      inputCurrencyId,
      outputCurrencyId
    }
  } = _ref;
  return {
    [Field.INPUT]: {
      currencyId: inputCurrencyId !== null && inputCurrencyId !== void 0 ? inputCurrencyId : null
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrencyId !== null && outputCurrencyId !== void 0 ? outputCurrencyId : null
    },
    independentField: field,
    typedValue,
    recipient
  };
}).addCase(selectCurrency, (state, _ref2) => {
  let {
    payload: {
      currencyId,
      field
    }
  } = _ref2;
  const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  if (currencyId === state[otherField].currencyId) {
    // the case where we have to swap the order
    return { ...state,
      independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
      [field]: {
        currencyId
      },
      [otherField]: {
        currencyId: state[field].currencyId
      }
    };
  } else {
    // the normal case
    return { ...state,
      [field]: {
        currencyId
      }
    };
  }
}).addCase(switchCurrencies, state => {
  return { ...state,
    independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
    [Field.INPUT]: {
      currencyId: state[Field.OUTPUT].currencyId
    },
    [Field.OUTPUT]: {
      currencyId: state[Field.INPUT].currencyId
    }
  };
}).addCase(typeInput, (state, _ref3) => {
  let {
    payload: {
      field,
      typedValue
    }
  } = _ref3;
  return { ...state,
    independentField: field,
    typedValue
  };
}).addCase(setRecipient, (state, _ref4) => {
  let {
    payload: {
      recipient
    }
  } = _ref4;
  state.recipient = recipient;
}));