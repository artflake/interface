import { useActiveWeb3React } from '../../hooks/web3';
import { useBlockNumber } from '../application/hooks';
import { multicall } from './instance';
// re-export for convenience
export { NEVER_RELOAD } from '@uniswap/redux-multicall'; // re-export for convenience

const {
  useMultipleContractSingleData: _useMultipleContractSingleData,
  useSingleCallResult: _useSingleCallResult,
  useSingleContractMultipleData: _useSingleContractMultipleData,
  useSingleContractWithCallData: _useSingleContractWithCallData
} = multicall.hooks; // Create wrappers for hooks so consumers don't need to get latest block themselves

export function useMultipleContractSingleData() {
  const {
    chainId,
    latestBlock
  } = useCallContext();

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _useMultipleContractSingleData(chainId, latestBlock, ...args);
}
export function useSingleCallResult() {
  const {
    chainId,
    latestBlock
  } = useCallContext();

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _useSingleCallResult(chainId, latestBlock, ...args);
}
export function useSingleContractMultipleData() {
  const {
    chainId,
    latestBlock
  } = useCallContext();

  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _useSingleContractMultipleData(chainId, latestBlock, ...args);
}
export function useSingleContractWithCallData() {
  const {
    chainId,
    latestBlock
  } = useCallContext();

  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return _useSingleContractWithCallData(chainId, latestBlock, ...args);
}

function useCallContext() {
  const {
    chainId
  } = useActiveWeb3React();
  const latestBlock = useBlockNumber();
  return {
    chainId,
    latestBlock
  };
}