// styles
import styles from "./FormField.module.scss";

type FormFieldProps = {
  fieldType: "Name" | "Email" | "Subject" | "Message";
};

const FormField = ({ fieldType }: FormFieldProps): JSX.Element => {
  let placeholderText: string;
  switch (fieldType) {
    case "Name":
      placeholderText = "Enter your name";
      break;
    case "Email":
      placeholderText = "Enter your email address";
      break;
    case "Subject":
      placeholderText = "Enter the subject of your message";
      break;
    case "Message":
      placeholderText = "Enter your message";
      break;
    default:
      const _exhaustiveCheck: never = fieldType;
      return _exhaustiveCheck;
  }

  return (
    <div className={styles["label-field-container"]}>
      <label className={styles["label"]} htmlFor={fieldType}>
        {fieldType}
      </label>
      {fieldType === "Message" ? (
        <textarea
          className={`${styles["field"]} ${styles["field-large"]}`}
          id={fieldType}
          placeholder={placeholderText}
          required
        ></textarea>
      ) : (
        <input
          className={styles["field"]}
          id={fieldType}
          type="text"
          placeholder={placeholderText}
          required
        ></input>
      )}
    </div>
  );
};

export default FormField;
