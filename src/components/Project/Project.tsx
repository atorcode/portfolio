// styles
import styles from "./Project.module.scss";

// components
import Button from "../Button";

type ProjectProps = {
  name: string;
};

const Project = ({ name }: ProjectProps): JSX.Element => {
  return (
    <article className={styles["project"]}>
      <h2>{name}</h2>
      <img src="" />
      <Button text="View Project" />
    </article>
  );
};

export default Project;
