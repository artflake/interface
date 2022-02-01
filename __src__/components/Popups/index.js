import _styled from "styled-components";
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/web3';
import { MEDIA_WIDTHS } from 'theme';
import { useActivePopups } from '../../state/application/hooks';
import { useURLWarningVisible } from '../../state/user/hooks';
import { AutoColumn } from '../Column';
import ClaimPopup from './ClaimPopup';
import PopupItem from './PopupItem';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const MobilePopupWrapper = _styled.div.withConfig({
  displayName: "Popups__MobilePopupWrapper",
  componentId: "sc-fo3pji-0"
})(["position:relative;max-width:100%;height:", ";margin:", ";margin-bottom:", "};display:none;", ";"], _ref => {
  let {
    height
  } = _ref;
  return height;
}, _ref2 => {
  let {
    height
  } = _ref2;
  return height ? '0 auto;' : 0;
}, _ref3 => {
  let {
    height
  } = _ref3;
  return height ? '20px' : 0;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    display: block;
  `;
});

const MobilePopupInner = _styled.div.withConfig({
  displayName: "Popups__MobilePopupInner",
  componentId: "sc-fo3pji-1"
})(["height:99%;overflow-x:auto;overflow-y:hidden;display:flex;flex-direction:row;-webkit-overflow-scrolling:touch;::-webkit-scrollbar{display:none;}"]);

const StopOverflowQuery = `@media screen and (min-width: ${MEDIA_WIDTHS.upToMedium + 1}px) and (max-width: ${MEDIA_WIDTHS.upToMedium + 500}px)`;

const FixedPopupColumn = _styled(AutoColumn).withConfig({
  displayName: "Popups__FixedPopupColumn",
  componentId: "sc-fo3pji-2"
})(["position:fixed;top:", ";right:1rem;max-width:355px !important;width:100%;z-index:3;", ";", "{top:", ";}"], _ref5 => {
  let {
    extraPadding
  } = _ref5;
  return extraPadding ? '64px' : '56px';
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
    display: none;
  `;
}, StopOverflowQuery, _ref7 => {
  let {
    extraPadding,
    xlPadding
  } = _ref7;
  return xlPadding ? '64px' : extraPadding ? '64px' : '56px';
});

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups();
  const urlWarningActive = useURLWarningVisible(); // need extra padding if network is not L1 Ethereum

  const {
    chainId
  } = useActiveWeb3React();
  const isNotOnMainnet = Boolean(chainId && chainId !== SupportedChainId.MAINNET);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(FixedPopupColumn, {
      gap: "20px",
      extraPadding: urlWarningActive,
      xlPadding: isNotOnMainnet,
      children: [/*#__PURE__*/_jsx(ClaimPopup, {}), activePopups.map(item => /*#__PURE__*/_jsx(PopupItem, {
        content: item.content,
        popKey: item.key,
        removeAfterMs: item.removeAfterMs
      }, item.key))]
    }), /*#__PURE__*/_jsx(MobilePopupWrapper, {
      height: (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 ? 'fit-content' : 0,
      children: /*#__PURE__*/_jsx(MobilePopupInner, {
        children: activePopups // reverse so new items up front
        .slice(0).reverse().map(item => /*#__PURE__*/_jsx(PopupItem, {
          content: item.content,
          popKey: item.key,
          removeAfterMs: item.removeAfterMs
        }, item.key))
      })
    })]
  });
}