import React from "react";
import { Link } from "react-router";
import AaaLogo from "./AaaLogo";
import styles from "./SiteFooter.module.scss";
import EleLogo from "./EleLogo";
import type { GetQuoteQuery } from "~/lib/api/jambo";

type AgencyMember = NonNullable<
  NonNullable<GetQuoteQuery["quote"]>["trip"]
>["agencyMember"];

type Props = {
  consultant?: AgencyMember;
};

const SiteFooter: React.FC<Props> = ({ consultant }) => {
  const consultantName = consultant
    ? [consultant.firstName, consultant.lastName].filter(Boolean).join(" ")
    : null;

  const contactEmail = consultant?.email ?? "email@AllAboutAfrica.com.au";
  const contactPhone = consultant?.phone ?? "+61 XXX XXX";
  const genderPrefix = consultant?.genderPreposition ?? "them";
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__left}>
          <Link to="/" className={styles.footer__logo}>
            <AaaLogo width={155} height={90} />
          </Link>

          {consultant && (
            <div className={styles.footer__contact}>
              <p>
                Your travel consultant
                {consultantName ? ` is ${consultantName}` : ""}.
              </p>
              <p>
                {" "}
                Email {genderPrefix} at{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or{" "}
                {contactPhone} anytime.
              </p>
            </div>
          )}

          <div className={styles.footer__legal}>
            <p>&copy; {year} ALL ABOUT AFRICA Pty Ltd</p>
            <p>All Rights Reserved</p>
            <p>ABN 81 691 636 914</p>
          </div>
        </div>

        <div className={styles.footer__right}>
          <div className={styles.footer__partnerLogo}>
            <EleLogo />
          </div>
          <p className={styles.footer__partnerText}>
            Together, we journey towards a cleaner Southern Africa &mdash;
            <br />
            proudly supporting the Ele Collection&apos;s plastic-free mission.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
