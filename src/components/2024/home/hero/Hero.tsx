import Image from "next/image";
import styles from "./Hero.module.scss";
import { Navbar } from "../../navbar/Navbar";
import { LinkButton } from "../../button/Button";

export type HeroProps = {
  title: string;
  subtitle?: string;
  action: {
    body: string;
    link?: {
      url: string;
      label: string;
    };
  };
  image: {
    url: string;
    overlayOpacity: number;
  };

  hideNav?: boolean;
};

export function Hero(props: Readonly<HeroProps>) {
  return (
    <div className={styles.container}>
      <Navbar hideNav={props.hideNav} />

      <div className={styles.copy}>
        {props.subtitle ? (
          <p className={styles.subtitle}>{props.subtitle}</p>
        ) : null}
        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.action}>
        <p>{props.action.body}</p>
        {props.action.link ? (
          <LinkButton outlined href={props.action.link.url}>
            {props.action.link.label}
          </LinkButton>
        ) : null}
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={props.image.url}
          alt=""
          fill
          style={{ opacity: props.image.overlayOpacity }}
        />
      </div>
    </div>
  );
}
