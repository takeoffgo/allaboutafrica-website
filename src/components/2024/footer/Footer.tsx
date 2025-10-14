import {
  Logo,
  LogoFacebook,
  LogoInstagram,
  LogoLinkedIn,
} from "@/components/Logo";
import styles from "./Footer.module.scss";
import { LinkButton } from "../button/Button";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.details}>
          <Logo />

          <div className={styles.legal}>
            <p>&copy; {new Date().getFullYear()} Take Off Go Pty Ltd</p>
            <p>All Rights Reserved</p>
          </div>
          <p className="is-amount">ABN 15 634 608 567</p>
        </div>
        <nav className={styles.navContainer}>
          <LinkButton href="/">Home</LinkButton>
          <LinkButton href="/experience">Experience</LinkButton>
          <LinkButton href="/contact?source=footer" outlined>
            Enquire
          </LinkButton>
        </nav>
      </div>
      <div className={styles.connections}>
        <div className={styles.partners} />

        <div className={styles.social}>
          <span>Follow us</span>
          <a
            href="https://instagram.com/takeoffgo"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LogoInstagram />
          </a>
          <a
            href="https://www.facebook.com/takeoffgo/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LogoFacebook />
          </a>
          <a
            href="https://www.linkedin.com/company/takeoffgo/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LogoLinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
