import styles from "./NavbarModal.module.scss";
import Link from "next/link";
import { Button } from "../button/Button";
import { TextLogo } from "@/components/Logo";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  { label: "Home", url: "/" },
  { label: "Experience", url: "/experience" },
  { label: "Enquire", url: "/contact?source=mobilenav" },
];

export type NavbarModalProps = { onClose: () => void };
export function NavbarModal(props: Readonly<NavbarModalProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <TextLogo className={styles.logo} />
          <Button outlined onClick={props.onClose}>
            Close
          </Button>
        </div>
        <div>
          <nav className={styles.nav}>
            {links.map((lnk) => (
              <Link key={lnk.label} href={lnk.url} onClick={props.onClose}>
                {lnk.label}
              </Link>
            ))}
          </nav>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} All About Africa. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
