import _styled from "styled-components";
import Portal from '@reach/portal';
import React, { useCallback, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import useInterval from "../../hooks/useInterval";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PopoverContainer = _styled.div.withConfig({
  displayName: "Popover__PopoverContainer",
  componentId: "sc-d5tbhs-0"
})(["z-index:9999;visibility:", ";opacity:", ";transition:visibility 150ms linear,opacity 150ms linear;color:", ";"], props => props.show ? 'visible' : 'hidden', props => props.show ? 1 : 0, _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const ReferenceElement = _styled.div.withConfig({
  displayName: "Popover__ReferenceElement",
  componentId: "sc-d5tbhs-1"
})(["display:inline-block;"]);

const Arrow = _styled.div.withConfig({
  displayName: "Popover__Arrow",
  componentId: "sc-d5tbhs-2"
})(["width:8px;height:8px;z-index:9998;::before{position:absolute;width:8px;height:8px;z-index:9998;content:'';border:1px solid ", ";transform:rotate(45deg);background:", ";}&.arrow-top{bottom:-5px;::before{border-top:none;border-left:none;}}&.arrow-bottom{top:-5px;::before{border-bottom:none;border-right:none;}}&.arrow-left{right:-5px;::before{border-bottom:none;border-left:none;}}&.arrow-right{left:-5px;::before{border-right:none;border-top:none;}}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg0;
});

export default function Popover(_ref4) {
  var _attributes$popper$da, _attributes$popper;

  let {
    content,
    show,
    children,
    placement = 'auto'
  } = _ref4;
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const options = useMemo(() => ({
    placement,
    strategy: 'fixed',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [8, 8]
      }
    }, {
      name: 'arrow',
      options: {
        element: arrowElement
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: 8
      }
    }]
  }), [arrowElement, placement]);
  const {
    styles,
    update,
    attributes
  } = usePopper(referenceElement, popperElement, options);
  const updateCallback = useCallback(() => {
    update && update();
  }, [update]);
  useInterval(updateCallback, show ? 100 : null);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ReferenceElement, {
      ref: setReferenceElement,
      children: children
    }), /*#__PURE__*/_jsx(Portal, {
      children: /*#__PURE__*/_jsxs(PopoverContainer, {
        show: show,
        ref: setPopperElement,
        style: styles.popper,
        ...attributes.popper,
        children: [content, /*#__PURE__*/_jsx(Arrow, {
          className: `arrow-${(_attributes$popper$da = (_attributes$popper = attributes.popper) === null || _attributes$popper === void 0 ? void 0 : _attributes$popper['data-popper-placement']) !== null && _attributes$popper$da !== void 0 ? _attributes$popper$da : ''}`,
          ref: setArrowElement,
          style: styles.arrow,
          ...attributes.arrow
        })]
      })
    })]
  });
}