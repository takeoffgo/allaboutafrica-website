import React from "react";
import moment from "moment-timezone";
import Markdown from "react-markdown";
import cx from "classnames";
import SectionHeader from "../SectionHeader";
import { dateFormat } from "../../global/constants";
import { toSentence, extractSortedFlights } from "../../global/helpers";
import Flights, { FlightDetail } from "./Flights";
import { GetQuoteQuery } from "../../../../lib/api/jambo";
import { QuoteStatus } from "../../global/constants";

const calculateSpan = (
  index: number,
  source: { repeat: boolean }[]
): number => {
  let count = 0;
  for (let i = index + 1; i < source.length; i++) {
    if (!source[i].repeat) {
      break;
    }
    count++;
  }
  return count;
};

const DetailedItinerary = ({ data }: { data: GetQuoteQuery }) => {
  const flights = extractSortedFlights(data);
  const flightsPrior =
    data.quote?.days && data.quote?.days.nodes.length === 0
      ? []
      : flights.filter((flight) =>
          flight.departureDate
            .utc()
            .isBefore(moment.utc(data.quote?.days?.nodes[0]?.date || ""), "day")
        );

  const lastDay = moment(data.quote?.start ?? "").add(
    (data.quote?.duration ?? 0) + 1,
    "day"
  );
  const flightsAfter = flights.filter((flight) =>
    flight.departureDate.utc().isAfter(lastDay, "day")
  );

  return (
    <section
      id="detailed-itinerary"
      className="section container is-page-break"
    >
      <SectionHeader title="Itinerary" />
      <Flights includeDate flights={flightsPrior as FlightDetail[]} />
      {/* {flightsPrior.length > 0 && (
        <div className="has-text-centered">
          <hr />
          <strong>TAKE OFF GO SERVICES COMMENCE</strong>
          <hr />
        </div>
      )} */}
      {/* <pre>
          {data.quote?.days?.nodes
            .map((day, index, array) => {
              const repeat =
                index > 0 &&
                day?.accommodationId === array[index - 1]?.accommodationId &&
                (array[index - 1]?.activityDetail === day?.activityDetail ||
                  !day?.activityDetail);
              return { ...day, repeat };
            })
            .map((day, index, arr) => {
              const daySpan = calculateSpan(index, arr);
              return [
                "0x" + index.toString(16).padStart(2, "0"),
                day?.accommodationId?.substr(-4) || "----",
                ("" + day.repeat).padStart(5, " "),
                daySpan,
                JSON.stringify(day?.activityDetail),
              ].join("  ");
            })
            .join("\n")}
        </pre> */}
      {data.quote?.days?.nodes
        .map((day, index, array) => {
          const repeat =
            index > 0 &&
            day?.accommodationId === array[index - 1]?.accommodationId &&
            (array[index - 1]?.activityDetail === day?.activityDetail ||
              !day?.activityDetail);
          return { ...day, repeat };
        })
        .map((day, index, array) => {
          if (day.repeat) {
            return null;
          }

          const daySpan = calculateSpan(index, array);

          const combinedDayCount = daySpan;

          const timeSpan = {
            start: moment.utc(day?.date || "").startOf("day"),
            end: moment
              .utc(day?.date || "")
              .startOf("day")
              .add(combinedDayCount, "day")
              .endOf("day"),
          };

          const accom = data.quote?.accommodation?.nodes.find(
            (a) => a?.id === day?.accommodationId
          );
          const property = accom?.property;
          const destinations = day?.quoteDayDestinationsByDayId?.nodes;
          const finalDay = index + 1 === array.length;
          const finalHr = finalDay ? null : <hr className="is-hidden-print" />;
          const matchingFlights = flights
            .filter((flight) =>
              flight.departureDate.utc().isBetween(timeSpan.start, timeSpan.end)
            )
            .filter((ent) => !flightsAfter.includes(ent));

          const dayOrder = day?.sortOrder ?? 0;
          const dayNumber = dayOrder + 1;

          const dayDisplay =
            combinedDayCount === 0 ? (
              <strong>Day {dayNumber}</strong>
            ) : (
              <>
                <strong key={`${dayOrder}.0`}>Days {dayNumber}</strong>
                <span key={`${dayOrder}.1`}> &ndash; </span>
                <strong key={`${dayOrder}.2`}>
                  {dayOrder + combinedDayCount + 1}
                </strong>
              </>
            );

          const isMuted =
            moment(data.quote?.start).isBefore(moment()) &&
            moment(data.quote?.start)
              .add(data.quote?.duration, "days")
              .isAfter(moment()) &&
            moment(day?.date).isBefore(moment(), "day");

          return (
            <React.Fragment key={index}>
              <a id={`day-${dayOrder}`} />
              <div
                className={cx("columns avoid-page-break", {
                  "is-muted": isMuted,
                  "is-current": moment(day?.date).isSame(moment(), "day"),
                })}
              >
                <div className="column is-2">
                  <ul>
                    <li>{dayDisplay}</li>
                    {data.quote?.status === QuoteStatus.Sample ? null : (
                      <>
                        <li>{moment(day?.date ?? "").format(dateFormat)}</li>
                        {combinedDayCount > 0 && (
                          <li>
                            <small>
                              to{" "}
                              {moment(day?.date ?? "")
                                .add(combinedDayCount, "day")
                                .format(dateFormat)}
                            </small>
                          </li>
                        )}
                      </>
                    )}
                    {destinations && destinations.length > 0 && (
                      <li>
                        <small>
                          <ul>
                            {destinations.map((d, idx) =>
                              d?.destination?.name ? (
                                <li key={d.destination.id}>
                                  {idx > 0 ? "to " : null}
                                  <a
                                    key={d.destination.id}
                                    href={`/travel/destinations/${d.destination.id}`}
                                  >
                                    {d.destination.name ?? null}
                                  </a>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </small>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="column is-2 is-hidden-tablet">
                  {day?.activitySummary && (
                    <ul>
                      {day.activitySummary
                        .split("\n")
                        .map((text: string, index: number) => (
                          <li key={index}>{text}</li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="column is-7">
                  {finalDay ? null : (
                    <Flights
                      flights={matchingFlights as FlightDetail[]}
                      referenceDate={moment.utc(day?.date ?? "")}
                    />
                  )}
                  {day?.activityDetail && (
                    <Markdown className="content">
                      {day!.activityDetail}
                    </Markdown>
                  )}
                  {property ? (
                    <>
                      <div className="field is-grouped is-grouped-multiline">
                        <div className="tags has-addons">
                          <div className="tag">
                            <span className="icon">
                              <i className="fas fa-bed" />
                            </span>
                            <a href={`#property-${property.id}`}>
                              {property.name}
                            </a>
                          </div>
                          <div className="tag">
                            {accom?.roomType && <span>{accom.roomType}</span>}
                          </div>
                        </div>

                        {(accom?.foodInclusions?.length ?? 0) > 0 ||
                        (accom?.beverageInclusions?.length ?? 0) > 0 ? (
                          <>
                            {accom?.foodInclusions
                              ? accom?.foodInclusions?.length > 0 && (
                                  <div className="tag is-hidden-print">
                                    <span className="icon">
                                      <i className="fas fa-utensils" />
                                    </span>
                                    <p>
                                      {toSentence(
                                        accom.foodInclusions as string[]
                                      )}{" "}
                                      included
                                    </p>
                                  </div>
                                )
                              : null}
                            {accom?.beverageInclusions
                              ? accom?.beverageInclusions.length > 0 && (
                                  <div className="tag is-hidden-print">
                                    <span className="icon">
                                      <i className="fas fa-glass" />
                                    </span>
                                    <p>
                                      {toSentence(
                                        accom.beverageInclusions as string[]
                                      )}{" "}
                                      beverages
                                    </p>
                                  </div>
                                )
                              : null}
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                  {finalDay ? (
                    <Flights
                      flights={matchingFlights as FlightDetail[]}
                      referenceDate={moment.utc(day?.date ?? "")}
                    />
                  ) : null}
                </div>
                {/* <div className="column is-2">pictures here</div> */}
              </div>
              {finalHr}
            </React.Fragment>
          );
        })}
      {flightsAfter.length > 0 && (
        <>
          {/* <div className="has-text-centered">
            <hr />
            <strong>TAKE OFF GO SERVICES CONCLUDE</strong>
            <hr />
          </div> */}
          <Flights includeDate flights={flightsAfter as FlightDetail[]} />
        </>
      )}
    </section>
  );
};

export default DetailedItinerary;
