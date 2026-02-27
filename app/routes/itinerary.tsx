import {
  GetQuoteDocument,
  type GetQuoteQuery,
  type GetQuoteQueryVariables,
} from "../lib/api/jambo";
import ItineraryPage from "../itinerary/components/ItineraryPage";
import { jamboClient } from "~/lib/jambo";
import type { LinksFunction } from "react-router";
import type { Route } from "../+types/root";

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

export async function loader({ params }: Route.LoaderArgs) {
  const key = params["key"]!;
  const res = await jamboClient.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key },
  });
  return { quote: res.data, key: key! };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const key = loaderData!.key;
  const data = loaderData!.quote;

  if (!data?.quote) {
    return null;
  }

  return <ItineraryPage data={data} quoteKey={key} />;
}
