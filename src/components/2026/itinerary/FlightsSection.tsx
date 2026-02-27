import React from "react";
import moment from "moment-timezone";
import { extractSortedFlights } from "@/components/Quote/global/helpers";
import styles from "./itinerary.module.scss";

const ArrowRightIcon = () => (
  <svg viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg" width="48">
    <line x1="0" y1="6" x2="40" y2="6" stroke="currentColor" strokeWidth="1" />
    <path d="M38 2L44 6L38 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type FlightItem = NonNullable<ReturnType<typeof extractSortedFlights>[0]>;

type Props = {
  flights: FlightItem[];
};

const FlightsSection: React.FC<Props> = ({ flights }) => {
  if (flights.length === 0) {
    return (
      <div className={styles.flights}>
        <p className={styles.flights__empty}>No flights added yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.flights}>
      {flights.map((flight) => {
        if (!flight) return null;

        const depAirport = flight.departureAirport;
        const arrAirport = flight.arrivalAirport;
        const depTime = depAirport?.timezone
          ? moment.tz(flight.departure, depAirport.timezone)
          : moment(flight.departure);
        const arrTime = arrAirport?.timezone
          ? moment.tz(flight.arrival, arrAirport.timezone)
          : moment(flight.arrival);

        const flightLabel = [flight.carrier, flight.number].filter(Boolean).join(" ");

        return (
          <div key={flight.id} className={styles.flights__row}>
            {/* Departure */}
            <div className={styles.flights__airport}>
              <div className={styles.flights__iata}>{depAirport?.iata ?? "—"}</div>
              <div>{depAirport?.city ?? ""}</div>
              <div>{depTime.format("ddd Do MMM, h:mm A")}</div>
            </div>

            {/* Arrow + flight number */}
            <div className={styles.flights__arrow}>
              {flightLabel && <span>{flightLabel}</span>}
              <ArrowRightIcon />
            </div>

            {/* Arrival */}
            <div className={`${styles.flights__airport} ${styles["flights__airport--right"]}`}>
              <div className={styles.flights__iata}>{arrAirport?.iata ?? "—"}</div>
              <div>{arrAirport?.city ?? ""}</div>
              <div>{arrTime.format("ddd Do MMM, h:mm A")}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightsSection;
