// styles
import styles from "./ContactSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { forwardRef } from "react";

// utility types
import { PropsWithoutRef } from "react";

const ContactSection = forwardRef<HTMLElement, PropsWithoutRef<{}>>(
  ({}, ref): JSX.Element => {
    const { theme } = useThemeContext();
    return (
      <section
        className={`${styles["contact"]} ${styles[`contact-${theme}`]}`}
        ref={ref}
      >
        ContactSection
      </section>
    );
  }
);

export default ContactSection;
