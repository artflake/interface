import _styled from "styled-components";
import { LoadingRows as BaseLoadingRows } from 'components/Loader/styled';
import { Text } from 'rebass';
export const Wrapper = _styled.div.withConfig({
  displayName: "styleds__Wrapper",
  componentId: "sc-2wxkbc-0"
})(["position:relative;padding:20px;"]);
export const ClickableText = _styled(Text).withConfig({
  displayName: "styleds__ClickableText",
  componentId: "sc-2wxkbc-1"
})([":hover{cursor:pointer;}color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.primary1;
});
export const MaxButton = _styled.button.withConfig({
  displayName: "styleds__MaxButton",
  componentId: "sc-2wxkbc-2"
})(["padding:0.5rem 1rem;background-color:", ";border:1px solid ", ";border-radius:0.5rem;font-size:1rem;", ";font-weight:500;cursor:pointer;margin:0.25rem;overflow:hidden;color:", ";:hover{border:1px solid ", ";}:focus{border:1px solid ", ";outline:none;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.primary5;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.primary5;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    padding: 0.25rem 0.5rem;
  `;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.primary1;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.primary1;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.primary1;
});
export const Dots = _styled.span.withConfig({
  displayName: "styleds__Dots",
  componentId: "sc-2wxkbc-3"
})(["&::after{display:inline-block;animation:ellipsis 1.25s infinite;content:'.';width:1em;text-align:left;}@keyframes ellipsis{0%{content:'.';}33%{content:'..';}66%{content:'...';}}"]);
export const LoadingRows = _styled(BaseLoadingRows).withConfig({
  displayName: "styleds__LoadingRows",
  componentId: "sc-2wxkbc-4"
})(["min-width:75%;max-width:960px;grid-column-gap:0.5em;grid-row-gap:0.8em;grid-template-columns:repeat(3,1fr);& > div:nth-child(4n + 1){grid-column:1 / 3;}& > div:nth-child(4n){grid-column:3 / 4;margin-bottom:2em;}"]);