// styles
import styles from "./Projects.module.scss";

// data
import projectsData from "../../data/projects.json";

// components
import Project from "../Project/Project";

type ProjectType = {
  id: number;
  name: string;
};

const Projects = (): JSX.Element => {
  return (
    <section className={styles["projects"]}>
      {projectsData.map((project: ProjectType): JSX.Element => {
        return <Project key={project.id} name={project.name} />;
      })}
    </section>
  );
};

export default Projects;
