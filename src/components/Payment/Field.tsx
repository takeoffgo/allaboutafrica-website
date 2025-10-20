import React from "react";

type FieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

const Field: React.FC<FieldProps> = ({ label, name, ...rest }) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <div className="control">
      <input id={name} className="input" {...rest} />
    </div>
  </div>
);

export default Field;
