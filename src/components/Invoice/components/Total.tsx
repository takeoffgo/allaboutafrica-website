import React from "react";
import { InvoicePublic } from "../../../lib/api/jambo";
import { currency } from "../../../lib/util";

const Total: React.FC<{ data: InvoicePublic }> = ({ data }) => (
  <div className="columns">
    <div className="column" />
    <div className="column is-narrow block is-emphasised-left">
      <span className="heading">Total amount due</span>
      <h1 className="title is-3">
        <code className="is-amount">{currency(data.amount, data.currency!)}</code>
      </h1>
    </div>
  </div>
);

export default Total;
