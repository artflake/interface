import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useCallback, useEffect } from 'react';
import { Heart, X } from 'react-feather';
import ReactGA from 'react-ga';
import tokenLogo from "../../assets/images/token-logo.png";
import { useActiveWeb3React } from "../../hooks/web3";
import { useModalOpen, useShowClaimPopup, useToggleSelfClaimModal, useToggleShowClaimPopup } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useUserHasAvailableClaim, useUserUnclaimedAmount } from "../../state/claim/hooks";
import { ThemedText } from "../../theme";
import { ButtonPrimary } from "../Button";
import { AutoColumn } from "../Column";
import { CardBGImage, CardNoise } from "../earn/styled";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const StyledClaimPopup = _styled(AutoColumn).withConfig({
  displayName: "ClaimPopup__StyledClaimPopup",
  componentId: "sc-fwaiaw-0"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#ff007a 0%,#021d43 100%);border-radius:20px;padding:1.5rem;overflow:hidden;position:relative;max-width:360px;box-shadow:0px 4px 10px rgba(0,0,0,0.1);"]);

const StyledClose = _styled(X).withConfig({
  displayName: "ClaimPopup__StyledClose",
  componentId: "sc-fwaiaw-1"
})(["position:absolute;right:10px;top:10px;:hover{cursor:pointer;}"]);

const rotate = _keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;

const UniToken = _styled.img.withConfig({
  displayName: "ClaimPopup__UniToken",
  componentId: "sc-fwaiaw-2"
})(["animation:", " 5s cubic-bezier(0.83,0,0.17,1) infinite;"], rotate);

export default function ClaimPopup() {
  var _groupSeparator;

  const {
    account
  } = useActiveWeb3React(); // dont store these in persisted state yet

  const showClaimPopup = useShowClaimPopup();
  const toggleShowClaimPopup = useToggleShowClaimPopup(); // toggle for showing this modal

  const showClaimModal = useModalOpen(ApplicationModal.SELF_CLAIM);
  const toggleSelfClaimModal = useToggleSelfClaimModal();
  const handleToggleSelfClaimModal = useCallback(() => {
    ReactGA.event({
      category: 'MerkleDrop',
      action: 'Toggle self claim modal'
    });
    toggleSelfClaimModal();
  }, [toggleSelfClaimModal]); // const userHasAvailableclaim = useUserHasAvailableClaim()

  const userHasAvailableclaim = useUserHasAvailableClaim(account);
  const unclaimedAmount = useUserUnclaimedAmount(account); // listen for available claim and show popup if needed

  useEffect(() => {
    if (userHasAvailableclaim) {
      ReactGA.event({
        category: 'MerkleDrop',
        action: 'Show claim popup'
      });
      toggleShowClaimPopup();
    } // the toggleShowClaimPopup function changes every time the popup changes, so this will cause an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [userHasAvailableclaim]);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: showClaimPopup && !showClaimModal && /*#__PURE__*/_jsxs(StyledClaimPopup, {
      gap: "md",
      children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(StyledClose, {
        stroke: "white",
        onClick: toggleShowClaimPopup
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        style: {
          padding: '2rem 0',
          zIndex: 10
        },
        justify: "center",
        children: [/*#__PURE__*/_jsx(UniToken, {
          width: "48px",
          src: tokenLogo
        }), ' ', /*#__PURE__*/_jsxs(ThemedText.White, {
          style: {
            marginTop: '1rem'
          },
          fontSize: 36,
          fontWeight: 600,
          children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
            groupSeparator: ','
          }) !== null && _groupSeparator !== void 0 ? _groupSeparator : '-'), " UNI"]
        }), /*#__PURE__*/_jsxs(ThemedText.White, {
          style: {
            paddingTop: '1.25rem',
            textAlign: 'center'
          },
          fontWeight: 600,
          color: "white",
          children: [/*#__PURE__*/_jsx("span", {
            role: "img",
            "aria-label": "party",
            children: "\uD83C\uDF89"
          }), ' ', /*#__PURE__*/_jsx(Trans, {
            id: "UNI has arrived"
          }), ' ', /*#__PURE__*/_jsx("span", {
            role: "img",
            "aria-label": "party",
            children: "\uD83C\uDF89"
          })]
        }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          style: {
            paddingTop: '0.5rem',
            textAlign: 'center'
          },
          color: "white",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Thanks for being part of the Uniswap community <0/>",
            components: {
              0: /*#__PURE__*/_jsx(Heart, {
                size: 12
              })
            }
          })
        })]
      }), /*#__PURE__*/_jsx(AutoColumn, {
        style: {
          zIndex: 10
        },
        justify: "center",
        children: /*#__PURE__*/_jsx(ButtonPrimary, {
          padding: "8px",
          $borderRadius: "8px",
          width: 'fit-content',
          onClick: handleToggleSelfClaimModal,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claim your UNI tokens"
          })
        })
      })]
    })
  });
}