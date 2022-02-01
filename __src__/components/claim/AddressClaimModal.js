import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { isAddress } from '@ethersproject/address';
import { useState } from 'react';
import { Text } from 'rebass';
import Circle from '../../assets/images/blue-loader.svg';
import tokenLogo from '../../assets/images/token-logo.png';
import useENS from '../../hooks/useENS';
import { useActiveWeb3React } from '../../hooks/web3';
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks';
import { useIsTransactionPending } from '../../state/transactions/hooks';
import { CloseIcon, CustomLightSpinner, ExternalLink, ThemedText, UniTokenAnimated } from '../../theme';
import { shortenAddress } from '../../utils';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import AddressInputPanel from '../AddressInputPanel';
import { ButtonPrimary } from '../Button';
import { AutoColumn, ColumnCenter } from '../Column';
import Confetti from '../Confetti';
import { Break, CardSection, DataCard } from '../earn/styled';
import { CardBGImage, CardBGImageSmaller, CardNoise } from '../earn/styled';
import Modal from '../Modal';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "AddressClaimModal__ContentWrapper",
  componentId: "sc-1qxvqh4-0"
})(["width:100%;"]);

const ModalUpper = _styled(DataCard).withConfig({
  displayName: "AddressClaimModal__ModalUpper",
  componentId: "sc-1qxvqh4-1"
})(["box-shadow:0px 4px 10px rgba(0,0,0,0.1);background:radial-gradient(76.02% 75.41% at 1.84% 0%,#ff007a 0%,#021d43 100%);"]);

const ConfirmOrLoadingWrapper = _styled.div.withConfig({
  displayName: "AddressClaimModal__ConfirmOrLoadingWrapper",
  componentId: "sc-1qxvqh4-2"
})(["width:100%;padding:24px;position:relative;background:", ";"], _ref => {
  let {
    activeBG
  } = _ref;
  return activeBG && 'radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;';
});

const ConfirmedIcon = _styled(ColumnCenter).withConfig({
  displayName: "AddressClaimModal__ConfirmedIcon",
  componentId: "sc-1qxvqh4-3"
})(["padding:60px 0;"]);

export default function AddressClaimModal(_ref2) {
  var _groupSeparator, _groupSeparator2;

  let {
    isOpen,
    onDismiss
  } = _ref2;
  const {
    chainId
  } = useActiveWeb3React(); // state for smart contract input

  const [typed, setTyped] = useState('');

  function handleRecipientType(val) {
    setTyped(val);
  } // monitor for third party recipient of claim


  const {
    address: parsedAddress
  } = useENS(typed); // used for UI loading states

  const [attempting, setAttempting] = useState(false); // monitor the status of the claim from contracts and txns

  const {
    claimCallback
  } = useClaimCallback(parsedAddress);
  const unclaimedAmount = useUserUnclaimedAmount(parsedAddress); // check if the user has something available

  const hasAvailableClaim = useUserHasAvailableClaim(parsedAddress);
  const [hash, setHash] = useState(); // monitor the status of the claim from contracts and txns

  const claimPending = useIsTransactionPending(hash !== null && hash !== void 0 ? hash : '');
  const claimConfirmed = hash && !claimPending; // use the hash to monitor this txn

  function onClaim() {
    setAttempting(true);
    claimCallback().then(hash => {
      setHash(hash);
    }) // reset modal and log error
    .catch(error => {
      setAttempting(false);
      console.log(error);
    });
  }

  function wrappedOnDismiss() {
    setAttempting(false);
    setHash(undefined);
    setTyped('');
    onDismiss();
  }

  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: isOpen,
    onDismiss: wrappedOnDismiss,
    maxHeight: 90,
    children: [/*#__PURE__*/_jsx(Confetti, {
      start: Boolean(isOpen && claimConfirmed && attempting)
    }), !attempting && /*#__PURE__*/_jsxs(ContentWrapper, {
      gap: "lg",
      children: [/*#__PURE__*/_jsxs(ModalUpper, {
        children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(CardSection, {
          gap: "md",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.White, {
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Claim UNI Token"
              })
            }), /*#__PURE__*/_jsx(CloseIcon, {
              onClick: wrappedOnDismiss,
              style: {
                zIndex: 99
              },
              stroke: "white"
            })]
          }), /*#__PURE__*/_jsx(ThemedText.White, {
            fontWeight: 700,
            fontSize: 36,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} UNI",
              values: {
                0: unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
                  groupSeparator: ','
                }) !== null && _groupSeparator !== void 0 ? _groupSeparator : '-')
              }
            })
          })]
        }), /*#__PURE__*/_jsx(Break, {})]
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "md",
        style: {
          padding: '1rem',
          paddingTop: '0'
        },
        justify: "center",
        children: [/*#__PURE__*/_jsx(ThemedText.SubHeader, {
          fontWeight: 500,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission."
          })
        }), /*#__PURE__*/_jsx(AddressInputPanel, {
          value: typed,
          onChange: handleRecipientType
        }), parsedAddress && !hasAvailableClaim && /*#__PURE__*/_jsx(ThemedText.Error, {
          error: true,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Address has no available claim"
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          disabled: !isAddress(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : '') || !hasAvailableClaim,
          padding: "16px 16px",
          width: "100%",
          $borderRadius: "12px",
          mt: "1rem",
          onClick: onClaim,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claim UNI"
          })
        })]
      })]
    }), (attempting || claimConfirmed) && /*#__PURE__*/_jsxs(ConfirmOrLoadingWrapper, {
      activeBG: true,
      children: [/*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardBGImageSmaller, {
        desaturate: true
      }), /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: wrappedOnDismiss,
          style: {
            zIndex: 99
          },
          stroke: "black"
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        children: !claimConfirmed ? /*#__PURE__*/_jsx(CustomLightSpinner, {
          src: Circle,
          alt: "loader",
          size: '90px'
        }) : /*#__PURE__*/_jsx(UniTokenAnimated, {
          width: "72px",
          src: tokenLogo,
          alt: "UNI logo"
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "100px",
        justify: 'center',
        children: [/*#__PURE__*/_jsxs(AutoColumn, {
          gap: "12px",
          justify: 'center',
          children: [/*#__PURE__*/_jsx(ThemedText.LargeHeader, {
            fontWeight: 600,
            color: "black",
            children: claimConfirmed ? /*#__PURE__*/_jsx(Trans, {
              id: "Claimed"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Claiming"
            })
          }), !claimConfirmed && /*#__PURE__*/_jsx(Text, {
            fontSize: 36,
            color: '#ff007a',
            fontWeight: 800,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "{0} UNI",
              values: {
                0: unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator2 = {
                  groupSeparator: ','
                }) !== null && _groupSeparator2 !== void 0 ? _groupSeparator2 : '-')
              }
            })
          }), parsedAddress && /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
            fontWeight: 600,
            color: "black",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "for {0}",
              values: {
                0: shortenAddress(parsedAddress)
              }
            })
          })]
        }), claimConfirmed && /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsxs(ThemedText.SubHeader, {
            fontWeight: 500,
            color: "black",
            children: [/*#__PURE__*/_jsxs("span", {
              role: "img",
              "aria-label": "party-hat",
              children: ["\uD83C\uDF89", ' ']
            }), /*#__PURE__*/_jsx(Trans, {
              id: "Welcome to team Unicorn :)"
            }), /*#__PURE__*/_jsx("span", {
              role: "img",
              "aria-label": "party-hat",
              children: "\uD83C\uDF89"
            })]
          })
        }), attempting && !hash && /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: "black",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm this transaction in your wallet"
          })
        }), attempting && hash && !claimConfirmed && chainId && hash && /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
          style: {
            zIndex: 99
          },
          children: /*#__PURE__*/_jsx(Trans, {
            id: "View transaction on Explorer"
          })
        })]
      })]
    })]
  });
}