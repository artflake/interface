import { keyframes as _keyframes } from "styled-components";
import { css as _css } from "styled-components";
import _styled from "styled-components";
export const loadingAnimation = _keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
export const LoadingRows = _styled.div.withConfig({
  displayName: "styled__LoadingRows",
  componentId: "sc-u7b06n-0"
})(["display:grid;& > div{animation:", " 1.5s infinite;animation-fill-mode:both;background:linear-gradient( to left,", " 25%,", " 50%,", " 75% );background-size:400%;border-radius:12px;height:2.4em;will-change:background-position;}"], loadingAnimation, _ref => {
  let {
    theme
  } = _ref;
  return theme.bg1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg1;
});
export const loadingOpacityMixin = _css`
  filter: ${_ref4 => {
  let {
    $loading
  } = _ref4;
  return $loading ? 'grayscale(1)' : 'none';
}};
  opacity: ${_ref5 => {
  let {
    $loading
  } = _ref5;
  return $loading ? '0.4' : '1';
}};
  transition: opacity 0.2s ease-in-out;
`;
export const LoadingOpacityContainer = _styled.div.withConfig({
  displayName: "styled__LoadingOpacityContainer",
  componentId: "sc-u7b06n-1"
})(["", ""], loadingOpacityMixin);