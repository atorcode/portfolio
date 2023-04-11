// styles
import styles from "./Projects.module.scss";

// components
import Project from "../Project/Project";

const Projects = (): JSX.Element => {
  return (
    <section className={styles["projects"]}>
      <Project />
      <Project />
      <Project />
      <Project />
    </section>
  );
};

export default Projects;
