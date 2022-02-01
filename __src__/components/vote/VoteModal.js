import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useContext, useState } from 'react';
import { ArrowUpCircle, X } from 'react-feather';
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount';
import Circle from '../../assets/images/blue-loader.svg';
import { useActiveWeb3React } from '../../hooks/web3';
import { useUserVotes, useVoteCallback } from '../../state/governance/hooks';
import { VoteOption } from '../../state/governance/types';
import { CustomLightSpinner, ThemedText } from '../../theme';
import { ExternalLink } from '../../theme';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { ButtonPrimary } from '../Button';
import { AutoColumn, ColumnCenter } from '../Column';
import Modal from '../Modal';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "VoteModal__ContentWrapper",
  componentId: "sc-km2t4x-0"
})(["width:100%;padding:24px;"]);

const StyledClosed = _styled(X).withConfig({
  displayName: "VoteModal__StyledClosed",
  componentId: "sc-km2t4x-1"
})([":hover{cursor:pointer;}"]);

const ConfirmOrLoadingWrapper = _styled.div.withConfig({
  displayName: "VoteModal__ConfirmOrLoadingWrapper",
  componentId: "sc-km2t4x-2"
})(["width:100%;padding:24px;"]);

const ConfirmedIcon = _styled(ColumnCenter).withConfig({
  displayName: "VoteModal__ConfirmedIcon",
  componentId: "sc-km2t4x-3"
})(["padding:60px 0;"]);

export default function VoteModal(_ref) {
  let {
    isOpen,
    onDismiss,
    proposalId,
    voteOption
  } = _ref;
  const {
    chainId
  } = useActiveWeb3React();
  const {
    voteCallback
  } = useVoteCallback();
  const {
    votes: availableVotes
  } = useUserVotes(); // monitor call to help UI loading state

  const [hash, setHash] = useState();
  const [attempting, setAttempting] = useState(false); // get theme for colors

  const theme = useContext(_ThemeContext); // wrapper to reset state on modal close

  function wrappedOndismiss() {
    setHash(undefined);
    setAttempting(false);
    onDismiss();
  }

  async function onVote() {
    var _voteCallback;

    setAttempting(true); // if callback not returned properly ignore

    if (!voteCallback || voteOption === undefined) return; // try delegation and store hash

    const hash = await ((_voteCallback = voteCallback(proposalId, voteOption)) === null || _voteCallback === void 0 ? void 0 : _voteCallback.catch(error => {
      setAttempting(false);
      console.log(error);
    }));

    if (hash) {
      setHash(hash);
    }
  }

  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: isOpen,
    onDismiss: wrappedOndismiss,
    maxHeight: 90,
    children: [!attempting && !hash && /*#__PURE__*/_jsx(ContentWrapper, {
      gap: "lg",
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "lg",
        justify: "center",
        children: [/*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            fontWeight: 500,
            children: voteOption === VoteOption.Against ? /*#__PURE__*/_jsx(Trans, {
              id: "Vote against proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            }) : voteOption === VoteOption.For ? /*#__PURE__*/_jsx(Trans, {
              id: "Vote for proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Vote to abstain on proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            })
          }), /*#__PURE__*/_jsx(StyledClosed, {
            stroke: "black",
            onClick: wrappedOndismiss
          })]
        }), /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{0} Votes",
            values: {
              0: formatCurrencyAmount(availableVotes, 4)
            }
          })
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: onVote,
          children: /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            color: "white",
            children: voteOption === VoteOption.Against ? /*#__PURE__*/_jsx(Trans, {
              id: "Vote against proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            }) : voteOption === VoteOption.For ? /*#__PURE__*/_jsx(Trans, {
              id: "Vote for proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Vote to abstain on proposal {proposalId}",
              values: {
                proposalId: proposalId
              }
            })
          })
        })]
      })
    }), attempting && !hash && /*#__PURE__*/_jsxs(ConfirmOrLoadingWrapper, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(StyledClosed, {
          onClick: wrappedOndismiss
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        children: /*#__PURE__*/_jsx(CustomLightSpinner, {
          src: Circle,
          alt: "loader",
          size: '90px'
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "100px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(AutoColumn, {
          gap: "12px",
          justify: 'center',
          children: /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Submitting Vote"
            })
          })
        }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm this transaction in your wallet"
          })
        })]
      })]
    }), hash && /*#__PURE__*/_jsxs(ConfirmOrLoadingWrapper, {
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(StyledClosed, {
          onClick: wrappedOndismiss
        })]
      }), /*#__PURE__*/_jsx(ConfirmedIcon, {
        children: /*#__PURE__*/_jsx(ArrowUpCircle, {
          strokeWidth: 0.5,
          size: 90,
          color: theme.primary1
        })
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "100px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(AutoColumn, {
          gap: "12px",
          justify: 'center',
          children: /*#__PURE__*/_jsx(ThemedText.LargeHeader, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Transaction Submitted"
            })
          })
        }), chainId && /*#__PURE__*/_jsx(ExternalLink, {
          href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
          style: {
            marginLeft: '4px'
          },
          children: /*#__PURE__*/_jsx(ThemedText.SubHeader, {
            children: /*#__PURE__*/_jsx(Trans, {
              id: "View transaction on Explorer"
            })
          })
        })]
      })]
    })]
  });
}