// styles
import styles from "./SectionHeading.module.scss";

// hooks
import { useEffect, useRef } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type SectionHeadingProps = {
  text: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SectionHeading = ({
  text,
  isVisible,
  setIsVisible,
}: SectionHeadingProps): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const { theme } = useThemeContext();

  useEffect((): void => {
    headingRef.current?.classList.add(styles["heading-before"]);
  }, []);

  useIntersectionObserver({
    ref: headingRef,
    isVisible,
    setIsVisible,
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
