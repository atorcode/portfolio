// styles
import styles from "./FormField.module.scss";

// hooks
import { useState } from "react";

// components
import FormFieldUnderline from "../FormFieldUnderline";

type FormFieldProps = {
  fieldType: "Name" | "Email" | "Subject" | "Message";
};

const FormField = ({ fieldType }: FormFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
          autoComplete="off"
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></textarea>
      ) : (
        <input
          className={styles["field"]}
          id={fieldType}
          type="text"
          placeholder={placeholderText}
          autoComplete="off"
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
      )}
      <FormFieldUnderline isFocused={isFocused} />
    </div>
  );
};

export default FormField;
