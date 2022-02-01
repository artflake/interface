import { ONE_HUNDRED_PERCENT, ZERO_PERCENT } from '../constants/misc'; // returns whether tradeB is better than tradeA by at least a threshold percentage amount

export function isTradeBetter(tradeA, tradeB) {
  let minimumDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ZERO_PERCENT;
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (tradeA.tradeType !== tradeB.tradeType || !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) || !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)) {
    throw new Error('Comparing incomparable trades');
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.asFraction.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
  }
}