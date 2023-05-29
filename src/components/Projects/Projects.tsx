// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// hooks
import { useRef, useState } from "react";
import { useIntersectionObserverOnChildren } from "../../hooks/useIntersectionObserverOnChildren";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import Project from "../Project/Project";

// types
import { ProjectType } from "../../types/ProjectType";

const Projects = (): JSX.Element => {
  const { observeSectionsForTransitions } = useScrollContext();
  const [visibilityOfProjects, setVisibilityOfProjects] = useState<
    Array<boolean>
  >([false, false, false, false]);
  const projectsRef = useRef<HTMLElement | null>(null);

  useIntersectionObserverOnChildren({
    ref: projectsRef,
    visibilityOfChildren: visibilityOfProjects,
    setVisibilityOfChildren: setVisibilityOfProjects,
    disabled: !observeSectionsForTransitions,
  });

  return (
    <section className={styles["projects"]} ref={projectsRef}>
      {projectsData.map((project: ProjectType, index: number): JSX.Element => {
        return (
          <Project
            key={project.id}
            groupIsVisible={visibilityOfProjects[index]}
            {...project}
          />
        );
      })}
    </section>
  );
};

export default Projects;
