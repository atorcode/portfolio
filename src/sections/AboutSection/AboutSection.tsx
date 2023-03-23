// styles
import styles from "./AboutSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { forwardRef } from "react";

// utility types
import { PropsWithoutRef } from "react";

const AboutSection = forwardRef<HTMLElement, PropsWithoutRef<{}>>(
  ({}, ref): JSX.Element => {
    const { theme } = useThemeContext();
    return (
      <section
        className={`${styles["about"]} ${styles[`about-${theme}`]}`}
        ref={ref}
      >
        AboutSection
      </section>
    );
  }
);

export default AboutSection;
