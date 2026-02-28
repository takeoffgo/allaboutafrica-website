"use client";
import React, { useState } from "react";
import moment from "moment-timezone";
import type { GetQuoteQuery } from "../../lib/api/jambo";
import { mediaUrl, extractSortedFlights } from "../helpers";
import styles from "./ItineraryPage.module.scss";
import HeroSection from "./HeroSection";
import InfoBar from "./InfoBar";
import SectionAccordion from "./SectionAccordion";
import SummarySection from "./SummarySection";
import ItinerarySection from "./ItinerarySection";
import LodgingSection from "./LodgingSection";
import FlightsSection from "./FlightsSection";
import SiteFooter from "~/components/SiteFooter";

type FlightItem = NonNullable<ReturnType<typeof extractSortedFlights>[0]>;

type Props = {
  data: GetQuoteQuery;
};

const NAV_SECTIONS = [
  { id: "summary", label: "SUMMARY" },
  { id: "flights", label: "FLIGHTS" },
  { id: "itinerary", label: "ITINERARY" },
  { id: "lodging", label: "LODGING" },
  { id: "map", label: "MAP" },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const ItineraryPage: React.FC<Props> = ({ data }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: false,
    flights: false,
    itinerary: true,
    lodging: true,
    documents: false,
    map: true,
  });

  const toggle = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const quote = data.quote!;
  const heroImageUrl = quote.hero?.image?.hash ? mediaUrl(quote.hero.image.hash) : undefined;
  const heroTitle = quote.hero?.title ?? "";

  const consultant = quote.trip?.agencyMember ?? null;
  const client = quote.user ?? null;
  const startDate = quote.start ?? "";
  const endDate = startDate
    ? moment(startDate).add(quote.duration ?? 0, "days").format("MMMM Do, YYYY")
    : "";
  const startFormatted = startDate ? moment(startDate).format("MMM Do, YYYY") : "";

  const flights = extractSortedFlights(data);
  const legalDocs = quote.legalDocuments?.nodes ?? [];
  const accommodation = quote.accommodation?.nodes ?? [];

  return (
    <div className={styles.page}>
      <HeroSection
        imageUrl={heroImageUrl}
        title={heroTitle}
        sections={NAV_SECTIONS}
        onSectionClick={scrollTo}
      />

      <InfoBar
        startDate={startFormatted}
        endDate={endDate}
        client={client}
        consultant={consultant}
      />

      {/* ── Quick Summary ── */}
      <div id="summary">
        <SectionAccordion
          title="Quick Summary"
          isOpen={openSections.summary}
          onToggle={() => toggle("summary")}
          showChevron
        >
          <SummarySection data={data} />
        </SectionAccordion>
      </div>

      {/* ── Flights ── */}
      <div id="flights">
        <SectionAccordion
          title="Flights"
          isOpen={openSections.flights}
          onToggle={() => toggle("flights")}
          showChevron
        >
          <FlightsSection flights={flights.filter((f): f is FlightItem => f !== null)} />
        </SectionAccordion>
      </div>

      {/* ── Itinerary Detail ── */}
      <div id="itinerary">
        <SectionAccordion
          title="Itinerary Detail"
          isOpen={openSections.itinerary}
          onToggle={() => toggle("itinerary")}
          showChevron={false}
        >
          <ItinerarySection data={data} />
        </SectionAccordion>
      </div>

      {/* ── Lodging ── */}
      <div id="lodging">
        <SectionAccordion
          title="Lodging"
          isOpen={openSections.lodging}
          onToggle={() => toggle("lodging")}
          showChevron={false}
        >
          <LodgingSection accommodation={accommodation} data={data} />
        </SectionAccordion>
      </div>

      {/* ── Travel Documents ── */}
      <div id="documents">
        <SectionAccordion
          title="Travel Documents"
          isOpen={openSections.documents}
          onToggle={() => toggle("documents")}
          showChevron
        >
          <div className={styles.docs}>
            {legalDocs.length === 0 ? (
              <div className={styles.docs__item}>No documents available.</div>
            ) : (
              legalDocs.map((doc) =>
                doc?.legalDocument ? (
                  <div key={doc.id} className={styles.docs__item}>
                    <svg viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    {doc.legalDocument.name}
                  </div>
                ) : null
              )
            )}
          </div>
        </SectionAccordion>
      </div>

      {/* ── Map ── */}
      <div id="map">
        <SectionAccordion
          title="Map"
          isOpen={openSections.map}
          onToggle={() => toggle("map")}
          showChevron={false}
        >
          <div className={styles.map}>
            <div className={styles.map__placeholder}>Map coming soon</div>
          </div>
        </SectionAccordion>
      </div>

      <SiteFooter consultant={consultant} />
    </div>
  );
};

export default ItineraryPage;
