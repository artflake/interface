import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useCallback, useContext } from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import { useAppDispatch } from 'state/hooks';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { injected, portis, walletlink } from '../../connectors';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import { useActiveWeb3React } from '../../hooks/web3';
import { clearAllTransactions } from '../../state/transactions/actions';
import { ExternalLink, LinkStyledButton, ThemedText } from '../../theme';
import { shortenAddress } from '../../utils';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { ButtonSecondary } from '../Button';
import StatusIcon from '../Identicon/StatusIcon';
import { AutoRow } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const HeaderRow = _styled.div.withConfig({
  displayName: "AccountDetails__HeaderRow",
  componentId: "sc-1ir7xlr-0"
})(["", ";padding:1rem 1rem;font-weight:500;color:", ";", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexRowNoWrap;
}, props => props.color === 'blue' ? _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.primary1;
} : 'inherit', _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.mediaWidth.upToMedium`
    padding: 1rem;
  `;
});

const UpperSection = _styled.div.withConfig({
  displayName: "AccountDetails__UpperSection",
  componentId: "sc-1ir7xlr-1"
})(["position:relative;h5{margin:0;margin-bottom:0.5rem;font-size:1rem;font-weight:400;}h5:last-child{margin-bottom:0px;}h4{margin-top:0;font-weight:500;}"]);

const InfoCard = _styled.div.withConfig({
  displayName: "AccountDetails__InfoCard",
  componentId: "sc-1ir7xlr-2"
})(["padding:1rem;border:1px solid ", ";border-radius:20px;position:relative;display:grid;grid-row-gap:12px;margin-bottom:20px;"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg3;
});

const AccountGroupingRow = _styled.div.withConfig({
  displayName: "AccountDetails__AccountGroupingRow",
  componentId: "sc-1ir7xlr-3"
})(["", ";justify-content:space-between;align-items:center;font-weight:400;color:", ";div{", " align-items:center;}"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.flexRowNoWrap;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.text1;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.flexRowNoWrap;
});

const AccountSection = _styled.div.withConfig({
  displayName: "AccountDetails__AccountSection",
  componentId: "sc-1ir7xlr-4"
})(["padding:0rem 1rem;", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`;
});

const YourAccount = _styled.div.withConfig({
  displayName: "AccountDetails__YourAccount",
  componentId: "sc-1ir7xlr-5"
})(["h5{margin:0 0 1rem 0;font-weight:400;}h4{margin:0;font-weight:500;}"]);

const LowerSection = _styled.div.withConfig({
  displayName: "AccountDetails__LowerSection",
  componentId: "sc-1ir7xlr-6"
})(["", " padding:1.5rem;flex-grow:1;overflow:auto;background-color:", ";border-bottom-left-radius:20px;border-bottom-right-radius:20px;h5{margin:0;font-weight:400;color:", ";}"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.flexColumnNoWrap;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.bg2;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.text3;
});

const AccountControl = _styled.div.withConfig({
  displayName: "AccountDetails__AccountControl",
  componentId: "sc-1ir7xlr-7"
})(["display:flex;justify-content:space-between;min-width:0;width:100%;font-weight:500;font-size:1.25rem;a:hover{text-decoration:underline;}p{min-width:0;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}"]);

const AddressLink = _styled(ExternalLink).withConfig({
  displayName: "AccountDetails__AddressLink",
  componentId: "sc-1ir7xlr-8"
})(["font-size:0.825rem;color:", ";margin-left:1rem;font-size:0.825rem;display:flex;:hover{color:", ";}"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.text3;
}, _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.text2;
});

const CloseIcon = _styled.div.withConfig({
  displayName: "AccountDetails__CloseIcon",
  componentId: "sc-1ir7xlr-9"
})(["position:absolute;right:1rem;top:14px;&:hover{cursor:pointer;opacity:0.6;}"]);

const CloseColor = _styled(Close).withConfig({
  displayName: "AccountDetails__CloseColor",
  componentId: "sc-1ir7xlr-10"
})(["path{stroke:", ";}"], _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.text4;
});

const WalletName = _styled.div.withConfig({
  displayName: "AccountDetails__WalletName",
  componentId: "sc-1ir7xlr-11"
})(["width:initial;font-size:0.825rem;font-weight:500;color:", ";"], _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.text3;
});

const IconWrapper = _styled.div.withConfig({
  displayName: "AccountDetails__IconWrapper",
  componentId: "sc-1ir7xlr-12"
})(["", ";align-items:center;justify-content:center;margin-right:8px;& > img,span{height:", ";width:", ";}", ";"], _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.flexColumnNoWrap;
}, _ref17 => {
  let {
    size
  } = _ref17;
  return size ? size + 'px' : '32px';
}, _ref18 => {
  let {
    size
  } = _ref18;
  return size ? size + 'px' : '32px';
}, _ref19 => {
  let {
    theme
  } = _ref19;
  return theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `;
});

function WrappedStatusIcon(_ref20) {
  let {
    connector
  } = _ref20;
  return /*#__PURE__*/_jsxs(IconWrapper, {
    size: 16,
    children: [/*#__PURE__*/_jsx(StatusIcon, {
      connector: connector
    }), connector === portis && /*#__PURE__*/_jsx(MainWalletAction, {
      onClick: () => {
        portis.portis.showPortis();
      },
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Show Portis"
      })
    })]
  });
}

const TransactionListWrapper = _styled.div.withConfig({
  displayName: "AccountDetails__TransactionListWrapper",
  componentId: "sc-1ir7xlr-13"
})(["", ";"], _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.flexColumnNoWrap;
});

const WalletAction = _styled(ButtonSecondary).withConfig({
  displayName: "AccountDetails__WalletAction",
  componentId: "sc-1ir7xlr-14"
})(["width:fit-content;font-weight:400;margin-left:8px;font-size:0.825rem;padding:4px 6px;:hover{cursor:pointer;text-decoration:underline;}"]);

const MainWalletAction = _styled(WalletAction).withConfig({
  displayName: "AccountDetails__MainWalletAction",
  componentId: "sc-1ir7xlr-15"
})(["color:", ";"], _ref22 => {
  let {
    theme
  } = _ref22;
  return theme.primary1;
});

function renderTransactions(transactions) {
  return /*#__PURE__*/_jsx(TransactionListWrapper, {
    children: transactions.map((hash, i) => {
      return /*#__PURE__*/_jsx(Transaction, {
        hash: hash
      }, i);
    })
  });
}

export default function AccountDetails(_ref23) {
  let {
    toggleWalletModal,
    pendingTransactions,
    confirmedTransactions,
    ENSName,
    openOptions
  } = _ref23;
  const {
    chainId,
    account,
    connector
  } = useActiveWeb3React();
  const theme = useContext(_ThemeContext);
  const dispatch = useAppDispatch();

  function formatConnectorName() {
    const {
      ethereum
    } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS).filter(k => SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))).map(k => SUPPORTED_WALLETS[k].name)[0];
    return /*#__PURE__*/_jsx(WalletName, {
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Connected with {name}",
        values: {
          name: name
        }
      })
    });
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({
      chainId
    }));
  }, [dispatch, chainId]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(UpperSection, {
      children: [/*#__PURE__*/_jsx(CloseIcon, {
        onClick: toggleWalletModal,
        children: /*#__PURE__*/_jsx(CloseColor, {})
      }), /*#__PURE__*/_jsx(HeaderRow, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Account"
        })
      }), /*#__PURE__*/_jsx(AccountSection, {
        children: /*#__PURE__*/_jsx(YourAccount, {
          children: /*#__PURE__*/_jsxs(InfoCard, {
            children: [/*#__PURE__*/_jsxs(AccountGroupingRow, {
              children: [formatConnectorName(), /*#__PURE__*/_jsxs("div", {
                children: [connector !== injected && connector !== walletlink && /*#__PURE__*/_jsx(WalletAction, {
                  style: {
                    fontSize: '.825rem',
                    fontWeight: 400,
                    marginRight: '8px'
                  },
                  onClick: () => {
                    ;
                    connector.close();
                  },
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Disconnect"
                  })
                }), /*#__PURE__*/_jsx(WalletAction, {
                  style: {
                    fontSize: '.825rem',
                    fontWeight: 400
                  },
                  onClick: () => {
                    openOptions();
                  },
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Change"
                  })
                })]
              })]
            }), /*#__PURE__*/_jsx(AccountGroupingRow, {
              id: "web3-account-identifier-row",
              children: /*#__PURE__*/_jsx(AccountControl, {
                children: ENSName ? /*#__PURE__*/_jsx(_Fragment, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [connector && /*#__PURE__*/_jsx(WrappedStatusIcon, {
                      connector: connector
                    }), /*#__PURE__*/_jsxs("p", {
                      children: [" ", ENSName]
                    })]
                  })
                }) : /*#__PURE__*/_jsx(_Fragment, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [connector && /*#__PURE__*/_jsx(WrappedStatusIcon, {
                      connector: connector
                    }), /*#__PURE__*/_jsxs("p", {
                      children: [" ", account && shortenAddress(account)]
                    })]
                  })
                })
              })
            }), /*#__PURE__*/_jsx(AccountGroupingRow, {
              children: ENSName ? /*#__PURE__*/_jsx(_Fragment, {
                children: /*#__PURE__*/_jsx(AccountControl, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [account && /*#__PURE__*/_jsx(Copy, {
                      toCopy: account,
                      children: /*#__PURE__*/_jsx("span", {
                        style: {
                          marginLeft: '4px'
                        },
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Copy Address"
                        })
                      })
                    }), chainId && account && /*#__PURE__*/_jsxs(AddressLink, {
                      hasENS: !!ENSName,
                      isENS: true,
                      href: getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS),
                      children: [/*#__PURE__*/_jsx(LinkIcon, {
                        size: 16
                      }), /*#__PURE__*/_jsx("span", {
                        style: {
                          marginLeft: '4px'
                        },
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "View on Explorer"
                        })
                      })]
                    })]
                  })
                })
              }) : /*#__PURE__*/_jsx(_Fragment, {
                children: /*#__PURE__*/_jsx(AccountControl, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [account && /*#__PURE__*/_jsx(Copy, {
                      toCopy: account,
                      children: /*#__PURE__*/_jsx("span", {
                        style: {
                          marginLeft: '4px'
                        },
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "Copy Address"
                        })
                      })
                    }), chainId && account && /*#__PURE__*/_jsxs(AddressLink, {
                      hasENS: !!ENSName,
                      isENS: false,
                      href: getExplorerLink(chainId, account, ExplorerDataType.ADDRESS),
                      children: [/*#__PURE__*/_jsx(LinkIcon, {
                        size: 16
                      }), /*#__PURE__*/_jsx("span", {
                        style: {
                          marginLeft: '4px'
                        },
                        children: /*#__PURE__*/_jsx(Trans, {
                          id: "View on Explorer"
                        })
                      })]
                    })]
                  })
                })
              })
            })]
          })
        })
      })]
    }), !!pendingTransactions.length || !!confirmedTransactions.length ? /*#__PURE__*/_jsxs(LowerSection, {
      children: [/*#__PURE__*/_jsxs(AutoRow, {
        mb: '1rem',
        style: {
          justifyContent: 'space-between'
        },
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Recent Transactions"
          })
        }), /*#__PURE__*/_jsx(LinkStyledButton, {
          onClick: clearAllTransactionsCallback,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "(clear all)"
          })
        })]
      }), renderTransactions(pendingTransactions), renderTransactions(confirmedTransactions)]
    }) : /*#__PURE__*/_jsx(LowerSection, {
      children: /*#__PURE__*/_jsx(ThemedText.Body, {
        color: theme.text1,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Your transactions will appear here..."
        })
      })
    })]
  });
}