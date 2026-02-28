import React from "react";
import moment from "moment-timezone";
import styles from "./ItinerarySection.module.scss";
import type { GetQuoteQuery } from "~/lib/api/jambo";
import { mediaUrl, splitOrdinal } from "../helpers";

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="white"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="white"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

// Split a block's text into an optional label (first line ending with ":") and body.
const parseBlock = (block: string): { label: string | null; body: string } => {
  const lines = block.split("\n");
  const firstLine = lines[0].trim();
  if (firstLine.endsWith(":") && firstLine.length < 120) {
    return { label: firstLine, body: lines.slice(1).join("\n").trim() };
  }
  return { label: null, body: block };
};

type DayNode = NonNullable<
  NonNullable<GetQuoteQuery["quote"]>["days"]
>["nodes"][0];

const getLastDestName = (day: DayNode): string | null => {
  const nodes = day?.quoteDayDestinationsByDayId?.nodes ?? [];
  return nodes[nodes.length - 1]?.destination?.name ?? null;
};

type Props = {
  data: GetQuoteQuery;
};

const ItinerarySection: React.FC<Props> = ({ data }) => {
  const quote = data.quote!;

  // Group consecutive days that share the same final destination
  const dayGroups: DayNode[][] = [];
  for (const day of quote.days?.nodes ?? []) {
    const finalDest = getLastDestName(day);
    const lastGroup = dayGroups[dayGroups.length - 1];
    if (
      !lastGroup ||
      getLastDestName(lastGroup[lastGroup.length - 1]) !== finalDest
    ) {
      dayGroups.push([day]);
    } else {
      lastGroup.push(day);
    }
  }

  return (
    <div className={styles.itinerary__list}>
      {dayGroups.map((group) => {
        const firstDay = group[0];
        const lastDay = group[group.length - 1];
        const firstOrder = firstDay?.sortOrder ?? 0;
        const lastOrder = lastDay?.sortOrder ?? 0;

        const dayLabel =
          firstOrder === lastOrder
            ? `Day ${firstOrder + 1}`
            : `Day ${firstOrder + 1}–${lastOrder + 1}`;

        // Date with superscript ordinal for single days; plain range for multi-day spans
        const startOrd = splitOrdinal(firstDay?.date ?? "");
        const dateNode =
          firstOrder === lastOrder ? (
            <p className={styles.day__date}>
              {startOrd.prefix} {startOrd.day}
              <sup>{startOrd.suffix}</sup>
            </p>
          ) : (
            <p className={styles.day__date}>
              {moment.utc(firstDay?.date ?? "").format("ddd MMM Do")}
              {" – "}
              {moment.utc(lastDay?.date ?? "").format("ddd MMM Do")}
            </p>
          );

        // All unique destinations across every day in the group
        const allDestNames = group
          .flatMap((d) => d?.quoteDayDestinationsByDayId?.nodes ?? [])
          .map((d) => d?.destination?.name)
          .filter(Boolean) as string[];
        {
          /* const locationName = */
        }
        {
          /*   allDestNames.length > 0 */
        }
        {
          /*     ? [...new Set(allDestNames)].join(", ") */
        }
        {
          /*     : null; */
        }
        const locationName =
          allDestNames.length > 0 ? allDestNames.pop() : null;

        // Photo from the last day's accommodation
        const accom = quote.accommodation?.nodes.find(
          (a) => a?.id === lastDay?.accommodationId,
        );
        const photoHash = accom?.property?.heroMedia?.hash;

        // Combine activity details from all days in the group, then parse into blocks
        const activityBlocks = group
          .map((d) => d?.activityDetail?.trim())
          .filter(Boolean)
          .join("\n\n")
          .split(/\*{3}[^\n]*|\n{2,}/)
          .map((b) => b.trim())
          .filter(Boolean)
          .map(parseBlock);

        return (
          <div key={firstDay?.id} className={styles.itinerary__dayRow}>
            {/* Left: sticky image */}
            <div className={styles.itinerary__imageCol}>
              <div className={styles.itinerary__photo}>
                {photoHash ? (
                  <img
                    src={mediaUrl(photoHash, { w: 800, h: 900 })}
                    alt={locationName ?? ""}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#d0cbb8",
                    }}
                  />
                )}
                {locationName && (
                  <div className={styles.itinerary__photoLabel}>
                    <MapPinIcon />
                    {locationName}
                  </div>
                )}
              </div>
            </div>

            {/* Right: day content */}
            <div className={styles.itinerary__contentCol}>
              {/* Mobile photo */}
              {photoHash && (
                <div className={styles.day__mobilePhoto}>
                  <img
                    src={mediaUrl(photoHash, { w: 400, h: 200 })}
                    alt={locationName ?? ""}
                    loading="lazy"
                  />
                </div>
              )}

              <div className={styles.day}>
                {/* Badge + date */}
                <div className={styles.day__header}>
                  <div className={styles.day__badge}>{dayLabel}</div>
                  {dateNode}
                </div>

                <hr className={styles.day__divider} />

                {/* Location */}
                {locationName && (
                  <h3 className={styles.day__location}>{locationName}</h3>
                )}

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
