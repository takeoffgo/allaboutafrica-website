import { LogoMark } from "@/components/Logo";
import styles from "./QuoteBox.module.scss";
import Image from "next/image";

export type QuoteBoxProps = {
  title: string;
  body: string;
  author: {
    name: string;
    title: string;
    image: { url: string };
  };
};
export function QuoteBox(props: Readonly<QuoteBoxProps>) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{props.title}</p>
      <div className={styles.content}>
        <p className={styles.copy}>{props.body}</p>
        <div className={styles.author}>
          <Image
            src={props.author.image.url}
            width={64}
            height={64}
            alt={props.author.name}
          />
          <div className={styles.authorDetail}>
            <p>{props.author.name}</p>
            <p>
              <small>{props.author.title}</small>
            </p>
          </div>
        </div>
      </div>
      <LogoMark className={styles.brandMark} height={16} width={16} />
    </div>
  );
}
