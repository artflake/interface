import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { RowBetween } from "../Row";
import { useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { Text } from 'rebass';
import { CloseIcon } from "../../theme";
import { CurrencyModalView } from "./CurrencySearchModal";
import { ManageLists } from "./ManageLists";
import ManageTokens from "./ManageTokens";
import { PaddedColumn, Separator } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "Manage__Wrapper",
  componentId: "sc-s8mduo-0"
})(["width:100%;position:relative;padding-bottom:80px;"]);

const ToggleWrapper = _styled(RowBetween).withConfig({
  displayName: "Manage__ToggleWrapper",
  componentId: "sc-s8mduo-1"
})(["background-color:", ";border-radius:12px;padding:6px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg3;
});

const ToggleOption = _styled.div.withConfig({
  displayName: "Manage__ToggleOption",
  componentId: "sc-s8mduo-2"
})(["width:48%;padding:10px;display:flex;align-items:center;justify-content:center;border-radius:12px;font-weight:600;background-color:", ";color:", ";user-select:none;:hover{cursor:pointer;opacity:0.7;}"], _ref2 => {
  let {
    theme,
    active
  } = _ref2;
  return active ? theme.bg1 : theme.bg3;
}, _ref3 => {
  let {
    theme,
    active
  } = _ref3;
  return active ? theme.text1 : theme.text2;
});

export default function Manage(_ref4) {
  let {
    onDismiss,
    setModalView,
    setImportList,
    setImportToken,
    setListUrl
  } = _ref4;
  // toggle between tokens and lists
  const [showLists, setShowLists] = useState(true);
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsx(PaddedColumn, {
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ArrowLeft, {
          style: {
            cursor: 'pointer'
          },
          onClick: () => setModalView(CurrencyModalView.search)
        }), /*#__PURE__*/_jsx(Text, {
          fontWeight: 500,
          fontSize: 20,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Manage"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      })
    }), /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsx(PaddedColumn, {
      style: {
        paddingBottom: 0
      },
      children: /*#__PURE__*/_jsxs(ToggleWrapper, {
        children: [/*#__PURE__*/_jsx(ToggleOption, {
          onClick: () => setShowLists(!showLists),
          active: showLists,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Lists"
          })
        }), /*#__PURE__*/_jsx(ToggleOption, {
          onClick: () => setShowLists(!showLists),
          active: !showLists,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Tokens"
          })
        })]
      })
    }), showLists ? /*#__PURE__*/_jsx(ManageLists, {
      setModalView: setModalView,
      setImportList: setImportList,
      setListUrl: setListUrl
    }) : /*#__PURE__*/_jsx(ManageTokens, {
      setModalView: setModalView,
      setImportToken: setImportToken
    })]
  });
}