import JSBI from 'jsbi';
import { useSingleCallResult } from '../state/multicall/hooks';
import { useContract } from './useContract';
import useENSAddress from './useENSAddress';
const CHAIN_DATA_ABI = [{
  inputs: [],
  name: 'latestAnswer',
  outputs: [{
    internalType: 'int256',
    name: '',
    type: 'int256'
  }],
  stateMutability: 'view',
  type: 'function'
}];
/**
 * Returns the price of 1 gas in WEI for the currently selected network using the chainlink fast gas price oracle
 */

export default function useGasPrice() {
  var _useSingleCallResult$, _useSingleCallResult$2;

  const {
    address
  } = useENSAddress('fast-gas-gwei.data.eth');
  const contract = useContract(address !== null && address !== void 0 ? address : undefined, CHAIN_DATA_ABI, false);
  const resultStr = (_useSingleCallResult$ = useSingleCallResult(contract, 'latestAnswer').result) === null || _useSingleCallResult$ === void 0 ? void 0 : (_useSingleCallResult$2 = _useSingleCallResult$[0]) === null || _useSingleCallResult$2 === void 0 ? void 0 : _useSingleCallResult$2.toString();
  return typeof resultStr === 'string' ? JSBI.BigInt(resultStr) : undefined;
}