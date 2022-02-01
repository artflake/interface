import CreateProposal from 'pages/CreateProposal';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import VotePage from './VotePage';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Vote() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Route, {
      exact: true,
      strict: true,
      path: "/vote/:governorIndex/:id",
      component: VotePage
    }), /*#__PURE__*/_jsx(Route, {
      exact: true,
      strict: true,
      path: "/vote/create-proposal",
      component: CreateProposal
    }), /*#__PURE__*/_jsx(Route, {
      exact: true,
      strict: true,
      path: "/vote",
      component: Landing
    })]
  });
}