import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from "../Button";
import { AlertCircle, ArrowLeft } from 'react-feather';
import { CloseIcon, ThemedText } from "../../theme";
import TokenImportCard from "./TokenImportCard";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "BlockedToken__Wrapper",
  componentId: "sc-1t8jv47-0"
})(["align-items:center;display:flex;flex-direction:column;flex:1 1 auto;height:100%;width:100%;"]);

const Button = _styled(ButtonPrimary).withConfig({
  displayName: "BlockedToken__Button",
  componentId: "sc-1t8jv47-1"
})(["margin-top:1em;padding:10px 1em;"]);

const Content = _styled.div.withConfig({
  displayName: "BlockedToken__Content",
  componentId: "sc-1t8jv47-2"
})(["padding:1em;"]);

const Copy = _styled(ThemedText.Body).withConfig({
  displayName: "BlockedToken__Copy",
  componentId: "sc-1t8jv47-3"
})(["text-align:center;margin:0 2em 1em !important;font-weight:400;font-size:16px;"]);

const Header = _styled.div.withConfig({
  displayName: "BlockedToken__Header",
  componentId: "sc-1t8jv47-4"
})(["align-items:center;display:flex;gap:14px;justify-content:space-between;padding:20px;width:100%;"]);

const Icon = _styled(AlertCircle).withConfig({
  displayName: "BlockedToken__Icon",
  componentId: "sc-1t8jv47-5"
})(["stroke:", ";width:48px;height:48px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const BlockedToken = _ref2 => {
  let {
    onBack,
    onDismiss,
    blockedTokens
  } = _ref2;
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(Header, {
      children: [onBack ? /*#__PURE__*/_jsx(ArrowLeft, {
        style: {
          cursor: 'pointer'
        },
        onClick: onBack
      }) : /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Token not supported"
        })
      }), onDismiss ? /*#__PURE__*/_jsx(CloseIcon, {
        onClick: onDismiss
      }) : /*#__PURE__*/_jsx("div", {})]
    }), /*#__PURE__*/_jsx(Icon, {}), /*#__PURE__*/_jsxs(Content, {
      children: [/*#__PURE__*/_jsx(Copy, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "This token is not supported in the Uniswap Labs app"
        })
      }), /*#__PURE__*/_jsx(TokenImportCard, {
        token: blockedTokens[0]
      }), /*#__PURE__*/_jsx(Button, {
        disabled: true,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Import"
        })
      })]
    })]
  });
};

export default BlockedToken;