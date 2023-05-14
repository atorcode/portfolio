// styles
import styles from "./Paragraph.module.scss";

// dependencies and hooks
import React from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

// types
import { StartingPosition } from "../../types/StartingPosition";

type ParagraphProps = {
  text: string;
  startingPos?: StartingPosition;
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ text, startingPos }: ParagraphProps, ref): JSX.Element => {
    const { theme } = useThemeContext();

    return (
      <p
        className={`${styles["paragraph"]} ${styles[`paragraph-${theme}`]} ${
          styles[`paragraph-${startingPos}`]
        }`}
        ref={ref}
      >
        {text}
      </p>
    );
  }
);

export default Paragraph;
