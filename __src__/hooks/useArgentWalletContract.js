import ArgentWalletContractABI from "../abis/argent-wallet-contract.json";
import { useContract } from "./useContract";
import useIsArgentWallet from "./useIsArgentWallet";
import { useActiveWeb3React } from "./web3";
export function useArgentWalletContract() {
  const {
    account
  } = useActiveWeb3React();
  const isArgentWallet = useIsArgentWallet();
  return useContract(isArgentWallet ? account !== null && account !== void 0 ? account : undefined : undefined, ArgentWalletContractABI, true);
}