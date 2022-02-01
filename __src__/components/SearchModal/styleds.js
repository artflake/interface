import _styled from "styled-components";
import { AutoColumn } from '../Column';
import { RowBetween } from '../Row';
export const TextDot = _styled.div.withConfig({
  displayName: "styleds__TextDot",
  componentId: "sc-1xp9ndq-0"
})(["height:3px;width:3px;background-color:", ";border-radius:50%;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});
export const Checkbox = _styled.input.withConfig({
  displayName: "styleds__Checkbox",
  componentId: "sc-1xp9ndq-1"
})(["border:1px solid ", ";height:20px;margin:0;"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.red3;
});
export const PaddedColumn = _styled(AutoColumn).withConfig({
  displayName: "styleds__PaddedColumn",
  componentId: "sc-1xp9ndq-2"
})(["padding:20px;"]);
export const MenuItem = _styled(RowBetween).withConfig({
  displayName: "styleds__MenuItem",
  componentId: "sc-1xp9ndq-3"
})(["padding:4px 20px;height:56px;display:grid;grid-template-columns:auto minmax(auto,1fr) auto minmax(0,72px);grid-gap:16px;cursor:", ";pointer-events:", ";:hover{background-color:", ";}opacity:", ";"], _ref3 => {
  let {
    disabled
  } = _ref3;
  return !disabled && 'pointer';
}, _ref4 => {
  let {
    disabled
  } = _ref4;
  return disabled && 'none';
}, _ref5 => {
  let {
    theme,
    disabled
  } = _ref5;
  return !disabled && theme.bg2;
}, _ref6 => {
  let {
    disabled,
    selected
  } = _ref6;
  return disabled || selected ? 0.5 : 1;
});
export const SearchInput = _styled.input.withConfig({
  displayName: "styleds__SearchInput",
  componentId: "sc-1xp9ndq-4"
})(["position:relative;display:flex;padding:16px;align-items:center;width:100%;white-space:nowrap;background:none;border:none;outline:none;border-radius:20px;color:", ";border-style:solid;border:1px solid ", ";-webkit-appearance:none;font-size:18px;::placeholder{color:", ";}transition:border 100ms;:focus{border:1px solid ", ";outline:none;}"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.text1;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg3;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.text3;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.primary1;
});
export const Separator = _styled.div.withConfig({
  displayName: "styleds__Separator",
  componentId: "sc-1xp9ndq-5"
})(["width:100%;height:1px;background-color:", ";"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.bg2;
});
export const SeparatorDark = _styled.div.withConfig({
  displayName: "styleds__SeparatorDark",
  componentId: "sc-1xp9ndq-6"
})(["width:100%;height:1px;background-color:", ";"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.bg3;
});