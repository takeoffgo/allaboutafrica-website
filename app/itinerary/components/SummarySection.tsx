import React from "react";
import moment from "moment-timezone";
import styles from "./SummarySection.module.scss";
import type { GetQuoteQuery } from "~/lib/api/jambo";
import { splitOrdinal } from "../helpers";

type Props = {
  data: GetQuoteQuery;
};

const SummarySection: React.FC<Props> = ({ data }) => {
  const quote = data.quote!;
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

  return (
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
            ? splitOrdinal(moment.utc(day.date ?? "").add(span, "days").toISOString())
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
  );
};

export default SummarySection;
