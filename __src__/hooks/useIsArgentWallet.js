import { useMemo } from 'react';
import { NEVER_RELOAD, useSingleCallResult } from "../state/multicall/hooks";
import { useArgentWalletDetectorContract } from "./useContract";
import { useActiveWeb3React } from "./web3";
export default function useIsArgentWallet() {
  var _call$result$, _call$result;

  const {
    account
  } = useActiveWeb3React();
  const argentWalletDetector = useArgentWalletDetectorContract();
  const inputs = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]);
  const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD);
  return (_call$result$ = call === null || call === void 0 ? void 0 : (_call$result = call.result) === null || _call$result === void 0 ? void 0 : _call$result[0]) !== null && _call$result$ !== void 0 ? _call$result$ : false;
}