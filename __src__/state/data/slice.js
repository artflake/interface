import { createApi } from '@reduxjs/toolkit/query/react';
import { SupportedChainId } from 'constants/chains';
import { ClientError, gql, GraphQLClient } from 'graphql-request';
// List of supported subgraphs. Note that the app currently only support one active subgraph at a time
const CHAIN_SUBGRAPH_URL = {
  [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [SupportedChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [SupportedChainId.ARBITRUM_ONE]: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal',
  [SupportedChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev'
};
export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: graphqlRequestBaseQuery(),
  endpoints: builder => ({
    allV3Ticks: builder.query({
      query: _ref => {
        let {
          poolAddress,
          skip = 0
        } = _ref;
        return {
          document: gql`
          query allV3Ticks($poolAddress: String!, $skip: Int!) {
            ticks(first: 1000, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
              tickIdx
              liquidityNet
              price0
              price1
            }
          }
        `,
          variables: {
            poolAddress,
            skip
          }
        };
      }
    }),
    feeTierDistribution: builder.query({
      query: _ref2 => {
        let {
          token0,
          token1
        } = _ref2;
        return {
          document: gql`
          query feeTierDistribution($token0: String!, $token1: String!) {
            _meta {
              block {
                number
              }
            }
            asToken0: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token0, token1: $token1 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
            asToken1: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token1, token1: $token0 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
          }
        `,
          variables: {
            token0,
            token1
          }
        };
      }
    })
  })
}); // Graphql query client wrapper that builds a dynamic url based on chain id

function graphqlRequestBaseQuery() {
  return async (_ref3, _ref4) => {
    let {
      document,
      variables
    } = _ref3;
    let {
      getState
    } = _ref4;

    try {
      const chainId = getState().application.chainId;
      const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : undefined;

      if (!subgraphUrl) {
        return {
          error: {
            name: 'UnsupportedChainId',
            message: `Subgraph queries against ChainId ${chainId} are not supported.`,
            stack: ''
          }
        };
      }

      return {
        data: await new GraphQLClient(subgraphUrl).request(document, variables),
        meta: {}
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const {
          name,
          message,
          stack,
          request,
          response
        } = error;
        return {
          error: {
            name,
            message,
            stack
          },
          meta: {
            request,
            response
          }
        };
      }

      throw error;
    }
  };
}