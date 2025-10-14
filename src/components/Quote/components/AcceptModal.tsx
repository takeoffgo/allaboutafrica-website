import cx from "classnames";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { GetQuoteQuery } from "@/lib/api/jambo";
import { useAcceptQuoteMutation } from "@/lib/api/public";
import { client } from "@/lib/public";
import { Content } from "../../Bulma";

type AcceptModalProps = {
  quoteKey: string;
  data: GetQuoteQuery;
  showing: boolean;
  onCancel: () => void;
};

type FormData = {
  accepted: boolean;
  name: string;
  email: string;
};

export const AcceptModal: React.FC<AcceptModalProps> = ({
  quoteKey,
  data,
  showing,
  onCancel,
}) => {
  const [acceptQuote, acceptQuoteStatus] = useAcceptQuoteMutation({
    client,
  });
  const form = useForm<FormData>();
  const [success, setSuccess] = React.useState(false);

  const accepted = form.watch("accepted");

  const handleCancel = () => {
    form.reset({ accepted: false });
    acceptQuoteStatus.reset();
    setSuccess(false);
    onCancel();
  };

  const handleSubmit = async (formData: FormData) => {
    // console.log({ data });
    const res = await acceptQuote({
      variables: {
        input: {
          key: quoteKey,
          date: new Date().toISOString().substring(0, 10),
          ...formData,
        },
      },
    });
    if (res.data?.acceptQuote?.success) {
      setSuccess(true);
    }
  };

  return (
    <div className={cx("modal", { "is-active": showing })}>
      <div className="modal-background" />
      <form onSubmit={form.handleSubmit(handleSubmit)} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Quote acceptance</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <Content>
            <h4>Thank you for choosing to travel with us!</h4>
            {success ? (
              <>
                <p>
                  The request has now been sent to your travel consultant who
                  will contact you directly with your confirmation details.
                </p>
              </>
            ) : (
              <>
                <p>
                  Before we confirm your booking, we need to get some legal
                  matters out.
                </p>
                <p>
                  This quote is subject to the following terms and conditions.
                </p>
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
                  By accepting this quote, you are acknowledging that you have
                  read in full, understood and agree to the terms and
                  conditions.
                </p>
                <p>
                  After confirmation an email will be sent to you and your
                  travel expert with a copy of your itinerary, deposit invoice
                  and other relevant documentation.
                </p>
              </>
            )}
          </Content>

          {success ? null : (
            <>
              <hr />
              <div className="field">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...form.register("accepted")}
                  />
                  &nbsp;I have read the above terms and conditions.
                </label>
              </div>
              {accepted ? (
                <>
                  <div className="field">
                    <label className="label">Your full name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        {...form.register("name", {
                          required: "Please enter your full name",
                          minLength: {
                            value: 3,
                            message:
                              "Please enter a name longer than three characters",
                          },
                        })}
                      />
                    </div>

                    {form.formState.errors.name ? (
                      <p className="help is-danger">
                        {form.formState.errors.name.message}
                      </p>
                    ) : (
                      <p className="help">Please enter your full legal name</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        {...form.register("email", {
                          required:
                            "We need your email address to send the confirmation to",
                        })}
                      />
                    </div>
                    {form.formState.errors.email ? (
                      <p className="help is-danger">
                        {form.formState.errors.email.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="content">
                    <p>
                      If you don&apos;t receive an email within 15 minutes of
                      confirmation, please contact your travel expert.
                    </p>
                    <p>
                      If you find any issues with your itinerary please notify
                      your travel expert as soon as possible.
                    </p>
                  </div>
                </>
              ) : null}
            </>
          )}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            {success ? null : (
              <button
                className={cx("button is-success", {
                  "is-loading": acceptQuoteStatus.loading,
                })}
                type="submit"
                disabled={!accepted}
              >
                Confirm
              </button>
            )}
            <button
              type="button"
              className="button"
              onClick={handleCancel}
              disabled={acceptQuoteStatus.loading}
            >
              {success ? "Close" : "Cancel"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};
