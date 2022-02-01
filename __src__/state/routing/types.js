export let V3TradeState;

(function (V3TradeState) {
  V3TradeState[V3TradeState["LOADING"] = 0] = "LOADING";
  V3TradeState[V3TradeState["INVALID"] = 1] = "INVALID";
  V3TradeState[V3TradeState["NO_ROUTE_FOUND"] = 2] = "NO_ROUTE_FOUND";
  V3TradeState[V3TradeState["VALID"] = 3] = "VALID";
  V3TradeState[V3TradeState["SYNCING"] = 4] = "SYNCING";
})(V3TradeState || (V3TradeState = {}));