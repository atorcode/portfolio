// styles
import styles from "./Project.module.scss";

// components
import Button from "../Button";

// types
import { ProjectType as ProjectProps } from "../../types/ProjectType";

const Project = ({ name, url }: ProjectProps): JSX.Element => {
  return (
    <article className={styles["project"]}>
      <h2>{name}</h2>
      <img src="" />
      <Button text="View Project" url={url} />
    </article>
  );
};

export default Project;
