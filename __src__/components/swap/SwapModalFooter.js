import { Trans } from "@lingui/react";
import { Text } from 'rebass';
import { ButtonError } from "../Button";
import { AutoRow } from "../Row";
import { SwapCallbackError } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function SwapModalFooter(_ref) {
  let {
    onConfirm,
    swapErrorMessage,
    disabledConfirm
  } = _ref;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs(AutoRow, {
      children: [/*#__PURE__*/_jsx(ButtonError, {
        onClick: onConfirm,
        disabled: disabledConfirm,
        style: {
          margin: '10px 0 0 0'
        },
        id: "confirm-swap-or-send",
        children: /*#__PURE__*/_jsx(Text, {
          fontSize: 20,
          fontWeight: 500,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Confirm Swap"
          })
        })
      }), swapErrorMessage ? /*#__PURE__*/_jsx(SwapCallbackError, {
        error: swapErrorMessage
      }) : null]
    })
  });
}