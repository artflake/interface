import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Blocklist from '../components/Blocklist';
import { NetworkContextName } from '../constants/misc';
import { LanguageProvider } from '../i18n';
import store from '../state';
import ThemeProvider, { ThemedGlobalStyle } from '../theme';
import getLibrary from '../utils/getLibrary';
import { Updaters } from './Updaters';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
export const Providers = props => /*#__PURE__*/_jsx(Provider, {
  store: store,
  children: /*#__PURE__*/_jsx(HashRouter, {
    children: /*#__PURE__*/_jsx(LanguageProvider, {
      children: /*#__PURE__*/_jsx(Web3ReactProvider, {
        getLibrary: getLibrary,
        children: /*#__PURE__*/_jsx(Web3ProviderNetwork, {
          getLibrary: getLibrary,
          children: /*#__PURE__*/_jsxs(Blocklist, {
            children: [/*#__PURE__*/_jsx(Updaters, {}), /*#__PURE__*/_jsxs(ThemeProvider, {
              children: [/*#__PURE__*/_jsx(ThemedGlobalStyle, {}), props.children]
            })]
          })
        })
      })
    })
  })
});