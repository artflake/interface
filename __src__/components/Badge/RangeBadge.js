import _styled from "styled-components";
import { Trans } from "@lingui/react";
import Badge, { BadgeVariant } from "./";
import { AlertCircle } from 'react-feather';
import { MouseoverTooltip } from "../../components/Tooltip";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const BadgeWrapper = _styled.div.withConfig({
  displayName: "RangeBadge__BadgeWrapper",
  componentId: "sc-1bdyhrg-0"
})(["font-size:14px;display:flex;justify-content:flex-end;"]);

const BadgeText = _styled.div.withConfig({
  displayName: "RangeBadge__BadgeText",
  componentId: "sc-1bdyhrg-1"
})(["font-weight:500;font-size:14px;"]);

const ActiveDot = _styled.span.withConfig({
  displayName: "RangeBadge__ActiveDot",
  componentId: "sc-1bdyhrg-2"
})(["background-color:", ";border-radius:50%;height:8px;width:8px;margin-right:4px;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.success;
});

export default function RangeBadge(_ref2) {
  let {
    removed,
    inRange
  } = _ref2;
  return /*#__PURE__*/_jsx(BadgeWrapper, {
    children: removed ? /*#__PURE__*/_jsx(MouseoverTooltip, {
      text: /*#__PURE__*/_jsx(Trans, {
        id: "Your position has 0 liquidity, and is not earning fees."
      }),
      children: /*#__PURE__*/_jsxs(Badge, {
        variant: BadgeVariant.DEFAULT,
        children: [/*#__PURE__*/_jsx(AlertCircle, {
          width: 14,
          height: 14
        }), "\xA0", /*#__PURE__*/_jsx(BadgeText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Closed"
          })
        })]
      })
    }) : inRange ? /*#__PURE__*/_jsx(MouseoverTooltip, {
      text: /*#__PURE__*/_jsx(Trans, {
        id: "The price of this pool is within your selected range. Your position is currently earning fees."
      }),
      children: /*#__PURE__*/_jsxs(Badge, {
        variant: BadgeVariant.DEFAULT,
        children: [/*#__PURE__*/_jsx(ActiveDot, {}), " \xA0", /*#__PURE__*/_jsx(BadgeText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "In range"
          })
        })]
      })
    }) : /*#__PURE__*/_jsx(MouseoverTooltip, {
      text: /*#__PURE__*/_jsx(Trans, {
        id: "The price of this pool is outside of your selected range. Your position is not currently earning fees."
      }),
      children: /*#__PURE__*/_jsxs(Badge, {
        variant: BadgeVariant.WARNING,
        children: [/*#__PURE__*/_jsx(AlertCircle, {
          width: 14,
          height: 14
        }), "\xA0", /*#__PURE__*/_jsx(BadgeText, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Out of range"
          })
        })]
      })
    })
  });
}