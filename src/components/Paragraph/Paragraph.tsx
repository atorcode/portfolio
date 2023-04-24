// styles
import styles from "./Paragraph.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";

type ParagraphProps = {
  text: string;
};

const Paragraph = ({ text }: ParagraphProps): JSX.Element => {
  const { theme } = useThemeContext();
  return (
    <p className={`${styles["paragraph"]} ${styles[`paragraph-${theme}`]}`}>
      {text}
    </p>
  );
};

export default Paragraph;
