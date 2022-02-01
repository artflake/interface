import _styled from "styled-components";
import Loader from "../components/Loader";
import ApeModeQueryParamReader from "../hooks/useApeModeQueryParamReader";
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import GoogleAnalyticsReporter from "../components/analytics/GoogleAnalyticsReporter";
import AddressClaimModal from "../components/claim/AddressClaimModal";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import Polling from "../components/Header/Polling";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import { useModalOpen, useToggleModal } from "../state/application/hooks";
import { ApplicationModal } from "../state/application/reducer";
import DarkModeQueryParamReader from "../theme/DarkModeQueryParamReader";
import AddLiquidity from "./AddLiquidity";
import { RedirectDuplicateTokenIds } from "./AddLiquidity/redirects";
import { RedirectDuplicateTokenIdsV2 } from "./AddLiquidityV2/redirects";
import Earn from "./Earn";
import Manage from "./Earn/Manage";
import MigrateV2 from "./MigrateV2";
import MigrateV2Pair from "./MigrateV2/MigrateV2Pair";
import Pool from "./Pool";
import { PositionPage } from "./Pool/PositionPage";
import PoolV2 from "./Pool/v2";
import PoolFinder from "./PoolFinder";
import RemoveLiquidity from "./RemoveLiquidity";
import RemoveLiquidityV3 from "./RemoveLiquidity/V3";
import Swap from "./Swap";
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from "./Swap/redirects";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Vote = /*#__PURE__*/lazy(() => import("./Vote"));

const AppWrapper = _styled.div.withConfig({
  displayName: "App__AppWrapper",
  componentId: "sc-1dv6j2d-0"
})(["display:flex;flex-flow:column;align-items:flex-start;"]);

const BodyWrapper = _styled.div.withConfig({
  displayName: "App__BodyWrapper",
  componentId: "sc-1dv6j2d-1"
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
  componentId: "sc-1dv6j2d-2"
})(["", " width:100%;justify-content:space-between;position:fixed;top:0;z-index:2;"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.flexRowNoWrap;
});

const Marginer = _styled.div.withConfig({
  displayName: "App__Marginer",
  componentId: "sc-1dv6j2d-3"
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
      component: GoogleAnalyticsReporter
    }), /*#__PURE__*/_jsx(Route, {
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
                strict: true,
                path: "/vote",
                component: Vote
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/create-proposal",
                children: /*#__PURE__*/_jsx(Redirect, {
                  to: "/vote/create-proposal"
                })
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/claim",
                component: OpenClaimAddressModalAndRedirectToSwap
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/uni",
                component: Earn
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/uni/:currencyIdA/:currencyIdB",
                component: Manage
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/send",
                component: RedirectPathToSwapOnly
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/swap/:outputCurrency",
                component: RedirectToSwap
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/swap",
                component: Swap
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/pool/v2/find",
                component: PoolFinder
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/pool/v2",
                component: PoolV2
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/pool",
                component: Pool
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/pool/:tokenId",
                component: PositionPage
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/add/v2/:currencyIdA?/:currencyIdB?",
                component: RedirectDuplicateTokenIdsV2
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/add/:currencyIdA?/:currencyIdB?/:feeAmount?",
                component: RedirectDuplicateTokenIds
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/increase/:currencyIdA?/:currencyIdB?/:feeAmount?/:tokenId?",
                component: AddLiquidity
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/remove/v2/:currencyIdA/:currencyIdB",
                component: RemoveLiquidity
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/remove/:tokenId",
                component: RemoveLiquidityV3
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/migrate/v2",
                component: MigrateV2
              }), /*#__PURE__*/_jsx(Route, {
                exact: true,
                strict: true,
                path: "/migrate/v2/:address",
                component: MigrateV2Pair
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