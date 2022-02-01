import useDebounce from "../../hooks/useDebounce";
import useIsWindowVisible from "../../hooks/useIsWindowVisible";
import { useActiveWeb3React } from "../../hooks/web3";
import { useCallback, useEffect, useState } from 'react';
import { api, CHAIN_TAG } from "../data/enhanced";
import { useAppDispatch, useAppSelector } from "../hooks";
import { supportedChainId } from "../../utils/supportedChainId";
import { switchToNetwork } from "../../utils/switchToNetwork";
import { setImplements3085, updateBlockNumber, updateChainId } from "./reducer";

function useQueryCacheInvalidator() {
  const dispatch = useAppDispatch(); // subscribe to `chainId` changes in the redux store rather than Web3
  // this will ensure that when `invalidateTags` is called, the latest
  // `chainId` is available in redux to build the subgraph url

  const chainId = useAppSelector(state => state.application.chainId);
  useEffect(() => {
    dispatch(api.util.invalidateTags([CHAIN_TAG]));
  }, [chainId, dispatch]);
}

export default function Updater() {
  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();
  const [state, setState] = useState({
    chainId,
    blockNumber: null
  });
  useQueryCacheInvalidator();
  const blockNumberCallback = useCallback(blockNumber => {
    setState(state => {
      if (chainId === state.chainId) {
        if (typeof state.blockNumber !== 'number') return {
          chainId,
          blockNumber
        };
        return {
          chainId,
          blockNumber: Math.max(blockNumber, state.blockNumber)
        };
      }

      return state;
    });
  }, [chainId, setState]); // attach/detach listeners

  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined;
    setState({
      chainId,
      blockNumber: null
    });
    library.getBlockNumber().then(blockNumberCallback).catch(error => console.error(`Failed to get block number for chainId: ${chainId}`, error));
    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);
  const debouncedState = useDebounce(state, 100);
  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return;
    dispatch(updateBlockNumber({
      chainId: debouncedState.chainId,
      blockNumber: debouncedState.blockNumber
    }));
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);
  useEffect(() => {
    var _supportedChainId;

    dispatch(updateChainId({
      chainId: debouncedState.chainId ? (_supportedChainId = supportedChainId(debouncedState.chainId)) !== null && _supportedChainId !== void 0 ? _supportedChainId : null : null
    }));
  }, [dispatch, debouncedState.chainId]);
  const implements3085 = useAppSelector(state => state.application.implements3085);
  useEffect(() => {
    var _library$provider;

    if (!(library !== null && library !== void 0 && (_library$provider = library.provider) !== null && _library$provider !== void 0 && _library$provider.request)) {
      dispatch(setImplements3085({
        implements3085: false
      }));
    } else if (account && !implements3085) {
      switchToNetwork({
        library
      }).then(x => x !== null && x !== void 0 ? x : dispatch(setImplements3085({
        implements3085: true
      }))).catch(() => dispatch(setImplements3085({
        implements3085: false
      })));
    } else if (!account && implements3085) {
      dispatch(setImplements3085({
        implements3085: false
      }));
    }
  }, [account, dispatch, implements3085, library]);
  return null;
}