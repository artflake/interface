import _styled from "styled-components";
import { MaxButton } from "../Pool/styleds";
import { Text } from 'rebass';
export const Wrapper = _styled.div.withConfig({
  displayName: "styled__Wrapper",
  componentId: "sc-uqmezx-0"
})(["position:relative;padding:20px;min-width:460px;", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToExtraSmall`
    min-width: 340px;
  `;
});
export const SmallMaxButton = _styled(MaxButton).withConfig({
  displayName: "styled__SmallMaxButton",
  componentId: "sc-uqmezx-1"
})(["font-size:12px;"]);
export const ResponsiveHeaderText = _styled(Text).withConfig({
  displayName: "styled__ResponsiveHeaderText",
  componentId: "sc-uqmezx-2"
})(["font-size:40px;font-weight:500;", ";"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToExtraSmall`
     font-size: 24px
  `;
});