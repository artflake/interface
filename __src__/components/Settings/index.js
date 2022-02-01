import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { SupportedChainId } from "../../constants/chains";
import { useActiveWeb3React } from "../../hooks/web3";
import { useContext, useRef, useState } from 'react';
import { Settings, X } from 'react-feather';
import ReactGA from 'react-ga';
import { Text } from 'rebass';
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useModalOpen, useToggleSettingsMenu } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useClientSideRouter, useExpertModeManager } from "../../state/user/hooks";
import { ThemedText } from "../../theme";
import { ButtonError } from "../Button";
import { AutoColumn } from "../Column";
import Modal from "../Modal";
import QuestionHelper from "../QuestionHelper";
import { RowBetween, RowFixed } from "../Row";
import Toggle from "../Toggle";
import TransactionSettings from "../TransactionSettings";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const StyledMenuIcon = _styled(Settings).withConfig({
  displayName: "Settings__StyledMenuIcon",
  componentId: "sc-1ndknrv-0"
})(["height:20px;width:20px;> *{stroke:", ";}:hover{opacity:0.7;}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text2;
});

const StyledCloseIcon = _styled(X).withConfig({
  displayName: "Settings__StyledCloseIcon",
  componentId: "sc-1ndknrv-1"
})(["height:20px;width:20px;:hover{cursor:pointer;}> *{stroke:", ";}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text1;
});

const StyledMenuButton = _styled.button.withConfig({
  displayName: "Settings__StyledMenuButton",
  componentId: "sc-1ndknrv-2"
})(["position:relative;width:100%;height:100%;border:none;background-color:transparent;margin:0;padding:0;border-radius:0.5rem;height:20px;:hover,:focus{cursor:pointer;outline:none;}"]);

const EmojiWrapper = _styled.div.withConfig({
  displayName: "Settings__EmojiWrapper",
  componentId: "sc-1ndknrv-3"
})(["position:absolute;bottom:-6px;right:0px;font-size:14px;"]);

const StyledMenu = _styled.div.withConfig({
  displayName: "Settings__StyledMenu",
  componentId: "sc-1ndknrv-4"
})(["margin-left:0.5rem;display:flex;justify-content:center;align-items:center;position:relative;border:none;text-align:left;"]);

const MenuFlyout = _styled.span.withConfig({
  displayName: "Settings__MenuFlyout",
  componentId: "sc-1ndknrv-5"
})(["min-width:20.125rem;background-color:", ";border:1px solid ", ";box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);border-radius:12px;display:flex;flex-direction:column;font-size:1rem;position:absolute;top:2rem;right:0rem;z-index:100;", ";user-select:none;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg2;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg3;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToMedium`
    min-width: 18.125rem;
  `;
});

const Break = _styled.div.withConfig({
  displayName: "Settings__Break",
  componentId: "sc-1ndknrv-6"
})(["width:100%;height:1px;background-color:", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg3;
});

const ModalContentWrapper = _styled.div.withConfig({
  displayName: "Settings__ModalContentWrapper",
  componentId: "sc-1ndknrv-7"
})(["display:flex;align-items:center;justify-content:center;padding:2rem 0;background-color:", ";border-radius:20px;"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg2;
});

export default function SettingsTab(_ref8) {
  let {
    placeholderSlippage
  } = _ref8;
  const {
    chainId
  } = useActiveWeb3React();
  const node = useRef();
  const open = useModalOpen(ApplicationModal.SETTINGS);
  const toggle = useToggleSettingsMenu();
  const theme = useContext(_ThemeContext);
  const [expertMode, toggleExpertMode] = useExpertModeManager();
  const [clientSideRouter, setClientSideRouter] = useClientSideRouter(); // show confirmation view before turning on

  const [showConfirmation, setShowConfirmation] = useState(false);
  useOnClickOutside(node, open ? toggle : undefined);
  return (
    /*#__PURE__*/
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    _jsxs(StyledMenu, {
      ref: node,
      children: [/*#__PURE__*/_jsx(Modal, {
        isOpen: showConfirmation,
        onDismiss: () => setShowConfirmation(false),
        maxHeight: 100,
        children: /*#__PURE__*/_jsx(ModalContentWrapper, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "lg",
            children: [/*#__PURE__*/_jsxs(RowBetween, {
              style: {
                padding: '0 2rem'
              },
              children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(Text, {
                fontWeight: 500,
                fontSize: 20,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Are you sure?"
                })
              }), /*#__PURE__*/_jsx(StyledCloseIcon, {
                onClick: () => setShowConfirmation(false)
              })]
            }), /*#__PURE__*/_jsx(Break, {}), /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "lg",
              style: {
                padding: '0 2rem'
              },
              children: [/*#__PURE__*/_jsx(Text, {
                fontWeight: 500,
                fontSize: 20,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds."
                })
              }), /*#__PURE__*/_jsx(Text, {
                fontWeight: 600,
                fontSize: 20,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING."
                })
              }), /*#__PURE__*/_jsx(ButtonError, {
                error: true,
                padding: '12px',
                onClick: () => {
                  const confirmWord =
                  /*i18n*/
                  i18n._("confirm");

                  if (window.prompt(
                  /*i18n*/
                  i18n._("Please type the word \"{confirmWord}\" to enable expert mode.", {
                    confirmWord: confirmWord
                  })) === confirmWord) {
                    toggleExpertMode();
                    setShowConfirmation(false);
                  }
                },
                children: /*#__PURE__*/_jsx(Text, {
                  fontSize: 20,
                  fontWeight: 500,
                  id: "confirm-expert-mode",
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Turn On Expert Mode"
                  })
                })
              })]
            })]
          })
        })
      }), /*#__PURE__*/_jsxs(StyledMenuButton, {
        onClick: toggle,
        id: "open-settings-dialog-button",
        "aria-label":
        /*i18n*/
        i18n._("Transaction Settings"),
        children: [/*#__PURE__*/_jsx(StyledMenuIcon, {}), expertMode ? /*#__PURE__*/_jsx(EmojiWrapper, {
          children: /*#__PURE__*/_jsx("span", {
            role: "img",
            "aria-label": "wizard-icon",
            children: "\uD83E\uDDD9"
          })
        }) : null]
      }), open && /*#__PURE__*/_jsx(MenuFlyout, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          style: {
            padding: '1rem'
          },
          children: [/*#__PURE__*/_jsx(Text, {
            fontWeight: 600,
            fontSize: 14,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Transaction Settings"
            })
          }), /*#__PURE__*/_jsx(TransactionSettings, {
            placeholderSlippage: placeholderSlippage
          }), /*#__PURE__*/_jsx(Text, {
            fontWeight: 600,
            fontSize: 14,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Interface Settings"
            })
          }), chainId === SupportedChainId.MAINNET && /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(ThemedText.Black, {
                fontWeight: 400,
                fontSize: 14,
                color: theme.text2,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Auto Router"
                })
              }), /*#__PURE__*/_jsx(QuestionHelper, {
                text: /*#__PURE__*/_jsx(Trans, {
                  id: "Use the Uniswap Labs API to get better pricing through a more efficient route."
                })
              })]
            }), /*#__PURE__*/_jsx(Toggle, {
              id: "toggle-optimized-router-button",
              isActive: !clientSideRouter,
              toggle: () => {
                ReactGA.event({
                  category: 'Routing',
                  action: clientSideRouter ? 'enable routing API' : 'disable routing API'
                });
                setClientSideRouter(!clientSideRouter);
              }
            })]
          }), /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsx(ThemedText.Black, {
                fontWeight: 400,
                fontSize: 14,
                color: theme.text2,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Expert Mode"
                })
              }), /*#__PURE__*/_jsx(QuestionHelper, {
                text: /*#__PURE__*/_jsx(Trans, {
                  id: "Allow high price impact trades and skip the confirm screen. Use at your own risk."
                })
              })]
            }), /*#__PURE__*/_jsx(Toggle, {
              id: "toggle-expert-mode-button",
              isActive: expertMode,
              toggle: expertMode ? () => {
                toggleExpertMode();
                setShowConfirmation(false);
              } : () => {
                toggle();
                setShowConfirmation(true);
              }
            })]
          })]
        })
      })]
    })
  );
}