import { useActiveWeb3React } from "../../hooks/web3";
import { Redirect } from 'react-router-dom';
import { WETH9_EXTENDED } from "../../constants/tokens";
import AddLiquidity from "./index";
import { jsx as _jsx } from "react/jsx-runtime";
export function RedirectDuplicateTokenIds(props) {
  var _WETH9_EXTENDED$chain, _WETH9_EXTENDED$chain2;

  const {
    match: {
      params: {
        currencyIdA,
        currencyIdB
      }
    }
  } = props;
  const {
    chainId
  } = useActiveWeb3React(); // prevent weth + eth

  const isETHOrWETHA = currencyIdA === 'ETH' || chainId !== undefined && currencyIdA === ((_WETH9_EXTENDED$chain = WETH9_EXTENDED[chainId]) === null || _WETH9_EXTENDED$chain === void 0 ? void 0 : _WETH9_EXTENDED$chain.address);
  const isETHOrWETHB = currencyIdB === 'ETH' || chainId !== undefined && currencyIdB === ((_WETH9_EXTENDED$chain2 = WETH9_EXTENDED[chainId]) === null || _WETH9_EXTENDED$chain2 === void 0 ? void 0 : _WETH9_EXTENDED$chain2.address);

  if (currencyIdA && currencyIdB && (currencyIdA.toLowerCase() === currencyIdB.toLowerCase() || isETHOrWETHA && isETHOrWETHB)) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: `/add/${currencyIdA}`
    });
  }

  return /*#__PURE__*/_jsx(AddLiquidity, { ...props
  });
}