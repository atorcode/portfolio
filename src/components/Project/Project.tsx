// styles
import styles from "./Project.module.scss";
import "./githubLogo.scss";

// icons
import { ReactComponent as GithubLogo } from "../../assets/github-logo.svg";

// hooks
import { useEffect, useRef, useState } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const projectRef = useRef<HTMLElement | null>(null);
  const { isScrolling } = useScrollContext();

  useEffect(() => {
    const loadImage = async (): Promise<void> => {
      const importedImage = await import(`../../assets/${imagePath}`);
      setProjectImage(importedImage.default);
    };
    loadImage();
  }, [imagePath]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return (): void => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isScrolling && isVisible) {
      projectRef.current?.classList.add(styles["project-visible"]);
    }
  }, [isScrolling, isVisible]);

  useEffect(() => {
    console.log(isScrolling);
  }, [isScrolling]);

  return (
    <article className={styles["project"]} ref={projectRef}>
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
