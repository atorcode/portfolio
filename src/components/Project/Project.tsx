// styles
import styles from "./Project.module.scss";
import "./githubLogo.scss";

// icons
import { ReactComponent as GithubLogo } from "../../assets/github-logo.svg";

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
  projectUrl,
  githubUrl,
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
        <h2 className={styles["title"]}>{name}</h2>

        <a className={styles["github-link"]} href={githubUrl} target="_blank">
          <GithubLogo className="github-logo-svg" />
        </a>
        <Button text="View Project" url={projectUrl} />
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
