import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { darken } from 'polished';
import { injected } from "../../connectors";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import Loader from "../Loader";
import Option from "./Option";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PendingSection = _styled.div.withConfig({
  displayName: "PendingView__PendingSection",
  componentId: "sc-14xbiak-0"
})(["", ";align-items:center;justify-content:center;width:100%;& > *{width:100%;}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexColumnNoWrap;
});

const StyledLoader = _styled(Loader).withConfig({
  displayName: "PendingView__StyledLoader",
  componentId: "sc-14xbiak-1"
})(["margin-right:1rem;"]);

const LoadingMessage = _styled.div.withConfig({
  displayName: "PendingView__LoadingMessage",
  componentId: "sc-14xbiak-2"
})(["", ";align-items:center;justify-content:flex-start;border-radius:12px;margin-bottom:20px;color:", ";border:1px solid ", ";& > *{padding:1rem;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.flexRowNoWrap;
}, _ref3 => {
  let {
    theme,
    error
  } = _ref3;
  return error ? theme.red1 : 'inherit';
}, _ref4 => {
  let {
    theme,
    error
  } = _ref4;
  return error ? theme.red1 : theme.text4;
});

const ErrorGroup = _styled.div.withConfig({
  displayName: "PendingView__ErrorGroup",
  componentId: "sc-14xbiak-3"
})(["", ";align-items:center;justify-content:flex-start;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.flexRowNoWrap;
});

const ErrorButton = _styled.div.withConfig({
  displayName: "PendingView__ErrorButton",
  componentId: "sc-14xbiak-4"
})(["border-radius:8px;font-size:12px;color:", ";background-color:", ";margin-left:1rem;padding:0.5rem;font-weight:600;user-select:none;&:hover{cursor:pointer;background-color:", ";}"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.text1;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg4;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return darken(0.1, theme.text4);
});

const LoadingWrapper = _styled.div.withConfig({
  displayName: "PendingView__LoadingWrapper",
  componentId: "sc-14xbiak-5"
})(["", ";align-items:center;justify-content:center;"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.flexRowNoWrap;
});

export default function PendingView(_ref10) {
  var _window, _window$ethereum;

  let {
    connector,
    error = false,
    setPendingError,
    tryActivation
  } = _ref10;
  const isMetamask = (_window = window) === null || _window === void 0 ? void 0 : (_window$ethereum = _window.ethereum) === null || _window$ethereum === void 0 ? void 0 : _window$ethereum.isMetaMask;
  return /*#__PURE__*/_jsxs(PendingSection, {
    children: [/*#__PURE__*/_jsx(LoadingMessage, {
      error: error,
      children: /*#__PURE__*/_jsx(LoadingWrapper, {
        children: error ? /*#__PURE__*/_jsxs(ErrorGroup, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Error connecting"
            })
          }), /*#__PURE__*/_jsx(ErrorButton, {
            onClick: () => {
              setPendingError(false);
              connector && tryActivation(connector);
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Try Again"
            })
          })]
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(StyledLoader, {}), /*#__PURE__*/_jsx(Trans, {
            id: "Initializing..."
          })]
        })
      })
    }), Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];

      if (option.connector === connector) {
        if (option.connector === injected) {
          if (isMetamask && option.name !== 'MetaMask') {
            return null;
          }

          if (!isMetamask && option.name === 'MetaMask') {
            return null;
          }
        }

        return /*#__PURE__*/_jsx(Option, {
          id: `connect-${key}`,
          clickable: false,
          color: option.color,
          header: option.name,
          subheader: option.description,
          icon: option.iconURL
        }, key);
      }

      return null;
    })]
  });
}