import { Token } from '@uniswap/sdk-core';
import { SOCKS_CONTROLLER_ADDRESSES } from 'constants/addresses';
import { SupportedChainId } from 'constants/chains';
import { useMemo } from 'react';
import { useTokenBalance } from 'state/wallet/hooks';
import { useActiveWeb3React } from './web3'; // technically a 721, not an ERC20, but suffices for our purposes

const SOCKS = new Token(SupportedChainId.MAINNET, SOCKS_CONTROLLER_ADDRESSES[SupportedChainId.MAINNET], 0);
export function useHasSocks() {
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const balance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId === SupportedChainId.MAINNET ? SOCKS : undefined);
  return useMemo(() => Boolean(balance === null || balance === void 0 ? void 0 : balance.greaterThan(0)), [balance]);
}