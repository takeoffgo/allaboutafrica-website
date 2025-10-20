import React from "react";
import { Success } from "./Success";
import { Form } from "./Form";

type InputProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
  loading: boolean;
  value: any;
  invoice: any;
  paid: boolean;
};

export const Input: React.FC<InputProps> = ({ invoice, paid, ...rest }) => {
  if (!invoice) {
    return (
      <div className="content">
        <p>This invoice cannot be found.</p>
        <p>Please contact your Take Off Go representative.</p>
      </div>
    );
  }

  if (invoice.paid) {
    return (
      <div className="content">
        <p>This invoice has already been paid. Thank you.</p>
      </div>
    );
  }

  if (paid) {
    return <Success />;
  }

  return <Form {...rest} />;
};
