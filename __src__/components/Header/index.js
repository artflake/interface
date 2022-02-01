import _styled from "styled-components";
import { Trans } from "@lingui/react";
import useScrollPosition from '@react-hook/window-scroll';
import { CHAIN_INFO, SupportedChainId } from "../../constants/chains";
import useTheme from "../../hooks/useTheme";
import { darken } from 'polished';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from 'rebass';
import { useShowClaimPopup, useToggleSelfClaimModal } from "../../state/application/hooks";
import { useUserHasAvailableClaim } from "../../state/claim/hooks";
import { useUserHasSubmittedClaim } from "../../state/transactions/hooks";
import { useDarkModeManager } from "../../state/user/hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { useActiveWeb3React } from "../../hooks/web3";
import { ExternalLink, ThemedText } from "../../theme";
import ClaimModal from "../claim/ClaimModal";
import { CardNoise } from "../earn/styled";
import Menu from "../Menu";
import Modal from "../Modal";
import Row from "../Row";
import { Dots } from "../swap/styleds";
import Web3Status from "../Web3Status";
import NetworkSelector from "./NetworkSelector";
import UniBalanceContent from "./UniBalanceContent";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const HeaderFrame = _styled.div.withConfig({
  displayName: "Header__HeaderFrame",
  componentId: "sc-pradxg-0"
})(["display:grid;grid-template-columns:120px 1fr 120px;align-items:center;justify-content:space-between;align-items:center;flex-direction:row;width:100%;top:0;position:relative;padding:1rem;z-index:21;position:relative;background-image:", ";background-position:", ";background-size:100% 200%;box-shadow:0px 0px 0px 1px ", ";transition:background-position 0.1s,box-shadow 0.1s;background-blend-mode:hard-light;", ";", ";", ";"], _ref => {
  let {
    theme
  } = _ref;
  return `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`;
}, _ref2 => {
  let {
    showBackground
  } = _ref2;
  return showBackground ? '0 -100%' : '0 0';
}, _ref3 => {
  let {
    theme,
    showBackground
  } = _ref3;
  return showBackground ? theme.bg2 : 'transparent;';
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToLarge`
    grid-template-columns: 48px 1fr 1fr;
  `;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `;
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 36px 1fr;
  `;
});

const HeaderControls = _styled.div.withConfig({
  displayName: "Header__HeaderControls",
  componentId: "sc-pradxg-1"
})(["display:flex;flex-direction:row;align-items:center;justify-self:flex-end;"]);

const HeaderElement = _styled.div.withConfig({
  displayName: "Header__HeaderElement",
  componentId: "sc-pradxg-2"
})(["display:flex;align-items:center;&:not(:first-child){margin-left:0.5em;}& > *:not(:first-child){margin-left:8px;}", ";"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.mediaWidth.upToMedium`
    align-items: center;
  `;
});

const HeaderLinks = _styled(Row).withConfig({
  displayName: "Header__HeaderLinks",
  componentId: "sc-pradxg-3"
})(["justify-self:center;background-color:", ";width:fit-content;padding:4px;border-radius:16px;display:grid;grid-auto-flow:column;grid-gap:10px;overflow:auto;align-items:center;", ";", ";", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg0;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.mediaWidth.upToLarge`
    justify-self: start;  
    `;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.mediaWidth.upToMedium`
    justify-self: center;
  `;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0; right: 50%;
    transform: translate(50%,-50%);
    margin: 0 auto;
    background-color: ${_ref12 => {
    let {
      theme
    } = _ref12;
    return theme.bg0;
  }};
    border: 1px solid ${_ref13 => {
    let {
      theme
    } = _ref13;
    return theme.bg2;
  }};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `;
});

const AccountElement = _styled.div.withConfig({
  displayName: "Header__AccountElement",
  componentId: "sc-pradxg-4"
})(["display:flex;flex-direction:row;align-items:center;background-color:", ";border-radius:12px;white-space:nowrap;width:100%;:focus{border:1px solid blue;}"], _ref14 => {
  let {
    theme,
    active
  } = _ref14;
  return !active ? theme.bg1 : theme.bg1;
});

const UNIAmount = _styled(AccountElement).withConfig({
  displayName: "Header__UNIAmount",
  componentId: "sc-pradxg-5"
})(["color:white;padding:4px 8px;height:36px;font-weight:500;background-color:", ";background:radial-gradient(174.47% 188.91% at 1.84% 0%,#ff007a 0%,#2172e5 100%),#edeef2;"], _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.bg3;
});

const UNIWrapper = _styled.span.withConfig({
  displayName: "Header__UNIWrapper",
  componentId: "sc-pradxg-6"
})(["width:fit-content;position:relative;cursor:pointer;:hover{opacity:0.8;}:active{opacity:0.9;}"]);

const BalanceText = _styled(Text).withConfig({
  displayName: "Header__BalanceText",
  componentId: "sc-pradxg-7"
})(["", ";"], _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.mediaWidth.upToExtraSmall`
    display: none;
  `;
});

const Title = _styled.a.withConfig({
  displayName: "Header__Title",
  componentId: "sc-pradxg-8"
})(["display:flex;align-items:center;pointer-events:auto;justify-self:flex-start;margin-right:12px;", ";:hover{cursor:pointer;}"], _ref17 => {
  let {
    theme
  } = _ref17;
  return theme.mediaWidth.upToSmall`
    justify-self: center;
  `;
});

const UniIcon = _styled.div.withConfig({
  displayName: "Header__UniIcon",
  componentId: "sc-pradxg-9"
})(["transition:transform 0.3s ease;:hover{transform:rotate(-5deg);}"]);

const activeClassName = 'ACTIVE';

const StyledNavLink = _styled(NavLink).attrs({
  activeClassName
}).withConfig({
  displayName: "Header__StyledNavLink",
  componentId: "sc-pradxg-10"
})(["", " align-items:left;border-radius:3rem;outline:none;cursor:pointer;text-decoration:none;color:", ";font-size:1rem;font-weight:500;padding:8px 12px;word-break:break-word;overflow:hidden;white-space:nowrap;&.", "{border-radius:12px;font-weight:600;justify-content:center;color:", ";background-color:", ";}:hover,:focus{color:", ";}"], _ref18 => {
  let {
    theme
  } = _ref18;
  return theme.flexRowNoWrap;
}, _ref19 => {
  let {
    theme
  } = _ref19;
  return theme.text2;
}, activeClassName, _ref20 => {
  let {
    theme
  } = _ref20;
  return theme.text1;
}, _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.bg2;
}, _ref22 => {
  let {
    theme
  } = _ref22;
  return darken(0.1, theme.text1);
});

const StyledExternalLink = _styled(ExternalLink).attrs({
  activeClassName
}).withConfig({
  displayName: "Header__StyledExternalLink",
  componentId: "sc-pradxg-11"
})(["", " align-items:left;border-radius:3rem;outline:none;cursor:pointer;text-decoration:none;color:", ";font-size:1rem;width:fit-content;margin:0 12px;font-weight:500;&.", "{border-radius:12px;font-weight:600;color:", ";}:hover,:focus{color:", ";text-decoration:none;}"], _ref23 => {
  let {
    theme
  } = _ref23;
  return theme.flexRowNoWrap;
}, _ref24 => {
  let {
    theme
  } = _ref24;
  return theme.text2;
}, activeClassName, _ref25 => {
  let {
    theme
  } = _ref25;
  return theme.text1;
}, _ref26 => {
  let {
    theme
  } = _ref26;
  return darken(0.1, theme.text1);
});

export default function Header() {
  var _useETHBalances;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const userEthBalance = (_useETHBalances = useETHBalances(account ? [account] : [])) === null || _useETHBalances === void 0 ? void 0 : _useETHBalances[account !== null && account !== void 0 ? account : ''];
  const [darkMode] = useDarkModeManager();
  const {
    white,
    black
  } = useTheme();
  const toggleClaimModal = useToggleSelfClaimModal();
  const availableClaim = useUserHasAvailableClaim(account);
  const {
    claimTxn
  } = useUserHasSubmittedClaim(account !== null && account !== void 0 ? account : undefined);
  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false);
  const showClaimPopup = useShowClaimPopup();
  const scrollY = useScrollPosition();
  const {
    infoLink
  } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET];
  return /*#__PURE__*/_jsxs(HeaderFrame, {
    showBackground: scrollY > 45,
    children: [/*#__PURE__*/_jsx(ClaimModal, {}), /*#__PURE__*/_jsx(Modal, {
      isOpen: showUniBalanceModal,
      onDismiss: () => setShowUniBalanceModal(false),
      children: /*#__PURE__*/_jsx(UniBalanceContent, {
        setShowUniBalanceModal: setShowUniBalanceModal
      })
    }), /*#__PURE__*/_jsx(Title, {
      href: ".",
      children: /*#__PURE__*/_jsx(UniIcon, {
        children: /*#__PURE__*/_jsx(Logo, {
          fill: darkMode ? white : black,
          width: "24px",
          height: "100%",
          title: "logo"
        })
      })
    }), /*#__PURE__*/_jsxs(HeaderLinks, {
      children: [/*#__PURE__*/_jsx(StyledNavLink, {
        id: `swap-nav-link`,
        to: '/swap',
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Swap"
        })
      }), /*#__PURE__*/_jsx(StyledNavLink, {
        id: `pool-nav-link`,
        to: '/pool',
        isActive: (match, _ref27) => {
          let {
            pathname
          } = _ref27;
          return Boolean(match) || pathname.startsWith('/add') || pathname.startsWith('/remove') || pathname.startsWith('/increase') || pathname.startsWith('/find');
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Pool"
        })
      }), (!chainId || chainId === SupportedChainId.MAINNET) && /*#__PURE__*/_jsx(StyledNavLink, {
        id: `vote-nav-link`,
        to: '/vote',
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Vote"
        })
      }), /*#__PURE__*/_jsxs(StyledExternalLink, {
        id: `charts-nav-link`,
        href: infoLink,
        children: [/*#__PURE__*/_jsx(Trans, {
          id: "Charts"
        }), /*#__PURE__*/_jsx("sup", {
          children: "\u2197"
        })]
      })]
    }), /*#__PURE__*/_jsxs(HeaderControls, {
      children: [/*#__PURE__*/_jsx(HeaderElement, {
        children: /*#__PURE__*/_jsx(NetworkSelector, {})
      }), /*#__PURE__*/_jsxs(HeaderElement, {
        children: [availableClaim && !showClaimPopup && /*#__PURE__*/_jsxs(UNIWrapper, {
          onClick: toggleClaimModal,
          children: [/*#__PURE__*/_jsx(UNIAmount, {
            active: !!account && !availableClaim,
            style: {
              pointerEvents: 'auto'
            },
            children: /*#__PURE__*/_jsx(ThemedText.White, {
              padding: "0 2px",
              children: claimTxn && !(claimTxn !== null && claimTxn !== void 0 && claimTxn.receipt) ? /*#__PURE__*/_jsx(Dots, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Claiming UNI"
                })
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "Claim UNI"
              })
            })
          }), /*#__PURE__*/_jsx(CardNoise, {})]
        }), /*#__PURE__*/_jsxs(AccountElement, {
          active: !!account,
          children: [account && userEthBalance ? /*#__PURE__*/_jsx(BalanceText, {
            style: {
              flexShrink: 0,
              userSelect: 'none'
            },
            pl: "0.75rem",
            pr: "0.5rem",
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} ETH",
              values: {
                0: userEthBalance === null || userEthBalance === void 0 ? void 0 : userEthBalance.toSignificant(3)
              }
            })
          }) : null, /*#__PURE__*/_jsx(Web3Status, {})]
        })]
      }), /*#__PURE__*/_jsx(HeaderElement, {
        children: /*#__PURE__*/_jsx(Menu, {})
      })]
    })]
  });
}