import { Redirect } from 'react-router-dom';
import AddLiquidityV2 from './index';
import { jsx as _jsx } from "react/jsx-runtime";
export function RedirectDuplicateTokenIdsV2(props) {
  const {
    match: {
      params: {
        currencyIdA,
        currencyIdB
      }
    }
  } = props;

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: `/add/v2/${currencyIdA}`
    });
  }

  return /*#__PURE__*/_jsx(AddLiquidityV2, { ...props
  });
}