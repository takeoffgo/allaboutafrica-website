import React from "react";
import { InvoicePublic } from "../../../lib/api/jambo";
import { currency } from "../../../lib/util";

const LineItems: React.FC<{ data: InvoicePublic }> = ({ data }) => (
  <table className="table is-narrow is-striped is-fullwidth">
    <thead>
      <tr>
        <th />
        <th className="has-text-right" style={{ width: 80 }}>
          Quantity
        </th>
        <th className="has-text-right" style={{ width: 160 }}>
          Rate
        </th>
        <th className="has-text-right" style={{ width: 160 }}>
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <small>{data.summary}</small>
        </td>
        <td className="has-text-right">
          <code className="is-amount">1</code>
        </td>
        <td className="has-text-right">
          <code className="is-amount">
            {currency(data.amount, data.currency!)}
          </code>
        </td>
        <td className="has-text-right">
          <code className="is-amount">
            {currency(data.amount, data.currency!)}
          </code>
        </td>
      </tr>
    </tbody>
  </table>
);

export default LineItems;
