import {
  GetQuoteDocument,
  type GetQuoteQuery,
  type GetQuoteQueryVariables,
} from "../lib/api/jambo";
import ItineraryPage from "../itinerary/components/ItineraryPage";
import { makeJamboClient } from "~/lib/jambo";
import type { LinksFunction } from "react-router";
import type { Route } from "../+types/root";

export function meta({ loaderData }: Route.MetaArgs) {
  const data = loaderData!.quote;
  return [{ title: `${data.quote.hero.title} - All About Africa` }];
}
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.allaboutafrica.au/fonts/copernicus/font.css",
  },
];

export async function loader({ params, context }: Route.LoaderArgs) {
  const client = makeJamboClient(context.cloudflare.env || process.env);
  const key = params["key"]!;
  const res = await client.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key },
  });
  return { quote: res.data };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const data = loaderData!.quote;

  if (!data?.quote) {
    return null;
  }

  return <ItineraryPage data={data} />;
}
