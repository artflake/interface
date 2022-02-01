import _styled from "styled-components";
import React from 'react';
import { escapeRegExp } from '../../utils';
import { jsx as _jsx } from "react/jsx-runtime";

const StyledInput = _styled.input.withConfig({
  displayName: "NumericalInput__StyledInput",
  componentId: "sc-1x3stf0-0"
})(["color:", ";width:0;position:relative;font-weight:500;outline:none;border:none;flex:1 1 auto;background-color:", ";font-size:", ";text-align:", ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0px;-webkit-appearance:textfield;text-align:right;::-webkit-search-decoration{-webkit-appearance:none;}[type='number']{-moz-appearance:textfield;}::-webkit-outer-spin-button,::-webkit-inner-spin-button{-webkit-appearance:none;}::placeholder{color:", ";}"], _ref => {
  let {
    error,
    theme
  } = _ref;
  return error ? theme.red1 : theme.text1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
}, _ref3 => {
  let {
    fontSize
  } = _ref3;
  return fontSize !== null && fontSize !== void 0 ? fontSize : '24px';
}, _ref4 => {
  let {
    align
  } = _ref4;
  return align && align;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.text4;
});

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const Input = /*#__PURE__*/React.memo(function InnerInput(_ref6) {
  let {
    value,
    onUserInput,
    placeholder,
    prependSymbol,
    ...rest
  } = _ref6;

  const enforcer = nextUserInput => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return /*#__PURE__*/_jsx(StyledInput, { ...rest,
    value: prependSymbol && value ? prependSymbol + value : value,
    onChange: event => {
      if (prependSymbol) {
        const value = event.target.value; // cut off prepended symbol

        const formattedValue = value.toString().includes(prependSymbol) ? value.toString().slice(1, value.toString().length + 1) : value; // replace commas with periods, because uniswap exclusively uses period as the decimal separator

        enforcer(formattedValue.replace(/,/g, '.'));
      } else {
        enforcer(event.target.value.replace(/,/g, '.'));
      }
    } // universal input options
    ,
    inputMode: "decimal",
    autoComplete: "off",
    autoCorrect: "off" // text-specific options
    ,
    type: "text",
    pattern: "^[0-9]*[.,]?[0-9]*$",
    placeholder: placeholder || '0.0',
    minLength: 1,
    maxLength: 79,
    spellCheck: "false"
  });
});
export default Input; // const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group