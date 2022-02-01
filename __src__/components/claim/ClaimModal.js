import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { isAddress } from '@ethersproject/address';
import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useEffect, useState } from 'react';
import { Text } from 'rebass';
import Circle from "../../assets/images/blue-loader.svg";
import tokenLogo from "../../assets/images/token-logo.png";
import { useActiveWeb3React } from "../../hooks/web3";
import { useModalOpen, useToggleSelfClaimModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useClaimCallback, useUserClaimData, useUserUnclaimedAmount } from "../../state/claim/hooks";
import { useUserHasSubmittedClaim } from "../../state/transactions/hooks";
import { CloseIcon, CustomLightSpinner, ExternalLink, ThemedText, UniTokenAnimated } from "../../theme";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { ButtonPrimary } from "../Button";
import { AutoColumn, ColumnCenter } from "../Column";
import Confetti from "../Confetti";
import { Break, CardBGImage, CardBGImageSmaller, CardNoise, CardSection, DataCard } from "../earn/styled";
import Modal from "../Modal";
import { RowBetween } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "ClaimModal__ContentWrapper",
  componentId: "sc-gtants-0"
})(["width:100%;"]);

const ModalUpper = _styled(DataCard).withConfig({
  displayName: "ClaimModal__ModalUpper",
  componentId: "sc-gtants-1"
})(["box-shadow:0px 4px 10px rgba(0,0,0,0.1);background:radial-gradient(76.02% 75.41% at 1.84% 0%,#ff007a 0%,#021d43 100%);"]);

const ConfirmOrLoadingWrapper = _styled.div.withConfig({
  displayName: "ClaimModal__ConfirmOrLoadingWrapper",
  componentId: "sc-gtants-2"
})(["width:100%;padding:24px;position:relative;background:", ";"], _ref => {
  let {
    activeBG
  } = _ref;
  return activeBG && 'radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;';
});

const ConfirmedIcon = _styled(ColumnCenter).withConfig({
  displayName: "ClaimModal__ConfirmedIcon",
  componentId: "sc-gtants-3"
})(["padding:60px 0;"]);

const SOCKS_AMOUNT = 1000;
const USER_AMOUNT = 400;
export default function ClaimModal() {
  var _userClaimData$flags, _userClaimData$flags2, _groupSeparator, _userClaimData$flags3, _userClaimData$flags4, _userClaimData$flags5, _groupSeparator2;

  const isOpen = useModalOpen(ApplicationModal.SELF_CLAIM);
  const toggleClaimModal = useToggleSelfClaimModal();
  const {
    account,
    chainId
  } = useActiveWeb3React(); // used for UI loading states

  const [attempting, setAttempting] = useState(false); // get user claim data

  const userClaimData = useUserClaimData(account); // monitor the status of the claim from contracts and txns

  const {
    claimCallback
  } = useClaimCallback(account);
  const unclaimedAmount = useUserUnclaimedAmount(account);
  const {
    claimSubmitted,
    claimTxn
  } = useUserHasSubmittedClaim(account !== null && account !== void 0 ? account : undefined);
  const claimConfirmed = Boolean(claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.receipt);

  function onClaim() {
    setAttempting(true);
    claimCallback() // reset modal and log error
    .catch(error => {
      setAttempting(false);
      console.log(error);
    });
  } // once confirmed txn is found, if modal is closed open, mark as not attempting regradless


  useEffect(() => {
    if (claimConfirmed && claimSubmitted && attempting) {
      setAttempting(false);

      if (!isOpen) {
        toggleClaimModal();
      }
    }
  }, [attempting, claimConfirmed, claimSubmitted, isOpen, toggleClaimModal]);
  const nonLPAmount = JSBI.multiply(JSBI.BigInt((userClaimData !== null && userClaimData !== void 0 && (_userClaimData$flags = userClaimData.flags) !== null && _userClaimData$flags !== void 0 && _userClaimData$flags.isSOCKS ? SOCKS_AMOUNT : 0) + (userClaimData !== null && userClaimData !== void 0 && (_userClaimData$flags2 = userClaimData.flags) !== null && _userClaimData$flags2 !== void 0 && _userClaimData$flags2.isUser ? USER_AMOUNT : 0)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)));
  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: isOpen,
    onDismiss: toggleClaimModal,
    maxHeight: 90,
    children: [/*#__PURE__*/_jsx(Confetti, {
      start: Boolean(isOpen && claimConfirmed)
    }), !attempting && !claimConfirmed && /*#__PURE__*/_jsxs(ContentWrapper, {
      gap: "lg",
      children: [/*#__PURE__*/_jsxs(ModalUpper, {
        children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsxs(CardSection, {
          gap: "md",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.White, {
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Claim UNI"
              })
            }), /*#__PURE__*/_jsx(CloseIcon, {
              onClick: toggleClaimModal,
              style: {
                zIndex: 99
              },
              color: "white"
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
        }), /*#__PURE__*/_jsx(Break, {}), /*#__PURE__*/_jsxs(CardSection, {
          gap: "sm",
          children: [(userClaimData === null || userClaimData === void 0 ? void 0 : (_userClaimData$flags3 = userClaimData.flags) === null || _userClaimData$flags3 === void 0 ? void 0 : _userClaimData$flags3.isSOCKS) && /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: "SOCKS"
            }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{SOCKS_AMOUNT} UNI",
                values: {
                  SOCKS_AMOUNT: SOCKS_AMOUNT
                }
              })
            })]
          }), (userClaimData === null || userClaimData === void 0 ? void 0 : (_userClaimData$flags4 = userClaimData.flags) === null || _userClaimData$flags4 === void 0 ? void 0 : _userClaimData$flags4.isLP) && unclaimedAmount && JSBI.greaterThanOrEqual(unclaimedAmount.quotient, nonLPAmount) && /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Liquidity"
              })
            }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{0} UNI",
                values: {
                  0: unclaimedAmount.subtract(CurrencyAmount.fromRawAmount(unclaimedAmount.currency, nonLPAmount)).toFixed(0, {
                    groupSeparator: ','
                  })
                }
              })
            })]
          }), (userClaimData === null || userClaimData === void 0 ? void 0 : (_userClaimData$flags5 = userClaimData.flags) === null || _userClaimData$flags5 === void 0 ? void 0 : _userClaimData$flags5.isUser) && /*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "User"
              })
            }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
              color: "white",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "{USER_AMOUNT} UNI",
                values: {
                  USER_AMOUNT: USER_AMOUNT
                }
              })
            })]
          })]
        })]
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
            id: "As a member of the Uniswap community you may claim UNI to be used for voting and governance.<0/><1/><2>Read more about UNI</2>",
            components: {
              0: /*#__PURE__*/_jsx("br", {}),
              1: /*#__PURE__*/_jsx("br", {}),
              2: /*#__PURE__*/_jsx(ExternalLink, {
                href: "https://uniswap.org/blog/uni"
              })
            }
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          disabled: !isAddress(account !== null && account !== void 0 ? account : ''),
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
          onClick: toggleClaimModal,
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
          alt: "UNI"
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
              id: "Claimed!"
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
          })]
        }), claimConfirmed && /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
            fontWeight: 500,
            color: "black",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "<0>\uD83C\uDF89 </0>Welcome to team Unicorn :) <1>\uD83C\uDF89</1>",
              components: {
                0: /*#__PURE__*/_jsx("span", {
                  role: "img",
                  "aria-label": "party-hat"
                }),
                1: /*#__PURE__*/_jsx("span", {
                  role: "img",
                  "aria-label": "party-hat"
                })
              }
            })
          })
        }), attempting && !claimSubmitted && /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          color: "black",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm this transaction in your wallet"
          })
        }), attempting && claimSubmitted && !claimConfirmed && chainId && (claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.hash) && /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.hash, ExplorerDataType.TRANSACTION),
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