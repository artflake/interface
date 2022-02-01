import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { BigNumber } from '@ethersproject/bignumber'; // eslint-disable-next-line no-restricted-imports

import { useActiveLocale } from "../../hooks/useActiveLocale";
import useCurrentBlockTimestamp from "../../hooks/useCurrentBlockTimestamp";
import JSBI from 'jsbi';
import { useState } from 'react';
import { ArrowLeft } from 'react-feather';
import ReactMarkdown from 'react-markdown';
import { ButtonPrimary } from "../../components/Button";
import { GreyCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import { CardSection, DataCard } from "../../components/earn/styled";
import { RowBetween, RowFixed } from "../../components/Row";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import DelegateModal from "../../components/vote/DelegateModal";
import VoteModal from "../../components/vote/VoteModal";
import { AVERAGE_BLOCK_TIME_IN_SECS, COMMON_CONTRACT_NAMES, DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS } from "../../constants/governance";
import { ZERO_ADDRESS } from "../../constants/misc";
import { UNI } from "../../constants/tokens";
import { useActiveWeb3React } from "../../hooks/web3";
import { useBlockNumber, useModalOpen, useToggleDelegateModal, useToggleVoteModal } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { ProposalState, useProposalData, useUserDelegatee, useUserVotesAsOfBlock } from "../../state/governance/hooks";
import { VoteOption } from "../../state/governance/types";
import { useTokenBalance } from "../../state/wallet/hooks";
import { ExternalLink, StyledInternalLink, ThemedText } from "../../theme";
import { isAddress } from "../../utils";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { ProposalStatus } from "./styled";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "VotePage__PageWrapper",
  componentId: "sc-1vobn0f-0"
})(["width:100%;"]);

const ProposalInfo = _styled(AutoColumn).withConfig({
  displayName: "VotePage__ProposalInfo",
  componentId: "sc-1vobn0f-1"
})(["background:", ";border-radius:12px;padding:1.5rem;position:relative;max-width:640px;width:100%;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg0;
});

const ArrowWrapper = _styled(StyledInternalLink).withConfig({
  displayName: "VotePage__ArrowWrapper",
  componentId: "sc-1vobn0f-2"
})(["display:flex;align-items:center;gap:8px;height:24px;color:", ";a{color:", ";text-decoration:none;}:hover{text-decoration:none;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text1;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text1;
});

const CardWrapper = _styled.div.withConfig({
  displayName: "VotePage__CardWrapper",
  componentId: "sc-1vobn0f-3"
})(["display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;"]);

const StyledDataCard = _styled(DataCard).withConfig({
  displayName: "VotePage__StyledDataCard",
  componentId: "sc-1vobn0f-4"
})(["width:100%;background:none;background-color:", ";height:fit-content;z-index:2;"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg1;
});

const ProgressWrapper = _styled.div.withConfig({
  displayName: "VotePage__ProgressWrapper",
  componentId: "sc-1vobn0f-5"
})(["width:100%;margin-top:1rem;height:4px;border-radius:4px;background-color:", ";position:relative;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg3;
});

const Progress = _styled.div.withConfig({
  displayName: "VotePage__Progress",
  componentId: "sc-1vobn0f-6"
})(["height:4px;border-radius:4px;background-color:", ";width:", ";"], _ref6 => {
  let {
    theme,
    status
  } = _ref6;
  return status === 'for' ? theme.green1 : theme.red1;
}, _ref7 => {
  let {
    percentageString
  } = _ref7;
  return percentageString;
});

const MarkDownWrapper = _styled.div.withConfig({
  displayName: "VotePage__MarkDownWrapper",
  componentId: "sc-1vobn0f-7"
})(["max-width:640px;overflow:hidden;"]);

const WrapSmall = _styled(RowBetween).withConfig({
  displayName: "VotePage__WrapSmall",
  componentId: "sc-1vobn0f-8"
})(["", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.mediaWidth.upToSmall`
    align-items: flex-start;
    flex-direction: column;
  `;
});

const DetailText = _styled.div.withConfig({
  displayName: "VotePage__DetailText",
  componentId: "sc-1vobn0f-9"
})(["word-break:break-all;"]);

const ProposerAddressLink = _styled(ExternalLink).withConfig({
  displayName: "VotePage__ProposerAddressLink",
  componentId: "sc-1vobn0f-10"
})(["word-break:break-all;"]);

function getDateFromBlock(targetBlock, currentBlock, averageBlockTimeInSeconds, currentTimestamp) {
  if (targetBlock && currentBlock && averageBlockTimeInSeconds && currentTimestamp) {
    const date = new Date();
    date.setTime(currentTimestamp.add(BigNumber.from(averageBlockTimeInSeconds).mul(BigNumber.from(targetBlock - currentBlock))).toNumber() * 1000);
    return date;
  }

  return undefined;
}

export default function VotePage(_ref9) {
  var _ref10, _ref11, _proposalData$startBl, _proposalData$forCoun, _proposalData$against, _proposalData$details;

  let {
    match: {
      params: {
        governorIndex,
        id
      }
    }
  } = _ref9;
  const {
    chainId,
    account
  } = useActiveWeb3React(); // get data for this specific proposal

  const proposalData = useProposalData(Number.parseInt(governorIndex), id); // update vote option based on button interactions

  const [voteOption, setVoteOption] = useState(undefined); // modal for casting votes

  const showVoteModal = useModalOpen(ApplicationModal.VOTE);
  const toggleVoteModal = useToggleVoteModal(); // toggle for showing delegation modal

  const showDelegateModal = useModalOpen(ApplicationModal.DELEGATE);
  const toggleDelegateModal = useToggleDelegateModal(); // get and format date from data

  const currentTimestamp = useCurrentBlockTimestamp();
  const currentBlock = useBlockNumber();
  const startDate = getDateFromBlock(proposalData === null || proposalData === void 0 ? void 0 : proposalData.startBlock, currentBlock, (_ref10 = chainId && AVERAGE_BLOCK_TIME_IN_SECS[chainId]) !== null && _ref10 !== void 0 ? _ref10 : DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS, currentTimestamp);
  const endDate = getDateFromBlock(proposalData === null || proposalData === void 0 ? void 0 : proposalData.endBlock, currentBlock, (_ref11 = chainId && AVERAGE_BLOCK_TIME_IN_SECS[chainId]) !== null && _ref11 !== void 0 ? _ref11 : DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS, currentTimestamp);
  const now = new Date();
  const locale = useActiveLocale();
  const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }; // get total votes and format percentages for UI

  const totalVotes = proposalData ? proposalData.forCount + proposalData.againstCount : undefined;

  const forPercentage =
  /*i18n*/
  i18n._("{0} %", {
    0: proposalData && totalVotes ? (proposalData.forCount * 100 / totalVotes).toFixed(0) : '0'
  });

  const againstPercentage =
  /*i18n*/
  i18n._("{0} %", {
    0: proposalData && totalVotes ? (proposalData.againstCount * 100 / totalVotes).toFixed(0) : '0'
  }); // only count available votes as of the proposal start block


  const availableVotes = useUserVotesAsOfBlock((_proposalData$startBl = proposalData === null || proposalData === void 0 ? void 0 : proposalData.startBlock) !== null && _proposalData$startBl !== void 0 ? _proposalData$startBl : undefined); // only show voting if user has > 0 votes at proposal start block and proposal is active,

  const showVotingButtons = availableVotes && JSBI.greaterThan(availableVotes.quotient, JSBI.BigInt(0)) && proposalData && proposalData.status === ProposalState.ACTIVE;
  const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId ? UNI[chainId] : undefined);
  const userDelegatee = useUserDelegatee(); // in blurb link to home page if they are able to unlock

  const showLinkForUnlock = Boolean(uniBalance && JSBI.notEqual(uniBalance.quotient, JSBI.BigInt(0)) && userDelegatee === ZERO_ADDRESS); // show links in propsoal details if content is an address
  // if content is contract with common name, replace address with common name

  const linkIfAddress = content => {
    if (isAddress(content) && chainId) {
      var _COMMON_CONTRACT_NAME, _COMMON_CONTRACT_NAME2;

      const commonName = (_COMMON_CONTRACT_NAME = (_COMMON_CONTRACT_NAME2 = COMMON_CONTRACT_NAMES[chainId]) === null || _COMMON_CONTRACT_NAME2 === void 0 ? void 0 : _COMMON_CONTRACT_NAME2[content]) !== null && _COMMON_CONTRACT_NAME !== void 0 ? _COMMON_CONTRACT_NAME : content;
      return /*#__PURE__*/_jsx(ExternalLink, {
        href: getExplorerLink(chainId, content, ExplorerDataType.ADDRESS),
        children: commonName
      });
    }

    return /*#__PURE__*/_jsx("span", {
      children: content
    });
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(PageWrapper, {
      gap: "lg",
      justify: "center",
      children: [/*#__PURE__*/_jsx(VoteModal, {
        isOpen: showVoteModal,
        onDismiss: toggleVoteModal,
        proposalId: proposalData === null || proposalData === void 0 ? void 0 : proposalData.id,
        voteOption: voteOption
      }), /*#__PURE__*/_jsx(DelegateModal, {
        isOpen: showDelegateModal,
        onDismiss: toggleDelegateModal,
        title: /*#__PURE__*/_jsx(Trans, {
          id: "Unlock Votes"
        })
      }), /*#__PURE__*/_jsxs(ProposalInfo, {
        gap: "lg",
        justify: "start",
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/_jsx(ArrowWrapper, {
            to: "/vote",
            children: /*#__PURE__*/_jsx(Trans, {
              id: "<0/> All Proposals",
              components: {
                0: /*#__PURE__*/_jsx(ArrowLeft, {
                  size: 20
                })
              }
            })
          }), proposalData && /*#__PURE__*/_jsx(ProposalStatus, {
            status: proposalData.status
          })]
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "10px",
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/_jsx(ThemedText.LargeHeader, {
            style: {
              marginBottom: '.5rem'
            },
            children: proposalData === null || proposalData === void 0 ? void 0 : proposalData.title
          }), /*#__PURE__*/_jsx(RowBetween, {
            children: /*#__PURE__*/_jsx(ThemedText.Main, {
              children: startDate && startDate > now ? /*#__PURE__*/_jsx(Trans, {
                id: "Voting starts approximately {0}",
                values: {
                  0: startDate.toLocaleString(locale, dateFormat)
                }
              }) : null
            })
          }), /*#__PURE__*/_jsx(RowBetween, {
            children: /*#__PURE__*/_jsx(ThemedText.Main, {
              children: endDate && (endDate < now ? /*#__PURE__*/_jsx(Trans, {
                id: "Voting ended {0}",
                values: {
                  0: endDate.toLocaleString(locale, dateFormat)
                }
              }) : /*#__PURE__*/_jsx(Trans, {
                id: "Voting ends approximately {0}",
                values: {
                  0: endDate.toLocaleString(locale, dateFormat)
                }
              }))
            })
          }), proposalData && proposalData.status === ProposalState.ACTIVE && !showVotingButtons && /*#__PURE__*/_jsx(GreyCard, {
            children: /*#__PURE__*/_jsxs(ThemedText.Black, {
              children: [/*#__PURE__*/_jsx(Trans, {
                id: "Only UNI votes that were self delegated or delegated to another address before block {0} are eligible for voting.",
                values: {
                  0: proposalData.startBlock
                }
              }), showLinkForUnlock && /*#__PURE__*/_jsx("span", {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "<0>Unlock voting</0> to prepare for the next proposal.",
                  components: {
                    0: /*#__PURE__*/_jsx(StyledInternalLink, {
                      to: "/vote"
                    })
                  }
                })
              })]
            })
          })]
        }), showVotingButtons ? /*#__PURE__*/_jsxs(RowFixed, {
          style: {
            width: '100%',
            gap: '12px'
          },
          children: [/*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            onClick: () => {
              setVoteOption(VoteOption.For);
              toggleVoteModal();
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Vote For"
            })
          }), /*#__PURE__*/_jsx(ButtonPrimary, {
            padding: "8px",
            $borderRadius: "8px",
            onClick: () => {
              setVoteOption(VoteOption.Against);
              toggleVoteModal();
            },
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Vote Against"
            })
          })]
        }) : '', /*#__PURE__*/_jsxs(CardWrapper, {
          children: [/*#__PURE__*/_jsx(StyledDataCard, {
            children: /*#__PURE__*/_jsxs(CardSection, {
              children: [/*#__PURE__*/_jsx(AutoColumn, {
                gap: "md",
                children: /*#__PURE__*/_jsxs(WrapSmall, {
                  children: [/*#__PURE__*/_jsx(ThemedText.Black, {
                    fontWeight: 600,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "For"
                    })
                  }), /*#__PURE__*/_jsx(ThemedText.Black, {
                    fontWeight: 600,
                    children: proposalData === null || proposalData === void 0 ? void 0 : (_proposalData$forCoun = proposalData.forCount) === null || _proposalData$forCoun === void 0 ? void 0 : _proposalData$forCoun.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })
                  })]
                })
              }), /*#__PURE__*/_jsx(ProgressWrapper, {
                children: /*#__PURE__*/_jsx(Progress, {
                  status: 'for',
                  percentageString: forPercentage
                })
              })]
            })
          }), /*#__PURE__*/_jsx(StyledDataCard, {
            children: /*#__PURE__*/_jsxs(CardSection, {
              children: [/*#__PURE__*/_jsx(AutoColumn, {
                gap: "md",
                children: /*#__PURE__*/_jsxs(WrapSmall, {
                  children: [/*#__PURE__*/_jsx(ThemedText.Black, {
                    fontWeight: 600,
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "Against"
                    })
                  }), /*#__PURE__*/_jsx(ThemedText.Black, {
                    fontWeight: 600,
                    children: proposalData === null || proposalData === void 0 ? void 0 : (_proposalData$against = proposalData.againstCount) === null || _proposalData$against === void 0 ? void 0 : _proposalData$against.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })
                  })]
                })
              }), /*#__PURE__*/_jsx(ProgressWrapper, {
                children: /*#__PURE__*/_jsx(Progress, {
                  status: 'against',
                  percentageString: againstPercentage
                })
              })]
            })
          })]
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            fontWeight: 600,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Details"
            })
          }), proposalData === null || proposalData === void 0 ? void 0 : (_proposalData$details = proposalData.details) === null || _proposalData$details === void 0 ? void 0 : _proposalData$details.map((d, i) => {
            return /*#__PURE__*/_jsxs(DetailText, {
              children: [i + 1, ": ", linkIfAddress(d.target), ".", d.functionSig, "(", d.callData.split(',').map((content, i) => {
                return /*#__PURE__*/_jsxs("span", {
                  children: [linkIfAddress(content), d.callData.split(',').length - 1 === i ? '' : ',']
                }, i);
              }), ")"]
            }, i);
          })]
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            fontWeight: 600,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Description"
            })
          }), /*#__PURE__*/_jsx(MarkDownWrapper, {
            children: /*#__PURE__*/_jsx(ReactMarkdown, {
              source: proposalData === null || proposalData === void 0 ? void 0 : proposalData.description
            })
          })]
        }), /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            fontWeight: 600,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Proposer"
            })
          }), /*#__PURE__*/_jsx(ProposerAddressLink, {
            href: proposalData !== null && proposalData !== void 0 && proposalData.proposer && chainId ? getExplorerLink(chainId, proposalData === null || proposalData === void 0 ? void 0 : proposalData.proposer, ExplorerDataType.ADDRESS) : '',
            children: /*#__PURE__*/_jsx(ReactMarkdown, {
              source: proposalData === null || proposalData === void 0 ? void 0 : proposalData.proposer
            })
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}