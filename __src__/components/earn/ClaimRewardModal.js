import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useState } from 'react';
import { useStakingContract } from "../../hooks/useContract";
import { useActiveWeb3React } from "../../hooks/web3";
import { TransactionType } from "../../state/transactions/actions";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { CloseIcon, ThemedText } from "../../theme";
import { ButtonError } from "../Button";
import { AutoColumn } from "../Column";
import Modal from "../Modal";
import { LoadingView, SubmittedView } from "../ModalViews";
import { RowBetween } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "ClaimRewardModal__ContentWrapper",
  componentId: "sc-jsl5h0-0"
})(["width:100%;padding:1rem;"]);

export default function ClaimRewardModal(_ref) {
  var _stakingInfo$earnedAm, _error2, _stakingInfo$earnedAm2;

  let {
    isOpen,
    onDismiss,
    stakingInfo
  } = _ref;
  const {
    account
  } = useActiveWeb3React(); // monitor call to help UI loading state

  const addTransaction = useTransactionAdder();
  const [hash, setHash] = useState();
  const [attempting, setAttempting] = useState(false);

  function wrappedOnDismiss() {
    setHash(undefined);
    setAttempting(false);
    onDismiss();
  }

  const stakingContract = useStakingContract(stakingInfo.stakingRewardAddress);

  async function onClaimReward() {
    if (stakingContract && stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount && account) {
      setAttempting(true);
      await stakingContract.getReward({
        gasLimit: 350000
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.CLAIM,
          recipient: account
        });
        setHash(response.hash);
      }).catch(error => {
        setAttempting(false);
        console.log(error);
      });
    }
  }

  let error;

  if (!account) {
    error = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount)) {
    var _error;

    error = (_error = error) !== null && _error !== void 0 ? _error : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  return /*#__PURE__*/_jsxs(Modal, {
    isOpen: isOpen,
    onDismiss: wrappedOnDismiss,
    maxHeight: 90,
    children: [!attempting && !hash && /*#__PURE__*/_jsxs(ContentWrapper, {
      gap: "lg",
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claim"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: wrappedOnDismiss
        })]
      }), (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.earnedAmount) && /*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        gap: "md",
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 600,
          fontSize: 36,
          children: stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$earnedAm = stakingInfo.earnedAmount) === null || _stakingInfo$earnedAm === void 0 ? void 0 : _stakingInfo$earnedAm.toSignificant(6)
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Unclaimed UNI"
          })
        })]
      }), /*#__PURE__*/_jsx(ThemedText.SubHeader, {
        style: {
          textAlign: 'center'
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "When you claim without withdrawing your liquidity remains in the mining pool."
        })
      }), /*#__PURE__*/_jsx(ButtonError, {
        disabled: !!error,
        error: !!error && !!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount),
        onClick: onClaimReward,
        children: (_error2 = error) !== null && _error2 !== void 0 ? _error2 : /*#__PURE__*/_jsx(Trans, {
          id: "Claim"
        })
      })]
    }), attempting && !hash && /*#__PURE__*/_jsx(LoadingView, {
      onDismiss: wrappedOnDismiss,
      children: /*#__PURE__*/_jsx(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: /*#__PURE__*/_jsx(ThemedText.Body, {
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claiming {0} UNI",
            values: {
              0: stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$earnedAm2 = stakingInfo.earnedAmount) === null || _stakingInfo$earnedAm2 === void 0 ? void 0 : _stakingInfo$earnedAm2.toSignificant(6)
            }
          })
        })
      })
    }), hash && /*#__PURE__*/_jsx(SubmittedView, {
      onDismiss: wrappedOnDismiss,
      hash: hash,
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(ThemedText.LargeHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Transaction Submitted"
          })
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claimed UNI!"
          })
        })]
      })
    })]
  });
}