// styles
import styles from "./FormField.module.scss";

// hooks
import { useEffect, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

// components
import FormFieldUnderline from "../FormFieldUnderline";

// types
import { FormFieldType } from "../../types/FormFieldType";
import { ValidityOfFields } from "../../types/ValidityOfFields";

// utils
import { capitalizeFirstLetter, validateFormField } from "../../utils/utils";

type FormFieldProps = {
  fieldType: FormFieldType;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<ValidityOfFields>>;
};

const FormField = ({
  fieldType,
  isValid,
  setIsValid,
}: FormFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { theme } = useThemeContext();

  useEffect((): void => {
    setIsValid((prev) => ({
      ...prev,
      [fieldType]: validateFormField(fieldType, inputValue),
    }));
  }, []);

  let placeholderText: string;
  switch (fieldType) {
    case "name":
      placeholderText = "Enter your name";
      break;
    case "email":
      placeholderText = "Enter your email address";
      break;
    case "subject":
      placeholderText = "Enter the subject of your message";
      break;
    case "message":
      placeholderText = "Enter your message";
      break;
    default:
      const _exhaustiveCheck: never = fieldType;
      return _exhaustiveCheck;
  }

  return (
    <div className={styles["label-field-container"]}>
      <label className={styles["label"]} htmlFor={fieldType}>
        {capitalizeFirstLetter(fieldType)}
      </label>
      {fieldType === "message" ? (
        <textarea
          className={`${styles["field"]} ${styles[`field-${theme}`]} ${
            styles["field-large"]
          }`}
          id={fieldType}
          placeholder={placeholderText}
          autoComplete="off"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setInputValue(e.target.value);
            setIsValid((prev) => ({
              ...prev,
              [fieldType]: validateFormField(fieldType, e.target.value),
            }));
          }}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        ></textarea>
      ) : (
        <input
          className={`${styles["field"]} ${styles[`field-${theme}`]}`}
          id={fieldType}
          type="text"
          placeholder={placeholderText}
          autoComplete="off"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setInputValue(e.target.value);
            setIsValid((prev) => ({
              ...prev,
              [fieldType]: validateFormField(fieldType, e.target.value),
            }));
          }}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        ></input>
      )}
      <FormFieldUnderline isFocused={isFocused} isValid={isValid} />
    </div>
  );
};

export default FormField;
