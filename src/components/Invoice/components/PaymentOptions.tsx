import React from "react";
import { InvoicePublic } from "../../../lib/api/jambo";

const PaymentOptions: React.FC<{ data: InvoicePublic }> = ({ data }) => (
  <div className="section is-emphasised">
    <h2 className="subtitle is-5">Payment options</h2>
    {/* <div className="columns is-variable is-1">
      <div className="column is-narrow">
        <span className="icon is-medium">
          <i className="fal fa-lg fa-globe-africa" />
        </span>
      </div>
      <div className="column">
        <p className="is-hidden-print">
          <a target="_blank" href={`/payment?id=${data.id}`} rel="noreferrer">
            <strong>Online payment form</strong>
          </a>{" "}
          follow this link to make payment using our secure online payment form
        </p>
        <p className="is-only-print">
          <strong>Online payment form</strong> ask your travel consultant for
          the link to make payment
        </p>
      </div>
    </div> */}

    <div className="columns is-variable is-1">
      <div className="column is-narrow">
        <span className="icon is-medium">
          <i className="fal fa-lg fa-user" />
        </span>
      </div>
      <div className="column">
        <p>
          <strong>Get in touch</strong> we offer a number of payment options,
          contact your travel consultant for more information
        </p>
      </div>
    </div>

    <BankDetails currency={data.currency!} number={data.number!} />
  </div>
);

type BankDetailsProps = { currency: string; number: number };
const BankDetails: React.FC<BankDetailsProps> = ({ currency, number }) => {
  switch (currency) {
    case "AUD":
      return (
        <div className="columns is-variable is-1">
          <div className="column is-narrow">
            <span className="icon is-medium">
              <i className="fal fa-lg fa-university" />
            </span>
          </div>
          <div className="column">
            <p>
              <strong>Bank transfer</strong> our bank details are &ndash;
            </p>
            <dl className="indented">
              <dt>Bank name</dt>
              <dd>Commonwealth Bank</dd>
              <dt>BSB</dt>
              <dd>
                <code className="is-amount">067-873</code>
              </dd>
              <dt>Account number</dt>
              <dd>
                <code className="is-amount">1010-9812</code>
              </dd>
              <dt>Account holder</dt>
              <dd>Take Off Go Pty Ltd</dd>
            </dl>
            <p>
              Please include the reference{" "}
              <code className="strong is-amount">Invoice {number}</code> when
              making payment.
            </p>
          </div>
        </div>
      );
    case "USD":
      return (
        <div className="columns is-variable is-1">
          <div className="column is-narrow">
            <span className="icon is-medium">
              <i className="fal fa-lg fa-university" />
            </span>
          </div>
          <div className="column">
            <p>
              <strong>Bank transfer</strong> our bank details are &ndash;
            </p>
            <dl className="indented">
              <dt>Account holder</dt>
              <dd>Take Off Go Pty Ltd</dd>
              <dt>Routing number</dt>
              <dd>
                <code className="is-amount">026073150</code>
              </dd>
              <dt>Swift/BIC</dt>
              <dd>
                <code className="is-amount">CMFGUS33</code>
              </dd>
              <dt>Account number</dt>
              <dd>
                <code className="is-amount">8313532966</code>
              </dd>
              <dt>Bank address</dt>
              <dd>
                <address>
                  30 W. 26th Street, Sixth Floor
                  <br />
                  New York NY 10010
                  <br />
                  United States
                </address>
              </dd>
            </dl>
            <p>
              Please include the reference{" "}
              <code className="strong is-amount">Invoice {number}</code> when
              making payment.
            </p>
          </div>
        </div>
      );

    case "ZAR":
      return (
        <div className="columns is-variable is-1">
          <div className="column is-narrow">
            <span className="icon is-medium">
              <i className="fal fa-lg fa-university" />
            </span>
          </div>
          <div className="column">
            <p>
              <strong>Bank transfer</strong> our bank details are &ndash;
            </p>
            <dl className="indented">
              <dt>Account holder</dt>
              <dd>Take Off Go Pty Ltd</dd>
              <dt>Swift/BIC</dt>
              <dd>
                <code className="is-amount">TRWIGB2LXXX</code>
              </dd>
              <dt>IBAN</dt>
              <dd>
                <code className="is-amount">GB85 TRWI 2314 7044 6810 42</code>
              </dd>
              <dt>Bank address</dt>
              <dd>
                <address>
                  Wise Payments Limited
                  <br />
                  56 Shoreditch High Street
                  <br />
                  London
                  <br />
                  E1 6JJ
                  <br />
                  United Kingdom
                </address>
              </dd>
            </dl>
            <p>
              Please include the reference{" "}
              <code className="strong is-amount">Invoice {number}</code> when
              making payment.
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="columns is-variable is-1">
          <div className="column is-narrow">
            <span className="icon is-medium">
              <i className="fal fa-lg fa-university" />
            </span>
          </div>
          <div className="column">
            <p>
              We are unable to receive payments in this currency (${currency}).
              Please contact your travel consultant for more information.
            </p>
          </div>
        </div>
      );
  }
};

export default PaymentOptions;
