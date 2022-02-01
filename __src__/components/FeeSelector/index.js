import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { FeeAmount } from '@uniswap/v3-sdk';
import { ButtonGray } from "../Button";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { RowBetween } from "../Row";
import { useFeeTierDistribution } from "../../hooks/useFeeTierDistribution";
import { PoolState, usePools } from "../../hooks/usePools";
import usePrevious from "../../hooks/usePrevious";
import { useActiveWeb3React } from "../../hooks/web3";
import { DynamicSection } from 'pages/AddLiquidity/styled';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { Box } from 'rebass';
import { ThemedText } from "../../theme";
import { FeeOption } from "./FeeOption";
import { FeeTierPercentageBadge } from "./FeeTierPercentageBadge";
import { FEE_AMOUNT_DETAIL } from "./shared";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const pulse = color => _keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color};
  }

  70% {
    box-shadow: 0 0 0 2px ${color};
  }

  100% {
    box-shadow: 0 0 0 0 ${color};
  }
`;

const FocusedOutlineCard = _styled(Card).withConfig({
  displayName: "FeeSelector__FocusedOutlineCard",
  componentId: "sc-1xk2z0e-0"
})(["border:1px solid ", ";animation:", " 0.6s linear;align-self:center;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg2;
}, _ref2 => {
  let {
    pulsing,
    theme
  } = _ref2;
  return pulsing && pulse(theme.primary1);
});

const Select = _styled.div.withConfig({
  displayName: "FeeSelector__Select",
  componentId: "sc-1xk2z0e-1"
})(["align-items:flex-start;display:grid;grid-auto-flow:column;grid-gap:8px;"]);

export default function FeeSelector(_ref3) {
  let {
    disabled = false,
    feeAmount,
    handleFeePoolSelect,
    currencyA,
    currencyB
  } = _ref3;
  const {
    chainId
  } = useActiveWeb3React();
  const {
    isLoading,
    isError,
    largestUsageFeeTier,
    distributions
  } = useFeeTierDistribution(currencyA, currencyB); // get pool data on-chain for latest states

  const pools = usePools([[currencyA, currencyB, FeeAmount.LOWEST], [currencyA, currencyB, FeeAmount.LOW], [currencyA, currencyB, FeeAmount.MEDIUM], [currencyA, currencyB, FeeAmount.HIGH]]);
  const poolsByFeeTier = useMemo(() => pools.reduce((acc, _ref4) => {
    let [curPoolState, curPool] = _ref4;
    acc = { ...acc,
      ...{
        [curPool === null || curPool === void 0 ? void 0 : curPool.fee]: curPoolState
      }
    };
    return acc;
  }, {
    // default all states to NOT_EXISTS
    [FeeAmount.LOWEST]: PoolState.NOT_EXISTS,
    [FeeAmount.LOW]: PoolState.NOT_EXISTS,
    [FeeAmount.MEDIUM]: PoolState.NOT_EXISTS,
    [FeeAmount.HIGH]: PoolState.NOT_EXISTS
  }), [pools]);
  const [showOptions, setShowOptions] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const previousFeeAmount = usePrevious(feeAmount);
  const recommended = useRef(false);
  const handleFeePoolSelectWithEvent = useCallback(fee => {
    ReactGA.event({
      category: 'FeePoolSelect',
      action: 'Manual'
    });
    handleFeePoolSelect(fee);
  }, [handleFeePoolSelect]);
  useEffect(() => {
    if (feeAmount || isLoading || isError) {
      return;
    }

    if (!largestUsageFeeTier) {
      // cannot recommend, open options
      setShowOptions(true);
    } else {
      setShowOptions(false);
      recommended.current = true;
      ReactGA.event({
        category: 'FeePoolSelect',
        action: ' Recommended'
      });
      handleFeePoolSelect(largestUsageFeeTier);
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, handleFeePoolSelect]);
  useEffect(() => {
    setShowOptions(isError);
  }, [isError]);
  useEffect(() => {
    if (feeAmount && previousFeeAmount !== feeAmount) {
      setPulsing(true);
    }
  }, [previousFeeAmount, feeAmount]);
  return /*#__PURE__*/_jsx(AutoColumn, {
    gap: "16px",
    children: /*#__PURE__*/_jsxs(DynamicSection, {
      gap: "md",
      disabled: disabled,
      children: [/*#__PURE__*/_jsx(FocusedOutlineCard, {
        pulsing: pulsing,
        onAnimationEnd: () => setPulsing(false),
        children: /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsx(AutoColumn, {
            id: "add-liquidity-selected-fee",
            children: !feeAmount ? /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(ThemedText.Label, {
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Fee tier"
                })
              }), /*#__PURE__*/_jsx(ThemedText.Main, {
                fontWeight: 400,
                fontSize: "12px",
                textAlign: "left",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "The % you will earn in fees."
                })
              })]
            }) : /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(ThemedText.Label, {
                className: "selected-fee-label",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "{0}% fee tier",
                  values: {
                    0: FEE_AMOUNT_DETAIL[feeAmount].label
                  }
                })
              }), /*#__PURE__*/_jsx(Box, {
                style: {
                  width: 'fit-content',
                  marginTop: '8px'
                },
                className: "selected-fee-percentage",
                children: distributions && /*#__PURE__*/_jsx(FeeTierPercentageBadge, {
                  distributions: distributions,
                  feeAmount: feeAmount,
                  poolState: poolsByFeeTier[feeAmount]
                })
              })]
            })
          }), /*#__PURE__*/_jsx(ButtonGray, {
            onClick: () => setShowOptions(!showOptions),
            width: "auto",
            padding: "4px",
            $borderRadius: "6px",
            children: showOptions ? /*#__PURE__*/_jsx(Trans, {
              id: "Hide"
            }) : /*#__PURE__*/_jsx(Trans, {
              id: "Edit"
            })
          })]
        })
      }), chainId && showOptions && /*#__PURE__*/_jsx(Select, {
        children: [FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((_feeAmount, i) => {
          const {
            supportedChains
          } = FEE_AMOUNT_DETAIL[_feeAmount];

          if (supportedChains.includes(chainId)) {
            return /*#__PURE__*/_jsx(FeeOption, {
              feeAmount: _feeAmount,
              active: feeAmount === _feeAmount,
              onClick: () => handleFeePoolSelectWithEvent(_feeAmount),
              distributions: distributions,
              poolState: poolsByFeeTier[_feeAmount]
            }, i);
          }

          return null;
        })
      })]
    })
  });
}