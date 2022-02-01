import _styled from "styled-components";
import { Box } from 'rebass/styled-components';

const Card = _styled(Box).withConfig({
  displayName: "Card",
  componentId: "sc-57i8km-0"
})(["width:", ";padding:", ";border-radius:", ";border:", ";"], _ref => {
  let {
    width
  } = _ref;
  return width !== null && width !== void 0 ? width : '100%';
}, _ref2 => {
  let {
    padding
  } = _ref2;
  return padding !== null && padding !== void 0 ? padding : '1rem';
}, _ref3 => {
  let {
    $borderRadius
  } = _ref3;
  return $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : '16px';
}, _ref4 => {
  let {
    border
  } = _ref4;
  return border;
});

export default Card;
export const LightCard = _styled(Card).withConfig({
  displayName: "Card__LightCard",
  componentId: "sc-57i8km-1"
})(["border:1px solid ", ";background-color:", ";"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg2;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg1;
});
export const LightGreyCard = _styled(Card).withConfig({
  displayName: "Card__LightGreyCard",
  componentId: "sc-57i8km-2"
})(["background-color:", ";"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg2;
});
export const GreyCard = _styled(Card).withConfig({
  displayName: "Card__GreyCard",
  componentId: "sc-57i8km-3"
})(["background-color:", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg3;
});
export const DarkGreyCard = _styled(Card).withConfig({
  displayName: "Card__DarkGreyCard",
  componentId: "sc-57i8km-4"
})(["background-color:", ";"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.bg2;
});
export const DarkCard = _styled(Card).withConfig({
  displayName: "Card__DarkCard",
  componentId: "sc-57i8km-5"
})(["background-color:", ";"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.bg0;
});
export const OutlineCard = _styled(Card).withConfig({
  displayName: "Card__OutlineCard",
  componentId: "sc-57i8km-6"
})(["border:1px solid ", ";"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.bg3;
});
export const YellowCard = _styled(Card).withConfig({
  displayName: "Card__YellowCard",
  componentId: "sc-57i8km-7"
})(["background-color:rgba(243,132,30,0.05);color:", ";font-weight:500;"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.yellow3;
});
export const BlueCard = _styled(Card).withConfig({
  displayName: "Card__BlueCard",
  componentId: "sc-57i8km-8"
})(["background-color:", ";color:", ";border-radius:12px;"], _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.primary5;
}, _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.blue2;
});