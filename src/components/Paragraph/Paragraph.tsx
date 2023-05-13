// styles
import styles from "./Paragraph.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type ParagraphProps = {
  text: string;
};

const Paragraph = ({ text }: ParagraphProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      className={`${styles["paragraph"]} ${styles[`paragraph-${theme}`]}`}
      ref={paragraphRef}
    >
      {text}
    </p>
  );
};

export default Paragraph;
