// middleware.ts (at the project root)
import {
  GetQuoteQuery,
  GetQuoteQueryVariables,
  GetQuoteDocument,
} from "@/lib/api/jambo";
import { jamboClient } from "@/lib/jambo";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

enum QuoteStatus {
  Active = 0,
  Confirmed = 1,
  Expired = 2,
  Void = 3,
  Sample = 4,
}

export async function middleware(request: NextRequest) {
  // Only run this middleware for quote pages
  if (request.nextUrl.pathname.startsWith("/quote/")) {
    const key = request.nextUrl.pathname.split("/").pop();

    // You would need to fetch the quote status here
    // This is a placeholder for where you'd make that logic
    const quoteStatus = await checkQuoteStatus(key!);

    if (
      quoteStatus === QuoteStatus.Confirmed ||
      quoteStatus === QuoteStatus.Sample
    ) {
      // Confirmed or Sample
      const preview = request.nextUrl.searchParams.get("preview") === "true";
      const redirectUrl = new URL(
        `/itinerary/${key}${preview ? "?preview=true" : ""}`,
        request.url,
      );
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Match only quote routes
export const config = {
  matcher: "/quote/:key*",
};

// This would be your actual implementation to check the quote status
async function checkQuoteStatus(key: string) {
  const res = await jamboClient.query<GetQuoteQuery, GetQuoteQueryVariables>({
    query: GetQuoteDocument,
    fetchPolicy: "network-only",
    variables: { key },
  });

  return res.data.quote?.status ?? -1;
}
