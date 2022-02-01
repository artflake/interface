import _styled from "styled-components";
import CurrencyLogo from "../CurrencyLogo";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "DoubleLogo__Wrapper",
  componentId: "sc-skatqk-0"
})(["position:relative;display:flex;flex-direction:row;margin-left:", ";"], _ref => {
  let {
    sizeraw,
    margin
  } = _ref;
  return margin && (sizeraw / 3 + 8).toString() + 'px';
});

const HigherLogo = _styled(CurrencyLogo).withConfig({
  displayName: "DoubleLogo__HigherLogo",
  componentId: "sc-skatqk-1"
})(["z-index:2;"]);

const CoveredLogo = _styled(CurrencyLogo).withConfig({
  displayName: "DoubleLogo__CoveredLogo",
  componentId: "sc-skatqk-2"
})(["position:absolute;left:", " !important;"], _ref2 => {
  let {
    sizeraw
  } = _ref2;
  return '-' + (sizeraw / 2).toString() + 'px';
});

export default function DoubleCurrencyLogo(_ref3) {
  let {
    currency0,
    currency1,
    size = 16,
    margin = false
  } = _ref3;
  return /*#__PURE__*/_jsxs(Wrapper, {
    sizeraw: size,
    margin: margin,
    children: [currency0 && /*#__PURE__*/_jsx(HigherLogo, {
      currency: currency0,
      size: size.toString() + 'px'
    }), currency1 && /*#__PURE__*/_jsx(CoveredLogo, {
      currency: currency1,
      size: size.toString() + 'px',
      sizeraw: size
    })]
  });
}