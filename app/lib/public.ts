import {
  ApolloClient,
  ApolloClientOptions,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const options: ApolloClientOptions<NormalizedCacheObject> = {
  cache: new InMemoryCache({}),

  link: new HttpLink({
    uri: `/api/graphql`,
  }),
};

export const client = new ApolloClient(options);
