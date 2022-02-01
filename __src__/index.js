import '@reach/dialog/styles.css';
import 'inter-ui';
import 'polyfills';
import 'components/analytics';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Blocklist from './components/Blocklist';
import { NetworkContextName } from './constants/misc';
import { LanguageProvider } from './i18n';
import App from './pages/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './state';
import ApplicationUpdater from './state/application/updater';
import ListsUpdater from './state/lists/updater';
import LogsUpdater from './state/logs/updater';
import MulticallUpdater from './state/multicall/updater';
import TransactionUpdater from './state/transactions/updater';
import UserUpdater from './state/user/updater';
import ThemeProvider, { ThemedGlobalStyle } from './theme';
import RadialGradientByChainUpdater from './theme/RadialGradientByChainUpdater';
import getLibrary from './utils/getLibrary';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(RadialGradientByChainUpdater, {}), /*#__PURE__*/_jsx(ListsUpdater, {}), /*#__PURE__*/_jsx(UserUpdater, {}), /*#__PURE__*/_jsx(ApplicationUpdater, {}), /*#__PURE__*/_jsx(TransactionUpdater, {}), /*#__PURE__*/_jsx(MulticallUpdater, {}), /*#__PURE__*/_jsx(LogsUpdater, {})]
  });
}

ReactDOM.render( /*#__PURE__*/_jsx(StrictMode, {
  children: /*#__PURE__*/_jsx(Provider, {
    store: store,
    children: /*#__PURE__*/_jsx(HashRouter, {
      children: /*#__PURE__*/_jsx(LanguageProvider, {
        children: /*#__PURE__*/_jsx(Web3ReactProvider, {
          getLibrary: getLibrary,
          children: /*#__PURE__*/_jsx(Web3ProviderNetwork, {
            getLibrary: getLibrary,
            children: /*#__PURE__*/_jsxs(Blocklist, {
              children: [/*#__PURE__*/_jsx(Updaters, {}), /*#__PURE__*/_jsxs(ThemeProvider, {
                children: [/*#__PURE__*/_jsx(ThemedGlobalStyle, {}), /*#__PURE__*/_jsx(App, {})]
              })]
            })
          })
        })
      })
    })
  })
}), document.getElementById('root'));

if (process.env.REACT_APP_SERVICE_WORKER !== 'false') {
  serviceWorkerRegistration.register();
}