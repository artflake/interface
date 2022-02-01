import _styled from "styled-components";
import Loader from "../components/Loader";
import ApeModeQueryParamReader from "../hooks/useApeModeQueryParamReader";
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddressClaimModal from "../components/claim/AddressClaimModal";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import Polling from "../components/Header/Polling";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import Swap from "../pages/Swap";
import { RedirectPathToSwapOnly } from "../pages/Swap/redirects";
import { useModalOpen, useToggleModal } from "../state/application/hooks";
import { ApplicationModal } from "../state/application/reducer";
import DarkModeQueryParamReader from "../theme/DarkModeQueryParamReader"; // const Vote = lazy(() => import('./Vote'))

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const AppWrapper = _styled.div.withConfig({
  displayName: "App__AppWrapper",
  componentId: "sc-zfenkb-0"
})(["display:flex;flex-flow:column;align-items:flex-start;"]);

const BodyWrapper = _styled.div.withConfig({
  displayName: "App__BodyWrapper",
  componentId: "sc-zfenkb-1"
})(["display:flex;flex-direction:column;width:100%;padding:120px 16px 0px 16px;align-items:center;flex:1;z-index:1;", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `;
});

const HeaderWrapper = _styled.div.withConfig({
  displayName: "App__HeaderWrapper",
  componentId: "sc-zfenkb-2"
})(["", " width:100%;justify-content:space-between;position:fixed;top:0;z-index:2;"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.flexRowNoWrap;
});

const Marginer = _styled.div.withConfig({
  displayName: "App__Marginer",
  componentId: "sc-zfenkb-3"
})(["margin-top:5rem;"]);

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM);
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
  return /*#__PURE__*/_jsx(AddressClaimModal, {
    isOpen: open,
    onDismiss: toggle
  });
}

export default function App() {
  return /*#__PURE__*/_jsxs(ErrorBoundary, {
    children: [/*#__PURE__*/_jsx(Route, {
      component: DarkModeQueryParamReader
    }), /*#__PURE__*/_jsx(Route, {
      component: ApeModeQueryParamReader
    }), /*#__PURE__*/_jsx(Web3ReactManager, {
      children: /*#__PURE__*/_jsxs(AppWrapper, {
        children: [/*#__PURE__*/_jsx(HeaderWrapper, {
          children: /*#__PURE__*/_jsx(Header, {})
        }), /*#__PURE__*/_jsxs(BodyWrapper, {
          children: [/*#__PURE__*/_jsx(Popups, {}), /*#__PURE__*/_jsx(Polling, {}), /*#__PURE__*/_jsx(TopLevelModals, {}), /*#__PURE__*/_jsx(Suspense, {
            fallback: /*#__PURE__*/_jsx(Loader, {}),
            children: /*#__PURE__*/_jsxs(Switch, {
              children: [/*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/swap",
                component: Swap
              }), /*#__PURE__*/_jsx(Route, {
                component: RedirectPathToSwapOnly
              })]
            })
          }), /*#__PURE__*/_jsx(Marginer, {})]
        })]
      })
    })]
  });
}