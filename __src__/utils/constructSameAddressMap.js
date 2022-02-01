import { L1_CHAIN_IDS } from "../constants/chains";
export function constructSameAddressMap(address) {
  let additionalNetworks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return L1_CHAIN_IDS.concat(additionalNetworks).reduce((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}