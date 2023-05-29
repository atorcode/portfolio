// styles
import styles from "./SectionHeading.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type SectionHeadingProps = {
  text: string;
  sectionIsVisible: boolean;
  setSectionIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionHeading = ({
  text,
  sectionIsVisible,
  setSectionIsVisible,
}: SectionHeadingProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const { theme } = useThemeContext();

  useEffect((): void => {
    headingRef.current?.classList.add(styles["heading-before"]);
  }, []);

  useIntersectionObserver({
    ref: headingRef,
    isVisible,
    setIsVisible,
    sectionIsVisible,
    setSectionIsVisible,
    beforeTransitionClass: styles["heading-before"],
    afterTransitionClass: styles["heading-after"],
    threshold: 1,
  });

  return (
    <h1
      className={`${styles["heading"]} ${styles[`heading-${theme}`]}`}
      ref={headingRef}
    >
      {text}
    </h1>
  );
};

export default SectionHeading;
