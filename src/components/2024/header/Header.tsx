import { LogoMark } from "@/components/Logo";
import { Navbar } from "../navbar/Navbar";
import styles from "./Header.module.scss";

type HeaderProps = React.PropsWithChildren<{
  title: string;
}>;

export function Header(props: HeaderProps) {
  return (
    <header className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.title}>{props.title}</h1>
        <div className={styles.body}>{props.children}</div>
        <LogoMark className={styles.brandMark} />
      </div>
    </header>
  );
}
