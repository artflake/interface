import { Bound } from "../state/mint/v3/actions";
import { formatPrice } from "./formatCurrencyAmount";
export function formatTickPrice(price, atLimit, direction, placeholder) {
  if (atLimit[direction]) {
    return direction === Bound.LOWER ? '0' : '∞';
  }

  if (!price && placeholder !== undefined) {
    return placeholder;
  }

  return formatPrice(price, 5);
}