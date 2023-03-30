// styles
import styles from "./FormField.module.scss";

type FormFieldProps = {
  fieldType: "name" | "email" | "subject" | "message";
};

const FormField = ({ fieldType }: FormFieldProps): JSX.Element => {
  return (
    <input
      className={styles["field"]}
      type="text"
      placeholder={fieldType}
    ></input>
  );
};

export default FormField;
