import _styled from "styled-components";
import Tooltip from "../Tooltip";
import { useState } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";

const TextWrapper = _styled.span.withConfig({
  displayName: "HoverInlineText__TextWrapper",
  componentId: "sc-19p08fx-0"
})(["margin-left:", ";color:", ";font-size:", ";@media screen and (max-width:600px){font-size:", ";}"], _ref => {
  let {
    margin
  } = _ref;
  return margin && '4px';
}, _ref2 => {
  let {
    theme,
    link
  } = _ref2;
  return link ? theme.blue1 : theme.text1;
}, _ref3 => {
  let {
    fontSize
  } = _ref3;
  return fontSize !== null && fontSize !== void 0 ? fontSize : 'inherit';
}, _ref4 => {
  let {
    adjustSize
  } = _ref4;
  return adjustSize && '12px';
});

const HoverInlineText = _ref5 => {
  let {
    text,
    maxCharacters = 20,
    margin = false,
    adjustSize = false,
    fontSize,
    link,
    ...rest
  } = _ref5;
  const [showHover, setShowHover] = useState(false);

  if (!text) {
    return /*#__PURE__*/_jsx("span", {});
  }

  if (text.length > maxCharacters) {
    return /*#__PURE__*/_jsx(Tooltip, {
      text: text,
      show: showHover,
      children: /*#__PURE__*/_jsx(TextWrapper, {
        onMouseEnter: () => setShowHover(true),
        onMouseLeave: () => setShowHover(false),
        margin: margin,
        adjustSize: adjustSize,
        link: link,
        fontSize: fontSize,
        ...rest,
        children: ' ' + text.slice(0, maxCharacters - 1) + '...'
      })
    });
  }

  return /*#__PURE__*/_jsx(TextWrapper, {
    margin: margin,
    adjustSize: adjustSize,
    link: link,
    fontSize: fontSize,
    ...rest,
    children: text
  });
};

export default HoverInlineText;