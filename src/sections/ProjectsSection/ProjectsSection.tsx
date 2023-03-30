// styles
import styles from "./ProjectsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

const ProjectsSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { projectsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["projects"]} ${styles[`projects-${theme}`]}`}
      ref={projectsSectionRef}
    >
      ProjectsSection
    </section>
  );
};

export default ProjectsSection;
