import ethereumLogoUrl from "../assets/images/ethereum-logo.png";
import arbitrumLogoUrl from "../assets/svg/arbitrum_logo.svg";
import optimismLogoUrl from "../assets/svg/optimistic_ethereum.svg";
import { ARBITRUM_LIST, OPTIMISM_LIST } from "./lists";
export let SupportedChainId;

(function (SupportedChainId) {
  SupportedChainId[SupportedChainId["MAINNET"] = 1] = "MAINNET";
  SupportedChainId[SupportedChainId["ROPSTEN"] = 3] = "ROPSTEN";
  SupportedChainId[SupportedChainId["RINKEBY"] = 4] = "RINKEBY";
  SupportedChainId[SupportedChainId["GOERLI"] = 5] = "GOERLI";
  SupportedChainId[SupportedChainId["KOVAN"] = 42] = "KOVAN";
  SupportedChainId[SupportedChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  SupportedChainId[SupportedChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
  SupportedChainId[SupportedChainId["OPTIMISM"] = 10] = "OPTIMISM";
  SupportedChainId[SupportedChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
})(SupportedChainId || (SupportedChainId = {}));

export const ALL_SUPPORTED_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY, SupportedChainId.GOERLI, SupportedChainId.KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN];
export const L1_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY, SupportedChainId.GOERLI, SupportedChainId.KOVAN];
export const L2_CHAIN_IDS = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN];
export const CHAIN_INFO = {
  [SupportedChainId.ARBITRUM_ONE]: {
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://bridge.arbitrum.io/',
    defaultListUrl: ARBITRUM_LIST,
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc']
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    blockWaitMsBeforeWarning: 600000,
    bridge: 'https://bridge.arbitrum.io/',
    defaultListUrl: ARBITRUM_LIST,
    docs: 'https://offchainlabs.com/',
    explorer: 'https://rinkeby-explorer.arbitrum.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum Rinkeby',
    logoUrl: arbitrumLogoUrl,
    nativeCurrency: {
      name: 'Rinkeby ArbETH',
      symbol: 'rinkArbETH',
      decimals: 18
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc']
  },
  [SupportedChainId.MAINNET]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    }
  },
  [SupportedChainId.RINKEBY]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    nativeCurrency: {
      name: 'Rinkeby ETH',
      symbol: 'rinkETH',
      decimals: 18
    }
  },
  [SupportedChainId.ROPSTEN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    nativeCurrency: {
      name: 'Ropsten ETH',
      symbol: 'ropETH',
      decimals: 18
    }
  },
  [SupportedChainId.KOVAN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    nativeCurrency: {
      name: 'Kovan ETH',
      symbol: 'kovETH',
      decimals: 18
    }
  },
  [SupportedChainId.GOERLI]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    nativeCurrency: {
      name: 'Görli ETH',
      symbol: 'görETH',
      decimals: 18
    }
  },
  [SupportedChainId.OPTIMISM]: {
    blockWaitMsBeforeWarning: 900000,
    bridge: 'https://gateway.optimism.io/',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'OΞ',
    logoUrl: optimismLogoUrl,
    nativeCurrency: {
      name: 'Optimistic ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.optimism.io']
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    blockWaitMsBeforeWarning: 900000,
    bridge: 'https://gateway.optimism.io/',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimistic Kovan',
    rpcUrls: ['https://kovan.optimism.io'],
    logoUrl: optimismLogoUrl,
    nativeCurrency: {
      name: 'Optimistic kovETH',
      symbol: 'kovOpETH',
      decimals: 18
    }
  }
};
export const ARBITRUM_HELP_CENTER_LINK = 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum';
export const OPTIMISM_HELP_CENTER_LINK = 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ';