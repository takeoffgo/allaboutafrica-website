import styles from "./Field.module.scss";

export type FieldProps = React.PropsWithChildren<{ label: string }>;
export function Field(props: FieldProps) {
  return (
    <div className={styles.container}>
      <label>
        <span>{props.label}</span>
        {props.children}
      </label>
    </div>
  );
}
