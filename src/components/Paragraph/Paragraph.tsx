// styles
import styles from "./Paragraph.module.scss";

// dependencies and hooks
import React, { useRef } from "react";
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

  useIntersectionObserver({
    ref: paragraphRef,
    isVisible,
    setIsVisible,
    transitionDelay: 500,
    transitionStyle: styles["paragraph-visible"],
  });

  return (
    <p
      className={`${styles["paragraph"]} ${styles[`paragraph-${theme}`]} ${
        styles[`paragraph-${startingPos}`]
      }`}
      ref={paragraphRef}
    >
      {text}
    </p>
  );
};
export default Paragraph;
