import React from "react";
import Link from "next/link";
import Field from "../Field";
import { css } from "../../../lib/util";
import { Error } from "./Error";
import { BrandLine } from "../../Bulma";

type Props = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
  loading: boolean;
  value: any;
};

export const Form: React.FC<Props> = ({
  onSubmit,
  onChange,
  loading,
  value,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Field
        name="name"
        label="Name on credit card"
        value={value.name}
        onChange={(ev) => onChange("name", ev.currentTarget.value)}
        disabled={loading}
      />
      <Field
        name="number"
        label="Card number"
        placeholder="•••• •••• •••• ••••"
        value={value.number}
        inputMode="numeric"
        onChange={(ev) => onChange("number", ev.currentTarget.value)}
        disabled={loading}
      />
      <div className="columns">
        <div className="column">
          <Field
            name="expiry"
            label="Expiry"
            placeholder="MM/YY"
            value={value.expiry}
            onChange={(ev) => onChange("expiry", ev.currentTarget.value)}
            disabled={loading}
          />
        </div>
        <div className="column">
          <Field
            name="cvv2"
            label="CVV"
            placeholder="•••"
            value={value.cvc}
            onChange={(ev) => onChange("cvc", ev.currentTarget.value)}
            disabled={loading}
          />
        </div>
      </div>
      <div className="content is-small">
        <p>
          By submitting payment, you are agreeing to our{" "}
          <Link href="/terms-and-conditions" target="_blank">
            terms and conditions
          </Link>
          .
        </p>
      </div>
      <Error error={value.error} />
      <div className="buttons is-centered are-large">
        <button
          type="submit"
          className={css({
            button: true,
            "is-primary": true,
            "is-loading": loading,
          })}
        >
          Submit
        </button>
      </div>
      <BrandLine />
      <div className="content is-small">
        <span className="heading">Security</span>
        <p>
          We work with our friends at Stripe to handle your sensitive
          information in the most secure way possible.{" "}
          <a
            href="https://stripe.com/docs/security/stripe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more here
          </a>{" "}
          about how Stripe handle your information securely.
        </p>
      </div>
    </form>
  );
};
