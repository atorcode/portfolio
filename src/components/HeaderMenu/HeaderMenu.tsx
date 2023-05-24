// styles
import styles from "./HeaderMenu.module.scss";

// icons
import { FaGithub } from "react-icons/fa";

// hooks
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// components
import DarkLightToggleSwitch from "../DarkLightToggleSwitch";

type HeaderMenuProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeaderMenu = ({
  isVisible,
  setIsVisible,
}: HeaderMenuProps): JSX.Element => {
  const githubRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    githubRef.current?.classList.add(styles["github-link-before"]);
  }, []);

  useIntersectionObserver({
    ref: githubRef,
    isVisible,
    setIsVisible,
    transitionDelay: 500,
    beforeTransitionClass: styles["github-link-before"],
    afterTransitionClass: styles["github-link-after"],
  });

  return (
    <header className={styles["header"]}>
      <a
        className={styles["github-link"]}
        href={"https://github.com/atorcode"}
        ref={githubRef}
        target="_blank"
      >
        <FaGithub />
      </a>

      <DarkLightToggleSwitch
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </header>
  );
};

export default HeaderMenu;
