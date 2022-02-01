import _styled from "styled-components";
import { Box } from 'rebass/styled-components';

const Row = _styled(Box).withConfig({
  displayName: "Row",
  componentId: "sc-nrd8cx-0"
})(["width:", ";display:flex;padding:0;align-items:", ";justify-content:", ";padding:", ";border:", ";border-radius:", ";"], _ref => {
  let {
    width
  } = _ref;
  return width !== null && width !== void 0 ? width : '100%';
}, _ref2 => {
  let {
    align
  } = _ref2;
  return align !== null && align !== void 0 ? align : 'center';
}, _ref3 => {
  let {
    justify
  } = _ref3;
  return justify !== null && justify !== void 0 ? justify : 'flex-start';
}, _ref4 => {
  let {
    padding
  } = _ref4;
  return padding;
}, _ref5 => {
  let {
    border
  } = _ref5;
  return border;
}, _ref6 => {
  let {
    borderRadius
  } = _ref6;
  return borderRadius;
});

export const RowBetween = _styled(Row).withConfig({
  displayName: "Row__RowBetween",
  componentId: "sc-nrd8cx-1"
})(["justify-content:space-between;"]);
export const RowFlat = _styled.div.withConfig({
  displayName: "Row__RowFlat",
  componentId: "sc-nrd8cx-2"
})(["display:flex;align-items:flex-end;"]);
export const AutoRow = _styled(Row).withConfig({
  displayName: "Row__AutoRow",
  componentId: "sc-nrd8cx-3"
})(["flex-wrap:wrap;margin:", ";justify-content:", ";& > *{margin:", " !important;}"], _ref7 => {
  let {
    gap
  } = _ref7;
  return gap && `-${gap}`;
}, _ref8 => {
  let {
    justify
  } = _ref8;
  return justify && justify;
}, _ref9 => {
  let {
    gap
  } = _ref9;
  return gap;
});
export const RowFixed = _styled(Row).withConfig({
  displayName: "Row__RowFixed",
  componentId: "sc-nrd8cx-4"
})(["width:fit-content;margin:", ";"], _ref10 => {
  let {
    gap
  } = _ref10;
  return gap && `-${gap}`;
});
export default Row;