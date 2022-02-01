import { Percent } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';
import { DAI, USDC, WBTC } from 'constants/tokens';
import { render } from 'test-utils';
import RoutingDiagram from './RoutingDiagram';
import { jsx as _jsx } from "react/jsx-runtime";

const percent = strings => new Percent(parseInt(strings[0]), 100);

const singleRoute = {
  percent: percent`100`,
  path: [[USDC, DAI, FeeAmount.LOW]]
};
const multiRoute = [{
  percent: percent`75`,
  path: [[USDC, DAI, FeeAmount.LOWEST]]
}, {
  percent: percent`25`,
  path: [[USDC, WBTC, FeeAmount.MEDIUM], [WBTC, DAI, FeeAmount.HIGH]]
}];
jest.mock('components/CurrencyLogo', () => _ref => {
  let {
    currency
  } = _ref;
  return `CurrencyLogo currency=${currency.symbol}`;
});
jest.mock('components/DoubleLogo', () => _ref2 => {
  let {
    currency0,
    currency1
  } = _ref2;
  return `DoubleCurrencyLogo currency0=${currency0.symbol} currency1=${currency1.symbol}`;
});
jest.mock('../Popover', () => () => 'Popover');
jest.mock('hooks/useTokenInfoFromActiveList', () => ({
  useTokenInfoFromActiveList: currency => currency
}));
it('renders when no routes are provided', () => {
  const {
    asFragment
  } = render( /*#__PURE__*/_jsx(RoutingDiagram, {
    currencyIn: DAI,
    currencyOut: USDC,
    routes: []
  }));
  expect(asFragment()).toMatchSnapshot();
});
it('renders single route', () => {
  const {
    asFragment
  } = render( /*#__PURE__*/_jsx(RoutingDiagram, {
    currencyIn: USDC,
    currencyOut: DAI,
    routes: [singleRoute]
  }));
  expect(asFragment()).toMatchSnapshot();
});
it('renders multi route', () => {
  const {
    asFragment
  } = render( /*#__PURE__*/_jsx(RoutingDiagram, {
    currencyIn: USDC,
    currencyOut: DAI,
    routes: multiRoute
  }));
  expect(asFragment()).toMatchSnapshot();
});