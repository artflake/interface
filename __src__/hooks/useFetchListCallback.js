import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useAppDispatch } from "../state/hooks";
import { getNetworkLibrary } from "../connectors";
import { fetchTokenList } from "../state/lists/actions";
import getTokenList from "../utils/getTokenList";
import resolveENSContentHash from "../utils/resolveENSContentHash";
import { useActiveWeb3React } from "./web3";
export function useFetchListCallback() {
  const {
    chainId,
    library
  } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const ensResolver = useCallback(async ensName => {
    if (!library || chainId !== 1) {
      const networkLibrary = getNetworkLibrary();
      const network = await networkLibrary.getNetwork();

      if (networkLibrary && network.chainId === 1) {
        return resolveENSContentHash(ensName, networkLibrary);
      }

      throw new Error('Could not construct mainnet ENS resolver');
    }

    return resolveENSContentHash(ensName, library);
  }, [chainId, library]); // note: prevent dispatch if using for list search or unsupported list

  return useCallback(async function (listUrl) {
    let sendDispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const requestId = nanoid();
    sendDispatch && dispatch(fetchTokenList.pending({
      requestId,
      url: listUrl
    }));
    return getTokenList(listUrl, ensResolver).then(tokenList => {
      sendDispatch && dispatch(fetchTokenList.fulfilled({
        url: listUrl,
        tokenList,
        requestId
      }));
      return tokenList;
    }).catch(error => {
      console.debug(`Failed to get list at url ${listUrl}`, error);
      sendDispatch && dispatch(fetchTokenList.rejected({
        url: listUrl,
        requestId,
        errorMessage: error.message
      }));
      throw error;
    });
  }, [dispatch, ensResolver]);
}