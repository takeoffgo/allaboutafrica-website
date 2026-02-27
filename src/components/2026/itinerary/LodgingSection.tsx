import React from "react";
import moment from "moment-timezone";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { mediaUrl } from "@/components/Quote/global/helpers";
import styles from "./itinerary.module.scss";
import _ from "lodash";

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const splitOrdinal = (date: string) => {
  const m = moment.utc(date);
  const day = m.format("D");
  const suffix = m.format("Do").slice(day.length);
  const prefix = m.format("MMM");
  return { day, suffix, prefix };
};

type AccomNode = NonNullable<NonNullable<GetQuoteQuery["quote"]>["accommodation"]>["nodes"][0];
type Variant = "col3" | "col2" | "col1";

type CardItem = {
  property: NonNullable<NonNullable<AccomNode>["property"]>;
  accom: AccomNode;
  firstDate: string | null;
  lastDate: string | null;
  locationName: string | null;
};

const PropertyCard: React.FC<{ item: CardItem; variant: Variant }> = ({ item, variant }) => {
  const { property, firstDate, lastDate, locationName } = item;

  const photoUrl = property.heroMedia?.hash
    ? mediaUrl(property.heroMedia.hash, variant === "col1" ? { w: 800, h: 600 } : { w: 600, h: 360 })
    : null;

  const firstOrd = firstDate ? splitOrdinal(firstDate) : null;
  const lastOrd = lastDate ? splitOrdinal(lastDate) : null;

  const isSameDay = firstDate && lastDate && firstDate === lastDate;

  const dateNode = firstOrd ? (
    <p className={styles.lodgingCard__date}>
      {firstOrd.prefix} {firstOrd.day}<sup>{firstOrd.suffix}</sup>
      {!isSameDay && lastOrd && (
        <> {" – "}{lastOrd.prefix} {lastOrd.day}<sup>{lastOrd.suffix}</sup></>
      )}
    </p>
  ) : null;

  return (
    <div className={`${styles.lodgingCard} ${styles[`lodgingCard--${variant}`]}`}>
      <div className={styles.lodgingCard__imageWrap}>
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={property.name ?? ""} loading="lazy" />
        ) : (
          <div className={styles.lodgingCard__imageFallback} />
        )}
      </div>
      <div className={styles.lodgingCard__body}>
        {locationName && (
          <div className={styles.lodgingCard__locationBadge}>
            <MapPinIcon />
            {locationName}
          </div>
        )}
        {dateNode}
        <h3 className={styles.lodgingCard__name}>{property.name}</h3>
        {property.summary && (
          <>
            <p className={styles.lodgingCard__descLabel}>Description:</p>
            <p className={styles.lodgingCard__description}>{property.summary}</p>
          </>
        )}
      </div>
    </div>
  );
};

type Props = {
  accommodation: AccomNode[];
  data: GetQuoteQuery;
};

const LodgingSection: React.FC<Props> = ({ accommodation, data }) => {
  const quote = data.quote!;
  const days = quote.days?.nodes ?? [];
  const daysByAccom = _.groupBy(days, (d) => d?.accommodationId);

  // Deduplicate by property ID, keeping the accommodation reference
  const uniqueAccoms = _(accommodation)
    .filter((a) => !!a?.property)
    .uniqBy((a) => a?.property?.id)
    .value();

  if (uniqueAccoms.length === 0) return null;

  const items: CardItem[] = uniqueAccoms.map((accom) => {
    const property = accom!.property!;
    const accomId = accom?.id;
    const relatedDays = accomId ? (daysByAccom[accomId] ?? []) : [];
    const sortedDays = [...relatedDays].sort((a, b) =>
      moment(a?.date).diff(moment(b?.date))
    );
    const firstDay = sortedDays[0];
    const lastDay = sortedDays[sortedDays.length - 1];
    const locationName =
      (firstDay?.quoteDayDestinationsByDayId?.nodes ?? []).length > 0
        ? firstDay!.quoteDayDestinationsByDayId!.nodes
            .map((d) => d?.destination?.name)
            .filter(Boolean)
            .join(", ")
        : null;

    return {
      accom,
      property,
      firstDate: firstDay?.date ?? null,
      lastDate: lastDay?.date ?? null,
      locationName,
    };
  });

  // Split into rows: fill rows of 3, last row gets remainder (1 or 2)
  const rows: CardItem[][] = [];
  let i = 0;
  while (i < items.length) {
    const remaining = items.length - i;
    if (remaining <= 3) {
      rows.push(items.slice(i));
      break;
    }
    rows.push(items.slice(i, i + 3));
    i += 3;
  }

  return (
    <div className={styles.lodging__list}>
      {rows.map((row, ri) => {
        const variant: Variant =
          row.length === 3 ? "col3" : row.length === 2 ? "col2" : "col1";
        return (
          <div
            key={ri}
            className={`${styles.lodging__row} ${styles[`lodging__row--${variant}`]}`}
          >
            {row.map((item) => (
              <PropertyCard key={item.property.id} item={item} variant={variant} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default LodgingSection;
