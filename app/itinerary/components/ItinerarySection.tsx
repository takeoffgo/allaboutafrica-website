import React from "react";
import moment from "moment-timezone";
import styles from "./itinerary.module.scss";
import type { GetQuoteQuery } from "~/lib/api/jambo";
import { mediaUrl } from "../helpers";

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="white"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" stroke="white"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const calculateSpan = (index: number, source: { repeat: boolean }[]): number => {
  let count = 0;
  for (let i = index + 1; i < source.length; i++) {
    if (!source[i].repeat) break;
    count++;
  }
  return count;
};

// Split a block's text into an optional label (first line ending with ":") and body.
const parseBlock = (block: string): { label: string | null; body: string } => {
  const lines = block.split("\n");
  const firstLine = lines[0].trim();
  if (firstLine.endsWith(":") && firstLine.length < 120) {
    return { label: firstLine, body: lines.slice(1).join("\n").trim() };
  }
  return { label: null, body: block };
};

// Returns the day-of-month number and its ordinal suffix separately so we can
// render the suffix as a <sup>.
const splitOrdinal = (date: string): { day: string; suffix: string; prefix: string } => {
  const m = moment.utc(date);
  const day = m.format("D");
  const suffix = m.format("Do").slice(day.length);
  const prefix = m.format("ddd MMM");
  return { day, suffix, prefix };
};

type Props = {
  data: GetQuoteQuery;
};

const ItinerarySection: React.FC<Props> = ({ data }) => {
  const quote = data.quote!;

  const daysWithRepeat = (quote.days?.nodes ?? []).map((day, index, array) => {
    const repeat =
      index > 0 &&
      day?.accommodationId === array[index - 1]?.accommodationId &&
      (array[index - 1]?.activityDetail === day?.activityDetail || !day?.activityDetail);
    return { ...day, repeat };
  });

  const visibleDays = daysWithRepeat
    .map((day, index, array) => {
      if (day.repeat) return null;
      const daySpan = calculateSpan(index, array);
      return { day, index, daySpan };
    })
    .filter(Boolean) as { day: (typeof daysWithRepeat)[0]; index: number; daySpan: number }[];

  return (
    <div className={styles.itinerary__list}>
      {visibleDays.map(({ day, daySpan }) => {
        const dayOrder = day.sortOrder ?? 0;
        const dayNumber = dayOrder + 1;

        const dayLabel =
          daySpan === 0
            ? `Day ${dayNumber}`
            : `Day ${dayNumber}–${dayOrder + daySpan + 1}`;

        // Date with superscript ordinal for single days; plain range for multi-day spans
        const startOrd = splitOrdinal(day.date ?? "");
        const dateNode =
          daySpan === 0 ? (
            <p className={styles.day__date}>
              {startOrd.prefix} {startOrd.day}<sup>{startOrd.suffix}</sup>
            </p>
          ) : (
            <p className={styles.day__date}>
              {moment.utc(day.date ?? "").format("ddd MMM Do")}
              {" – "}
              {moment.utc(day.date ?? "").add(daySpan, "days").format("ddd MMM Do")}
            </p>
          );

        const destinations = day.quoteDayDestinationsByDayId?.nodes ?? [];
        const locationName =
          destinations.length > 0
            ? destinations.map((d) => d?.destination?.name).filter(Boolean).join(", ")
            : null;

        const accom = quote.accommodation?.nodes.find((a) => a?.id === day.accommodationId);
        const photoHash = accom?.property?.heroMedia?.hash;

        // Split on *** markers (block separators) or double newlines, then detect labels
        const activityBlocks = day.activityDetail
          ? day.activityDetail
              .split(/\*{3}[^\n]*|\n{2,}/)
              .map((b) => b.trim())
              .filter(Boolean)
              .map(parseBlock)
          : [];

        return (
          <div key={day.id} className={styles.itinerary__dayRow}>
            {/* Left: sticky image */}
            <div className={styles.itinerary__imageCol}>
              <div className={styles.itinerary__photo}>
                {photoHash ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaUrl(photoHash, { w: 800, h: 900 })}
                    alt={locationName ?? ""}
                    loading="lazy"
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#d0cbb8" }} />
                )}
                {locationName && (
                  <div className={styles.itinerary__photoLabel}>
                    <MapPinIcon />
                    {locationName}
                  </div>
                )}
              </div>
            </div>

            {/* Right: day content — centred flex column */}
            <div className={styles.itinerary__contentCol}>
              {/* Mobile photo */}
              {photoHash && (
                <div className={styles.day__mobilePhoto}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl(photoHash, { w: 400, h: 200 })} alt={locationName ?? ""} loading="lazy" />
                </div>
              )}

              <div className={styles.day}>
                {/* Badge + date */}
                <div className={styles.day__header}>
                  <div className={styles.day__badge}>{dayLabel}</div>
                  {dateNode}
                </div>

                {/* Divider */}
                <hr className={styles.day__divider} />

                {/* Location */}
                {locationName && (
                  <h3 className={styles.day__location}>{locationName}</h3>
                )}

                {/* Divider */}
                <hr className={styles.day__divider} />

                {/* Activity blocks */}
                <div className={styles.day__content}>
                  {activityBlocks.map((block, bi) => (
                    <React.Fragment key={bi}>
                      {bi > 0 && <hr className={styles.day__itemDivider} />}
                      <div className={styles.day__block}>
                        {block.label && (
                          <p className={styles.day__label}>{block.label}</p>
                        )}
                        {block.body && (
                          <p className={styles.day__text}>{block.body}</p>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItinerarySection;
