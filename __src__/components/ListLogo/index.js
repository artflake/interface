import _styled from "styled-components";
import React from 'react';
import useHttpLocations from "../../hooks/useHttpLocations";
import Logo from "../Logo";
import { jsx as _jsx } from "react/jsx-runtime";

const StyledListLogo = _styled(Logo).withConfig({
  displayName: "ListLogo__StyledListLogo",
  componentId: "sc-xz7emh-0"
})(["width:", ";height:", ";"], _ref => {
  let {
    size
  } = _ref;
  return size;
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size;
});

export default function ListLogo(_ref3) {
  let {
    logoURI,
    style,
    size = '24px',
    alt
  } = _ref3;
  const srcs = useHttpLocations(logoURI);
  return /*#__PURE__*/_jsx(StyledListLogo, {
    alt: alt,
    size: size,
    srcs: srcs,
    style: style
  });
}