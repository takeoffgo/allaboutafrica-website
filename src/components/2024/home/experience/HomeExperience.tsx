import { LogoMark } from "@/components/Logo";
import styles from "./HomeExperience.module.scss";
import Image from "next/image";
import { LinkButton } from "../../button/Button";

type HomeExperienceProps = {
  title: string;
  body: string;
  link: {
    url: string;
    label: string;
  };
  image: {
    url: string;
    svg: boolean;
  };
};
export function HomeExperience(props: Readonly<HomeExperienceProps>) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <LogoMark className={styles.brandMark} />
        <span>{props.title}</span>
      </p>
      <div className={styles.content}>
        <p>{props.body}</p>
        <LinkButton href={props.link.url} white>
          {props.link.label}
        </LinkButton>
      </div>
      <div className={styles.mapContainer}>
        {props.image.svg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={styles.map}
            src={props.image.url}
            width={1333}
            height={640}
            alt=""
          />
        ) : (
          <Image
            className={styles.map}
            src={props.image.url}
            width={1333}
            height={640}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
