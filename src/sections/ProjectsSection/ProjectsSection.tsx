// styles
import styles from "./ProjectsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";

const ProjectsSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { projectsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["projects"]} ${styles[`projects-${theme}`]}`}
      ref={projectsSectionRef}
    >
      <SectionHeading text="My Projects" />
    </section>
  );
};

export default ProjectsSection;
