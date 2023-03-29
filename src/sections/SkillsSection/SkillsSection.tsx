// styles
import styles from "./SkillsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { forwardRef } from "react";

// utility types
import { PropsWithoutRef } from "react";

// components
import SkillBoxes from "../../components/SkillBoxes";

const SkillsSection = forwardRef<HTMLElement, PropsWithoutRef<{}>>(
  ({}, ref): JSX.Element => {
    const { theme } = useThemeContext();
    return (
      <section
        className={`${styles["skills"]} ${styles[`skills-${theme}`]}`}
        ref={ref}
      >
        <SkillBoxes />
      </section>
    );
  }
);

export default SkillsSection;
