import { Fraction } from '@uniswap/sdk-core';
const ONE = new Fraction(1, 1);
export function calculateSlippageAmount(value, slippage) {
  if (slippage.lessThan(0) || slippage.greaterThan(ONE)) throw new Error('Unexpected slippage');
  return [value.multiply(ONE.subtract(slippage)).quotient, value.multiply(ONE.add(slippage)).quotient];
}