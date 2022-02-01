import { useSingleCallResult } from '../state/multicall/hooks';
import { useMulticall2Contract } from './useContract'; // gets the current timestamp from the blockchain

export default function useCurrentBlockTimestamp() {
  var _useSingleCallResult, _useSingleCallResult$;

  const multicall = useMulticall2Contract();
  return (_useSingleCallResult = useSingleCallResult(multicall, 'getCurrentBlockTimestamp')) === null || _useSingleCallResult === void 0 ? void 0 : (_useSingleCallResult$ = _useSingleCallResult.result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
}