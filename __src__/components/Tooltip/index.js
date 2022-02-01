import _styled from "styled-components";
import { transparentize } from 'polished';
import { useCallback, useState } from 'react';
import Popover from '../Popover';
import { jsx as _jsx } from "react/jsx-runtime";
export const TooltipContainer = _styled.div.withConfig({
  displayName: "Tooltip__TooltipContainer",
  componentId: "sc-1g1kijt-0"
})(["width:256px;padding:0.6rem 1rem;font-weight:400;word-break:break-word;background:", ";border-radius:12px;border:1px solid ", ";box-shadow:0 4px 8px 0 ", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg0;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return transparentize(0.9, theme.shadow1);
});
export default function Tooltip(_ref4) {
  let {
    text,
    ...rest
  } = _ref4;
  return /*#__PURE__*/_jsx(Popover, {
    content: /*#__PURE__*/_jsx(TooltipContainer, {
      children: text
    }),
    ...rest
  });
}

function TooltipContent(_ref5) {
  let {
    content,
    wrap = false,
    ...rest
  } = _ref5;
  return /*#__PURE__*/_jsx(Popover, {
    content: wrap ? /*#__PURE__*/_jsx(TooltipContainer, {
      children: content
    }) : content,
    ...rest
  });
}

export function MouseoverTooltip(_ref6) {
  let {
    children,
    ...rest
  } = _ref6;
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return /*#__PURE__*/_jsx(Tooltip, { ...rest,
    show: show,
    children: /*#__PURE__*/_jsx("div", {
      onMouseEnter: open,
      onMouseLeave: close,
      children: children
    })
  });
}
export function MouseoverTooltipContent(_ref7) {
  let {
    content,
    children,
    onOpen: openCallback = undefined,
    ...rest
  } = _ref7;
  const [show, setShow] = useState(false);
  const open = useCallback(() => {
    setShow(true);
    openCallback === null || openCallback === void 0 ? void 0 : openCallback();
  }, [openCallback]);
  const close = useCallback(() => setShow(false), [setShow]);
  return /*#__PURE__*/_jsx(TooltipContent, { ...rest,
    show: show,
    content: content,
    children: /*#__PURE__*/_jsx("div", {
      style: {
        display: 'inline-block',
        lineHeight: 0,
        padding: '0.25rem'
      },
      onMouseEnter: open,
      onMouseLeave: close,
      children: children
    })
  });
}