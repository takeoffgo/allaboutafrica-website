import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import intro from "./api/jambo";

export function makeJamboClient(env: {
  JAMBO_URL: string;
  JAMBO_TOKEN: string;
}) {
  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: intro.possibleTypes,
    }),
    link: new HttpLink({
      uri: env.JAMBO_URL,
      headers: {
        "X-Token": env.JAMBO_TOKEN,
      },
    }),
  });
}

