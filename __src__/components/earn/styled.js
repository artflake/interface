import _styled from "styled-components";
import uImage from '../../assets/images/big_unicorn.png';
import noise from '../../assets/images/noise.png';
import xlUnicorn from '../../assets/images/xl_uni.png';
import { AutoColumn } from '../Column';
export const DataCard = _styled(AutoColumn).withConfig({
  displayName: "styled__DataCard",
  componentId: "sc-5nm9ef-0"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#ff007a 0%,#2172e5 100%);border-radius:12px;width:100%;position:relative;overflow:hidden;"]);
export const CardBGImage = _styled.span.withConfig({
  displayName: "styled__CardBGImage",
  componentId: "sc-5nm9ef-1"
})(["background:url(", ");width:1000px;height:600px;position:absolute;border-radius:12px;opacity:0.4;top:-100px;left:-100px;transform:rotate(-15deg);user-select:none;", ""], uImage, _ref => {
  let {
    desaturate
  } = _ref;
  return desaturate && `filter: saturate(0)`;
});
export const CardBGImageSmaller = _styled.span.withConfig({
  displayName: "styled__CardBGImageSmaller",
  componentId: "sc-5nm9ef-2"
})(["background:url(", ");width:1200px;height:1200px;position:absolute;border-radius:12px;top:-300px;left:-300px;opacity:0.4;user-select:none;", ""], xlUnicorn, _ref2 => {
  let {
    desaturate
  } = _ref2;
  return desaturate && `filter: saturate(0)`;
});
export const CardNoise = _styled.span.withConfig({
  displayName: "styled__CardNoise",
  componentId: "sc-5nm9ef-3"
})(["background:url(", ");background-size:cover;mix-blend-mode:overlay;border-radius:12px;width:100%;height:100%;opacity:0.15;position:absolute;top:0;left:0;user-select:none;"], noise);
export const CardSection = _styled(AutoColumn).withConfig({
  displayName: "styled__CardSection",
  componentId: "sc-5nm9ef-4"
})(["padding:1rem;z-index:1;opacity:", ";"], _ref3 => {
  let {
    disabled
  } = _ref3;
  return disabled && '0.4';
});
export const Break = _styled.div.withConfig({
  displayName: "styled__Break",
  componentId: "sc-5nm9ef-5"
})(["width:100%;background-color:rgba(255,255,255,0.2);height:1px;"]);