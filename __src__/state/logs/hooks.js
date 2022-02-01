import { useEffect, useMemo } from 'react';
import { useActiveWeb3React } from "../../hooks/web3";
import { useBlockNumber } from "../application/hooks";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addListener, removeListener } from "./slice";
import { filterToKey } from "./utils";
export let LogsState;

(function (LogsState) {
  LogsState[LogsState["INVALID"] = 0] = "INVALID";
  LogsState[LogsState["LOADING"] = 1] = "LOADING";
  LogsState[LogsState["SYNCING"] = 2] = "SYNCING";
  LogsState[LogsState["ERROR"] = 3] = "ERROR";
  LogsState[LogsState["SYNCED"] = 4] = "SYNCED";
})(LogsState || (LogsState = {}));

/**
 * Returns the logs for the given filter as of the latest block, re-fetching from the library every block.
 * @param filter The logs filter, without `blockHash`, `fromBlock` or `toBlock` defined.
 * The filter parameter should _always_ be memoized, or else will trigger constant refetching
 */
export function useLogs(filter) {
  const {
    chainId
  } = useActiveWeb3React();
  const blockNumber = useBlockNumber();
  const logs = useAppSelector(state => state.logs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!filter || !chainId) return;
    dispatch(addListener({
      chainId,
      filter
    }));
    return () => {
      dispatch(removeListener({
        chainId,
        filter
      }));
    };
  }, [chainId, dispatch, filter]);
  const filterKey = useMemo(() => filter ? filterToKey(filter) : undefined, [filter]);
  return useMemo(() => {
    var _logs$chainId;

    if (!chainId || !filterKey || !blockNumber) return {
      logs: undefined,
      state: LogsState.INVALID
    };
    const state = (_logs$chainId = logs[chainId]) === null || _logs$chainId === void 0 ? void 0 : _logs$chainId[filterKey];
    const result = state === null || state === void 0 ? void 0 : state.results;

    if (!result) {
      return {
        state: LogsState.LOADING,
        logs: undefined
      };
    }

    if (result.error) {
      return {
        state: LogsState.ERROR,
        logs: undefined
      };
    }

    return {
      state: result.blockNumber >= blockNumber ? LogsState.SYNCED : LogsState.SYNCING,
      logs: result.logs
    };
  }, [blockNumber, chainId, filterKey, logs]);
}