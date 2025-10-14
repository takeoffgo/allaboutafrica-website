import { LogoMark } from "@/components/Logo";
import styles from "./HomeBlurb.module.scss";
import { LinkButton } from "../../button/Button";
import React from "react";

type HomeBlurbProps = React.PropsWithChildren<{
  title?: string;
  action: {
    label: string;
    url: string;
  };
}>;
export function HomeBlurb(props: Readonly<HomeBlurbProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          <LogoMark className={styles.brandMark} />
          <span>{props.title}</span>
        </p>
      </div>
      <div className={styles.content}>
        {props.children}
        <LinkButton outlined href={props.action.url}>
          {props.action.label}
        </LinkButton>
      </div>
    </div>
  );
}
