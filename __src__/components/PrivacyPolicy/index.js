import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Card, { DarkGreyCard } from "../Card";
import Row, { AutoRow, RowBetween } from "../Row";
import { useEffect, useRef } from 'react';
import { ArrowDown, Info, X } from 'react-feather';
import ReactGA from 'react-ga';
import { ExternalLink, ThemedText } from "../../theme";
import { isMobile } from "../../utils/userAgent";
import { useModalOpen, useTogglePrivacyPolicy } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { AutoColumn } from "../Column";
import Modal from "../Modal";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "PrivacyPolicy__Wrapper",
  componentId: "sc-z1xxjf-0"
})(["max-height:70vh;overflow:auto;padding:0 1rem;"]);

const StyledExternalCard = _styled(Card).withConfig({
  displayName: "PrivacyPolicy__StyledExternalCard",
  componentId: "sc-z1xxjf-1"
})(["background-color:", ";padding:0.5rem;width:100%;:hover,:focus,:active{background-color:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.primary5;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.primary4;
});

const HoverText = _styled.div.withConfig({
  displayName: "PrivacyPolicy__HoverText",
  componentId: "sc-z1xxjf-2"
})(["text-decoration:none;color:", ";display:flex;align-items:center;:hover{cursor:pointer;}"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text1;
});

const StyledLinkOut = _styled(ArrowDown).withConfig({
  displayName: "PrivacyPolicy__StyledLinkOut",
  componentId: "sc-z1xxjf-3"
})(["transform:rotate(230deg);"]);

const EXTERNAL_APIS = [{
  name: 'Auto Router',
  description: /*#__PURE__*/_jsx(Trans, {
    id: "The app fetches the optimal trade route from a Uniswap Labs server."
  })
}, {
  name: 'Infura',
  description: /*#__PURE__*/_jsx(Trans, {
    id: "The app fetches on-chain data and constructs contract calls with an Infura API."
  })
}, {
  name: 'TRM Labs',
  description: /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Trans, {
      id: "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons."
    }), ' ', /*#__PURE__*/_jsx(ExternalLink, {
      href: "https://help.uniswap.org/en/articles/5675203-terms-of-service-faq",
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Learn more"
      })
    })]
  })
}, {
  name: 'Google Analytics',
  description: /*#__PURE__*/_jsx(Trans, {
    id: "The app logs anonymized usage statistics in order to improve over time."
  })
}, {
  name: 'The Graph',
  description: /*#__PURE__*/_jsx(Trans, {
    id: "The app fetches blockchain data from The Graph\u2019s hosted service."
  })
}];
export function PrivacyPolicyModal() {
  const node = useRef();
  const open = useModalOpen(ApplicationModal.PRIVACY_POLICY);
  const toggle = useTogglePrivacyPolicy();
  useEffect(() => {
    if (!open) return;
    ReactGA.event({
      category: 'Modal',
      action: 'Show Legal'
    });
  }, [open]);
  return /*#__PURE__*/_jsx(Modal, {
    isOpen: open,
    onDismiss: () => toggle(),
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "12px",
      ref: node,
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        padding: "1rem 1rem 0.5rem 1rem",
        children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Legal & Privacy"
          })
        }), /*#__PURE__*/_jsx(HoverText, {
          onClick: () => toggle(),
          children: /*#__PURE__*/_jsx(X, {
            size: 24
          })
        })]
      }), /*#__PURE__*/_jsx(PrivacyPolicy, {})]
    })
  });
}
export function PrivacyPolicy() {
  return /*#__PURE__*/_jsx(Wrapper, {
    draggable: "true",
    onTouchMove: e => {
      // prevent modal gesture handler from dismissing modal when content is scrolling
      if (isMobile) {
        e.stopPropagation();
      }
    },
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "16px",
      children: [/*#__PURE__*/_jsxs(AutoColumn, {
        gap: "8px",
        style: {
          width: '100%'
        },
        children: [/*#__PURE__*/_jsx(StyledExternalCard, {
          children: /*#__PURE__*/_jsx(ExternalLink, {
            href: 'https://uniswap.org/terms-of-service',
            children: /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsxs(AutoRow, {
                gap: "4px",
                children: [/*#__PURE__*/_jsx(Info, {
                  size: 20
                }), /*#__PURE__*/_jsx(ThemedText.Main, {
                  fontSize: 14,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Uniswap Labs' Terms of Service"
                  })
                })]
              }), /*#__PURE__*/_jsx(StyledLinkOut, {
                size: 20
              })]
            })
          })
        }), /*#__PURE__*/_jsx(StyledExternalCard, {
          children: /*#__PURE__*/_jsx(ExternalLink, {
            href: 'https://uniswap.org/disclaimer/',
            children: /*#__PURE__*/_jsxs(RowBetween, {
              children: [/*#__PURE__*/_jsxs(AutoRow, {
                gap: "4px",
                children: [/*#__PURE__*/_jsx(Info, {
                  size: 20
                }), /*#__PURE__*/_jsx(ThemedText.Main, {
                  fontSize: 14,
                  color: 'primaryText1',
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Protocol Disclaimer"
                  })
                })]
              }), /*#__PURE__*/_jsx(StyledLinkOut, {
                size: 20
              })]
            })
          })
        })]
      }), /*#__PURE__*/_jsx(ThemedText.Main, {
        fontSize: 14,
        children: /*#__PURE__*/_jsx(Trans, {
          id: "This app uses the following third-party APIs:"
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        children: [EXTERNAL_APIS.map((_ref4, i) => {
          let {
            name,
            description
          } = _ref4;
          return /*#__PURE__*/_jsx(DarkGreyCard, {
            children: /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "8px",
              children: [/*#__PURE__*/_jsxs(AutoRow, {
                gap: "4px",
                children: [/*#__PURE__*/_jsx(Info, {
                  size: 18
                }), /*#__PURE__*/_jsx(ThemedText.Main, {
                  fontSize: 14,
                  color: 'text1',
                  children: name
                })]
              }), /*#__PURE__*/_jsx(ThemedText.Main, {
                fontSize: 14,
                children: description
              })]
            })
          }, i);
        }), /*#__PURE__*/_jsx(Row, {
          justify: "center",
          marginBottom: "1rem",
          children: /*#__PURE__*/_jsx(ExternalLink, {
            href: "https://help.uniswap.org/en/articles/5675203-terms-of-service-faq",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Learn more"
            })
          })
        })]
      })]
    })
  });
}