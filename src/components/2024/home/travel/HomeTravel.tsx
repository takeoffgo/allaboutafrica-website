import { LogoMark } from "@/components/Logo";
import styles from "./HomeTravel.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "../../button/Button";

export type HomeTravelProps = {
  title: string;
  action: {
    body: string;
    link: {
      url: string;
      label: string;
    };
  };
  cards: {
    id: string;
    title: string;
    image: {
      url: string;
    };
  }[];
};
export function HomeTravel(props: Readonly<HomeTravelProps>) {
  const groupsLarge = [
    [props.cards[0]],
    [props.cards[1], props.cards[2]],
    [props.cards[3], props.cards[4]],
    [props.cards[5]],
  ];
  const groupsSmall = [
    [props.cards[0], props.cards[1], props.cards[2]],
    [props.cards[3], props.cards[4], props.cards[5]],
  ];
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <LogoMark className={styles.brandMark} />
        <span>{props.title}</span>
      </p>
      <div className={styles.content}>
        {groupsLarge.map((group) => (
          <div className={styles.group} key={group[0].id}>
            {group.map((card) => (
              <Link
                href={`${props.action.link.url}#${card.id}`}
                className={styles.card}
                key={card.id}
              >
                <div className={styles.imageBackground}>
                  <Image
                    alt={card.title}
                    src={card.image.url}
                    width={236}
                    height={304}
                  />
                </div>
                <p>{card.title}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.contentMobile}>
        {groupsSmall.map((group) => (
          <div className={styles.group} key={group[0].id}>
            {group.map((card) => (
              <Link
                href={`${props.action.link.url}#${card.id}`}
                className={styles.card}
                key={card.id}
              >
                <div className={styles.imageBackground}>
                  <Image
                    alt={card.title}
                    src={card.image.url}
                    width={236}
                    height={304}
                  />
                </div>
                <p>{card.title}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.action}>
        <p>{props.action.body}</p>
        <LinkButton outlined href={props.action.link.url}>
          {props.action.link.label}
        </LinkButton>
      </div>
    </div>
  );
}
