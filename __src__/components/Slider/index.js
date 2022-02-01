import _styled from "styled-components";
import { useCallback } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const StyledRangeInput = _styled.input.withConfig({
  displayName: "Slider__StyledRangeInput",
  componentId: "sc-qf62wq-0"
})(["-webkit-appearance:none;width:100%;background:transparent;cursor:pointer;&:focus{outline:none;}&::-moz-focus-outer{border:0;}&::-webkit-slider-thumb{-webkit-appearance:none;height:", "px;width:", "px;background-color:", ";border-radius:100%;border:none;transform:translateY(-50%);color:", ";&:hover,&:focus{box-shadow:0px 0px 1px rgba(0,0,0,0.1),0px 4px 8px rgba(0,0,0,0.08),0px 16px 24px rgba(0,0,0,0.06),0px 24px 32px rgba(0,0,0,0.04);}}&::-moz-range-thumb{height:", "px;width:", "px;background-color:#565a69;border-radius:100%;border:none;color:", ";&:hover,&:focus{box-shadow:0px 0px 1px rgba(0,0,0,0.1),0px 4px 8px rgba(0,0,0,0.08),0px 16px 24px rgba(0,0,0,0.06),0px 24px 32px rgba(0,0,0,0.04);}}&::-ms-thumb{height:", "px;width:", "px;background-color:#565a69;border-radius:100%;color:", ";&:hover,&:focus{box-shadow:0px 0px 1px rgba(0,0,0,0.1),0px 4px 8px rgba(0,0,0,0.08),0px 16px 24px rgba(0,0,0,0.06),0px 24px 32px rgba(0,0,0,0.04);}}&::-webkit-slider-runnable-track{background:linear-gradient(90deg,", ",", ");height:2px;}&::-moz-range-track{background:linear-gradient(90deg,", ",", ");height:2px;}&::-ms-track{width:100%;border-color:transparent;color:transparent;background:", ";height:2px;}&::-ms-fill-lower{background:", ";}&::-ms-fill-upper{background:", ";}"], _ref => {
  let {
    size
  } = _ref;
  return size;
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.blue1;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg1;
}, _ref5 => {
  let {
    size
  } = _ref5;
  return size;
}, _ref6 => {
  let {
    size
  } = _ref6;
  return size;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg1;
}, _ref8 => {
  let {
    size
  } = _ref8;
  return size;
}, _ref9 => {
  let {
    size
  } = _ref9;
  return size;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.bg1;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.blue1;
}, _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.blue2;
}, _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.bg5;
}, _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.bg3;
}, _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.bg5;
}, _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.bg5;
}, _ref17 => {
  let {
    theme
  } = _ref17;
  return theme.bg3;
});

export default function Slider(_ref18) {
  let {
    value,
    onChange,
    min = 0,
    step = 1,
    max = 100,
    size = 28,
    ...rest
  } = _ref18;
  const changeCallback = useCallback(e => {
    onChange(parseInt(e.target.value));
  }, [onChange]);
  return /*#__PURE__*/_jsx(StyledRangeInput, {
    size: size,
    ...rest,
    type: "range",
    value: value,
    style: {
      padding: '15px 0'
    },
    onChange: changeCallback,
    "aria-labelledby": "input slider",
    step: step,
    min: min,
    max: max
  });
}