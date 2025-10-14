import cx from "classnames";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { Content } from "../../Bulma";
import Link from "next/link";

type TermsModalProps = {
  data: GetQuoteQuery;
  showing: boolean;
  onCancel: () => void;
};

export const TermsModal: React.FC<TermsModalProps> = ({
  data,
  showing,
  onCancel,
}) => {
  return (
    <div className={cx("modal", { "is-active": showing })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Terms and conditions</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <Content>
            <p>This quote is subject to the following terms and conditions.</p>
            <ul>
              {data.quote?.legalDocuments.nodes.map((ent) => (
                <li key={ent?.id}>
                  <Link
                    href={`/legal/doc?id=${ent?.legalDocument?.id}`}
                    target="_blank"
                  >
                    {ent?.legalDocument?.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              By accepting this quote, you are acknowledging that you have read
              in full, understood and agree to the terms and conditions.
            </p>
          </Content>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onCancel}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
