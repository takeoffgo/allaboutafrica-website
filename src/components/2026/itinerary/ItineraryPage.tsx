"use client";
import React, { useState } from "react";
import moment from "moment-timezone";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { mediaUrl, extractSortedFlights } from "@/components/Quote/global/helpers";

type FlightItem = NonNullable<ReturnType<typeof extractSortedFlights>[0]>;
import styles from "./itinerary.module.scss";
import NavBar from "./NavBar";
import InfoBar from "./InfoBar";
import SectionAccordion from "./SectionAccordion";
import ItinerarySection from "./ItinerarySection";
import LodgingSection from "./LodgingSection";
import FlightsSection from "./FlightsSection";
import FooterSection from "./FooterSection";

const splitOrdinal = (date: string) => {
  const m = moment.utc(date);
  const day = m.format("D");
  const suffix = m.format("Do").slice(day.length);
  const prefix = m.format("ddd MMM");
  return { day, suffix, prefix };
};

type Props = {
  data: GetQuoteQuery;
  quoteKey: string;
};

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
  const heroImageUrl = quote.hero?.image?.hash
    ? mediaUrl(quote.hero.image.hash)
    : undefined;
  const heroTitle = quote.hero?.title ?? "";

  const consultant = quote.trip?.agencyMember ?? null;
  const client = quote.user ?? null;
  const startDate = quote.start ?? "";
  const endDate = startDate
    ? moment(startDate).add(quote.duration ?? 0, "days").format("MMMM Do, YYYY")
    : "";
  const startFormatted = startDate
    ? moment(startDate).format("MMM Do, YYYY")
    : "";

  const flights = extractSortedFlights(data);
  const legalDocs = quote.legalDocuments?.nodes ?? [];
  const accommodation = quote.accommodation?.nodes ?? [];

  const daysWithRepeat = (quote.days?.nodes ?? []).map((day, index, array) => {
    const repeat =
      index > 0 &&
      day?.accommodationId === array[index - 1]?.accommodationId &&
      (array[index - 1]?.activityDetail === day?.activityDetail || !day?.activityDetail);
    return { ...day, repeat };
  });
  const summaryRows = daysWithRepeat
    .map((day, index, array) => {
      if (day.repeat) return null;
      let span = 0;
      for (let i = index + 1; i < array.length; i++) {
        if (!array[i].repeat) break;
        span++;
      }
      return { day, span };
    })
    .filter(Boolean) as { day: (typeof daysWithRepeat)[0]; span: number }[];

  const navSections = [
    { id: "summary", label: "SUMMARY" },
    { id: "flights", label: "FLIGHTS" },
    { id: "itinerary", label: "ITINERARY" },
    { id: "lodging", label: "LODGING" },
    { id: "map", label: "MAP" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div
          className={styles.hero__bg}
          style={{ backgroundImage: heroImageUrl ? `url(${heroImageUrl})` : undefined }}
        />
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <NavBar
            sections={navSections}
            onSectionClick={scrollTo}
          />
          <h1 className={styles.hero__title}>{heroTitle}</h1>
          <hr className={styles.hero__divider} />
          <div className={styles.hero__spacer} />
          <div className={styles.hero__explore}>
            Let&rsquo;s Explore
            <div className={styles.hero__mouse}>
              <svg className={styles.hero__mouseArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info bar ── */}
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
          <div className={styles.summary}>
            {summaryRows.map(({ day, span }) => {
              const dayOrder = day.sortOrder ?? 0;
              const dayNumber = dayOrder + 1;
              const dayLabel =
                span === 0
                  ? `DAY ${dayNumber}`
                  : `DAY ${dayNumber}-${dayOrder + span + 1}`;

              const startOrd = splitOrdinal(day.date ?? "");
              const endOrd =
                span > 0
                  ? splitOrdinal(
                      moment.utc(day.date ?? "").add(span, "days").toISOString()
                    )
                  : null;

              const destinations = day.quoteDayDestinationsByDayId?.nodes ?? [];
              const locationName = destinations
                .map((d) => d?.destination?.name)
                .filter(Boolean)
                .join(", ");

              const accom = accommodation.find((a) => a?.id === day.accommodationId);
              const accommodationName = accom?.property?.name ?? "";

              return (
                <div key={day.id} className={styles.summary__row}>
                  <div className={styles.summary__badge}>{dayLabel}</div>
                  <div className={styles.summary__cols}>
                    <div className={styles.summary__date}>
                      {startOrd.prefix} {startOrd.day}
                      <sup>{startOrd.suffix}</sup>
                      {endOrd && (
                        <>
                          {" \u2013 "}
                          {endOrd.prefix} {endOrd.day}
                          <sup>{endOrd.suffix}</sup>
                        </>
                      )}
                    </div>
                    <div className={styles.summary__location}>{locationName}</div>
                    <div className={styles.summary__accommodation}>{accommodationName}</div>
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* ── Footer ── */}
      <FooterSection consultant={consultant} />
    </div>
  );
};

export default ItineraryPage;
