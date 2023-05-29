// styles
import styles from "./ProjectsSection.module.scss";

// functions and hooks
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";
import Projects from "../../components/Projects";

const ProjectsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { projectsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["projects"]} ${styles[`projects-${theme}`]}`}
      id={"projects"}
      data-scroll-snap-on-focus="true"
      ref={projectsSectionRef}
    >
      <header className={styles["header"]}>
        <SectionHeading
          text="My Recent Projects"
          sectionIsVisible={isVisible}
          setSectionIsVisible={setIsVisible}
        />
      </header>
      <Projects />
    </section>
  );
};

export default ProjectsSection;
