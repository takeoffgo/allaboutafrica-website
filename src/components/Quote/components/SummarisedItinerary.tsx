import React from "react";
import moment from "moment";

import { dateFormat } from "../global/constants";
import { toSentence } from "../global/helpers";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { QuoteStatus } from "../global/constants";
import cx from "classnames";

const SummarisedItinerary = ({ data }: { data: GetQuoteQuery }) => (
  <section
    id="summarised-itinerary"
    className="section container is-hidden-mobile"
  >
    <table className="table is-striped is-hoverable is-page-break is-fullwidth">
      <thead>
        <tr>
          <th style={{ width: 220 }}></th>
          <th>Activities</th>
          <th style={{ width: 320 }} className="is-hidden-print">
            Accommodation
          </th>
        </tr>
      </thead>
      <tbody>
        {data.quote?.days?.nodes.map((day, index, array) => {
          const isFirst = index === 0;
          const prev = isFirst ? null : array[index - 1];
          const newAccom =
            prev === null || day?.accommodationId !== prev?.accommodationId;

          const accom = data.quote?.accommodation?.nodes.find(
            (a: any) => a.id === day?.accommodationId,
          );
          const property = accom?.property;
          const destinations = day?.quoteDayDestinationsByDayId.nodes.map(
            (ent) => ent?.destination,
          );
          const accomDayCount = property
            ? array.filter(
                (v, i, arr) =>
                  i > index && // is after this current day
                  v?.accommodationId === day?.accommodationId && // has the same accommodation
                  arr[i - 1]?.accommodationId === v?.accommodationId, // has the same accommodation as the previous entry - to avoid clashes if the same accommodation appears twice
              ).length
            : 0;

          const isMuted =
            moment(data.quote?.start).isBefore(moment()) &&
            moment(data.quote?.start)
              .add(data.quote?.duration, "days")
              .isAfter(moment()) &&
            moment(day?.date).isBefore(moment(), "day");

          return (
            <tr
              key={day?.id}
              className={cx("avoid-page-break", {
                "is-muted": isMuted,
                "is-current": moment(day?.date).isSame(moment(), "day"),
              })}
            >
              <td className="avoid-page-break">
                <ul>
                  <li>
                    <strong>
                      <a href={`#day-${day?.sortOrder ?? 0}`}>
                        Day {(day?.sortOrder ?? 0) + 1}
                      </a>
                    </strong>
                  </li>
                  {data.quote?.status === QuoteStatus.Sample ? null : (
                    <li>{moment(day?.date || "").format(dateFormat)}</li>
                  )}
                  {destinations && destinations.length > 0 && (
                    <li>
                      <small>
                        <ul>
                          {destinations.map((d, idx) => (
                            <li key={d!.id}>
                              {idx > 0 ? "to " : null}
                              {d!.name}
                            </li>
                          ))}
                        </ul>
                      </small>
                    </li>
                  )}
                </ul>
              </td>
              <td className="avoid-page-break">
                {day?.activitySummary && (
                  <ul>
                    {day.activitySummary
                      .split("\n")
                      .map((text: string, index: number) => (
                        <li key={index}>{text}</li>
                      ))}
                  </ul>
                )}
              </td>
              {property && newAccom ? (
                <td rowSpan={accomDayCount + 1} className="is-hidden-print">
                  {accom && (
                    <ul>
                      {property && (
                        <li>
                          <a href={`#property-${property.id}`}>
                            {property.name}
                          </a>
                        </li>
                      )}
                      <li>{accom.roomType}</li>
                      {accom?.foodInclusions &&
                        accom.foodInclusions.length > 0 && (
                          <li className="is-hidden-print">
                            {toSentence(accom.foodInclusions as string[])}{" "}
                            included
                          </li>
                        )}
                      {accom?.beverageInclusions &&
                        accom.beverageInclusions.length > 0 && (
                          <li className="is-hidden-print">
                            {toSentence(accom.beverageInclusions as string[])}{" "}
                            beverages
                          </li>
                        )}
                    </ul>
                  )}
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  </section>
);

export default SummarisedItinerary;
