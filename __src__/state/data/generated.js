import { api } from './slice';
export let Bundle_OrderBy;

(function (Bundle_OrderBy) {
  Bundle_OrderBy["Id"] = "id";
  Bundle_OrderBy["EthPriceUsd"] = "ethPriceUSD";
})(Bundle_OrderBy || (Bundle_OrderBy = {}));

export let Burn_OrderBy;

(function (Burn_OrderBy) {
  Burn_OrderBy["Id"] = "id";
  Burn_OrderBy["Transaction"] = "transaction";
  Burn_OrderBy["Pool"] = "pool";
  Burn_OrderBy["Token0"] = "token0";
  Burn_OrderBy["Token1"] = "token1";
  Burn_OrderBy["Timestamp"] = "timestamp";
  Burn_OrderBy["Owner"] = "owner";
  Burn_OrderBy["Origin"] = "origin";
  Burn_OrderBy["Amount"] = "amount";
  Burn_OrderBy["Amount0"] = "amount0";
  Burn_OrderBy["Amount1"] = "amount1";
  Burn_OrderBy["AmountUsd"] = "amountUSD";
  Burn_OrderBy["TickLower"] = "tickLower";
  Burn_OrderBy["TickUpper"] = "tickUpper";
  Burn_OrderBy["LogIndex"] = "logIndex";
})(Burn_OrderBy || (Burn_OrderBy = {}));

export let Collect_OrderBy;

(function (Collect_OrderBy) {
  Collect_OrderBy["Id"] = "id";
  Collect_OrderBy["Transaction"] = "transaction";
  Collect_OrderBy["Timestamp"] = "timestamp";
  Collect_OrderBy["Pool"] = "pool";
  Collect_OrderBy["Owner"] = "owner";
  Collect_OrderBy["Amount0"] = "amount0";
  Collect_OrderBy["Amount1"] = "amount1";
  Collect_OrderBy["AmountUsd"] = "amountUSD";
  Collect_OrderBy["TickLower"] = "tickLower";
  Collect_OrderBy["TickUpper"] = "tickUpper";
  Collect_OrderBy["LogIndex"] = "logIndex";
})(Collect_OrderBy || (Collect_OrderBy = {}));

export let Factory_OrderBy;

(function (Factory_OrderBy) {
  Factory_OrderBy["Id"] = "id";
  Factory_OrderBy["PoolCount"] = "poolCount";
  Factory_OrderBy["TxCount"] = "txCount";
  Factory_OrderBy["TotalVolumeUsd"] = "totalVolumeUSD";
  Factory_OrderBy["TotalVolumeEth"] = "totalVolumeETH";
  Factory_OrderBy["TotalFeesUsd"] = "totalFeesUSD";
  Factory_OrderBy["TotalFeesEth"] = "totalFeesETH";
  Factory_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  Factory_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
  Factory_OrderBy["TotalValueLockedEth"] = "totalValueLockedETH";
  Factory_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
  Factory_OrderBy["TotalValueLockedEthUntracked"] = "totalValueLockedETHUntracked";
  Factory_OrderBy["Owner"] = "owner";
})(Factory_OrderBy || (Factory_OrderBy = {}));

export let Flash_OrderBy;

(function (Flash_OrderBy) {
  Flash_OrderBy["Id"] = "id";
  Flash_OrderBy["Transaction"] = "transaction";
  Flash_OrderBy["Timestamp"] = "timestamp";
  Flash_OrderBy["Pool"] = "pool";
  Flash_OrderBy["Sender"] = "sender";
  Flash_OrderBy["Recipient"] = "recipient";
  Flash_OrderBy["Amount0"] = "amount0";
  Flash_OrderBy["Amount1"] = "amount1";
  Flash_OrderBy["AmountUsd"] = "amountUSD";
  Flash_OrderBy["Amount0Paid"] = "amount0Paid";
  Flash_OrderBy["Amount1Paid"] = "amount1Paid";
  Flash_OrderBy["LogIndex"] = "logIndex";
})(Flash_OrderBy || (Flash_OrderBy = {}));

export let Mint_OrderBy;

(function (Mint_OrderBy) {
  Mint_OrderBy["Id"] = "id";
  Mint_OrderBy["Transaction"] = "transaction";
  Mint_OrderBy["Timestamp"] = "timestamp";
  Mint_OrderBy["Pool"] = "pool";
  Mint_OrderBy["Token0"] = "token0";
  Mint_OrderBy["Token1"] = "token1";
  Mint_OrderBy["Owner"] = "owner";
  Mint_OrderBy["Sender"] = "sender";
  Mint_OrderBy["Origin"] = "origin";
  Mint_OrderBy["Amount"] = "amount";
  Mint_OrderBy["Amount0"] = "amount0";
  Mint_OrderBy["Amount1"] = "amount1";
  Mint_OrderBy["AmountUsd"] = "amountUSD";
  Mint_OrderBy["TickLower"] = "tickLower";
  Mint_OrderBy["TickUpper"] = "tickUpper";
  Mint_OrderBy["LogIndex"] = "logIndex";
})(Mint_OrderBy || (Mint_OrderBy = {}));

export let OrderDirection;

(function (OrderDirection) {
  OrderDirection["Asc"] = "asc";
  OrderDirection["Desc"] = "desc";
})(OrderDirection || (OrderDirection = {}));

export let PoolDayData_OrderBy;

(function (PoolDayData_OrderBy) {
  PoolDayData_OrderBy["Id"] = "id";
  PoolDayData_OrderBy["Date"] = "date";
  PoolDayData_OrderBy["Pool"] = "pool";
  PoolDayData_OrderBy["Liquidity"] = "liquidity";
  PoolDayData_OrderBy["SqrtPrice"] = "sqrtPrice";
  PoolDayData_OrderBy["Token0Price"] = "token0Price";
  PoolDayData_OrderBy["Token1Price"] = "token1Price";
  PoolDayData_OrderBy["Tick"] = "tick";
  PoolDayData_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
  PoolDayData_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
  PoolDayData_OrderBy["TvlUsd"] = "tvlUSD";
  PoolDayData_OrderBy["VolumeToken0"] = "volumeToken0";
  PoolDayData_OrderBy["VolumeToken1"] = "volumeToken1";
  PoolDayData_OrderBy["VolumeUsd"] = "volumeUSD";
  PoolDayData_OrderBy["FeesUsd"] = "feesUSD";
  PoolDayData_OrderBy["TxCount"] = "txCount";
  PoolDayData_OrderBy["Open"] = "open";
  PoolDayData_OrderBy["High"] = "high";
  PoolDayData_OrderBy["Low"] = "low";
  PoolDayData_OrderBy["Close"] = "close";
})(PoolDayData_OrderBy || (PoolDayData_OrderBy = {}));

export let PoolHourData_OrderBy;

(function (PoolHourData_OrderBy) {
  PoolHourData_OrderBy["Id"] = "id";
  PoolHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
  PoolHourData_OrderBy["Pool"] = "pool";
  PoolHourData_OrderBy["Liquidity"] = "liquidity";
  PoolHourData_OrderBy["SqrtPrice"] = "sqrtPrice";
  PoolHourData_OrderBy["Token0Price"] = "token0Price";
  PoolHourData_OrderBy["Token1Price"] = "token1Price";
  PoolHourData_OrderBy["Tick"] = "tick";
  PoolHourData_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
  PoolHourData_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
  PoolHourData_OrderBy["TvlUsd"] = "tvlUSD";
  PoolHourData_OrderBy["VolumeToken0"] = "volumeToken0";
  PoolHourData_OrderBy["VolumeToken1"] = "volumeToken1";
  PoolHourData_OrderBy["VolumeUsd"] = "volumeUSD";
  PoolHourData_OrderBy["FeesUsd"] = "feesUSD";
  PoolHourData_OrderBy["TxCount"] = "txCount";
  PoolHourData_OrderBy["Open"] = "open";
  PoolHourData_OrderBy["High"] = "high";
  PoolHourData_OrderBy["Low"] = "low";
  PoolHourData_OrderBy["Close"] = "close";
})(PoolHourData_OrderBy || (PoolHourData_OrderBy = {}));

export let Pool_OrderBy;

(function (Pool_OrderBy) {
  Pool_OrderBy["Id"] = "id";
  Pool_OrderBy["CreatedAtTimestamp"] = "createdAtTimestamp";
  Pool_OrderBy["CreatedAtBlockNumber"] = "createdAtBlockNumber";
  Pool_OrderBy["Token0"] = "token0";
  Pool_OrderBy["Token1"] = "token1";
  Pool_OrderBy["FeeTier"] = "feeTier";
  Pool_OrderBy["Liquidity"] = "liquidity";
  Pool_OrderBy["SqrtPrice"] = "sqrtPrice";
  Pool_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
  Pool_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
  Pool_OrderBy["Token0Price"] = "token0Price";
  Pool_OrderBy["Token1Price"] = "token1Price";
  Pool_OrderBy["Tick"] = "tick";
  Pool_OrderBy["ObservationIndex"] = "observationIndex";
  Pool_OrderBy["VolumeToken0"] = "volumeToken0";
  Pool_OrderBy["VolumeToken1"] = "volumeToken1";
  Pool_OrderBy["VolumeUsd"] = "volumeUSD";
  Pool_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  Pool_OrderBy["FeesUsd"] = "feesUSD";
  Pool_OrderBy["TxCount"] = "txCount";
  Pool_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
  Pool_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
  Pool_OrderBy["CollectedFeesUsd"] = "collectedFeesUSD";
  Pool_OrderBy["TotalValueLockedToken0"] = "totalValueLockedToken0";
  Pool_OrderBy["TotalValueLockedToken1"] = "totalValueLockedToken1";
  Pool_OrderBy["TotalValueLockedEth"] = "totalValueLockedETH";
  Pool_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
  Pool_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
  Pool_OrderBy["LiquidityProviderCount"] = "liquidityProviderCount";
  Pool_OrderBy["PoolHourData"] = "poolHourData";
  Pool_OrderBy["PoolDayData"] = "poolDayData";
  Pool_OrderBy["Mints"] = "mints";
  Pool_OrderBy["Burns"] = "burns";
  Pool_OrderBy["Swaps"] = "swaps";
  Pool_OrderBy["Collects"] = "collects";
  Pool_OrderBy["Ticks"] = "ticks";
})(Pool_OrderBy || (Pool_OrderBy = {}));

export let PositionSnapshot_OrderBy;

(function (PositionSnapshot_OrderBy) {
  PositionSnapshot_OrderBy["Id"] = "id";
  PositionSnapshot_OrderBy["Owner"] = "owner";
  PositionSnapshot_OrderBy["Pool"] = "pool";
  PositionSnapshot_OrderBy["Position"] = "position";
  PositionSnapshot_OrderBy["BlockNumber"] = "blockNumber";
  PositionSnapshot_OrderBy["Timestamp"] = "timestamp";
  PositionSnapshot_OrderBy["Liquidity"] = "liquidity";
  PositionSnapshot_OrderBy["DepositedToken0"] = "depositedToken0";
  PositionSnapshot_OrderBy["DepositedToken1"] = "depositedToken1";
  PositionSnapshot_OrderBy["WithdrawnToken0"] = "withdrawnToken0";
  PositionSnapshot_OrderBy["WithdrawnToken1"] = "withdrawnToken1";
  PositionSnapshot_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
  PositionSnapshot_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
  PositionSnapshot_OrderBy["Transaction"] = "transaction";
  PositionSnapshot_OrderBy["FeeGrowthInside0LastX128"] = "feeGrowthInside0LastX128";
  PositionSnapshot_OrderBy["FeeGrowthInside1LastX128"] = "feeGrowthInside1LastX128";
})(PositionSnapshot_OrderBy || (PositionSnapshot_OrderBy = {}));

export let Position_OrderBy;

(function (Position_OrderBy) {
  Position_OrderBy["Id"] = "id";
  Position_OrderBy["Owner"] = "owner";
  Position_OrderBy["Pool"] = "pool";
  Position_OrderBy["Token0"] = "token0";
  Position_OrderBy["Token1"] = "token1";
  Position_OrderBy["TickLower"] = "tickLower";
  Position_OrderBy["TickUpper"] = "tickUpper";
  Position_OrderBy["Liquidity"] = "liquidity";
  Position_OrderBy["DepositedToken0"] = "depositedToken0";
  Position_OrderBy["DepositedToken1"] = "depositedToken1";
  Position_OrderBy["WithdrawnToken0"] = "withdrawnToken0";
  Position_OrderBy["WithdrawnToken1"] = "withdrawnToken1";
  Position_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
  Position_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
  Position_OrderBy["Transaction"] = "transaction";
  Position_OrderBy["FeeGrowthInside0LastX128"] = "feeGrowthInside0LastX128";
  Position_OrderBy["FeeGrowthInside1LastX128"] = "feeGrowthInside1LastX128";
})(Position_OrderBy || (Position_OrderBy = {}));

export let Swap_OrderBy;

(function (Swap_OrderBy) {
  Swap_OrderBy["Id"] = "id";
  Swap_OrderBy["Transaction"] = "transaction";
  Swap_OrderBy["Timestamp"] = "timestamp";
  Swap_OrderBy["Pool"] = "pool";
  Swap_OrderBy["Token0"] = "token0";
  Swap_OrderBy["Token1"] = "token1";
  Swap_OrderBy["Sender"] = "sender";
  Swap_OrderBy["Recipient"] = "recipient";
  Swap_OrderBy["Origin"] = "origin";
  Swap_OrderBy["Amount0"] = "amount0";
  Swap_OrderBy["Amount1"] = "amount1";
  Swap_OrderBy["AmountUsd"] = "amountUSD";
  Swap_OrderBy["SqrtPriceX96"] = "sqrtPriceX96";
  Swap_OrderBy["Tick"] = "tick";
  Swap_OrderBy["LogIndex"] = "logIndex";
})(Swap_OrderBy || (Swap_OrderBy = {}));

export let TickDayData_OrderBy;

(function (TickDayData_OrderBy) {
  TickDayData_OrderBy["Id"] = "id";
  TickDayData_OrderBy["Date"] = "date";
  TickDayData_OrderBy["Pool"] = "pool";
  TickDayData_OrderBy["Tick"] = "tick";
  TickDayData_OrderBy["LiquidityGross"] = "liquidityGross";
  TickDayData_OrderBy["LiquidityNet"] = "liquidityNet";
  TickDayData_OrderBy["VolumeToken0"] = "volumeToken0";
  TickDayData_OrderBy["VolumeToken1"] = "volumeToken1";
  TickDayData_OrderBy["VolumeUsd"] = "volumeUSD";
  TickDayData_OrderBy["FeesUsd"] = "feesUSD";
  TickDayData_OrderBy["FeeGrowthOutside0X128"] = "feeGrowthOutside0X128";
  TickDayData_OrderBy["FeeGrowthOutside1X128"] = "feeGrowthOutside1X128";
})(TickDayData_OrderBy || (TickDayData_OrderBy = {}));

export let TickHourData_OrderBy;

(function (TickHourData_OrderBy) {
  TickHourData_OrderBy["Id"] = "id";
  TickHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
  TickHourData_OrderBy["Pool"] = "pool";
  TickHourData_OrderBy["Tick"] = "tick";
  TickHourData_OrderBy["LiquidityGross"] = "liquidityGross";
  TickHourData_OrderBy["LiquidityNet"] = "liquidityNet";
  TickHourData_OrderBy["VolumeToken0"] = "volumeToken0";
  TickHourData_OrderBy["VolumeToken1"] = "volumeToken1";
  TickHourData_OrderBy["VolumeUsd"] = "volumeUSD";
  TickHourData_OrderBy["FeesUsd"] = "feesUSD";
})(TickHourData_OrderBy || (TickHourData_OrderBy = {}));

export let Tick_OrderBy;

(function (Tick_OrderBy) {
  Tick_OrderBy["Id"] = "id";
  Tick_OrderBy["PoolAddress"] = "poolAddress";
  Tick_OrderBy["TickIdx"] = "tickIdx";
  Tick_OrderBy["Pool"] = "pool";
  Tick_OrderBy["LiquidityGross"] = "liquidityGross";
  Tick_OrderBy["LiquidityNet"] = "liquidityNet";
  Tick_OrderBy["Price0"] = "price0";
  Tick_OrderBy["Price1"] = "price1";
  Tick_OrderBy["VolumeToken0"] = "volumeToken0";
  Tick_OrderBy["VolumeToken1"] = "volumeToken1";
  Tick_OrderBy["VolumeUsd"] = "volumeUSD";
  Tick_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  Tick_OrderBy["FeesUsd"] = "feesUSD";
  Tick_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
  Tick_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
  Tick_OrderBy["CollectedFeesUsd"] = "collectedFeesUSD";
  Tick_OrderBy["CreatedAtTimestamp"] = "createdAtTimestamp";
  Tick_OrderBy["CreatedAtBlockNumber"] = "createdAtBlockNumber";
  Tick_OrderBy["LiquidityProviderCount"] = "liquidityProviderCount";
  Tick_OrderBy["FeeGrowthOutside0X128"] = "feeGrowthOutside0X128";
  Tick_OrderBy["FeeGrowthOutside1X128"] = "feeGrowthOutside1X128";
})(Tick_OrderBy || (Tick_OrderBy = {}));

export let TokenDayData_OrderBy;

(function (TokenDayData_OrderBy) {
  TokenDayData_OrderBy["Id"] = "id";
  TokenDayData_OrderBy["Date"] = "date";
  TokenDayData_OrderBy["Token"] = "token";
  TokenDayData_OrderBy["Volume"] = "volume";
  TokenDayData_OrderBy["VolumeUsd"] = "volumeUSD";
  TokenDayData_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  TokenDayData_OrderBy["TotalValueLocked"] = "totalValueLocked";
  TokenDayData_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
  TokenDayData_OrderBy["PriceUsd"] = "priceUSD";
  TokenDayData_OrderBy["FeesUsd"] = "feesUSD";
  TokenDayData_OrderBy["Open"] = "open";
  TokenDayData_OrderBy["High"] = "high";
  TokenDayData_OrderBy["Low"] = "low";
  TokenDayData_OrderBy["Close"] = "close";
})(TokenDayData_OrderBy || (TokenDayData_OrderBy = {}));

export let TokenHourData_OrderBy;

(function (TokenHourData_OrderBy) {
  TokenHourData_OrderBy["Id"] = "id";
  TokenHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
  TokenHourData_OrderBy["Token"] = "token";
  TokenHourData_OrderBy["Volume"] = "volume";
  TokenHourData_OrderBy["VolumeUsd"] = "volumeUSD";
  TokenHourData_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  TokenHourData_OrderBy["TotalValueLocked"] = "totalValueLocked";
  TokenHourData_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
  TokenHourData_OrderBy["PriceUsd"] = "priceUSD";
  TokenHourData_OrderBy["FeesUsd"] = "feesUSD";
  TokenHourData_OrderBy["Open"] = "open";
  TokenHourData_OrderBy["High"] = "high";
  TokenHourData_OrderBy["Low"] = "low";
  TokenHourData_OrderBy["Close"] = "close";
})(TokenHourData_OrderBy || (TokenHourData_OrderBy = {}));

export let Token_OrderBy;

(function (Token_OrderBy) {
  Token_OrderBy["Id"] = "id";
  Token_OrderBy["Symbol"] = "symbol";
  Token_OrderBy["Name"] = "name";
  Token_OrderBy["Decimals"] = "decimals";
  Token_OrderBy["TotalSupply"] = "totalSupply";
  Token_OrderBy["Volume"] = "volume";
  Token_OrderBy["VolumeUsd"] = "volumeUSD";
  Token_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
  Token_OrderBy["FeesUsd"] = "feesUSD";
  Token_OrderBy["TxCount"] = "txCount";
  Token_OrderBy["PoolCount"] = "poolCount";
  Token_OrderBy["TotalValueLocked"] = "totalValueLocked";
  Token_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
  Token_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
  Token_OrderBy["DerivedEth"] = "derivedETH";
  Token_OrderBy["WhitelistPools"] = "whitelistPools";
  Token_OrderBy["TokenDayData"] = "tokenDayData";
})(Token_OrderBy || (Token_OrderBy = {}));

export let Transaction_OrderBy;

(function (Transaction_OrderBy) {
  Transaction_OrderBy["Id"] = "id";
  Transaction_OrderBy["BlockNumber"] = "blockNumber";
  Transaction_OrderBy["Timestamp"] = "timestamp";
  Transaction_OrderBy["GasUsed"] = "gasUsed";
  Transaction_OrderBy["GasPrice"] = "gasPrice";
  Transaction_OrderBy["Mints"] = "mints";
  Transaction_OrderBy["Burns"] = "burns";
  Transaction_OrderBy["Swaps"] = "swaps";
  Transaction_OrderBy["Flashed"] = "flashed";
  Transaction_OrderBy["Collects"] = "collects";
})(Transaction_OrderBy || (Transaction_OrderBy = {}));

export let UniswapDayData_OrderBy;

(function (UniswapDayData_OrderBy) {
  UniswapDayData_OrderBy["Id"] = "id";
  UniswapDayData_OrderBy["Date"] = "date";
  UniswapDayData_OrderBy["VolumeEth"] = "volumeETH";
  UniswapDayData_OrderBy["VolumeUsd"] = "volumeUSD";
  UniswapDayData_OrderBy["VolumeUsdUntracked"] = "volumeUSDUntracked";
  UniswapDayData_OrderBy["FeesUsd"] = "feesUSD";
  UniswapDayData_OrderBy["TxCount"] = "txCount";
  UniswapDayData_OrderBy["TvlUsd"] = "tvlUSD";
})(UniswapDayData_OrderBy || (UniswapDayData_OrderBy = {}));

export let _SubgraphErrorPolicy_;

(function (_SubgraphErrorPolicy_) {
  _SubgraphErrorPolicy_["Allow"] = "allow";
  _SubgraphErrorPolicy_["Deny"] = "deny";
})(_SubgraphErrorPolicy_ || (_SubgraphErrorPolicy_ = {}));

export const AllV3TicksDocument = `
    query allV3Ticks($poolAddress: String!, $skip: Int!) {
  ticks(
    first: 1000
    skip: $skip
    where: {poolAddress: $poolAddress}
    orderBy: tickIdx
  ) {
    tickIdx
    liquidityNet
    price0
    price1
  }
}
    `;
export const FeeTierDistributionDocument = `
    query feeTierDistribution($token0: String!, $token1: String!) {
  _meta {
    block {
      number
    }
  }
  asToken0: pools(
    orderBy: totalValueLockedToken0
    orderDirection: desc
    where: {token0: $token0, token1: $token1}
  ) {
    feeTier
    totalValueLockedToken0
    totalValueLockedToken1
  }
  asToken1: pools(
    orderBy: totalValueLockedToken0
    orderDirection: desc
    where: {token0: $token1, token1: $token0}
  ) {
    feeTier
    totalValueLockedToken0
    totalValueLockedToken1
  }
}
    `;
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    allV3Ticks: build.query({
      query: variables => ({
        document: AllV3TicksDocument,
        variables
      })
    }),
    feeTierDistribution: build.query({
      query: variables => ({
        document: FeeTierDistributionDocument,
        variables
      })
    })
  })
});
export { injectedRtkApi as api };
export const {
  useAllV3TicksQuery,
  useLazyAllV3TicksQuery,
  useFeeTierDistributionQuery,
  useLazyFeeTierDistributionQuery
} = injectedRtkApi;