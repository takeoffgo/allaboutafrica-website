import moment from "moment-timezone";
import type { GetQuoteQuery } from "../lib/api/jambo";
// import { MapMarker } from "../components/Map";

const queryString = (params: any) =>
  Object.keys(params)
    .map((key) => [key, params[key]].map(encodeURIComponent).join("="))
    .join("&");

export const mediaUrl = (hash: string, params?: any): string =>
  hash
    ? `https://cdn.takeoffgo.com/${hash}${
        params ? `?${queryString(params)}` : ""
      }`
    : "";

export const sentenceCase = (input: string) =>
  input.substr(0, 1).toUpperCase() + input.substr(1);

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
          "",
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

// export const extractPoints = (data: GetQuoteQuery): MapMarker[] => {
//   const airports =
//     data.quote?.trip?.tripFlights.nodes
//       .map((ent) => [ent?.departureAirport, ent?.arrivalAirport])
//       .reduce((p, c) => [...p, ...c], [])
//       .filter(
//         (ent, idx, arr) =>
//           arr.indexOf(arr.find((a) => a?.id === ent?.id)) === idx,
//       ) ?? [];
//
//   return (
//     data.quote?.accommodation?.nodes
//       .map((ent) => ent?.property)
//       .filter((ent) => !!ent)
//       .filter((prop) => prop?.latitude && prop?.longitude)
//       .map((prop) => ({
//         id: prop?.id,
//         type: "property",
//         lat: prop?.latitude as number,
//         lng: prop?.longitude as number,
//         title: prop?.name ?? "",
//         body: prop?.summary ?? "",
//         icon: "bed",
//       })) || []
//   ).concat(
//     airports.map((ap) => ({
//       id: ap?.iata || ap?.icao,
//       type: "airport",
//       lat: ap?.latitude as number,
//       lng: ap?.longitude as number,
//       title: `Airport - ${ap?.iata || ap?.icao}`,
//       body: [ap?.city, ap?.country].join(", "),
//       icon: "plane",
//     })),
//   );
// };
