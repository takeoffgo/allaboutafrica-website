import React from "react";
import { Link, useLocation } from "react-router";
import AaaLogo from "./AaaLogo";
import styles from "./SiteNav.module.scss";

const PARTNER_URL = "https://rqo13.share.hsforms.com/2ZrXw0pG4TASFD_3lUpditw";

const links = [
  { to: "/guides/gorilla-trekking", label: "Gorilla Trekking" },
  { to: "/guides/safari", label: "Safari Guide" },
  { to: "/guides/packing", label: "Packing Lists" },
];

const SiteNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.nav__logo}>
        <AaaLogo width={110} height={64} />
      </Link>
      <ul className={styles.nav__links}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`${styles.nav__link}${location.pathname === link.to ? ` ${styles["nav__link--active"]}` : ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <a
        href={PARTNER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.nav__cta}
      >
        Partner With Us
      </a>
    </nav>
  );
};

export default SiteNav;
