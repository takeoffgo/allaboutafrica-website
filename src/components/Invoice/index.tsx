import React from "react";
import Footer from "./components/Footer";
import Summary from "./components/Summary";
import LineItems from "./components/LineItems";
import Total from "./components/Total";
import { InvoicePublic } from "../../lib/api/jambo";

type InvoiceProps = {
  model: InvoicePublic;
};

const Invoice: React.FC<InvoiceProps> = ({ model }) => (
  <>
    <main className="body">
      <Summary data={model} />
      <LineItems data={model} />
      <Total data={model} />
    </main>
    <Footer data={model} />
  </>
);

export default Invoice;
