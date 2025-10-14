"use client";
import React from "react";
import { useTrackQuoteViewMutation } from "@/lib/api/public";
import { client } from "@/lib/public";

type TrackingProps = { quoteKey: string; viewType: string; preview: boolean };
export function Tracking({ quoteKey, viewType, preview }: TrackingProps) {
  const [trackView] = useTrackQuoteViewMutation({ client });

  React.useEffect(() => {
    if (quoteKey && viewType && !preview) {
      trackView({
        variables: { input: { key: quoteKey as string, viewType } },
      });
    }
  }, []);

  return null;
}
