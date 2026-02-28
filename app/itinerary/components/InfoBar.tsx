import React from "react";
import moment from "moment";
import styles from "./InfoBar.module.scss";
import type { GetQuoteQuery } from "~/lib/api/jambo";

type User = NonNullable<GetQuoteQuery["quote"]>["user"];
type AgencyMember = NonNullable<NonNullable<GetQuoteQuery["quote"]>["trip"]>["agencyMember"];

function renderOrdinal(text: string): React.ReactNode {
  const parts = text.split(/(\d+(?:st|nd|rd|th))/);
  return parts.map((part, i) => {
    const match = part.match(/^(\d+)(st|nd|rd|th)$/);
    if (match) {
      return (
        <React.Fragment key={i}>
          {match[1]}<sup>{match[2]}</sup>
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

const EditDocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const PersonBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth={1.5} />
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
            {startDate && endDate
              ? <>{renderOrdinal(startDate)} – {renderOrdinal(endDate)}</>
              : "Dates to be confirmed"}
          </span>
        </div>
      </div>

      {/* Prepared For */}
      <div className={styles.infoBar__item}>
        <div className={styles.infoBar__icon}>
          <EditDocIcon />
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
          <PersonBadgeIcon />
        </div>
        <div>
          <span className={styles.infoBar__label}>Prepared By</span>
          <span className={styles.infoBar__value}>
            {renderOrdinal(consultantName ? `${consultantName} on ${today}` : today)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
