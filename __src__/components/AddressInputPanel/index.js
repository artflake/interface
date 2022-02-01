import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import { useCallback, useContext } from 'react';
import useENS from "../../hooks/useENS";
import { useActiveWeb3React } from "../../hooks/web3";
import { ExternalLink, ThemedText } from "../../theme";
import { ExplorerDataType, getExplorerLink } from "../../utils/getExplorerLink";
import { AutoColumn } from "../Column";
import { RowBetween } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const InputPanel = _styled.div.withConfig({
  displayName: "AddressInputPanel__InputPanel",
  componentId: "sc-1bxpzjo-0"
})(["", " position:relative;border-radius:1.25rem;background-color:", ";z-index:1;width:100%;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexColumnNoWrap;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg1;
});

const ContainerRow = _styled.div.withConfig({
  displayName: "AddressInputPanel__ContainerRow",
  componentId: "sc-1bxpzjo-1"
})(["display:flex;justify-content:center;align-items:center;border-radius:1.25rem;border:1px solid ", ";transition:border-color 300ms ", ",color 500ms ", ";background-color:", ";"], _ref3 => {
  let {
    error,
    theme
  } = _ref3;
  return error ? theme.red1 : theme.bg2;
}, _ref4 => {
  let {
    error
  } = _ref4;
  return error ? 'step-end' : 'step-start';
}, _ref5 => {
  let {
    error
  } = _ref5;
  return error ? 'step-end' : 'step-start';
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.bg1;
});

const InputContainer = _styled.div.withConfig({
  displayName: "AddressInputPanel__InputContainer",
  componentId: "sc-1bxpzjo-2"
})(["flex:1;padding:1rem;"]);

const Input = _styled.input.withConfig({
  displayName: "AddressInputPanel__Input",
  componentId: "sc-1bxpzjo-3"
})(["font-size:1.25rem;outline:none;border:none;flex:1 1 auto;width:0;background-color:", ";transition:color 300ms ", ";color:", ";overflow:hidden;text-overflow:ellipsis;font-weight:500;width:100%;::placeholder{color:", ";}padding:0px;-webkit-appearance:textfield;::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-outer-spin-button,::-webkit-inner-spin-button{-webkit-appearance:none;}::placeholder{color:", ";}"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg1;
}, _ref8 => {
  let {
    error
  } = _ref8;
  return error ? 'step-end' : 'step-start';
}, _ref9 => {
  let {
    error,
    theme
  } = _ref9;
  return error ? theme.red1 : theme.text1;
}, _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.text4;
}, _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.text4;
});

export default function AddressInputPanel(_ref12) {
  let {
    id,
    className = 'recipient-address-input',
    label,
    placeholder,
    value,
    onChange
  } = _ref12;
  const {
    chainId
  } = useActiveWeb3React();
  const theme = useContext(_ThemeContext);
  const {
    address,
    loading,
    name
  } = useENS(value);
  const handleInput = useCallback(event => {
    const input = event.target.value;
    const withoutSpaces = input.replace(/\s+/g, '');
    onChange(withoutSpaces);
  }, [onChange]);
  const error = Boolean(value.length > 0 && !loading && !address);
  return /*#__PURE__*/_jsx(InputPanel, {
    id: id,
    children: /*#__PURE__*/_jsx(ContainerRow, {
      error: error,
      children: /*#__PURE__*/_jsx(InputContainer, {
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "md",
          children: [/*#__PURE__*/_jsxs(RowBetween, {
            children: [/*#__PURE__*/_jsx(ThemedText.Black, {
              color: theme.text2,
              fontWeight: 500,
              fontSize: 14,
              children: label !== null && label !== void 0 ? label : /*#__PURE__*/_jsx(Trans, {
                id: "Recipient"
              })
            }), address && chainId && /*#__PURE__*/_jsx(ExternalLink, {
              href: getExplorerLink(chainId, name !== null && name !== void 0 ? name : address, ExplorerDataType.ADDRESS),
              style: {
                fontSize: '14px'
              },
              children: /*#__PURE__*/_jsx(Trans, {
                id: "(View on Explorer)"
              })
            })]
          }), /*#__PURE__*/_jsx(Input, {
            className: className,
            type: "text",
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false",
            placeholder: placeholder !== null && placeholder !== void 0 ? placeholder :
            /*i18n*/
            i18n._("Wallet Address or ENS name"),
            error: error,
            pattern: "^(0x[a-fA-F0-9]{40})$",
            onChange: handleInput,
            value: value
          })]
        })
      })
    })
  });
}