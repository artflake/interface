import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { FeeAmount } from '@uniswap/v3-sdk';
import { AutoColumn, ColumnCenter } from "../Column";
import Loader from "../Loader";
import { format } from 'd3';
import { useColor } from "../../hooks/useColor";
import useTheme from "../../hooks/useTheme";
import { saturate } from 'polished';
import React, { useCallback, useMemo } from 'react';
import { BarChart2, CloudOff, Inbox } from 'react-feather';
import ReactGA from 'react-ga';
import { batch } from 'react-redux';
import { Bound } from "../../state/mint/v3/actions";
import { ThemedText } from "../../theme";
import { Chart } from "./Chart";
import { useDensityChartData } from "./hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ZOOM_LEVELS = {
  [FeeAmount.LOWEST]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5
  },
  [FeeAmount.LOW]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5
  },
  [FeeAmount.MEDIUM]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20
  },
  [FeeAmount.HIGH]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20
  }
};

const ChartWrapper = _styled.div.withConfig({
  displayName: "LiquidityChartRangeInput__ChartWrapper",
  componentId: "sc-acskj6-0"
})(["position:relative;justify-content:center;align-content:center;"]);

function InfoBox(_ref) {
  let {
    message,
    icon
  } = _ref;
  return /*#__PURE__*/_jsxs(ColumnCenter, {
    style: {
      height: '100%',
      justifyContent: 'center'
    },
    children: [icon, message && /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
      padding: 10,
      marginTop: "20px",
      textAlign: "center",
      children: message
    })]
  });
}

export default function LiquidityChartRangeInput(_ref2) {
  var _saturate, _saturate2;

  let {
    currencyA,
    currencyB,
    feeAmount,
    ticksAtLimit,
    price,
    priceLower,
    priceUpper,
    onLeftRangeInput,
    onRightRangeInput,
    interactive
  } = _ref2;
  const theme = useTheme();
  const tokenAColor = useColor(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped);
  const tokenBColor = useColor(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped);
  const isSorted = currencyA && currencyB && (currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped.sortsBefore(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped));
  const {
    isLoading,
    isUninitialized,
    isError,
    error,
    formattedData
  } = useDensityChartData({
    currencyA,
    currencyB,
    feeAmount
  });
  const onBrushDomainChangeEnded = useCallback((domain, mode) => {
    let leftRangeValue = Number(domain[0]);
    const rightRangeValue = Number(domain[1]);

    if (leftRangeValue <= 0) {
      leftRangeValue = 1 / 10 ** 6;
    }

    batch(() => {
      // simulate user input for auto-formatting and other validations
      if ((!ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER] || mode === 'handle' || mode === 'reset') && leftRangeValue > 0) {
        onLeftRangeInput(leftRangeValue.toFixed(6));
      }

      if ((!ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER] || mode === 'reset') && rightRangeValue > 0) {
        // todo: remove this check. Upper bound for large numbers
        // sometimes fails to parse to tick.
        if (rightRangeValue < 1e35) {
          onRightRangeInput(rightRangeValue.toFixed(6));
        }
      }
    });
  }, [isSorted, onLeftRangeInput, onRightRangeInput, ticksAtLimit]);
  interactive = interactive && Boolean(formattedData === null || formattedData === void 0 ? void 0 : formattedData.length);
  const brushDomain = useMemo(() => {
    const leftPrice = isSorted ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert();
    const rightPrice = isSorted ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert();
    return leftPrice && rightPrice ? [parseFloat(leftPrice === null || leftPrice === void 0 ? void 0 : leftPrice.toSignificant(6)), parseFloat(rightPrice === null || rightPrice === void 0 ? void 0 : rightPrice.toSignificant(6))] : undefined;
  }, [isSorted, priceLower, priceUpper]);
  const brushLabelValue = useCallback((d, x) => {
    if (!price) return '';
    if (d === 'w' && ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]) return '0';
    if (d === 'e' && ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]) return '∞';
    const percent = (x < price ? -1 : 1) * ((Math.max(x, price) - Math.min(x, price)) / price) * 100;
    return price ? `${format(Math.abs(percent) > 1 ? '.2~s' : '.2~f')(percent)}%` : '';
  }, [isSorted, price, ticksAtLimit]);

  if (isError) {
    ReactGA.exception({ ...error,
      category: 'Liquidity',
      fatal: false
    });
  }

  return /*#__PURE__*/_jsx(AutoColumn, {
    gap: "md",
    style: {
      minHeight: '200px'
    },
    children: isUninitialized ? /*#__PURE__*/_jsx(InfoBox, {
      message: /*#__PURE__*/_jsx(Trans, {
        id: "Your position will appear here."
      }),
      icon: /*#__PURE__*/_jsx(Inbox, {
        size: 56,
        stroke: theme.text1
      })
    }) : isLoading ? /*#__PURE__*/_jsx(InfoBox, {
      icon: /*#__PURE__*/_jsx(Loader, {
        size: "40px",
        stroke: theme.text4
      })
    }) : isError ? /*#__PURE__*/_jsx(InfoBox, {
      message: /*#__PURE__*/_jsx(Trans, {
        id: "Liquidity data not available."
      }),
      icon: /*#__PURE__*/_jsx(CloudOff, {
        size: 56,
        stroke: theme.text4
      })
    }) : !formattedData || formattedData === [] || !price ? /*#__PURE__*/_jsx(InfoBox, {
      message: /*#__PURE__*/_jsx(Trans, {
        id: "There is no liquidity data."
      }),
      icon: /*#__PURE__*/_jsx(BarChart2, {
        size: 56,
        stroke: theme.text4
      })
    }) : /*#__PURE__*/_jsx(ChartWrapper, {
      children: /*#__PURE__*/_jsx(Chart, {
        data: {
          series: formattedData,
          current: price
        },
        dimensions: {
          width: 400,
          height: 200
        },
        margins: {
          top: 10,
          right: 2,
          bottom: 20,
          left: 0
        },
        styles: {
          area: {
            selection: theme.blue1
          },
          brush: {
            handle: {
              west: (_saturate = saturate(0.1, tokenAColor)) !== null && _saturate !== void 0 ? _saturate : theme.red1,
              east: (_saturate2 = saturate(0.1, tokenBColor)) !== null && _saturate2 !== void 0 ? _saturate2 : theme.blue1
            }
          }
        },
        interactive: interactive,
        brushLabels: brushLabelValue,
        brushDomain: brushDomain,
        onBrushDomainChange: onBrushDomainChangeEnded,
        zoomLevels: ZOOM_LEVELS[feeAmount !== null && feeAmount !== void 0 ? feeAmount : FeeAmount.MEDIUM],
        ticksAtLimit: ticksAtLimit
      })
    })
  });
}