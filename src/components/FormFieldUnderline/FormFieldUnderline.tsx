// styles
import styles from "./FormFieldUnderline.module.scss";

type FormFieldUnderlineProps = {
  isFocused: boolean;
};
const FormFieldUnderline = ({
  isFocused,
}: FormFieldUnderlineProps): JSX.Element => {
  return (
    <div
      className={
        isFocused
          ? `${styles["underline"]} ${styles["underline-visible"]}`
          : styles["underline"]
      }
    ></div>
  );
};

export default FormFieldUnderline;
