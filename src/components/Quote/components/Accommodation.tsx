import React from "react";
import Markdown from "react-markdown";
import Image from "../../Image";
import SectionHeader from "./SectionHeader";
import { GetQuoteQuery } from "../../../lib/api/jambo";
import { LinkButton } from "../../Bulma";
import _ from "lodash";

const Accommodation = ({ data }: { data: GetQuoteQuery }) => {
  return (
    <section id="accommodation" className="section container is-page-break">
      <SectionHeader title="Accommodation" />
      <div className="columns is-multiline is-centered">
        {_(data.quote?.accommodation?.nodes.map((a) => a?.property))
          .uniqBy("id")
          .value()
          .filter((ent) => !!ent?.summary)
          .map((property) => {
            const link = `/travel/properties/${property?.id}`;

            return (
              <div
                id={`property-${property?.id}`}
                className="column is-4"
                key={property?.id}
              >
                <div className="card">
                  {property?.heroMedia?.hash && (
                    <div className="card-image">
                      <a className="image is-cover is-16by9" href={link}>
                        <Image
                          src={property.heroMedia.hash}
                          alt={property.name || ""}
                        />
                      </a>
                    </div>
                  )}
                  <div className="card-content">
                    <strong>{property?.name}</strong>
                    {property?.summary && (
                      <Markdown className="content">
                        {property.summary}
                      </Markdown>
                    )}
                    <hr />
                    <div className="buttons is-right is-hidden-print">
                      <LinkButton text iconRight="chevron-right" href={link}>
                        Read more
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Accommodation;
