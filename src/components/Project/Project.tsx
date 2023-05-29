// styles
import styles from "./Project.module.scss";
import "./githubLogo.scss";

// icons
import { ReactComponent as GithubLogo } from "../../assets/github-logo.svg";

// hooks
import { useEffect, useRef, useState } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// components
import Button from "../Button";

// types
import { ProjectType } from "../../types/ProjectType";

type ProjectProps = ProjectType & {
  groupIsVisible: boolean;
};

const Project = ({
  groupIsVisible,
  name,
  imagePath,
  imageAltText,
  projectUrl,
  githubUrl,
}: ProjectProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [projectImage, setProjectImage] = useState<string | undefined>();
  const projectRef = useRef<HTMLElement | null>(null);
  const { isScrolling, observeSectionsForTransitions } = useScrollContext();
  const { theme } = useThemeContext();

  useEffect((): void => {
    const loadImage = async (): Promise<void> => {
      const importedImage = await import(`../../assets/${imagePath}`);
      setProjectImage(importedImage.default);
    };
    loadImage();
  }, [imagePath]);

  useEffect((): void => {
    if (!isScrolling && groupIsVisible) {
      projectRef.current?.classList.add(styles["project-visible"]);
    }
  }, [isScrolling, groupIsVisible]);

  useIntersectionObserver({
    ref: projectRef,
    isVisible,
    setIsVisible,
    afterTransitionClass: styles["project-visible"],
    threshold: 0.2,
    disabled: observeSectionsForTransitions,
  });

  return (
    <article className={styles["project"]} ref={projectRef}>
      <div
        className={`${styles["inner-content"]} ${
          styles[`inner-content-${theme}`]
        } `}
      >
        <h2 className={styles["title"]}>{name}</h2>

        <a
          className={styles["github-link"]}
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
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
