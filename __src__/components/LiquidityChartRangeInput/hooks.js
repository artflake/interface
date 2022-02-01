import { usePoolActiveLiquidity } from "../../hooks/usePoolTickData";
import { useCallback, useMemo } from 'react';
export function useDensityChartData(_ref) {
  let {
    currencyA,
    currencyB,
    feeAmount
  } = _ref;
  const {
    isLoading,
    isUninitialized,
    isError,
    error,
    data
  } = usePoolActiveLiquidity(currencyA, currencyB, feeAmount);
  const formatData = useCallback(() => {
    if (!(data !== null && data !== void 0 && data.length)) {
      return undefined;
    }

    const newData = [];

    for (let i = 0; i < data.length; i++) {
      const t = data[i];
      const chartEntry = {
        activeLiquidity: parseFloat(t.liquidityActive.toString()),
        price0: parseFloat(t.price0)
      };

      if (chartEntry.activeLiquidity > 0) {
        newData.push(chartEntry);
      }
    }

    return newData;
  }, [data]);
  return useMemo(() => {
    return {
      isLoading,
      isUninitialized,
      isError,
      error,
      formattedData: !isLoading && !isUninitialized ? formatData() : undefined
    };
  }, [isLoading, isUninitialized, isError, error, formatData]);
}