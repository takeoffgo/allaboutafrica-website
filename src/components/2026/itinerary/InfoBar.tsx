import React from "react";
import moment from "moment";
import styles from "./itinerary.module.scss";
import { GetQuoteQuery } from "@/lib/api/jambo";

type User = NonNullable<GetQuoteQuery["quote"]>["user"];
type AgencyMember = NonNullable<NonNullable<GetQuoteQuery["quote"]>["trip"]>["agencyMember"];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

type Props = {
  startDate: string;
  endDate: string;
  client: User;
  consultant: AgencyMember;
};

const InfoBar: React.FC<Props> = ({ startDate, endDate, client, consultant }) => {
  const clientName = client
    ? [client.firstName, client.lastName].filter(Boolean).join(" ")
    : null;

  const consultantName = consultant
    ? [consultant.firstName, consultant.lastName].filter(Boolean).join(" ")
    : null;

  const today = moment().format("MMMM Do, YYYY");

  return (
    <div className={styles.infoBar}>
      {/* Dates */}
      <div className={styles.infoBar__item}>
        <div className={styles.infoBar__icon}>
          <CalendarIcon />
        </div>
        <div>
          <span className={styles.infoBar__label}>Dates</span>
          <span className={styles.infoBar__value}>
            {startDate && endDate ? `${startDate} – ${endDate}` : "Dates to be confirmed"}
          </span>
        </div>
      </div>

      {/* Prepared For */}
      <div className={styles.infoBar__item}>
        <div className={styles.infoBar__icon}>
          <PersonIcon />
        </div>
        <div>
          <span className={styles.infoBar__label}>Prepared For</span>
          <span className={styles.infoBar__value}>
            {clientName
              ? `Take Off Go confirmed trip itinerary for ${clientName}`
              : "Valued Guest"}
          </span>
        </div>
      </div>

      {/* Prepared By */}
      <div className={styles.infoBar__item}>
        <div className={styles.infoBar__icon}>
          <PersonIcon />
        </div>
        <div>
          <span className={styles.infoBar__label}>Prepared By</span>
          <span className={styles.infoBar__value}>
            {consultantName ? `${consultantName} on ${today}` : today}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
