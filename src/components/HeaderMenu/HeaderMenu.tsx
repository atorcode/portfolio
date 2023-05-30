// styles
import styles from "./HeaderMenu.module.scss";

// icons
import { FaGithub } from "react-icons/fa";

// hooks
import { useEffect, useRef } from "react";
import { useLoadingContext } from "../../contexts/LoadingContext";

// components
import DarkLightToggleSwitch from "../DarkLightToggleSwitch";

const HeaderMenu = (): JSX.Element => {
  const githubRef = useRef<HTMLAnchorElement | null>(null);
  const { isLoading } = useLoadingContext();

  useEffect((): void => {
    githubRef.current?.classList.add(styles["github-link-before"]);
  }, []);

  useEffect((): void => {
    if (!isLoading) {
      setTimeout(() => {
        githubRef.current?.classList.add(styles["github-link-after"]);
      }, 500);
    }
  }, [isLoading]);

  return (
    <header className={`${styles["header"]}`}>
      <a
        className={`${styles["github-link"]}`}
        href={"https://github.com/atorcode"}
        target="_blank"
        rel="noreferrer"
        ref={githubRef}
      >
        <FaGithub />
      </a>

      <DarkLightToggleSwitch />
    </header>
  );
};

export default HeaderMenu;
