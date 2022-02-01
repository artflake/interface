import _styled from "styled-components";
import { AutoColumn } from "../../components/Column";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import Input from "../../components/NumericalInput";
import { BodyWrapper } from 'pages/AppBody';
export const PageWrapper = _styled(BodyWrapper).withConfig({
  displayName: "styled__PageWrapper",
  componentId: "sc-dphd4z-0"
})(["max-width:", ";width:100%;padding:", ";", ";"], _ref => {
  let {
    wide
  } = _ref;
  return wide ? '880px' : '480px';
}, _ref2 => {
  let {
    wide
  } = _ref2;
  return wide ? '10px' : '0';
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.mediaWidth.upToMedium`
    max-width: 480px;
  `;
});
export const Wrapper = _styled.div.withConfig({
  displayName: "styled__Wrapper",
  componentId: "sc-dphd4z-1"
})(["position:relative;padding:26px 16px;min-width:480px;", ";", ";"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToMedium`
    min-width: 400px;
  `;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToExtraSmall`
  min-width: 340px;
`;
});
export const ScrollablePage = _styled.div.withConfig({
  displayName: "styled__ScrollablePage",
  componentId: "sc-dphd4z-2"
})(["position:relative;display:flex;flex-direction:column;", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToMedium`
    max-width: 480px;
    margin: 0 auto;
  `;
});
export const DynamicSection = _styled(AutoColumn).withConfig({
  displayName: "styled__DynamicSection",
  componentId: "sc-dphd4z-3"
})(["opacity:", ";pointer-events:", ";"], _ref7 => {
  let {
    disabled
  } = _ref7;
  return disabled ? '0.2' : '1';
}, _ref8 => {
  let {
    disabled
  } = _ref8;
  return disabled ? 'none' : 'initial';
});
export const CurrencyDropdown = _styled(CurrencyInputPanel).withConfig({
  displayName: "styled__CurrencyDropdown",
  componentId: "sc-dphd4z-4"
})(["width:48.5%;"]);
export const StyledInput = _styled(Input).withConfig({
  displayName: "styled__StyledInput",
  componentId: "sc-dphd4z-5"
})(["background-color:", ";text-align:left;font-size:18px;width:100%;"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.bg0;
});
/* two-column layout where DepositAmount is moved at the very end on mobile. */

export const ResponsiveTwoColumns = _styled.div.withConfig({
  displayName: "styled__ResponsiveTwoColumns",
  componentId: "sc-dphd4z-6"
})(["display:grid;grid-column-gap:50px;grid-row-gap:15px;grid-template-columns:", ";grid-template-rows:max-content;grid-auto-flow:row;padding-top:20px;border-top:1px solid ", ";", ";"], _ref10 => {
  let {
    wide
  } = _ref10;
  return wide ? '1fr 1fr' : '1fr';
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.bg2;
}, _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;

    margin-top: 0;
  `;
});
export const RightContainer = _styled(AutoColumn).withConfig({
  displayName: "styled__RightContainer",
  componentId: "sc-dphd4z-7"
})(["grid-row:1 / 3;grid-column:2;height:fit-content;", ";"], _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.mediaWidth.upToMedium`
  grid-row: 2 / 3;
  grid-column: 1;
  `;
});
export const StackedContainer = _styled.div.withConfig({
  displayName: "styled__StackedContainer",
  componentId: "sc-dphd4z-8"
})(["display:grid;"]);
export const StackedItem = _styled.div.withConfig({
  displayName: "styled__StackedItem",
  componentId: "sc-dphd4z-9"
})(["grid-column:1;grid-row:1;height:100%;z-index:", ";"], _ref14 => {
  let {
    zIndex
  } = _ref14;
  return zIndex;
});
export const MediumOnly = _styled.div.withConfig({
  displayName: "styled__MediumOnly",
  componentId: "sc-dphd4z-10"
})(["", ";"], _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.mediaWidth.upToMedium`
    display: none;
  `;
});
export const HideMedium = _styled.div.withConfig({
  displayName: "styled__HideMedium",
  componentId: "sc-dphd4z-11"
})(["display:none;", ";"], _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.mediaWidth.upToMedium`
    display: block;
  `;
});