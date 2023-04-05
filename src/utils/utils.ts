import { FormFieldType } from "../types/FormFieldType";

const validateEmail = (address: string) => {
  const emailRegex =
    /^(?=.{1,256})(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return emailRegex.test(address);
};

export const validateFormField = (
  fieldType: FormFieldType,
  value: string
): boolean => {
  let isValid = false;
  switch (fieldType) {
    case "Name":
      isValid = true;
      break;
    case "Email":
      isValid = validateEmail(value);
      break;
    case "Subject":
      isValid = true;
      break;
    case "Message":
      value.length > 0 ? (isValid = true) : (isValid = false);
      break;
    default:
      const _exhaustiveCheck: never = fieldType;
      return _exhaustiveCheck;
  }
  return isValid;
};
