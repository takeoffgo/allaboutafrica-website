import Link, { LinkProps } from "next/link";
import cx from "classnames";
import styles from "./Button.module.scss";

type SharedProps = {
  outlined?: boolean;
  white?: boolean;
};

function buildClassName(props: SharedProps) {
  return cx(styles.container, {
    [styles.outlined]: props.outlined,
    [styles.white]: props.white,
  });
}

function otherProps<TProps>(props: TProps & SharedProps) {
  const { outlined, white, ...rest } = props;
  return rest;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & SharedProps;
export function Button(props: React.PropsWithChildren<ButtonProps>) {
  return <button className={buildClassName(props)} {...otherProps(props)} />;
}

type LinkButtonProps = LinkProps & SharedProps;
export function LinkButton(props: React.PropsWithChildren<LinkButtonProps>) {
  return <Link className={buildClassName(props)} {...otherProps(props)} />;
}
