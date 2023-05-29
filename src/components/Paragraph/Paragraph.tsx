// styles
import styles from "./Paragraph.module.scss";

// dependencies and hooks
import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useScrollContext } from "../../contexts/ScrollContext";

// types
import { StartingPosition } from "../../types/StartingPosition";

type ParagraphProps = {
  text: string;
  startingPos?: StartingPosition;
  sectionIsVisible: boolean;
  setSectionIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Paragraph = ({
  text,
  startingPos,
  sectionIsVisible,
  setSectionIsVisible,
}: ParagraphProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { theme } = useThemeContext();
  const { observeSectionsForTransitions } = useScrollContext();

  useEffect((): void => {
    if (
      (observeSectionsForTransitions && !sectionIsVisible) ||
      (!observeSectionsForTransitions && !isVisible)
    ) {
      paragraphRef.current?.classList.add(
        styles[`paragraph-before-${startingPos}`]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useIntersectionObserver({
    ref: paragraphRef,
    isVisible,
    setIsVisible,
    sectionIsVisible,
    setSectionIsVisible,
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
