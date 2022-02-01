import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { network } from '../../connectors';
import { NetworkContextName } from '../../constants/misc';
import { useEagerConnect, useInactiveListener } from '../../hooks/web3';
import { jsx as _jsx } from "react/jsx-runtime";

const MessageWrapper = _styled.div.withConfig({
  displayName: "Web3ReactManager__MessageWrapper",
  componentId: "sc-1bdulxg-0"
})(["display:flex;align-items:center;justify-content:center;height:20rem;"]);

const Message = _styled.h2.withConfig({
  displayName: "Web3ReactManager__Message",
  componentId: "sc-1bdulxg-1"
})(["color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.secondary1;
});

export default function Web3ReactManager(_ref2) {
  let {
    children
  } = _ref2;
  const {
    active
  } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork
  } = useWeb3React(NetworkContextName); // try to eagerly connect to an injected provider, if it exists and has granted access already

  const triedEager = useEagerConnect(); // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd

  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]); // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists

  useInactiveListener(!triedEager); // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error

  if (triedEager && !active && networkError) {
    return /*#__PURE__*/_jsx(MessageWrapper, {
      children: /*#__PURE__*/_jsx(Message, {
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device."
        })
      })
    });
  }

  return children;
}