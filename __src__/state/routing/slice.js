import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
export const routingApi = createApi({
  reducerPath: 'routingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.uniswap.org/v1/'
  }),
  endpoints: build => ({
    getQuote: build.query({
      query: args => `quote?${qs.stringify({ ...args,
        protocols: 'v3'
      })}`
    })
  })
});
export const {
  useGetQuoteQuery
} = routingApi;