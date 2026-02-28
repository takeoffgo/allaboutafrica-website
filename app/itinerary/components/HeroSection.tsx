import React from "react";
import styles from "./HeroSection.module.scss";
import NavBar from "./NavBar";

type Section = { id: string; label: string };

type Props = {
  imageUrl?: string;
  title: string;
  sections: Section[];
  onSectionClick: (id: string) => void;
};

const HeroSection: React.FC<Props> = ({ imageUrl, title, sections, onSectionClick }) => (
  <section className={styles.hero}>
    <div
      className={styles.hero__bg}
      style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
    />
    <div className={styles.hero__overlay} />
    <div className={styles.hero__content}>
      <NavBar sections={sections} onSectionClick={onSectionClick} />
      <h1 className={styles.hero__title}>{title}</h1>
      <hr className={styles.hero__divider} />
      <div className={styles.hero__spacer} />
      <div className={styles.hero__explore}>
        Let&rsquo;s Explore
        <div className={styles.hero__mouse}>
          <svg className={styles.hero__mouseArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
