// styles
import styles from "./FormFieldUnderline.module.scss";

// contexts
import { useThemeContext } from "../../contexts/ThemeContext";

type FormFieldUnderlineProps = {
  isFocused: boolean;
  isValid: boolean;
};

const FormFieldUnderline = ({
  isFocused,
  isValid,
}: FormFieldUnderlineProps): JSX.Element => {
  const { theme } = useThemeContext();
  return (
    <div
      className={
        isFocused
          ? isValid
            ? `${styles["underline"]} ${styles["underline-valid"]} ${
                styles[`underline-valid-${theme}`]
              }`
            : `${styles["underline"]} ${styles["underline-invalid"]} ${
                styles[`underline-valid-${theme}`]
              }`
          : styles["underline"]
      }
    ></div>
  );
};

export default FormFieldUnderline;
