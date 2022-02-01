import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useState } from 'react';
import { useStakingContract } from '../../hooks/useContract';
import { useActiveWeb3React } from '../../hooks/web3';
import { TransactionType } from '../../state/transactions/actions';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { CloseIcon, ThemedText } from '../../theme';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import FormattedCurrencyAmount from '../FormattedCurrencyAmount';
import Modal from '../Modal';
import { LoadingView, SubmittedView } from '../ModalViews';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "UnstakingModal__ContentWrapper",
  componentId: "sc-14wre31-0"
})(["width:100%;padding:1rem;"]);

export default function UnstakingModal(_ref) {
  var _error2, _stakingInfo$stakedAm, _stakingInfo$earnedAm;

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

  function wrappedOndismiss() {
    setHash(undefined);
    setAttempting(false);
    onDismiss();
  }

  const stakingContract = useStakingContract(stakingInfo.stakingRewardAddress);

  async function onWithdraw() {
    if (stakingContract && stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount) {
      setAttempting(true);
      await stakingContract.exit({
        gasLimit: 300000
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.WITHDRAW_LIQUIDITY_STAKING,
          token0Address: stakingInfo.tokens[0].address,
          token1Address: stakingInfo.tokens[1].address
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
      id: "Connect a wallet"
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
    onDismiss: wrappedOndismiss,
    maxHeight: 90,
    children: [!attempting && !hash && /*#__PURE__*/_jsxs(ContentWrapper, {
      gap: "lg",
      children: [/*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Withdraw"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: wrappedOndismiss
        })]
      }), (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.stakedAmount) && /*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        gap: "md",
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 600,
          fontSize: 36,
          children: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
            currencyAmount: stakingInfo.stakedAmount
          })
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Deposited liquidity:"
          })
        })]
      }), (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.earnedAmount) && /*#__PURE__*/_jsxs(AutoColumn, {
        justify: "center",
        gap: "md",
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          fontWeight: 600,
          fontSize: 36,
          children: /*#__PURE__*/_jsx(FormattedCurrencyAmount, {
            currencyAmount: stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.earnedAmount
          })
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
          id: "When you withdraw, your UNI is claimed and your liquidity is removed from the mining pool."
        })
      }), /*#__PURE__*/_jsx(ButtonError, {
        disabled: !!error,
        error: !!error && !!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.stakedAmount),
        onClick: onWithdraw,
        children: (_error2 = error) !== null && _error2 !== void 0 ? _error2 : /*#__PURE__*/_jsx(Trans, {
          id: "Withdraw & Claim"
        })
      })]
    }), attempting && !hash && /*#__PURE__*/_jsx(LoadingView, {
      onDismiss: wrappedOndismiss,
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(ThemedText.Body, {
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Withdrawing {0} UNI-V2",
            values: {
              0: stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakedAm = stakingInfo.stakedAmount) === null || _stakingInfo$stakedAm === void 0 ? void 0 : _stakingInfo$stakedAm.toSignificant(4)
            }
          })
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Claiming {0} UNI",
            values: {
              0: stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$earnedAm = stakingInfo.earnedAmount) === null || _stakingInfo$earnedAm === void 0 ? void 0 : _stakingInfo$earnedAm.toSignificant(4)
            }
          })
        })]
      })
    }), hash && /*#__PURE__*/_jsx(SubmittedView, {
      onDismiss: wrappedOndismiss,
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
            id: "Withdrew UNI-V2!"
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