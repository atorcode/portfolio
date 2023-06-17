// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// hooks
import { useRef } from "react";

// components
import Project from "../Project/Project";

// types
import { ProjectType } from "../../types/ProjectType";

const Projects = (): JSX.Element => {
  const projectsRef = useRef<HTMLElement | null>(null);

  return (
    <section className={styles["projects"]} ref={projectsRef}>
      {projectsData.map((project: ProjectType): JSX.Element => {
        return <Project key={project.id} {...project} />;
      })}
    </section>
  );
};

export default Projects;
