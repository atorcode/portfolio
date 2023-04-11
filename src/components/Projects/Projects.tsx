// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// components
import Project from "../Project/Project";

// types
import { ProjectType } from "../../types/ProjectType";

const Projects = (): JSX.Element => {
  return (
    <section className={styles["projects"]}>
      {projectsData.map((project: ProjectType): JSX.Element => {
        return <Project key={project.id} {...project} />;
      })}
    </section>
  );
};

export default Projects;
