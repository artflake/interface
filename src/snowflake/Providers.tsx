import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Blocklist from '../components/Blocklist'
import { NetworkContextName } from '../constants/misc'
import { LanguageProvider } from '../i18n'
import store from '../state'
import ThemeProvider, { ThemedGlobalStyle } from '../theme'
import getLibrary from '../utils/getLibrary'
import { Updaters } from './Updaters'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

export const Providers: FunctionComponent = (props: any) => (
  <Provider store={store}>
    <HashRouter>
      <LanguageProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Blocklist>
              <Updaters />
              <ThemeProvider>
                <ThemedGlobalStyle />
                {props.children}
              </ThemeProvider>
            </Blocklist>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </LanguageProvider>
    </HashRouter>
  </Provider>
)
