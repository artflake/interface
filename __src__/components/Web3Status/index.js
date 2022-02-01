import { css as _css } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { darken } from 'polished';
import { useMemo } from 'react';
import { Activity } from 'react-feather';
import { NetworkContextName } from '../../constants/misc';
import useENSName from '../../hooks/useENSName';
import { useHasSocks } from '../../hooks/useSocksBalance';
import { useWalletModalToggle } from '../../state/application/hooks';
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks';
import { shortenAddress } from '../../utils';
import { ButtonSecondary } from '../Button';
import StatusIcon from '../Identicon/StatusIcon';
import Loader from '../Loader';
import { RowBetween } from '../Row';
import WalletModal from '../WalletModal';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const IconWrapper = _styled.div.withConfig({
  displayName: "Web3Status__IconWrapper",
  componentId: "sc-m6ivbz-0"
})(["", ";align-items:center;justify-content:center;& > *{height:", ";width:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexColumnNoWrap;
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size ? size + 'px' : '32px';
}, _ref3 => {
  let {
    size
  } = _ref3;
  return size ? size + 'px' : '32px';
});

const Web3StatusGeneric = _styled(ButtonSecondary).withConfig({
  displayName: "Web3Status__Web3StatusGeneric",
  componentId: "sc-m6ivbz-1"
})(["", " width:100%;align-items:center;padding:0.5rem;border-radius:12px;cursor:pointer;user-select:none;:focus{outline:none;}"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.flexRowNoWrap;
});

const Web3StatusError = _styled(Web3StatusGeneric).withConfig({
  displayName: "Web3Status__Web3StatusError",
  componentId: "sc-m6ivbz-2"
})(["background-color:", ";border:1px solid ", ";color:", ";font-weight:500;:hover,:focus{background-color:", ";}"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.red1;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.red1;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.white;
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return darken(0.1, theme.red1);
});

const Web3StatusConnect = _styled(Web3StatusGeneric).withConfig({
  displayName: "Web3Status__Web3StatusConnect",
  componentId: "sc-m6ivbz-3"
})(["background-color:", ";border:none;color:", ";font-weight:500;:hover,:focus{border:1px solid ", ";color:", ";}", ""], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.primary4;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.primaryText1;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return darken(0.05, theme.primary4);
}, _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.primaryText1;
}, _ref13 => {
  let {
    faded
  } = _ref13;
  return faded && _css`
      background-color: ${_ref14 => {
    let {
      theme
    } = _ref14;
    return theme.primary5;
  }};
      border: 1px solid ${_ref15 => {
    let {
      theme
    } = _ref15;
    return theme.primary5;
  }};
      color: ${_ref16 => {
    let {
      theme
    } = _ref16;
    return theme.primaryText1;
  }};

      :hover,
      :focus {
        border: 1px solid ${_ref17 => {
    let {
      theme
    } = _ref17;
    return darken(0.05, theme.primary4);
  }};
        color: ${_ref18 => {
    let {
      theme
    } = _ref18;
    return darken(0.05, theme.primaryText1);
  }};
      }
    `;
});

const Web3StatusConnected = _styled(Web3StatusGeneric).withConfig({
  displayName: "Web3Status__Web3StatusConnected",
  componentId: "sc-m6ivbz-4"
})(["background-color:", ";border:1px solid ", ";color:", ";font-weight:500;:hover,:focus{border:1px solid ", ";:focus{border:1px solid ", ";}}"], _ref19 => {
  let {
    pending,
    theme
  } = _ref19;
  return pending ? theme.primary1 : theme.bg0;
}, _ref20 => {
  let {
    pending,
    theme
  } = _ref20;
  return pending ? theme.primary1 : theme.bg1;
}, _ref21 => {
  let {
    pending,
    theme
  } = _ref21;
  return pending ? theme.white : theme.text1;
}, _ref22 => {
  let {
    theme
  } = _ref22;
  return darken(0.05, theme.bg3);
}, _ref23 => {
  let {
    pending,
    theme
  } = _ref23;
  return pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg2);
});

const Text = _styled.p.withConfig({
  displayName: "Web3Status__Text",
  componentId: "sc-m6ivbz-5"
})(["flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0 0.5rem 0 0.25rem;font-size:1rem;width:fit-content;font-weight:500;"]);

const NetworkIcon = _styled(Activity).withConfig({
  displayName: "Web3Status__NetworkIcon",
  componentId: "sc-m6ivbz-6"
})(["margin-left:0.25rem;margin-right:0.5rem;width:16px;height:16px;"]); // we want the latest one to come first, so return negative if a is after b


function newTransactionsFirst(a, b) {
  return b.addedTime - a.addedTime;
}

function Sock() {
  return /*#__PURE__*/_jsx("span", {
    role: "img",
    "aria-label":
    /*i18n*/
    i18n._("has socks emoji"),
    style: {
      marginTop: -4,
      marginBottom: -4
    },
    children: "\uD83E\uDDE6"
  });
}

function WrappedStatusIcon(_ref24) {
  let {
    connector
  } = _ref24;
  return /*#__PURE__*/_jsx(IconWrapper, {
    size: 16,
    children: /*#__PURE__*/_jsx(StatusIcon, {
      connector: connector
    })
  });
}

function Web3StatusInner() {
  const {
    account,
    connector,
    error
  } = useWeb3React();
  const {
    ENSName
  } = useENSName(account !== null && account !== void 0 ? account : undefined);
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  const hasPendingTransactions = !!pending.length;
  const hasSocks = useHasSocks();
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return /*#__PURE__*/_jsxs(Web3StatusConnected, {
      id: "web3-status-connected",
      onClick: toggleWalletModal,
      pending: hasPendingTransactions,
      children: [hasPendingTransactions ? /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Text, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0} Pending",
            values: {
              0: pending === null || pending === void 0 ? void 0 : pending.length
            }
          })
        }), ' ', /*#__PURE__*/_jsx(Loader, {
          stroke: "white"
        })]
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [hasSocks ? /*#__PURE__*/_jsx(Sock, {}) : null, /*#__PURE__*/_jsx(Text, {
          children: ENSName || shortenAddress(account)
        })]
      }), !hasPendingTransactions && connector && /*#__PURE__*/_jsx(WrappedStatusIcon, {
        connector: connector
      })]
    });
  } else if (error) {
    return /*#__PURE__*/_jsxs(Web3StatusError, {
      onClick: toggleWalletModal,
      children: [/*#__PURE__*/_jsx(NetworkIcon, {}), /*#__PURE__*/_jsx(Text, {
        children: error instanceof UnsupportedChainIdError ? /*#__PURE__*/_jsx(Trans, {
          id: "Wrong Network"
        }) : /*#__PURE__*/_jsx(Trans, {
          id: "Error"
        })
      })]
    });
  } else {
    return /*#__PURE__*/_jsx(Web3StatusConnect, {
      id: "connect-wallet",
      onClick: toggleWalletModal,
      faded: !account,
      children: /*#__PURE__*/_jsx(Text, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Connect Wallet"
        })
      })
    });
  }
}

export default function Web3Status() {
  const {
    active,
    account
  } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  const {
    ENSName
  } = useENSName(account !== null && account !== void 0 ? account : undefined);
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Web3StatusInner, {}), (contextNetwork.active || active) && /*#__PURE__*/_jsx(WalletModal, {
      ENSName: ENSName !== null && ENSName !== void 0 ? ENSName : undefined,
      pendingTransactions: pending,
      confirmedTransactions: confirmed
    })]
  });
}