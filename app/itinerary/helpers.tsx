import moment from "moment-timezone";
import type { GetQuoteQuery } from "../lib/api/jambo";

const queryString = (params: Record<string, string | number>) =>
  Object.keys(params)
    .map((key) => [key, String(params[key])].map(encodeURIComponent).join("="))
    .join("&");

export const mediaUrl = (hash: string, params?: Record<string, string | number>): string =>
  hash
    ? `https://cdn.takeoffgo.com/${hash}${params ? `?${queryString(params)}` : ""}`
    : "";

// Splits a date into its day number, ordinal suffix, and a formatted prefix.
// prefixFormat defaults to "ddd MMM" (e.g. "Mon Jan"); pass "MMM" for lodging cards.
export const splitOrdinal = (
  date: string,
  prefixFormat = "ddd MMM"
): { day: string; suffix: string; prefix: string } => {
  const m = moment.utc(date);
  const day = m.format("D");
  const suffix = m.format("Do").slice(day.length);
  const prefix = m.format(prefixFormat);
  return { day, suffix, prefix };
};

export const sentenceCase = (input: string) =>
  input.substring(0, 1).toUpperCase() + input.substring(1);

export const toSentence = (input: string[]) =>
  input
    ? input
        .reduce(
          (previousValue, currentValue, index, array) =>
            [
              previousValue,
              " ",
              index === 0 ? sentenceCase(currentValue) : currentValue,
              index === array.length - 2 ? " and " : ", ",
            ].join(""),
          ""
        )
        .slice(0, -2)
    : null;

export const extractSortedFlights = (data: GetQuoteQuery) => {
  const flights = data.quote?.trip?.tripFlights.nodes;
  if (!flights) {
    return [];
  }
  return flights
    .map((flight) => ({
      ...flight,
      departureDate: flight?.departureAirport?.timezone
        ? moment.tz(flight.departure, flight?.departureAirport?.timezone)
        : moment(flight?.departure),
    }))
    .sort((a, b) => a.departureDate.diff(b.departureDate));
};
