"use client";
import React from "react";
import SectionHeader from "./SectionHeader";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { currency } from "@/lib/util";
import { Buttons, Column, Columns } from "../../Bulma";
import { QuoteStatus } from "../global/constants";
import { AcceptModal } from "./AcceptModal";
import { TermsModal } from "./TermsModal";

type FinancesProps = {
  quoteKey: string;
  data: GetQuoteQuery;
};

const Finances: React.FC<FinancesProps> = ({ quoteKey, data }) => {
  const [accepting, setAccepting] = React.useState(false);
  const [terms, setTerms] = React.useState(false);

  return (
    <>
      <section id="finance" className="container section">
        <SectionHeader
          title="Finances"
          subtitle={`all prices listed in ${data.quote?.baseCurrency}`}
        />
        {data.quote?.status === QuoteStatus.Expired ? (
          <p>
            This quotation has expired. Please contact your travel consultant
            for an update.
          </p>
        ) : (
          <>
            <Columns>
              <Column narrow>
                <p className="heading">Total</p>
                <p className="title is-amount">
                  {currency(data.quote?.total, data.quote?.baseCurrency!)}
                </p>
              </Column>
              {(data.quote?.travellerCount ?? 1) <= 1 ? null : (
                <>
                  <Column narrow>
                    <p className="heading">Group size</p>
                    <p className="title is-amount">
                      {data.quote?.travellerCount}
                    </p>
                  </Column>
                  <Column narrow>
                    <p className="heading">Per person</p>
                    <p className="title is-amount">
                      {currency(
                        data.quote?.total / (data.quote?.travellerCount ?? 1),
                        data.quote?.baseCurrency!
                      )}
                    </p>
                  </Column>
                </>
              )}
            </Columns>
            <Buttons>
              {data.quote?.status === QuoteStatus.Active ? (
                <button
                  type="button"
                  className="button is-success is-large"
                  onClick={() => setAccepting(true)}
                >
                  Accept
                </button>
              ) : null}
              {(data.quote?.legalDocuments.nodes.length ?? 0) > 0 ? (
                <button
                  type="button"
                  className="button is-light"
                  onClick={() => setTerms(true)}
                >
                  Terms and conditions
                </button>
              ) : (
                <em>No Terms and Conditions present.</em>
              )}
            </Buttons>
          </>
        )}
      </section>

      <AcceptModal
        quoteKey={quoteKey}
        data={data}
        showing={accepting}
        onCancel={() => setAccepting(false)}
      />
      {(data.quote?.legalDocuments.nodes.length ?? 0) > 0 ? (
        <TermsModal
          data={data}
          showing={terms}
          onCancel={() => setTerms(false)}
        />
      ) : null}
    </>
  );
};

export default Finances;
