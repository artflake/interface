import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from "../../components/Button";
import { AutoColumn } from "../../components/Column";
import { CardBGImage, CardNoise, CardSection, DataCard } from "../../components/earn/styled";
import FormattedCurrencyAmount from "../../components/FormattedCurrencyAmount";
import Loader from "../../components/Loader";
import { AutoRow, RowBetween, RowFixed } from "../../components/Row";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import DelegateModal from "../../components/vote/DelegateModal";
import ProposalEmptyState from "../../components/vote/ProposalEmptyState";
import { useActiveWeb3React } from "../../hooks/web3";
import JSBI from 'jsbi';
import { darken } from 'polished';
import { Link } from 'react-router-dom';
import { Button } from 'rebass/styled-components';
import { useModalOpen, useToggleDelegateModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useAllProposalData, useUserDelegatee, useUserVotes } from "../../state/governance/hooks";
import { useTokenBalance } from "../../state/wallet/hooks";
import { ExternalLink, ThemedText } from "../../theme";
import { shortenAddress } from "../../utils";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { ZERO_ADDRESS } from "../../constants/misc";
import { UNI } from "../../constants/tokens";
import { ProposalStatus } from "./styled";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "Landing__PageWrapper",
  componentId: "sc-uxt6ak-0"
})([""]);

const TopSection = _styled(AutoColumn).withConfig({
  displayName: "Landing__TopSection",
  componentId: "sc-uxt6ak-1"
})(["max-width:640px;width:100%;"]);

const Proposal = _styled(Button).withConfig({
  displayName: "Landing__Proposal",
  componentId: "sc-uxt6ak-2"
})(["padding:0.75rem 1rem;width:100%;margin-top:1rem;border-radius:12px;display:flex;justify-content:space-between;align-items:center;text-align:left;outline:none;cursor:pointer;color:", ";text-decoration:none;background-color:", ";&:focus{background-color:", ";}&:hover{background-color:", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return darken(0.05, theme.bg1);
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return darken(0.05, theme.bg1);
});

const ProposalNumber = _styled.span.withConfig({
  displayName: "Landing__ProposalNumber",
  componentId: "sc-uxt6ak-3"
})(["opacity:0.6;flex:0 0 40px;"]);

const ProposalTitle = _styled.span.withConfig({
  displayName: "Landing__ProposalTitle",
  componentId: "sc-uxt6ak-4"
})(["font-weight:600;flex:1;max-width:420px;white-space:initial;word-wrap:break-word;padding-right:10px;"]);

const VoteCard = _styled(DataCard).withConfig({
  displayName: "Landing__VoteCard",
  componentId: "sc-uxt6ak-5"
})(["background:radial-gradient(76.02% 75.41% at 1.84% 0%,#27ae60 0%,#000000 100%);overflow:hidden;"]);

const WrapSmall = _styled(RowBetween).withConfig({
  displayName: "Landing__WrapSmall",
  componentId: "sc-uxt6ak-6"
})(["margin-bottom:1rem;", ";"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
  `;
});

const TextButton = _styled(ThemedText.Main).withConfig({
  displayName: "Landing__TextButton",
  componentId: "sc-uxt6ak-7"
})(["color:", ";:hover{cursor:pointer;text-decoration:underline;}"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.primary1;
});

const AddressButton = _styled.div.withConfig({
  displayName: "Landing__AddressButton",
  componentId: "sc-uxt6ak-8"
})(["border:1px solid ", ";padding:2px 4px;border-radius:8px;display:flex;justify-content:center;align-items:center;"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg3;
});

const StyledExternalLink = _styled(ExternalLink).withConfig({
  displayName: "Landing__StyledExternalLink",
  componentId: "sc-uxt6ak-9"
})(["color:", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.text1;
});

export default function Landing() {
  var _allProposals$slice, _allProposals$slice$r;

  const {
    account,
    chainId
  } = useActiveWeb3React(); // toggle for showing delegation modal

  const showDelegateModal = useModalOpen(ApplicationModal.DELEGATE);
  const toggleDelegateModal = useToggleDelegateModal(); // get data to list all proposals

  const {
    data: allProposals,
    loading: loadingProposals
  } = useAllProposalData(); // user data

  const {
    loading: loadingAvailableVotes,
    votes: availableVotes
  } = useUserVotes();
  const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId ? UNI[chainId] : undefined);
  const userDelegatee = useUserDelegatee(); // show delegation option if they have have a balance, but have not delegated

  const showUnlockVoting = Boolean(uniBalance && JSBI.notEqual(uniBalance.quotient, JSBI.BigInt(0)) && userDelegatee === ZERO_ADDRESS);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(PageWrapper, {
      gap: "lg",
      justify: "center",
      children: [/*#__PURE__*/_jsx(DelegateModal, {
        isOpen: showDelegateModal,
        onDismiss: toggleDelegateModal,
        title: showUnlockVoting ? /*#__PURE__*/_jsx(Trans, {
          id: "Unlock Votes"
        }) : /*#__PURE__*/_jsx(Trans, {
          id: "Update Delegation"
        })
      }), /*#__PURE__*/_jsx(TopSection, {
        gap: "md",
        children: /*#__PURE__*/_jsxs(VoteCard, {
          children: [/*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {}), /*#__PURE__*/_jsx(CardSection, {
            children: /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "md",
              children: [/*#__PURE__*/_jsx(RowBetween, {
                children: /*#__PURE__*/_jsx(ThemedText.White, {
                  fontWeight: 600,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Uniswap Governance"
                  })
                })
              }), /*#__PURE__*/_jsx(RowBetween, {
                children: /*#__PURE__*/_jsx(ThemedText.White, {
                  fontSize: 14,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "UNI tokens represent voting shares in Uniswap governance. You can vote on each proposal yourself or delegate your votes to a third party."
                  })
                })
              }), /*#__PURE__*/_jsx(ExternalLink, {
                style: {
                  color: 'white',
                  textDecoration: 'underline'
                },
                href: "https://uniswap.org/blog/uni",
                target: "_blank",
                children: /*#__PURE__*/_jsx(ThemedText.White, {
                  fontSize: 14,
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Read more about Uniswap governance"
                  })
                })
              })]
            })
          }), /*#__PURE__*/_jsx(CardBGImage, {}), /*#__PURE__*/_jsx(CardNoise, {})]
        })
      }), /*#__PURE__*/_jsxs(TopSection, {
        gap: "2px",
        children: [/*#__PURE__*/_jsxs(WrapSmall, {
          children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            style: {
              margin: '0.5rem 0.5rem 0.5rem 0',
              flexShrink: 0
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Proposals"
            })
          }), /*#__PURE__*/_jsxs(AutoRow, {
            gap: "6px",
            justify: "flex-end",
            children: [loadingProposals || loadingAvailableVotes ? /*#__PURE__*/_jsx(Loader, {}) : null, showUnlockVoting ? /*#__PURE__*/_jsx(ButtonPrimary, {
              style: {
                width: 'fit-content'
              },
              padding: "8px",
              $borderRadius: "8px",
              onClick: toggleDelegateModal,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Unlock Voting"
              })
            }) : availableVotes && JSBI.notEqual(JSBI.BigInt(0), availableVotes === null || availableVotes === void 0 ? void 0 : availableVotes.quotient) ? /*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              mr: "6px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "<0/> Votes",
                components: {
                  0: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                    currencyAmount: availableVotes
                  })
                }
              })
            }) : uniBalance && userDelegatee && userDelegatee !== ZERO_ADDRESS && JSBI.notEqual(JSBI.BigInt(0), uniBalance === null || uniBalance === void 0 ? void 0 : uniBalance.quotient) ? /*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              mr: "6px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "<0/> Votes",
                components: {
                  0: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
                    currencyAmount: uniBalance
                  })
                }
              })
            }) : '', /*#__PURE__*/_jsx(ButtonPrimary, {
              as: Link,
              to: "/create-proposal",
              style: {
                width: 'fit-content',
                borderRadius: '8px'
              },
              padding: "8px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Create Proposal"
              })
            })]
          })]
        }), !showUnlockVoting && /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx("div", {}), userDelegatee && userDelegatee !== ZERO_ADDRESS ? /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              mr: "4px",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Delegated to:"
              })
            }), /*#__PURE__*/_jsxs(AddressButton, {
              children: [/*#__PURE__*/_jsx(StyledExternalLink, {
                href: getExplorerLink(1, userDelegatee, ExplorerDataType.ADDRESS),
                style: {
                  margin: '0 4px'
                },
                children: userDelegatee === account ? /*#__PURE__*/_jsx(Trans, {
                  id: "Self"
                }) : shortenAddress(userDelegatee)
              }), /*#__PURE__*/_jsx(TextButton, {
                onClick: toggleDelegateModal,
                style: {
                  marginLeft: '4px'
                },
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "(edit)"
                })
              })]
            })]
          }) : '']
        }), (allProposals === null || allProposals === void 0 ? void 0 : allProposals.length) === 0 && /*#__PURE__*/_jsx(ProposalEmptyState, {}), allProposals === null || allProposals === void 0 ? void 0 : (_allProposals$slice = allProposals.slice(0)) === null || _allProposals$slice === void 0 ? void 0 : (_allProposals$slice$r = _allProposals$slice.reverse()) === null || _allProposals$slice$r === void 0 ? void 0 : _allProposals$slice$r.map(p => {
          return /*#__PURE__*/_jsxs(Proposal, {
            as: Link,
            to: `/vote/${p.governorIndex}/${p.id}`,
            children: [/*#__PURE__*/_jsxs(ProposalNumber, {
              children: [p.governorIndex, ".", p.id]
            }), /*#__PURE__*/_jsx(ProposalTitle, {
              children: p.title
            }), /*#__PURE__*/_jsx(ProposalStatus, {
              status: p.status
            })]
          }, `${p.governorIndex}${p.id}`);
        })]
      }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
        color: "text3",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "A minimum threshold of 0.25% of the total UNI supply is required to submit proposals"
        })
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}