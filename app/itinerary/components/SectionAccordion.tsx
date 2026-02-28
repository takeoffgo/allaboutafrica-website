"use client";
import React from "react";
import styles from "./SectionAccordion.module.scss";

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

type Props = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  showChevron?: boolean;
  children: React.ReactNode;
};

const SectionAccordion: React.FC<Props> = ({
  title,
  isOpen,
  onToggle,
  showChevron = true,
  children,
}) => {
  const handleClick = () => {
    if (showChevron) onToggle();
  };

  return (
    <div className={styles.section}>
      <div
        className={styles.section__header}
        onClick={handleClick}
        role={showChevron ? "button" : undefined}
        tabIndex={showChevron ? 0 : undefined}
        onKeyDown={showChevron ? (e) => e.key === "Enter" && handleClick() : undefined}
        style={{ cursor: showChevron ? "pointer" : "default" }}
      >
        <h2 className={styles.section__title}>{title}</h2>
        {showChevron && (
          <span
            className={`${styles.section__chevron} ${
              isOpen ? styles["section__chevron--open"] : ""
            }`}
          >
            <ChevronIcon />
          </span>
        )}
      </div>

      {/* For collapsible sections use a simple hidden class; always visible otherwise */}
      {showChevron ? (
        <div
          className={styles.section__body}
          style={{
            display: isOpen ? "block" : "none",
          }}
        >
          {children}
        </div>
      ) : (
        <div className={styles.section__body}>{children}</div>
      )}
    </div>
  );
};

export default SectionAccordion;
