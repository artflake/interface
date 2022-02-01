import { createAction } from '@reduxjs/toolkit';
export let Field;

(function (Field) {
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
})(Field || (Field = {}));

export let Bound;

(function (Bound) {
  Bound["LOWER"] = "LOWER";
  Bound["UPPER"] = "UPPER";
})(Bound || (Bound = {}));

export const typeInput = createAction('mintV3/typeInputMint');
export const typeStartPriceInput = createAction('mintV3/typeStartPriceInput');
export const typeLeftRangeInput = createAction('mintV3/typeLeftRangeInput');
export const typeRightRangeInput = createAction('mintV3/typeRightRangeInput');
export const resetMintState = createAction('mintV3/resetMintState');
export const setFullRange = createAction('mintV3/setFullRange');