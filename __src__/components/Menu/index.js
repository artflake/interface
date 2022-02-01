import { css as _css } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { PrivacyPolicyModal } from "../PrivacyPolicy";
import { L2_CHAIN_IDS } from "../../constants/chains";
import { LOCALE_LABEL, SUPPORTED_LOCALES } from "../../constants/locales";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { useLocationLinkProps } from "../../hooks/useLocationLinkProps";
import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Check, ChevronLeft, Coffee, FileText, Globe, HelpCircle, Info, MessageCircle, Moon, Sun } from 'react-feather';
import { Link } from 'react-router-dom';
import { useDarkModeManager } from "../../state/user/hooks";
import { ReactComponent as MenuIcon } from "../../assets/images/menu.svg";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useActiveWeb3React } from "../../hooks/web3";
import { useModalOpen, useToggleModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { ExternalLink } from "../../theme";
import { ButtonPrimary } from "../Button";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export let FlyoutAlignment;

(function (FlyoutAlignment) {
  FlyoutAlignment["LEFT"] = "LEFT";
  FlyoutAlignment["RIGHT"] = "RIGHT";
})(FlyoutAlignment || (FlyoutAlignment = {}));

const StyledMenuIcon = _styled(MenuIcon).withConfig({
  displayName: "Menu__StyledMenuIcon",
  componentId: "sc-12ipqmu-0"
})(["path{stroke:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
});

const StyledMenuButton = _styled.button.withConfig({
  displayName: "Menu__StyledMenuButton",
  componentId: "sc-12ipqmu-1"
})(["width:100%;height:100%;border:none;background-color:transparent;margin:0;padding:0;height:38px;background-color:", ";border:1px solid ", ";padding:0.15rem 0.5rem;border-radius:12px;:hover,:focus{cursor:pointer;outline:none;border:1px solid ", ";}svg{margin-top:2px;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg0;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg0;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg3;
});

const UNIbutton = _styled(ButtonPrimary).withConfig({
  displayName: "Menu__UNIbutton",
  componentId: "sc-12ipqmu-2"
})(["background-color:", ";background:radial-gradient(174.47% 188.91% at 1.84% 0%,#ff007a 0%,#2172e5 100%),#edeef2;border:none;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg3;
});

const StyledMenu = _styled.div.withConfig({
  displayName: "Menu__StyledMenu",
  componentId: "sc-12ipqmu-3"
})(["display:flex;justify-content:center;align-items:center;position:relative;border:none;text-align:left;"]);

const MenuFlyout = _styled.span.withConfig({
  displayName: "Menu__MenuFlyout",
  componentId: "sc-12ipqmu-4"
})(["min-width:196px;max-height:350px;overflow:auto;background-color:", ";box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);border:1px solid ", ";border-radius:12px;padding:0.5rem;display:flex;flex-direction:column;font-size:16px;position:absolute;top:3rem;z-index:100;", ";", ";"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg1;
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg0;
}, _ref8 => {
  let {
    flyoutAlignment = FlyoutAlignment.RIGHT
  } = _ref8;
  return flyoutAlignment === FlyoutAlignment.RIGHT ? _css`
          right: 0rem;
        ` : _css`
          left: 0rem;
        `;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.mediaWidth.upToMedium`
    bottom: unset;
    right: 0;
    left: unset;
  `;
});

const MenuItem = _styled(ExternalLink).withConfig({
  displayName: "Menu__MenuItem",
  componentId: "sc-12ipqmu-5"
})(["display:flex;flex:1;flex-direction:row;align-items:center;padding:0.5rem 0.5rem;justify-content:space-between;color:", ";:hover{color:", ";cursor:pointer;text-decoration:none;}"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.text2;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.text1;
});

const InternalMenuItem = _styled(Link).withConfig({
  displayName: "Menu__InternalMenuItem",
  componentId: "sc-12ipqmu-6"
})(["flex:1;padding:0.5rem 0.5rem;color:", ";:hover{color:", ";cursor:pointer;text-decoration:none;}> svg{margin-right:8px;}"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.text2;
}, _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.text1;
});

const InternalLinkMenuItem = _styled(InternalMenuItem).withConfig({
  displayName: "Menu__InternalLinkMenuItem",
  componentId: "sc-12ipqmu-7"
})(["display:flex;flex-direction:row;align-items:center;padding:0.5rem 0.5rem;justify-content:space-between;text-decoration:none;:hover{color:", ";cursor:pointer;text-decoration:none;}"], _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.text1;
});

const ToggleMenuItem = _styled.button.withConfig({
  displayName: "Menu__ToggleMenuItem",
  componentId: "sc-12ipqmu-8"
})(["background-color:transparent;margin:0;padding:0;border:none;display:flex;flex:1;flex-direction:row;align-items:center;padding:0.5rem 0.5rem;justify-content:space-between;font-size:1rem;font-weight:500;color:", ";:hover{color:", ";cursor:pointer;text-decoration:none;}"], _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.text2;
}, _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.text1;
});

function LanguageMenuItem(_ref17) {
  let {
    locale,
    active,
    key
  } = _ref17;
  const {
    to,
    onClick
  } = useLocationLinkProps(locale);
  if (!to) return null;
  return /*#__PURE__*/_jsxs(InternalLinkMenuItem, {
    onClick: onClick,
    to: to,
    children: [/*#__PURE__*/_jsx("div", {
      children: LOCALE_LABEL[locale]
    }), active && /*#__PURE__*/_jsx(Check, {
      opacity: 0.6,
      size: 16
    })]
  }, key);
}

function LanguageMenu(_ref18) {
  let {
    close
  } = _ref18;
  const activeLocale = useActiveLocale();
  return /*#__PURE__*/_jsxs(MenuFlyout, {
    children: [/*#__PURE__*/_jsx(ToggleMenuItem, {
      onClick: close,
      children: /*#__PURE__*/_jsx(ChevronLeft, {
        size: 16
      })
    }), SUPPORTED_LOCALES.map(locale => /*#__PURE__*/_jsx(LanguageMenuItem, {
      locale: locale,
      active: activeLocale === locale
    }, locale))]
  });
}

export default function Menu() {
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const node = useRef();
  const open = useModalOpen(ApplicationModal.MENU);
  const toggleMenu = useToggleModal(ApplicationModal.MENU);
  useOnClickOutside(node, open ? toggleMenu : undefined);
  const togglePrivacyPolicy = useToggleModal(ApplicationModal.PRIVACY_POLICY);
  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
  const showUNIClaimOption = Boolean(!!account && !!chainId && !L2_CHAIN_IDS.includes(chainId));
  const [darkMode, toggleDarkMode] = useDarkModeManager();
  const [menu, setMenu] = useState('main');
  useEffect(() => {
    setMenu('main');
  }, [open]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(StyledMenu, {
      ref: node,
      children: [/*#__PURE__*/_jsx(StyledMenuButton, {
        onClick: toggleMenu,
        "aria-label":
        /*i18n*/
        i18n._("Menu"),
        children: /*#__PURE__*/_jsx(StyledMenuIcon, {})
      }), open && (() => {
        switch (menu) {
          case 'lang':
            return /*#__PURE__*/_jsx(LanguageMenu, {
              close: () => setMenu('main')
            });

          case 'main':
          default:
            return /*#__PURE__*/_jsxs(MenuFlyout, {
              children: [/*#__PURE__*/_jsxs(MenuItem, {
                href: "https://uniswap.org/",
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "About"
                  })
                }), /*#__PURE__*/_jsx(Info, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(MenuItem, {
                href: "https://help.uniswap.org/",
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Help Center"
                  })
                }), /*#__PURE__*/_jsx(HelpCircle, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(MenuItem, {
                href: "https://uniswap.canny.io/feature-requests",
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Request Features"
                  })
                }), /*#__PURE__*/_jsx(Coffee, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(MenuItem, {
                href: "https://discord.gg/FCfyBSbCU5",
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Discord"
                  })
                }), /*#__PURE__*/_jsx(MessageCircle, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(ToggleMenuItem, {
                onClick: () => setMenu('lang'),
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Language"
                  })
                }), /*#__PURE__*/_jsx(Globe, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(ToggleMenuItem, {
                onClick: () => toggleDarkMode(),
                children: [/*#__PURE__*/_jsx("div", {
                  children: darkMode ? /*#__PURE__*/_jsx(Trans, {
                    id: "Light Theme"
                  }) : /*#__PURE__*/_jsx(Trans, {
                    id: "Dark Theme"
                  })
                }), darkMode ? /*#__PURE__*/_jsx(Moon, {
                  opacity: 0.6,
                  size: 16
                }) : /*#__PURE__*/_jsx(Sun, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(MenuItem, {
                href: "https://docs.uniswap.org/",
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Docs"
                  })
                }), /*#__PURE__*/_jsx(BookOpen, {
                  opacity: 0.6,
                  size: 16
                })]
              }), /*#__PURE__*/_jsxs(ToggleMenuItem, {
                onClick: () => togglePrivacyPolicy(),
                children: [/*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Legal & Privacy"
                  })
                }), /*#__PURE__*/_jsx(FileText, {
                  opacity: 0.6,
                  size: 16
                })]
              }), showUNIClaimOption && /*#__PURE__*/_jsx(UNIbutton, {
                onClick: openClaimModal,
                padding: "8px 16px",
                width: "100%",
                $borderRadius: "12px",
                mt: "0.5rem",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Claim UNI"
                })
              })]
            });
        }
      })()]
    }), /*#__PURE__*/_jsx(PrivacyPolicyModal, {})]
  });
}

const NewMenuFlyout = _styled(MenuFlyout).withConfig({
  displayName: "Menu__NewMenuFlyout",
  componentId: "sc-12ipqmu-9"
})(["top:3rem !important;"]);

const NewMenuItem = _styled(InternalMenuItem).withConfig({
  displayName: "Menu__NewMenuItem",
  componentId: "sc-12ipqmu-10"
})(["width:max-content;text-decoration:none;"]);

const ExternalMenuItem = _styled(MenuItem).withConfig({
  displayName: "Menu__ExternalMenuItem",
  componentId: "sc-12ipqmu-11"
})(["width:max-content;text-decoration:none;"]);

export const NewMenu = _ref19 => {
  let {
    flyoutAlignment = FlyoutAlignment.RIGHT,
    ToggleUI,
    menuItems,
    ...rest
  } = _ref19;
  const node = useRef();
  const open = useModalOpen(ApplicationModal.POOL_OVERVIEW_OPTIONS);
  const toggle = useToggleModal(ApplicationModal.POOL_OVERVIEW_OPTIONS);
  useOnClickOutside(node, open ? toggle : undefined);
  const ToggleElement = ToggleUI || StyledMenuIcon;
  return /*#__PURE__*/_jsxs(StyledMenu, {
    ref: node,
    ...rest,
    children: [/*#__PURE__*/_jsx(ToggleElement, {
      onClick: toggle
    }), open && /*#__PURE__*/_jsx(NewMenuFlyout, {
      flyoutAlignment: flyoutAlignment,
      children: menuItems.map((_ref20, i) => {
        let {
          content,
          link,
          external
        } = _ref20;
        return external ? /*#__PURE__*/_jsx(ExternalMenuItem, {
          href: link,
          children: content
        }, i) : /*#__PURE__*/_jsx(NewMenuItem, {
          to: link,
          children: content
        }, i);
      })
    })]
  });
};