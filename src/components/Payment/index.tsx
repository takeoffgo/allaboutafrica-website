"use client";
import React from "react";
import { BrandLine } from "../Bulma";
import { InvoicePublic } from "../../lib/api/jambo";
import { usePayInvoiceMutation } from "../../lib/api/public";
import { stripeToken } from "./stripe";
import { Input } from "./components/Input";
import { currency } from "../../lib/util";
import { client } from "../../lib/public";
import Link from "next/link";

type PaymentProps = {
  model: {
    invoice: InvoicePublic;
    amount?: number;
    customer?: string;
  };
};

const fallbackError = "An error occurred processing your payment";

const validate = (state: any, setState: (state: any) => void) => {
  const error: string[] = [];
  if (!state.name) {
    error.push("Please enter your name.");
  }

  if (!state.number) {
    error.push("Please enter your card number.");
  }

  if (!state.expiry) {
    error.push("Please enter your card expiry date.");
  }

  if (state.expiry && state.expiry.indexOf("/") === -1) {
    error.push("Please enter your card expiry date in the format MM/YY.");
  }

  if (!state.cvc) {
    error.push("Please enter your credit card verification number (CVV).");
  }

  if (error.length > 0) {
    setState({ error });
  }

  return error.length === 0;
};

const Payment: React.FC<PaymentProps> = ({ model: { invoice, amount } }) => {
  const [payment, paymentStatus] = usePayInvoiceMutation({
    client,
  });

  const [state, setState] = React.useState({
    loading: false,
    paid: false,
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    error: null as any,
  });

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!validate(state, setState)) {
      return;
    }

    setState({ ...state, error: null, loading: true });
    try {
      const token = await stripeToken(state);

      const variables = {
        input: {
          invoice: invoice.id,
          token,
          amount,
        },
      };

      const res = await payment({ variables });

      if (res.data?.payInvoice?.success) {
        setState({
          ...state,
          paid: true,
        });
      } else {
        setState({
          ...state,
          paid: false,
          loading: false,
          error: res.data?.payInvoice?.message ?? fallbackError,
        });
      }
    } catch (ex: any) {
      setState({
        ...state,
        loading: false,
        error: ex.error ? ex.error.message : fallbackError,
      });
    }
  };

  return (
    <>
      <h1 className="title is-1">Payment</h1>
      <h4 className="subtitle is-4">{invoice.trip}</h4>
      <dl>
        {invoice.summary ? (
          <>
            <dt>Invoice</dt>
            <dd>
              <Link href={`/invoice?id=${invoice.id}`}>{invoice.summary}</Link>
            </dd>
          </>
        ) : null}
        <dt>Amount due</dt>
        <dd>{currency(amount || invoice.amountDue, invoice.currency!)}</dd>

        {invoice.amountDue > 0 && amount ? (
          <>
            <dt>Invoice total</dt>
            <dd>{currency(invoice.amount, invoice.currency!)}</dd>
            {invoice.amount === invoice.amountDue ? null : (
              <>
                <dd>Invoice outstanding</dd>
                <dd>{currency(invoice.amountDue, invoice.currency!)}</dd>
              </>
            )}
          </>
        ) : null}
      </dl>
      <BrandLine />
      <Input
        invoice={invoice}
        loading={paymentStatus.loading || state.loading}
        onChange={(f, v) => setState({ ...state, [f]: v })}
        onSubmit={handleSubmit}
        paid={state.paid}
        value={state}
      />
    </>
  );
};

export default Payment;
