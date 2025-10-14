"use server";
import React from "react";
import moment from "moment";

import Accommodation from "./components/Accommodation";
import ContactInformation from "./components/ContactInformation";
import DetailedItinerary from "./components/DetailedItinerary";
import Finances from "./components/Finances";
import { Hero } from "@/components/2024/home/hero/Hero";
import HeroLegacy from "./components/Hero";
import Map from "./components/Map";
import SummarisedItinerary from "./components/SummarisedItinerary";
import Summary from "./components/Summary";
import Terms from "./components/Terms";
import { Footer } from "@/components/2024/footer/Footer";
import FooterLegacy from "../Footer";
import { GetQuoteQuery, TripFlight } from "../../lib/api/jambo";

import { Tracking } from "./components/Tracking";
import { QuoteStatus } from "./global/constants";
import { extractPoints } from "./global/helpers";
import { LogoEle } from "../Logo";

type QuoteProps = {
  model: GetQuoteQuery;
  quoteKey: string;
  viewType: string;
  preview?: boolean;
};

const QuoteComp: React.FC<QuoteProps> = ({
  model,
  quoteKey,
  viewType,
  preview,
}) => {
  const points = extractPoints(model);
  const providerName = model.quote?.trip?.agency
    ? model.quote?.trip?.agency.name
    : "Take Off Go";

  return (
    <>
      <Tracking
        quoteKey={quoteKey}
        viewType={viewType}
        preview={preview ?? false}
      />
      <a id="top" />

      {model.quote?.hero ? (
        model.quote.trip?.agency ? (
          <HeroLegacy data={model} />
        ) : (
          <Hero
            image={{
              url: `https://cdn.takeoffgo.com/${model.quote.hero.image?.hash}`,
              overlayOpacity: 0.4,
            }}
            title={model.quote.hero.title!}
            action={{
              body: model.quote.hero.subtitle!,
            }}
            hideNav
          />
        )
      ) : null}

      <Summary data={model} />

      {model.quote?.status !== QuoteStatus.Sample &&
      (!model.quote?.locked ||
        (model.quote?.total > 0 &&
          model.quote?.status === QuoteStatus.Confirmed)) &&
      moment(model.quote?.start || "").isAfter(moment()) ? (
        <section className="section container is-hidden-print">
          {!model.quote?.locked && (
            <div className="message is-warning">
              <div className="message-header">Work in progress</div>
              <div className="message-body">
                Please note that this quote is work in progress and may change.
                Accommodation, daily activities and pricing are subject to
                change while this message is present.
              </div>
            </div>
          )}
          {model.quote?.total > 0 &&
          model.quote?.status === QuoteStatus.Confirmed ? (
            <div className="message is-success">
              <div className="message-header">Confirmed</div>
              <div className="message-body">
                This quote has been accepted by you and will now be processed by
                the team at {providerName}. We will provide you with updates as
                we progress and be in touch if we require any additional
                information from you.
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <SummarisedItinerary data={model} />
      <Accommodation data={model} />
      <DetailedItinerary data={model} />
      {points.length + (model.quote?.trip?.tripFlights.nodes.length ?? 0) ===
      0 ? null : (
        <Map
          points={points}
          flights={model.quote?.trip?.tripFlights.nodes as TripFlight[]}
        />
      )}
      <ContactInformation data={model} />

      {model.quote?.total > 0 && (
        <>
          <Finances quoteKey={quoteKey} data={model} />
          <Terms data={model} />
        </>
      )}
      {model.quote?.trip?.agency ? (
        <>
          <div className="container has-text-centered is-hidden-print">
            <a
              href="https://www.elecollection.co/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LogoEle height={140} />
            </a>
            <p className="ele-collection__message">
              Together, we journey towards a cleaner Southern Africa &mdash;
              proudly supporting the Ele Collection&apos;s plastic-free mission.
            </p>
          </div>
          <FooterLegacy />
        </>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default QuoteComp;
