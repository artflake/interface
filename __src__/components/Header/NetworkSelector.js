import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ARBITRUM_HELP_CENTER_LINK, CHAIN_INFO, L2_CHAIN_IDS, OPTIMISM_HELP_CENTER_LINK, SupportedChainId } from "../../constants/chains";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useActiveWeb3React } from "../../hooks/web3";
import { useCallback, useRef } from 'react';
import { ArrowDownCircle, ChevronDown } from 'react-feather';
import { useModalOpen, useToggleModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useAppSelector } from "../../state/hooks";
import { ExternalLink, MEDIA_WIDTHS } from "../../theme";
import { switchToNetwork } from "../../utils/switchToNetwork";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ActiveRowLinkList = _styled.div.withConfig({
  displayName: "NetworkSelector__ActiveRowLinkList",
  componentId: "sc-w04zhs-0"
})(["display:flex;flex-direction:column;padding:0 8px;& > a{align-items:center;color:", ";display:flex;flex-direction:row;font-size:14px;font-weight:500;justify-content:space-between;padding:8px 0 4px;text-decoration:none;}& > a:first-child{border-top:1px solid ", ";margin:0;margin-top:6px;padding-top:10px;}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text2;
});

const ActiveRowWrapper = _styled.div.withConfig({
  displayName: "NetworkSelector__ActiveRowWrapper",
  componentId: "sc-w04zhs-1"
})(["background-color:", ";border-radius:8px;cursor:pointer;padding:8px 0 8px 0;width:100%;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg2;
});

const FlyoutHeader = _styled.div.withConfig({
  displayName: "NetworkSelector__FlyoutHeader",
  componentId: "sc-w04zhs-2"
})(["color:", ";font-weight:400;"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.text2;
});

const FlyoutMenu = _styled.div.withConfig({
  displayName: "NetworkSelector__FlyoutMenu",
  componentId: "sc-w04zhs-3"
})(["align-items:flex-start;background-color:", ";box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);border-radius:20px;display:flex;flex-direction:column;font-size:16px;overflow:auto;padding:16px;position:absolute;top:64px;width:272px;z-index:99;& > *:not(:last-child){margin-bottom:12px;}@media screen and (min-width:", "px){top:50px;}"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg1;
}, MEDIA_WIDTHS.upToSmall);

const FlyoutRow = _styled.div.withConfig({
  displayName: "NetworkSelector__FlyoutRow",
  componentId: "sc-w04zhs-4"
})(["align-items:center;background-color:", ";border-radius:8px;cursor:pointer;display:flex;font-weight:500;justify-content:space-between;padding:6px 8px;text-align:left;width:100%;"], _ref6 => {
  let {
    active,
    theme
  } = _ref6;
  return active ? theme.bg2 : 'transparent';
});

const FlyoutRowActiveIndicator = _styled.div.withConfig({
  displayName: "NetworkSelector__FlyoutRowActiveIndicator",
  componentId: "sc-w04zhs-5"
})(["background-color:", ";border-radius:50%;height:9px;width:9px;"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.green1;
});

const LinkOutCircle = _styled(ArrowDownCircle).withConfig({
  displayName: "NetworkSelector__LinkOutCircle",
  componentId: "sc-w04zhs-6"
})(["transform:rotate(230deg);width:16px;height:16px;"]);

const Logo = _styled.img.withConfig({
  displayName: "NetworkSelector__Logo",
  componentId: "sc-w04zhs-7"
})(["height:20px;width:20px;margin-right:8px;"]);

const NetworkLabel = _styled.div.withConfig({
  displayName: "NetworkSelector__NetworkLabel",
  componentId: "sc-w04zhs-8"
})(["flex:1 1 auto;"]);

const SelectorLabel = _styled(NetworkLabel).withConfig({
  displayName: "NetworkSelector__SelectorLabel",
  componentId: "sc-w04zhs-9"
})(["display:none;@media screen and (min-width:", "px){display:block;margin-right:8px;}"], MEDIA_WIDTHS.upToSmall);

const SelectorControls = _styled.div.withConfig({
  displayName: "NetworkSelector__SelectorControls",
  componentId: "sc-w04zhs-10"
})(["align-items:center;background-color:", ";border:2px solid ", ";border-radius:12px;color:", ";cursor:", ";display:flex;font-weight:500;justify-content:space-between;padding:6px 8px;"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg1;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.bg1;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.text1;
}, _ref11 => {
  let {
    interactive
  } = _ref11;
  return interactive ? 'pointer' : 'auto';
});

const SelectorLogo = _styled(Logo).withConfig({
  displayName: "NetworkSelector__SelectorLogo",
  componentId: "sc-w04zhs-11"
})(["margin-right:", "px;@media screen and (min-width:", "px){margin-right:8px;}"], _ref12 => {
  let {
    interactive
  } = _ref12;
  return interactive ? 8 : 0;
}, MEDIA_WIDTHS.upToSmall);

const SelectorWrapper = _styled.div.withConfig({
  displayName: "NetworkSelector__SelectorWrapper",
  componentId: "sc-w04zhs-12"
})(["@media screen and (min-width:", "px){position:relative;}"], MEDIA_WIDTHS.upToSmall);

const StyledChevronDown = _styled(ChevronDown).withConfig({
  displayName: "NetworkSelector__StyledChevronDown",
  componentId: "sc-w04zhs-13"
})(["width:12px;"]);

const BridgeText = _ref13 => {
  let {
    chainId
  } = _ref13;

  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Arbitrum Bridge"
      });

    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Optimism Gateway"
      });

    default:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Bridge"
      });
  }
};

const ExplorerText = _ref14 => {
  let {
    chainId
  } = _ref14;

  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Arbiscan"
      });

    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Optimistic Etherscan"
      });

    default:
      return /*#__PURE__*/_jsx(Trans, {
        id: "Explorer"
      });
  }
};

export default function NetworkSelector() {
  const {
    chainId,
    library
  } = useActiveWeb3React();
  const node = useRef();
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);
  useOnClickOutside(node, open ? toggle : undefined);
  const implements3085 = useAppSelector(state => state.application.implements3085);
  const info = chainId ? CHAIN_INFO[chainId] : undefined;
  const isOnL2 = chainId ? L2_CHAIN_IDS.includes(chainId) : false;
  const showSelector = Boolean(implements3085 || isOnL2);
  const mainnetInfo = CHAIN_INFO[SupportedChainId.MAINNET];
  const conditionalToggle = useCallback(() => {
    if (showSelector) {
      toggle();
    }
  }, [showSelector, toggle]);

  if (!chainId || !info || !library) {
    return null;
  }

  function Row(_ref15) {
    let {
      targetChain
    } = _ref15;

    if (!library || !chainId || !implements3085 && targetChain !== chainId) {
      return null;
    }

    const handleRowClick = () => {
      switchToNetwork({
        library,
        chainId: targetChain
      });
      toggle();
    };

    const active = chainId === targetChain;
    const hasExtendedInfo = L2_CHAIN_IDS.includes(targetChain);
    const isOptimism = targetChain === SupportedChainId.OPTIMISM;
    const rowText = `${CHAIN_INFO[targetChain].label}${isOptimism ? ' (Optimism)' : ''}`;

    const RowContent = () => /*#__PURE__*/_jsxs(FlyoutRow, {
      onClick: handleRowClick,
      active: active,
      children: [/*#__PURE__*/_jsx(Logo, {
        src: CHAIN_INFO[targetChain].logoUrl
      }), /*#__PURE__*/_jsx(NetworkLabel, {
        children: rowText
      }), chainId === targetChain && /*#__PURE__*/_jsx(FlyoutRowActiveIndicator, {})]
    });

    const helpCenterLink = isOptimism ? OPTIMISM_HELP_CENTER_LINK : ARBITRUM_HELP_CENTER_LINK;

    if (active && hasExtendedInfo) {
      return /*#__PURE__*/_jsxs(ActiveRowWrapper, {
        children: [/*#__PURE__*/_jsx(RowContent, {}), /*#__PURE__*/_jsxs(ActiveRowLinkList, {
          children: [/*#__PURE__*/_jsxs(ExternalLink, {
            href: CHAIN_INFO[targetChain].bridge,
            children: [/*#__PURE__*/_jsx(BridgeText, {
              chainId: chainId
            }), " ", /*#__PURE__*/_jsx(LinkOutCircle, {})]
          }), /*#__PURE__*/_jsxs(ExternalLink, {
            href: CHAIN_INFO[targetChain].explorer,
            children: [/*#__PURE__*/_jsx(ExplorerText, {
              chainId: chainId
            }), " ", /*#__PURE__*/_jsx(LinkOutCircle, {})]
          }), /*#__PURE__*/_jsxs(ExternalLink, {
            href: helpCenterLink,
            children: [/*#__PURE__*/_jsx(Trans, {
              id: "Help Center"
            }), " ", /*#__PURE__*/_jsx(LinkOutCircle, {})]
          })]
        })]
      });
    }

    return /*#__PURE__*/_jsx(RowContent, {});
  }

  return /*#__PURE__*/_jsxs(SelectorWrapper, {
    ref: node,
    children: [/*#__PURE__*/_jsxs(SelectorControls, {
      onClick: conditionalToggle,
      interactive: showSelector,
      children: [/*#__PURE__*/_jsx(SelectorLogo, {
        interactive: showSelector,
        src: info.logoUrl || mainnetInfo.logoUrl
      }), /*#__PURE__*/_jsx(SelectorLabel, {
        children: info.label
      }), showSelector && /*#__PURE__*/_jsx(StyledChevronDown, {})]
    }), open && /*#__PURE__*/_jsxs(FlyoutMenu, {
      children: [/*#__PURE__*/_jsx(FlyoutHeader, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Select a network"
        })
      }), /*#__PURE__*/_jsx(Row, {
        targetChain: SupportedChainId.MAINNET
      }), /*#__PURE__*/_jsx(Row, {
        targetChain: SupportedChainId.OPTIMISM
      }), /*#__PURE__*/_jsx(Row, {
        targetChain: SupportedChainId.ARBITRUM_ONE
      })]
    })]
  });
}