// styles
import styles from "./ProjectsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { forwardRef } from "react";

// utility types
import { PropsWithoutRef } from "react";

const ProjectsSection = forwardRef<HTMLElement, PropsWithoutRef<{}>>(
  ({}, ref): JSX.Element => {
    const { theme } = useThemeContext();
    return (
      <section
        className={`${styles["projects"]} ${styles[`projects-${theme}`]}`}
        ref={ref}
      >
        ProjectsSection
      </section>
    );
  }
);
export default ProjectsSection;
