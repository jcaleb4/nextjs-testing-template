import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getServerSession } from 'next-auth';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const emptySplitApi = createApi({
  baseQuery: async (args: string | FetchArgs, api, extraOptions) => {
    const session = await getServerSession();
    const result = await fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (session?.accessToken) {
          headers.set('authorization', `Bearer ${session?.accessToken}`);
        }
        headers.set('Access-Control-Allow-Credentials', 'true');
        headers.set('Access-Control-Allow-Origin', baseUrl);
        headers.set('Access-Control-Allow-Headers', baseUrl);
        headers.set('X-Frame-Options', 'SAMEORIGIN');

        return headers;
      },
    })(args, api, extraOptions);

    return result;
  },
  endpoints: () => ({}),
});

export const api = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => '/',
    }),
  }),
  overrideExisting: true,
});

export const {
  util: { resetApiState },
} = api;
