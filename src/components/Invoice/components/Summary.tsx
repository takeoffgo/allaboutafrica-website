import React from "react";
import moment from "moment";
import { dateFormatWithYear } from "@/lib/constants";
import { InvoicePublic } from "@/lib/api/jambo";

const Summary: React.FC<{ data: InvoicePublic }> = ({ data }) => (
  <div className="columns">
    <div className="column">
      <h1 className="title is-3 is-amount">Invoice #{data.number}</h1>
      {data.trip ? <h3 className="subtitle is-6">{data.trip}</h3> : null}
    </div>
    <div className="column is-narrow">
      <table className="table is-narrow">
        <tbody>
          {data.invoiced ? (
            <tr>
              <th>Invoiced</th>
              <td className="has-text-right">
                {moment(data.invoiced).format(dateFormatWithYear)}
              </td>
            </tr>
          ) : null}
          {data.due ? (
            <tr>
              <th>Due</th>
              <td className="has-text-right">
                {moment(data.due).format(dateFormatWithYear)}
              </td>
            </tr>
          ) : null}
          {data.paid ? (
            <tr>
              <th>Paid</th>
              <td className="has-text-right">
                {moment(data.paid).format(dateFormatWithYear)}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  </div>
);

export default Summary;
