"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import React from "react";
import { NavbarModal } from "./NavbarModal";
import { Button, LinkButton } from "../button/Button";
import { TextLogo } from "@/components/Logo";

type NavbarProps = { hideNav?: boolean };
export function Navbar(props: Readonly<NavbarProps>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <TextLogo className={styles.logo} />
        </Link>
        {props.hideNav ? null : (
          <>
            <nav className={styles.nav}>
              <LinkButton href="/experience">Experience</LinkButton>
              <LinkButton href="/contact?source=topnav" outlined>
                Enquire
              </LinkButton>
            </nav>
            <nav className={styles.navMobile}>
              <Button outlined onClick={() => setOpen(true)}>
                Menu
              </Button>
            </nav>
          </>
        )}
      </header>
      {open ? <NavbarModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
