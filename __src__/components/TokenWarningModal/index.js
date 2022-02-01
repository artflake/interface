import { ImportToken } from "../SearchModal/ImportToken";
import Modal from "../Modal";
import { jsx as _jsx } from "react/jsx-runtime";
export default function TokenWarningModal(_ref) {
  let {
    isOpen,
    tokens,
    onConfirm,
    onDismiss
  } = _ref;
  return /*#__PURE__*/_jsx(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    maxHeight: 100,
    children: /*#__PURE__*/_jsx(ImportToken, {
      tokens: tokens,
      handleCurrencySelect: onConfirm
    })
  });
}