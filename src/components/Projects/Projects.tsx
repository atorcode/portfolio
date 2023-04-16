// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// hooks
import { useEffect, useRef, useState } from "react";

// components
import Project from "../Project/Project";

// types
import { ProjectType } from "../../types/ProjectType";

const Projects = (): JSX.Element => {
  const [visibilityOfProjects, setVisibilityOfProjects] = useState<
    Array<boolean>
  >([false, false, false, false]);
  const projectsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            visibilityOfProjects.forEach((isVisible, index) => {
              if (!isVisible) {
                setTimeout(() => {
                  setVisibilityOfProjects((prev) => {
                    const result = [...prev];
                    result[index] = true;
                    return result;
                  });
                }, 200 * index);
              }
            });
          }
        });
      },
      { threshold: 0 }
    );
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return (): void => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

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
