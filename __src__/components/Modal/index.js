import { css as _css } from "styled-components";
import _styled from "styled-components";
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { transparentize } from 'polished';
import React from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { isMobile } from "../../utils/userAgent";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const AnimatedDialogOverlay = animated(DialogOverlay); // eslint-disable-next-line @typescript-eslint/no-unused-vars

const StyledDialogOverlay = _styled(AnimatedDialogOverlay).withConfig({
  displayName: "Modal__StyledDialogOverlay",
  componentId: "sc-jajvtp-0"
})(["&[data-reach-dialog-overlay]{z-index:2;background-color:transparent;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.modalBG;
});

const AnimatedDialogContent = animated(DialogContent); // destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const StyledDialogContent = _styled(_ref2 => {
  let {
    minHeight,
    maxHeight,
    mobile,
    isOpen,
    ...rest
  } = _ref2;
  return /*#__PURE__*/_jsx(AnimatedDialogContent, { ...rest
  });
}).attrs({
  'aria-label': 'dialog'
}).withConfig({
  displayName: "Modal__StyledDialogContent",
  componentId: "sc-jajvtp-1"
})(["overflow-y:auto;&[data-reach-dialog-content]{margin:0 0 2rem 0;background-color:", ";border:1px solid ", ";box-shadow:0 4px 8px 0 ", ";padding:0px;width:50vw;overflow-y:auto;overflow-x:hidden;align-self:", ";max-width:420px;", " ", " display:flex;border-radius:20px;", " ", "}"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg0;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg1;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return transparentize(0.95, theme.shadow1);
}, _ref6 => {
  let {
    mobile
  } = _ref6;
  return mobile ? 'flex-end' : 'center';
}, _ref7 => {
  let {
    maxHeight
  } = _ref7;
  return maxHeight && _css`
        max-height: ${maxHeight}vh;
      `;
}, _ref8 => {
  let {
    minHeight
  } = _ref8;
  return minHeight && _css`
        min-height: ${minHeight}vh;
      `;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.mediaWidth.upToMedium`
      width: 65vw;
      margin: 0;
    `;
}, _ref10 => {
  let {
    theme,
    mobile
  } = _ref10;
  return theme.mediaWidth.upToSmall`
      width:  85vw;
      ${mobile && _css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `;
});

export default function Modal(_ref11) {
  let {
    isOpen,
    onDismiss,
    minHeight = false,
    maxHeight = 90,
    initialFocusRef,
    children
  } = _ref11;
  const fadeTransition = useTransition(isOpen, null, {
    config: {
      duration: 200
    },
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });
  const [{
    y
  }, set] = useSpring(() => ({
    y: 0,
    config: {
      mass: 1,
      tension: 210,
      friction: 20
    }
  }));
  const bind = useGesture({
    onDrag: state => {
      set({
        y: state.down ? state.movement[1] : 0
      });

      if (state.movement[1] > 300 || state.velocity > 3 && state.direction[1] > 0) {
        onDismiss();
      }
    }
  });
  return /*#__PURE__*/_jsx(_Fragment, {
    children: fadeTransition.map(_ref12 => {
      let {
        item,
        key,
        props
      } = _ref12;
      return item && /*#__PURE__*/_jsx(StyledDialogOverlay, {
        style: props,
        onDismiss: onDismiss,
        initialFocusRef: initialFocusRef,
        unstable_lockFocusAcrossFrames: false,
        children: /*#__PURE__*/_jsxs(StyledDialogContent, { ...(isMobile ? { ...bind(),
            style: {
              transform: y.interpolate(y => `translateY(${y > 0 ? y : 0}px)`)
            }
          } : {}),
          "aria-label": "dialog content",
          minHeight: minHeight,
          maxHeight: maxHeight,
          mobile: isMobile,
          children: [!initialFocusRef && isMobile ? /*#__PURE__*/_jsx("div", {
            tabIndex: 1
          }) : null, children]
        })
      }, key);
    })
  });
}