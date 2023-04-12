// styles
import styles from "./Project.module.scss";

// icons
import { FiGithub } from "react-icons/fi";

// hooks
import { useEffect, useState } from "react";

// components
import Button from "../Button";

// types
import { ProjectType as ProjectProps } from "../../types/ProjectType";

const Project = ({
  name,
  imagePath,
  imageAltText,
  url,
}: ProjectProps): JSX.Element => {
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
      <div className={styles["inner-content"]}>
        <h2>{name}</h2>
        <FiGithub className={styles["icon"]} />
        <Button text="View Project" url={url} />
      </div>
      <img
        src={projectImage}
        alt={imageAltText}
        className={styles["project-image"]}
      />
    </article>
  );
};

export default Project;
