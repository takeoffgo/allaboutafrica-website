"use server";
import { notFound } from "next/navigation";
import QuoteComp from "@/components/Quote";
import {
  GetQuoteDocument,
  GetQuoteQuery,
  GetQuoteQueryVariables,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";

import { mediaUrl } from "@/components/Quote/global/helpers";
import { Metadata } from "next";

import "@/style/print.scss";
import "@/style/style.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const model = await fetchQuote((await params).key);

  const providerName = model.quote?.trip?.agency
    ? model.quote?.trip?.agency.name
    : "All About Africa";

  return {
    title: [
      model.quote?.hero ? model.quote.hero.title : "Quote",
      "Experience the Extraordinary",
      providerName,
    ].join(" - "),
    description: model.quote?.hero?.subtitle ?? "Experience the Extraordinary",
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      images: model.quote?.hero?.image?.hash
        ? [
            {
              url: mediaUrl(model.quote.hero.image?.hash, {
                w: 1000,
                h: 1000,
              }),
              width: 1000,
              height: 1000,
            },
          ]
        : [],
    },
  };
}

export default async function ItineraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const res = await jamboClient.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key: (await params).key as string },
  });

  const model = res.data;
  const modelAdj = {
    ...model,
    quote: {
      ...model.quote,
      total: 0,
    },
  };

  if (!model?.quote) {
    console.error(`no model for '${(await params).key}'`);
    return notFound();
  }

  return (
    <QuoteComp
      model={modelAdj as GetQuoteQuery}
      quoteKey={(await params).key}
      viewType="itinerary"
      preview={(await searchParams).preview === "true"}
    />
  );
}

async function fetchQuote(key: string): Promise<GetQuoteQuery> {
  const res = await jamboClient.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key },
  });

  return res.data;
}
