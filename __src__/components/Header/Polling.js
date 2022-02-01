import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import { CHAIN_INFO } from 'constants/chains';
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp';
import useMachineTimeMs from 'hooks/useMachineTime';
import { useActiveWeb3React } from 'hooks/web3';
import { useEffect, useState } from 'react';
import { useBlockNumber } from 'state/application/hooks';
import { ExternalLink, ThemedText } from 'theme';
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink';
import { ChainConnectivityWarning } from './ChainConnectivityWarning';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const StyledPolling = _styled.div.withConfig({
  displayName: "Polling__StyledPolling",
  componentId: "sc-123dig8-0"
})(["position:fixed;display:flex;align-items:center;right:0;bottom:0;padding:1rem;color:", ";transition:250ms ease color;", ""], _ref => {
  let {
    theme,
    warning
  } = _ref;
  return warning ? theme.yellow3 : theme.green1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToMedium`
    display: none;
  `;
});

const StyledPollingNumber = _styled(ThemedText.Small).withConfig({
  displayName: "Polling__StyledPollingNumber",
  componentId: "sc-123dig8-1"
})(["transition:opacity 0.25s ease;opacity:", ";:hover{opacity:1;}"], _ref3 => {
  let {
    breathe,
    hovering
  } = _ref3;
  return hovering ? 0.7 : breathe ? 1 : 0.5;
});

const StyledPollingDot = _styled.div.withConfig({
  displayName: "Polling__StyledPollingDot",
  componentId: "sc-123dig8-2"
})(["width:8px;height:8px;min-height:8px;min-width:8px;border-radius:50%;position:relative;background-color:", ";transition:250ms ease background-color;"], _ref4 => {
  let {
    theme,
    warning
  } = _ref4;
  return warning ? theme.yellow3 : theme.green1;
});

const rotate360 = _keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = _styled.div.withConfig({
  displayName: "Polling__Spinner",
  componentId: "sc-123dig8-3"
})(["animation:", " 1s cubic-bezier(0.83,0,0.17,1) infinite;transform:translateZ(0);border-top:1px solid transparent;border-right:1px solid transparent;border-bottom:1px solid transparent;border-left:2px solid ", ";background:transparent;width:14px;height:14px;border-radius:50%;position:relative;transition:250ms ease border-color;left:-3px;top:-3px;"], rotate360, _ref5 => {
  let {
    theme,
    warning
  } = _ref5;
  return warning ? theme.yellow3 : theme.green1;
});

const DEFAULT_MS_BEFORE_WARNING = 600000;
const NETWORK_HEALTH_CHECK_MS = 10000;
export default function Polling() {
  var _ref6, _CHAIN_INFO$chainId;

  const {
    chainId
  } = useActiveWeb3React();
  const blockNumber = useBlockNumber();
  const [isMounting, setIsMounting] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const machineTime = useMachineTimeMs(NETWORK_HEALTH_CHECK_MS);
  const blockTime = useCurrentBlockTimestamp();
  const waitMsBeforeWarning = (_ref6 = chainId ? (_CHAIN_INFO$chainId = CHAIN_INFO[chainId]) === null || _CHAIN_INFO$chainId === void 0 ? void 0 : _CHAIN_INFO$chainId.blockWaitMsBeforeWarning : DEFAULT_MS_BEFORE_WARNING) !== null && _ref6 !== void 0 ? _ref6 : DEFAULT_MS_BEFORE_WARNING;
  const warning = Boolean(!!blockTime && machineTime - blockTime.mul(1000).toNumber() > waitMsBeforeWarning);
  useEffect(() => {
    if (!blockNumber) {
      return;
    }

    setIsMounting(true);
    const mountingTimer = setTimeout(() => setIsMounting(false), 1000); // this will clear Timeout when component unmount like in willComponentUnmount

    return () => {
      clearTimeout(mountingTimer);
    };
  }, [blockNumber] //useEffect will run only one time
  //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  );
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ExternalLink, {
      href: chainId && blockNumber ? getExplorerLink(chainId, blockNumber.toString(), ExplorerDataType.BLOCK) : '',
      children: /*#__PURE__*/_jsxs(StyledPolling, {
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
        warning: warning,
        children: [/*#__PURE__*/_jsxs(StyledPollingNumber, {
          breathe: isMounting,
          hovering: isHover,
          children: [blockNumber, "\u2002"]
        }), /*#__PURE__*/_jsx(StyledPollingDot, {
          warning: warning,
          children: isMounting && /*#__PURE__*/_jsx(Spinner, {
            warning: warning
          })
        }), ' ']
      })
    }), warning && /*#__PURE__*/_jsx(ChainConnectivityWarning, {})]
  });
}