import { Trade as V2Trade } from '@uniswap/v2-sdk';
import { Version } from '../hooks/useToggledVersion';
export function getTradeVersion(trade) {
  if (!trade) return undefined;
  if (trade instanceof V2Trade) return Version.v2;
  return Version.v3;
}