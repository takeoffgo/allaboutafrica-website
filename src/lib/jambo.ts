import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import intro from "@/lib/api/jambo";

const httpLink = new HttpLink({
  uri: process.env.JAMBO_URL!,
  fetchOptions: { next: { revalidate: 30 } },
  headers: {
    "X-Token": process.env.JAMBO_TOKEN!,
  },
});

const options: ApolloClientOptions<NormalizedCacheObject> = {
  cache: new InMemoryCache({
    possibleTypes: intro.possibleTypes,
  }),

  link: httpLink,
};

export const jamboClient = new ApolloClient(options);
