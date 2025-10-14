import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import cx from "classnames";
import { dateFormat, timeFormat, timeFormatExt } from "../../global/constants";
import { TripFlight, Airport } from "../../../../lib/api/jambo";
import ReactMarkdown from "react-markdown";

export type FlightDetail = TripFlight & {
  departureDate: moment.Moment;
  departureAirport: Airport;
  arrivalAirport: Airport;
};

type Props = {
  flights: FlightDetail[];
  includeDate?: boolean;
  referenceDate?: moment.Moment;
};

const Flights: React.FC<Props> = ({ flights, includeDate, referenceDate }) =>
  flights.length > 0 ? (
    <React.Fragment>
      {_(flights)
        .groupBy((ent) => moment(ent.departure).format("YYYY-MM-DD"))
        .toPairs()
        .map(([date, list]) => (
          <div key={date} className="columns">
            {includeDate && (
              <div className="column is-2">
                {moment(date).format(dateFormat)}
              </div>
            )}
            <div className={cx("column", { "is-7": includeDate })}>
              <article className="message">
                <div className="message-body">
                  {list.map((flight) => {
                    const { departureAirport, arrivalAirport } = flight;

                    if (!arrivalAirport || !departureAirport) {
                      return null;
                    }

                    const sameDay = moment(flight.departure).isSame(
                      flight.arrival,
                      "day"
                    );

                    return (
                      <React.Fragment key={flight.id}>
                        {referenceDate &&
                          !referenceDate.isSame(
                            moment.utc(moment(flight.departure)),
                            "day"
                          ) && (
                            <p className="heading">
                              {moment(flight.departure).format(dateFormat)}
                            </p>
                          )}

                        <div className="columns is-vcentered">
                          <div className="column is-narrow">
                            <ul className="columns is-vcentered is-mobile">
                              <li className="column is-narrow is-hidden-print">
                                <i className="fad fa-2x fa-plane-departure" />
                              </li>
                              {flight.carrier || flight.number ? (
                                <li className="column">
                                  <code className="is-flight-number">
                                    {flight.carrier ? (
                                      <span>{flight.carrier}</span>
                                    ) : null}
                                    {flight.number ? (
                                      <span className="is-amount">
                                        {flight.number}
                                      </span>
                                    ) : null}
                                  </code>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                          <div className="column is-narrow">
                            <ul className="inline reset-mobile">
                              <li>
                                <strong>Departing</strong>
                              </li>
                              <li>
                                {[
                                  departureAirport.city,
                                  departureAirport.country?.name,
                                ].join(", ")}
                              </li>
                              <li>
                                {moment(flight.departure).format(timeFormat)}
                              </li>
                            </ul>
                            <ul className="inline reset-mobile">
                              <li>
                                <strong>Arriving</strong>
                              </li>
                              <li>
                                {[
                                  arrivalAirport.city,
                                  arrivalAirport.country?.name,
                                ].join(", ")}
                              </li>
                              <li>
                                {moment(flight.arrival).format(
                                  sameDay ? timeFormat : timeFormatExt
                                )}
                              </li>
                            </ul>
                            {flight.notes ? (
                              <ReactMarkdown className="content is-small">
                                {flight.notes}
                              </ReactMarkdown>
                            ) : null}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </article>
            </div>
          </div>
        ))
        .value()}
    </React.Fragment>
  ) : null;

export default Flights;
