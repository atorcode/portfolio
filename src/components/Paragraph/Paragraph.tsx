// styles
import styles from "./Paragraph.module.scss";

// dependencies and hooks
import React, { useEffect, useRef } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// types
import { StartingPosition } from "../../types/StartingPosition";

type ParagraphProps = {
  text: string;
  startingPos?: StartingPosition;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Paragraph = ({
  text,
  startingPos,
  isVisible,
  setIsVisible,
}: ParagraphProps): JSX.Element => {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { theme } = useThemeContext();

  useEffect((): void => {
    if (isVisible) {
      return;
    }
    paragraphRef.current?.classList.add(
      styles[`paragraph-before-${startingPos}`]
    );
  }, [theme]);

  useIntersectionObserver({
    ref: paragraphRef,
    isVisible,
    setIsVisible,
    transitionDelay: 500,
    beforeTransitionClass: styles[`paragraph-before-${startingPos}`],
    afterTransitionClass: styles["paragraph-after"],
  });

  return (
    <p
      className={`${styles["paragraph"]} ${styles[`paragraph-${theme}`]}`}
      ref={paragraphRef}
    >
      {text}
    </p>
  );
};
export default Paragraph;
