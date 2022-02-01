import { Trans } from "@lingui/react";
import Badge from 'components/Badge';
import { PoolState } from 'hooks/usePools';
import React from 'react';
import { ThemedText } from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";
export function FeeTierPercentageBadge(_ref) {
  var _distributions$feeAmo;

  let {
    feeAmount,
    distributions,
    poolState
  } = _ref;
  return /*#__PURE__*/_jsx(Badge, {
    children: /*#__PURE__*/_jsx(ThemedText.Label, {
      fontSize: 10,
      children: !distributions || poolState === PoolState.NOT_EXISTS || poolState === PoolState.INVALID ? /*#__PURE__*/_jsx(Trans, {
        id: "Not created"
      }) : distributions[feeAmount] !== undefined ? /*#__PURE__*/_jsx(Trans, {
        id: "{0}% select",
        values: {
          0: (_distributions$feeAmo = distributions[feeAmount]) === null || _distributions$feeAmo === void 0 ? void 0 : _distributions$feeAmo.toFixed(0)
        }
      }) : /*#__PURE__*/_jsx(Trans, {
        id: "No data"
      })
    })
  });
}