import React from "react";
import PaymentOptions from "./PaymentOptions";
import { InvoicePublic } from "../../../lib/api/jambo";

const Footer: React.FC<{ data: InvoicePublic }> = ({ data }) => (
  <footer>
    <PaymentOptions data={data} />
    <p className="has-text-centered">
      <small>
        It is a condition of travel that guests must have insurance for
        cancellation/curtailment, medical expenses and baggage loss. All About
        Africa cannot be held responsible for any costs incurred by any airline
        delays. Our standard booking conditions apply.
      </small>
    </p>
    <hr className="is-emphasised" />
    <div className="columns">
      <div className="column">
        <a href="https://allaboutafrica.au/">allaboutafrica.au</a>
      </div>
      <div className="column has-text-centered">
        <a href="mailto:accounts@allaboutafrica.au">
          accounts@allaboutafrica.au
        </a>
      </div>
      <div className="column has-text-right">
        ABN <span className="is-amount">81 691 636 914</span>
      </div>
    </div>
  </footer>
);

export default Footer;
