// styles
import styles from "./Project.module.scss";

// components
import Button from "../Button";

const Project = (): JSX.Element => {
  return (
    <article className={styles["project"]}>
      <h2>Article</h2>
      <Button text="Learn More" />
    </article>
  );
};

export default Project;
