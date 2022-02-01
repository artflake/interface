import _styled from "styled-components";
import { useCallback, useState } from 'react';
import Tooltip from '../Tooltip';
import { jsx as _jsx } from "react/jsx-runtime";

const QuestionWrapper = _styled.div.withConfig({
  displayName: "QuestionHelper__QuestionWrapper",
  componentId: "sc-bjeulj-0"
})(["display:flex;align-items:center;justify-content:center;padding:0px;width:18px;height:18px;border:none;background:none;outline:none;cursor:default;border-radius:36px;font-size:12px;background-color:", ";color:", ";:hover,:focus{opacity:0.7;}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg2;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text2;
});

const QuestionMark = _styled.span.withConfig({
  displayName: "QuestionHelper__QuestionMark",
  componentId: "sc-bjeulj-1"
})(["font-size:14px;"]);

export default function QuestionHelper(_ref3) {
  let {
    text
  } = _ref3;
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return /*#__PURE__*/_jsx("span", {
    style: {
      marginLeft: 4,
      display: 'flex',
      alignItems: 'center'
    },
    children: /*#__PURE__*/_jsx(Tooltip, {
      text: text,
      show: show,
      children: /*#__PURE__*/_jsx(QuestionWrapper, {
        onClick: open,
        onMouseEnter: open,
        onMouseLeave: close,
        children: /*#__PURE__*/_jsx(QuestionMark, {
          children: "?"
        })
      })
    })
  });
}