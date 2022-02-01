import { Position } from '@uniswap/v3-sdk';
import { usePool } from 'hooks/usePools';
import { useCurrency } from './Tokens';
export function useDerivedPositionInfo(positionDetails) {
  const currency0 = useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token0);
  const currency1 = useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token1); // construct pool data

  const [, pool] = usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.fee);
  let position = undefined;

  if (pool && positionDetails) {
    position = new Position({
      pool,
      liquidity: positionDetails.liquidity.toString(),
      tickLower: positionDetails.tickLower,
      tickUpper: positionDetails.tickUpper
    });
  }

  return {
    position,
    pool: pool !== null && pool !== void 0 ? pool : undefined
  };
}