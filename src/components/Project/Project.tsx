// styles
import styles from "./Project.module.scss";
import "./githubLogo.scss";

// icons
import { ReactComponent as GithubLogo } from "../../assets/github-logo.svg";

// hooks
import { useEffect, useRef, useState } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";

// components
import Button from "../Button";

// types
import { ProjectType } from "../../types/ProjectType";

type ProjectProps = ProjectType & {
  isVisible: boolean;
};

const Project = ({
  isVisible,
  name,
  imagePath,
  imageAltText,
  projectUrl,
  githubUrl,
}: ProjectProps): JSX.Element => {
  const [projectImage, setProjectImage] = useState<string | undefined>();
  const projectRef = useRef<HTMLElement | null>(null);
  const { isScrolling } = useScrollContext();
  const { theme } = useThemeContext();

  useEffect(() => {
    const loadImage = async (): Promise<void> => {
      const importedImage = await import(`../../assets/${imagePath}`);
      setProjectImage(importedImage.default);
    };
    loadImage();
  }, [imagePath]);

  useEffect(() => {
    if (!isScrolling && isVisible) {
      projectRef.current?.classList.add(styles["project-visible"]);
    }
  }, [isScrolling, isVisible]);

  return (
    <article className={styles["project"]} ref={projectRef}>
      <div
        className={`${styles["inner-content"]} ${
          styles[`inner-content-${theme}`]
        } `}
      >
        <h2 className={styles["title"]}>{name}</h2>
        <a className={styles["github-link"]} href={githubUrl} target="_blank">
          <GithubLogo
            className={`${"github-logo-svg"} ${`github-logo-svg-${theme}`}`}
          />
        </a>
        <div className={styles["button-wrapper"]}>
          <Button
            text="View Project"
            url={projectUrl}
            hasResizeableParent={true}
          />
        </div>
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
