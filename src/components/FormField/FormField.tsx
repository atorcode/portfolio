// styles
import styles from "./FormField.module.scss";

// hooks
import { useState } from "react";

// components
import FormFieldUnderline from "../FormFieldUnderline";

// types
import { FormFieldType } from "../../types/FormFieldType";

// utils
import { validateFormField } from "../../utils/utils";

type FormFieldProps = {
  fieldType: FormFieldType;
};

console.log(validateFormField("Name"));

const FormField = ({ fieldType }: FormFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

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
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setInputValue(e.target.value)
          }
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        ></textarea>
      ) : (
        <input
          className={styles["field"]}
          id={fieldType}
          type="text"
          placeholder={placeholderText}
          autoComplete="off"
          required
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setInputValue(e.target.value)
          }
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        ></input>
      )}
      <FormFieldUnderline isFocused={isFocused} />
    </div>
  );
};

export default FormField;
