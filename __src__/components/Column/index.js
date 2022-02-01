import _styled from "styled-components";

const Column = _styled.div.withConfig({
  displayName: "Column",
  componentId: "sc-1kykgp9-0"
})(["display:flex;flex-direction:column;justify-content:flex-start;"]);

export const ColumnCenter = _styled(Column).withConfig({
  displayName: "Column__ColumnCenter",
  componentId: "sc-1kykgp9-1"
})(["width:100%;align-items:center;"]);
export const AutoColumn = _styled.div.withConfig({
  displayName: "Column__AutoColumn",
  componentId: "sc-1kykgp9-2"
})(["display:grid;grid-auto-rows:auto;grid-row-gap:", ";justify-items:", ";"], _ref => {
  let {
    gap
  } = _ref;
  return gap === 'sm' && '8px' || gap === 'md' && '12px' || gap === 'lg' && '24px' || gap;
}, _ref2 => {
  let {
    justify
  } = _ref2;
  return justify && justify;
});
export default Column;