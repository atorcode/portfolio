// styles
import styles from "./Project.module.scss";

// hooks
import { useEffect, useState } from "react";

// components
import Button from "../Button";

// types
import { ProjectType as ProjectProps } from "../../types/ProjectType";

const Project = ({ name, imagePath, url }: ProjectProps): JSX.Element => {
  const [projectImage, setProjectImage] = useState<string | undefined>();
  useEffect(() => {
    const loadImage = async (): Promise<void> => {
      const importedImage = await import(`../../assets/${imagePath}`);
      setProjectImage(importedImage.default);
    };
    loadImage();
  }, [imagePath]);

  return (
    <article className={styles["project"]}>
      <h2>{name}</h2>
      <img src={projectImage} className={styles["project-image"]} />
      <Button text="View Project" url={url} />
    </article>
  );
};

export default Project;
