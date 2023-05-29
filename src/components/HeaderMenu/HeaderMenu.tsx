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
  sectionIsVisible: boolean;
  setSectionIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeaderMenu = ({
  sectionIsVisible,
  setSectionIsVisible,
}: HeaderMenuProps): JSX.Element => {
  const githubRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    githubRef.current?.classList.add(styles["github-link-before"]);
  }, []);

  useIntersectionObserver({
    ref: githubRef,
    isVisible: sectionIsVisible,
    setIsVisible: setSectionIsVisible,
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
        rel="noreferrer"
      >
        <FaGithub />
      </a>

      <DarkLightToggleSwitch
        sectionIsVisible={sectionIsVisible}
        setSectionIsVisible={setSectionIsVisible}
      />
    </header>
  );
};

export default HeaderMenu;
