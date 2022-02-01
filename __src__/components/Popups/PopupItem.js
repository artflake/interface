import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { useCallback, useContext, useEffect } from 'react';
import { X } from 'react-feather';
import { animated } from 'react-spring';
import { useSpring } from 'react-spring/web';
import { useRemovePopup } from "../../state/application/hooks";
import TransactionPopup from "./TransactionPopup";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const StyledClose = _styled(X).withConfig({
  displayName: "PopupItem__StyledClose",
  componentId: "sc-a10u6v-0"
})(["position:absolute;right:10px;top:10px;:hover{cursor:pointer;}"]);

const Popup = _styled.div.withConfig({
  displayName: "PopupItem__Popup",
  componentId: "sc-a10u6v-1"
})(["display:inline-block;width:100%;padding:1em;background-color:", ";position:relative;border-radius:10px;padding:20px;padding-right:35px;overflow:hidden;", ""], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg0;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToSmall`
    min-width: 290px;
    &:not(:last-of-type) {
      margin-right: 20px;
    }
  `;
});

const Fader = _styled.div.withConfig({
  displayName: "PopupItem__Fader",
  componentId: "sc-a10u6v-2"
})(["position:absolute;bottom:0px;left:0px;width:100%;height:2px;background-color:", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg3;
});

const AnimatedFader = animated(Fader);
export default function PopupItem(_ref4) {
  let {
    removeAfterMs,
    content,
    popKey
  } = _ref4;
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);
  useEffect(() => {
    if (removeAfterMs === null) return undefined;
    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);
    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);
  const theme = useContext(_ThemeContext);
  let popupContent;

  if ('txn' in content) {
    const {
      txn: {
        hash
      }
    } = content;
    popupContent = /*#__PURE__*/_jsx(TransactionPopup, {
      hash: hash
    });
  }

  const faderStyle = useSpring({
    from: {
      width: '100%'
    },
    to: {
      width: '0%'
    },
    config: {
      duration: removeAfterMs !== null && removeAfterMs !== void 0 ? removeAfterMs : undefined
    }
  });
  return /*#__PURE__*/_jsxs(Popup, {
    children: [/*#__PURE__*/_jsx(StyledClose, {
      color: theme.text2,
      onClick: removeThisPopup
    }), popupContent, removeAfterMs !== null ? /*#__PURE__*/_jsx(AnimatedFader, {
      style: faderStyle
    }) : null]
  });
}