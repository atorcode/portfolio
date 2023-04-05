// styles
import styles from "./FormFieldUnderline.module.scss";

type FormFieldUnderlineProps = {
  isFocused: boolean;
  isValid: boolean;
};
const FormFieldUnderline = ({
  isFocused,
  isValid,
}: FormFieldUnderlineProps): JSX.Element => {
  return (
    <div
      className={
        isFocused
          ? isValid
            ? `${styles["underline"]} ${styles["underline-valid"]}`
            : `${styles["underline"]} ${styles["underline-invalid"]}`
          : styles["underline"]
      }
    ></div>
  );
};

export default FormFieldUnderline;
