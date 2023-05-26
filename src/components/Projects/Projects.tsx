// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// hooks
import { useRef, useState } from "react";
import { useIntersectionObserverOnChildren } from "../../hooks/useIntersectionObserverOnChildren";

// components
import Project from "../Project/Project";

// types
import { ProjectType } from "../../types/ProjectType";

const Projects = (): JSX.Element => {
  const [visibilityOfProjects, setVisibilityOfProjects] = useState<
    Array<boolean>
  >([false, false, false, false]);
  const projectsRef = useRef<HTMLElement | null>(null);

  useIntersectionObserverOnChildren({
    ref: projectsRef,
    visibilityOfChildren: visibilityOfProjects,
    setVisibilityOfChildren: setVisibilityOfProjects,
  });

  return (
    <section className={styles["projects"]} ref={projectsRef}>
      {projectsData.map((project: ProjectType, index: number): JSX.Element => {
        return (
          <Project
            key={project.id}
            isVisible={visibilityOfProjects[index]}
            {...project}
          />
        );
      })}
    </section>
  );
};

export default Projects;
