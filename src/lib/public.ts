import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const options: ApolloClientOptions<NormalizedCacheObject> = {
  cache: new InMemoryCache({}),

  uri: `/api/graphql`,
};

export const client = new ApolloClient(options);
