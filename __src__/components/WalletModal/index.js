import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { AutoColumn } from 'components/Column';
import { PrivacyPolicy } from 'components/PrivacyPolicy';
import Row, { AutoRow, RowBetween } from 'components/Row';
import { useWalletConnectMonitoringEventCallback } from 'hooks/useMonitoringEventCallback';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Info } from 'react-feather';
import ReactGA from 'react-ga';
import MetamaskIcon from '../../assets/images/metamask.png';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { fortmatic, injected, portis } from '../../connectors';
import { OVERLAY_READY } from '../../connectors/Fortmatic';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import usePrevious from '../../hooks/usePrevious';
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks';
import { ApplicationModal } from '../../state/application/reducer';
import { ExternalLink, ThemedText } from '../../theme';
import { isMobile } from '../../utils/userAgent';
import AccountDetails from '../AccountDetails';
import Card, { LightCard } from '../Card';
import Modal from '../Modal';
import Option from './Option';
import PendingView from './PendingView';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const CloseIcon = _styled.div.withConfig({
  displayName: "WalletModal__CloseIcon",
  componentId: "sc-1hmbv05-0"
})(["position:absolute;right:1rem;top:14px;&:hover{cursor:pointer;opacity:0.6;}"]);

const CloseColor = _styled(Close).withConfig({
  displayName: "WalletModal__CloseColor",
  componentId: "sc-1hmbv05-1"
})(["path{stroke:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text4;
});

const Wrapper = _styled.div.withConfig({
  displayName: "WalletModal__Wrapper",
  componentId: "sc-1hmbv05-2"
})(["", " margin:0;padding:0;width:100%;"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.flexColumnNoWrap;
});

const HeaderRow = _styled.div.withConfig({
  displayName: "WalletModal__HeaderRow",
  componentId: "sc-1hmbv05-3"
})(["", ";padding:1rem 1rem;font-weight:500;color:", ";", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.flexRowNoWrap;
}, props => props.color === 'blue' ? _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.primary1;
} : 'inherit', _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToMedium`
    padding: 1rem;
  `;
});

const ContentWrapper = _styled.div.withConfig({
  displayName: "WalletModal__ContentWrapper",
  componentId: "sc-1hmbv05-4"
})(["background-color:", ";padding:0 1rem 1rem 1rem;border-bottom-left-radius:20px;border-bottom-right-radius:20px;", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg0;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`;
});

const UpperSection = _styled.div.withConfig({
  displayName: "WalletModal__UpperSection",
  componentId: "sc-1hmbv05-5"
})(["position:relative;h5{margin:0;margin-bottom:0.5rem;font-size:1rem;font-weight:400;}h5:last-child{margin-bottom:0px;}h4{margin-top:0;font-weight:500;}"]);

const OptionGrid = _styled.div.withConfig({
  displayName: "WalletModal__OptionGrid",
  componentId: "sc-1hmbv05-6"
})(["display:grid;grid-gap:10px;", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `;
});

const HoverText = _styled.div.withConfig({
  displayName: "WalletModal__HoverText",
  componentId: "sc-1hmbv05-7"
})(["text-decoration:none;color:", ";display:flex;align-items:center;:hover{cursor:pointer;}"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.text1;
});

const LinkCard = _styled(Card).withConfig({
  displayName: "WalletModal__LinkCard",
  componentId: "sc-1hmbv05-8"
})(["background-color:", ";color:", ";:hover{cursor:pointer;filter:brightness(0.9);}"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.primary1;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.white;
});

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
  LEGAL: 'legal'
};
export default function WalletModal(_ref12) {
  let {
    pendingTransactions,
    confirmedTransactions,
    ENSName
  } = _ref12;
  // important that these are destructed from the account-specific web3-react context
  const {
    active,
    account,
    connector,
    activate,
    error
  } = useWeb3React();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const previousWalletView = usePrevious(walletView);
  const [pendingWallet, setPendingWallet] = useState();
  const [pendingError, setPendingError] = useState();
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();
  const previousAccount = usePrevious(account);
  const logMonitoringEvent = useWalletConnectMonitoringEventCallback(); // close on connection, when logged out before

  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]); // always reset to account view

  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]); // close modal when a connection is successful

  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (walletModalOpen && (active && !activePrevious || connector && connector !== connectorPrevious && !error)) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

  const tryActivation = async connector => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return name = SUPPORTED_WALLETS[key].name;
      }

      return true;
    }); // log selected wallet

    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name
    });
    setPendingWallet(connector); // set wallet for pending view

    setWalletView(WALLET_VIEWS.PENDING); // if the connector is walletconnect and the user has already tried to connect, manually reset the connector

    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector && activate(connector, undefined, true).then(async () => {
      const walletAddress = await connector.getAccount();
      logMonitoringEvent({
        walletAddress
      });
    }).catch(error => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connector); // a little janky...can't use setError because the connector isn't set
      } else {
        setPendingError(true);
      }
    });
  }; // close wallet modal if fortmatic modal is active


  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal();
    });
  }, [toggleWalletModal]); // get wallets user can switch too, depending on device/browser

  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]; // check for mobile options

      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null;
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return /*#__PURE__*/_jsx(Option, {
            onClick: () => {
              option.connector !== connector && !option.href && tryActivation(option.connector);
            },
            id: `connect-${key}`,
            active: option.connector && option.connector === connector,
            color: option.color,
            link: option.href,
            header: option.name,
            subheader: null,
            icon: option.iconURL
          }, key);
        }

        return null;
      } // overwrite injected when needed


      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return /*#__PURE__*/_jsx(Option, {
              id: `connect-${key}`,
              color: '#E8831D',
              header: /*#__PURE__*/_jsx(Trans, {
                id: "Install Metamask"
              }),
              subheader: null,
              link: 'https://metamask.io/',
              icon: MetamaskIcon
            }, key);
          } else {
            return null; //dont want to return install twice
          }
        } // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        } // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      } // return rest of options


      return !isMobile && !option.mobileOnly && /*#__PURE__*/_jsx(Option, {
        id: `connect-${key}`,
        onClick: () => {
          option.connector === connector ? setWalletView(WALLET_VIEWS.ACCOUNT) : !option.href && tryActivation(option.connector);
        },
        active: option.connector === connector,
        color: option.color,
        link: option.href,
        header: option.name,
        subheader: null //use option.descriptio to bring back multi-line
        ,
        icon: option.iconURL
      }, key);
    });
  }

  function getModalContent() {
    if (error) {
      return /*#__PURE__*/_jsxs(UpperSection, {
        children: [/*#__PURE__*/_jsx(CloseIcon, {
          onClick: toggleWalletModal,
          children: /*#__PURE__*/_jsx(CloseColor, {})
        }), /*#__PURE__*/_jsx(HeaderRow, {
          children: error instanceof UnsupportedChainIdError ? /*#__PURE__*/_jsx(Trans, {
            id: "Wrong Network"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Error connecting"
          })
        }), /*#__PURE__*/_jsx(ContentWrapper, {
          children: error instanceof UnsupportedChainIdError ? /*#__PURE__*/_jsx("h5", {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Please connect to the appropriate Ethereum network."
            })
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Error connecting. Try refreshing the page."
          })
        })]
      });
    }

    if (walletView === WALLET_VIEWS.LEGAL) {
      return /*#__PURE__*/_jsxs(UpperSection, {
        children: [/*#__PURE__*/_jsxs(HeaderRow, {
          children: [/*#__PURE__*/_jsx(HoverText, {
            onClick: () => {
              var _ref13;

              setWalletView((_ref13 = previousWalletView === WALLET_VIEWS.LEGAL ? WALLET_VIEWS.ACCOUNT : previousWalletView) !== null && _ref13 !== void 0 ? _ref13 : WALLET_VIEWS.ACCOUNT);
            },
            children: /*#__PURE__*/_jsx(ArrowLeft, {})
          }), /*#__PURE__*/_jsx(Row, {
            justify: "center",
            children: /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Legal & Privacy"
              })
            })
          })]
        }), /*#__PURE__*/_jsx(PrivacyPolicy, {})]
      });
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return /*#__PURE__*/_jsx(AccountDetails, {
        toggleWalletModal: toggleWalletModal,
        pendingTransactions: pendingTransactions,
        confirmedTransactions: confirmedTransactions,
        ENSName: ENSName,
        openOptions: () => setWalletView(WALLET_VIEWS.OPTIONS)
      });
    }

    return /*#__PURE__*/_jsxs(UpperSection, {
      children: [/*#__PURE__*/_jsx(CloseIcon, {
        onClick: toggleWalletModal,
        children: /*#__PURE__*/_jsx(CloseColor, {})
      }), walletView !== WALLET_VIEWS.ACCOUNT ? /*#__PURE__*/_jsx(HeaderRow, {
        color: "blue",
        children: /*#__PURE__*/_jsx(HoverText, {
          onClick: () => {
            setPendingError(false);
            setWalletView(WALLET_VIEWS.ACCOUNT);
          },
          children: /*#__PURE__*/_jsx(ArrowLeft, {})
        })
      }) : /*#__PURE__*/_jsx(HeaderRow, {
        children: /*#__PURE__*/_jsx(HoverText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Connect a wallet"
          })
        })
      }), /*#__PURE__*/_jsx(ContentWrapper, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "16px",
          children: [/*#__PURE__*/_jsx(LightCard, {
            children: /*#__PURE__*/_jsx(AutoRow, {
              style: {
                flexWrap: 'nowrap'
              },
              children: /*#__PURE__*/_jsx(ThemedText.Black, {
                fontSize: 14,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "By connecting a wallet, you agree to Uniswap Labs\u2019 <0>Terms of Service</0> and acknowledge that you have read and understand the Uniswap <1>Protocol Disclaimer</1>.",
                  components: {
                    0: /*#__PURE__*/_jsx(ExternalLink, {
                      href: "https://uniswap.org/terms-of-service/"
                    }),
                    1: /*#__PURE__*/_jsx(ExternalLink, {
                      href: "https://uniswap.org/disclaimer/"
                    })
                  }
                })
              })
            })
          }), /*#__PURE__*/_jsx(LinkCard, {
            padding: ".5rem",
            $borderRadius: ".75rem",
            onClick: () => setWalletView(WALLET_VIEWS.LEGAL),
            children: /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsxs(AutoRow, {
                gap: "4px",
                children: [/*#__PURE__*/_jsx(Info, {
                  size: 20
                }), /*#__PURE__*/_jsx(ThemedText.White, {
                  fontSize: 14,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "How this app uses APIs"
                  })
                })]
              }), /*#__PURE__*/_jsx(ArrowRight, {
                size: 16
              })]
            })
          }), walletView === WALLET_VIEWS.PENDING ? /*#__PURE__*/_jsx(PendingView, {
            connector: pendingWallet,
            error: pendingError,
            setPendingError: setPendingError,
            tryActivation: tryActivation
          }) : /*#__PURE__*/_jsx(OptionGrid, {
            children: getOptions()
          })]
        })
      })]
    });
  }

  return /*#__PURE__*/_jsx(Modal, {
    isOpen: walletModalOpen,
    onDismiss: toggleWalletModal,
    minHeight: false,
    maxHeight: 90,
    children: /*#__PURE__*/_jsx(Wrapper, {
      children: getModalContent()
    })
  });
}