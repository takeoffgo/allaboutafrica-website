"use server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  GetQuoteDocument,
  GetQuoteQuery,
  GetQuoteQueryVariables,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";
import { mediaUrl } from "@/components/Quote/global/helpers";
import ItineraryPage from "@/components/2026/itinerary/ItineraryPage";

async function fetchQuote(key: string): Promise<GetQuoteQuery> {
  const res = await jamboClient.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key },
  });
  return res.data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const data = await fetchQuote((await params).key);
  return {
    title: [data.quote?.hero?.title ?? "Itinerary", "All About Africa"].join(
      " - "
    ),
    description: data.quote?.hero?.subtitle ?? "Your personalised itinerary",
    openGraph: {
      images: data.quote?.hero?.image?.hash
        ? [
            {
              url: mediaUrl(data.quote.hero.image.hash, { w: 1200, h: 630 }),
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const key = (await params).key;
  const data = await fetchQuote(key);

  if (!data?.quote) {
    return notFound();
  }

  return <ItineraryPage data={data} quoteKey={key} />;
}
