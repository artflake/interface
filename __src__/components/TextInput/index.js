import _styled from "styled-components";
import React, { memo, useCallback, useRef } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const Input = _styled.input.withConfig({
  displayName: "TextInput__Input",
  componentId: "sc-4obmhd-0"
})(["font-size:", ";outline:none;border:none;flex:1 1 auto;width:0;background-color:", ";transition:color 300ms ", ";color:", ";overflow:hidden;text-overflow:ellipsis;font-weight:500;width:100%;padding:0px;-webkit-appearance:textfield;::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-outer-spin-button,::-webkit-inner-spin-button{-webkit-appearance:none;}::placeholder{color:", ";}"], _ref => {
  let {
    fontSize
  } = _ref;
  return fontSize || '1.25rem';
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
}, _ref3 => {
  let {
    error
  } = _ref3;
  return error ? 'step-end' : 'step-start';
}, _ref4 => {
  let {
    error,
    theme
  } = _ref4;
  return error ? theme.red1 : theme.text1;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.text4;
});

const TextAreaInput = _styled.textarea.withConfig({
  displayName: "TextInput__TextAreaInput",
  componentId: "sc-4obmhd-1"
})(["font-size:", ";outline:none;border:none;flex:1 1 auto;width:0;resize:none;background-color:", ";transition:color 300ms ", ";color:", ";overflow:hidden;text-overflow:ellipsis;font-weight:500;width:100%;line-height:1.2;padding:0px;-webkit-appearance:textfield;::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-outer-spin-button,::-webkit-inner-spin-button{-webkit-appearance:none;}::placeholder{color:", ";}"], _ref6 => {
  let {
    fontSize
  } = _ref6;
  return fontSize || '1.25rem';
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg1;
}, _ref8 => {
  let {
    error
  } = _ref8;
  return error ? 'step-end' : 'step-start';
}, _ref9 => {
  let {
    error,
    theme
  } = _ref9;
  return error ? theme.red1 : theme.text1;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.text4;
});

export const TextInput = _ref11 => {
  let {
    className,
    value,
    onUserInput,
    placeholder,
    fontSize
  } = _ref11;
  const handleInput = useCallback(event => {
    onUserInput(event.target.value);
  }, [onUserInput]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Input, {
      type: "text",
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: "false",
      placeholder: placeholder || '',
      onChange: handleInput,
      value: value,
      fontSize: fontSize
    })
  });
};
export const ResizingTextArea = /*#__PURE__*/memo(_ref12 => {
  let {
    className,
    value,
    onUserInput,
    placeholder,
    fontSize
  } = _ref12;
  const inputRef = useRef(document.createElement('textarea'));
  const handleInput = useCallback(event => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    onUserInput(event.target.value);
  }, [onUserInput]);
  return /*#__PURE__*/_jsx(TextAreaInput, {
    style: {
      height: 'auto',
      minHeight: '500px'
    },
    className: className,
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    placeholder: placeholder || '',
    onChange: handleInput,
    value: value,
    fontSize: fontSize,
    ref: inputRef
  });
});
ResizingTextArea.displayName = 'ResizingTextArea';