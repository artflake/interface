import _styled from "styled-components";
export const ToggleWrapper = _styled.button.withConfig({
  displayName: "MultiToggle__ToggleWrapper",
  componentId: "sc-1pvb8nu-0"
})(["display:flex;align-items:center;width:", ";padding:1px;background:", ";border-radius:8px;border:", ";cursor:pointer;outline:none;"], _ref => {
  let {
    width
  } = _ref;
  return width !== null && width !== void 0 ? width : '100%';
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return '1px solid ' + theme.bg2;
});
export const ToggleElement = _styled.span.withConfig({
  displayName: "MultiToggle__ToggleElement",
  componentId: "sc-1pvb8nu-1"
})(["display:flex;align-items:center;width:100%;padding:4px 0.5rem;border-radius:6px;justify-content:center;height:100%;background:", ";color:", ";font-size:", ";font-weight:500;white-space:nowrap;:hover{user-select:initial;color:", ";}"], _ref4 => {
  let {
    theme,
    isActive
  } = _ref4;
  return isActive ? theme.bg0 : 'none';
}, _ref5 => {
  let {
    theme,
    isActive
  } = _ref5;
  return isActive ? theme.text1 : theme.text3;
}, _ref6 => {
  let {
    fontSize
  } = _ref6;
  return fontSize !== null && fontSize !== void 0 ? fontSize : '1rem';
}, _ref7 => {
  let {
    theme,
    isActive
  } = _ref7;
  return isActive ? theme.text2 : theme.text3;
});