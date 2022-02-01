import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { isAddress } from '@ethersproject/address';
import { useState } from 'react';
import { X } from 'react-feather';
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount';
import { UNI } from '../../constants/tokens';
import useENS from '../../hooks/useENS';
import { useActiveWeb3React } from '../../hooks/web3';
import { useDelegateCallback } from '../../state/governance/hooks';
import { useTokenBalance } from '../../state/wallet/hooks';
import { ThemedText } from '../../theme';
import AddressInputPanel from '../AddressInputPanel';
import { ButtonPrimary } from '../Button';
import { AutoColumn } from '../Column';
import Modal from '../Modal';
import { LoadingView, SubmittedView } from '../ModalViews';
import { RowBetween } from '../Row';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const ContentWrapper = _styled(AutoColumn).withConfig({
  displayName: "DelegateModal__ContentWrapper",
  componentId: "sc-1t2p2c9-0"
})(["width:100%;padding:24px;"]);

const StyledClosed = _styled(X).withConfig({
  displayName: "DelegateModal__StyledClosed",
  componentId: "sc-1t2p2c9-1"
})([":hover{cursor:pointer;}"]);

const TextButton = _styled.div.withConfig({
  displayName: "DelegateModal__TextButton",
  componentId: "sc-1t2p2c9-2"
})([":hover{cursor:pointer;}"]);

export default function DelegateModal(_ref) {
  let {
    isOpen,
    onDismiss,
    title
  } = _ref;
  const {
    account,
    chainId
  } = useActiveWeb3React(); // state for delegate input

  const [usingDelegate, setUsingDelegate] = useState(false);
  const [typed, setTyped] = useState('');

  function handleRecipientType(val) {
    setTyped(val);
  } // monitor for self delegation or input for third part delegate
  // default is self delegation


  const activeDelegate = usingDelegate ? typed : account;
  const {
    address: parsedAddress
  } = useENS(activeDelegate); // get the number of votes available to delegate

  const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId ? UNI[chainId] : undefined);
  const delegateCallback = useDelegateCallback(); // monitor call to help UI loading state

  const [hash, setHash] = useState();
  const [attempting, setAttempting] = useState(false); // wrapper to reset state on modal close

  function wrappedOndismiss() {
    setHash(undefined);
    setAttempting(false);
    onDismiss();
  }

  async function onDelegate() {
    var _delegateCallback;

    setAttempting(true); // if callback not returned properly ignore

    if (!delegateCallback) return; // try delegation and store hash

    const hash = await ((_delegateCallback = delegateCallback(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : undefined)) === null || _delegateCallback === void 0 ? void 0 : _delegateCallback.catch(error => {
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
            children: title
          }), /*#__PURE__*/_jsx(StyledClosed, {
            stroke: "black",
            onClick: wrappedOndismiss
          })]
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Earned UNI tokens represent voting shares in Uniswap governance."
          })
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "You can either vote on each proposal yourself or delegate your votes to a third party."
          })
        }), usingDelegate && /*#__PURE__*/_jsx(AddressInputPanel, {
          value: typed,
          onChange: handleRecipientType
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          disabled: !isAddress(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : ''),
          onClick: onDelegate,
          children: /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
            color: "white",
            children: usingDelegate ? /*#__PURE__*/_jsx(Trans, {
              id: "Delegate Votes"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Self Delegate"
            })
          })
        }), /*#__PURE__*/_jsx(TextButton, {
          onClick: () => setUsingDelegate(!usingDelegate),
          children: /*#__PURE__*/_jsx(ThemedText.Blue, {
            children: usingDelegate ? /*#__PURE__*/_jsx(Trans, {
              id: "Remove Delegate"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Add Delegate +"
            })
          })
        })]
      })
    }), attempting && !hash && /*#__PURE__*/_jsx(LoadingView, {
      onDismiss: wrappedOndismiss,
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "12px",
        justify: 'center',
        children: [/*#__PURE__*/_jsx(ThemedText.LargeHeader, {
          children: usingDelegate ? /*#__PURE__*/_jsx(Trans, {
            id: "Delegating votes"
          }) : /*#__PURE__*/_jsx(Trans, {
            id: "Unlocking Votes"
          })
        }), /*#__PURE__*/_jsxs(ThemedText.Main, {
          fontSize: 36,
          children: [" ", formatCurrencyAmount(uniBalance, 4)]
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
        }), /*#__PURE__*/_jsx(ThemedText.Main, {
          fontSize: 36,
          children: formatCurrencyAmount(uniBalance, 4)
        })]
      })
    })]
  });
}