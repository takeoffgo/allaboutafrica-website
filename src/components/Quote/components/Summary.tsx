import React from "react";
import moment from "moment";
import pluralize from "pluralize";
import { GetQuoteQuery } from "../../../lib/api/jambo";
import { QuoteStatus } from "../global/constants";
import { Content } from "../../Bulma";
import ReactMarkdown from "react-markdown";

const Summary = ({ data }: { data: GetQuoteQuery }) => (
  <section className="quote-summary__container section container">
    {data.quote?.trip?.agency && data.quote?.hero?.subtitle ? (
      <>
        <Content>
          <ReactMarkdown>{data.quote?.hero?.subtitle}</ReactMarkdown>
        </Content>
        <hr />
      </>
    ) : null}

    <div id="summary" className="columns">
      {data.quote?.status === QuoteStatus.Sample ? null : (
        <div className="column is-narrow">
          <p className="heading">Starting</p>
          <p className="title">
            {moment(data?.quote?.start || "").format("MMM Do, YYYY")}
          </p>
          {moment(data?.quote?.start || "").isAfter(moment()) && (
            <p className="subtitle is-hidden-print">
              {moment(data?.quote?.start || "").fromNow()}
            </p>
          )}
        </div>
      )}
      <div className="column is-narrow">
        <p className="heading">Duration</p>
        <p className="title">
          {pluralize("day", (data.quote?.duration ?? 0) + 1, true)}
        </p>
        <p className="subtitle">
          {pluralize("night", data.quote?.duration ?? 0, true)}
        </p>
      </div>
      {data.quote?.status === QuoteStatus.Sample ? null : (
        <div className="column is-narrow">
          <p className="heading">Group size</p>
          <p className="title is-amount">{data.quote?.travellerCount}</p>
        </div>
      )}
    </div>
  </section>
);

export default Summary;
