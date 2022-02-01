import ApplicationUpdater from "../state/application/updater";
import ListsUpdater from "../state/lists/updater";
import LogsUpdater from "../state/logs/updater";
import MulticallUpdater from "../state/multicall/updater";
import TransactionUpdater from "../state/transactions/updater";
import UserUpdater from "../state/user/updater";
import RadialGradientByChainUpdater from "../theme/RadialGradientByChainUpdater";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Updaters() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RadialGradientByChainUpdater, {}), /*#__PURE__*/_jsx(ListsUpdater, {}), /*#__PURE__*/_jsx(UserUpdater, {}), /*#__PURE__*/_jsx(ApplicationUpdater, {}), /*#__PURE__*/_jsx(TransactionUpdater, {}), /*#__PURE__*/_jsx(MulticallUpdater, {}), /*#__PURE__*/_jsx(LogsUpdater, {})]
  });
}