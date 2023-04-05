import { FormFieldType } from "../types/FormFieldType";

export const capitalizeFirstLetter = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

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
    case "name":
      isValid = true;
      break;
    case "email":
      isValid = validateEmail(value);
      break;
    case "subject":
      isValid = true;
      break;
    case "message":
      value.length > 0 ? (isValid = true) : (isValid = false);
      break;
    default:
      const _exhaustiveCheck: never = fieldType;
      return _exhaustiveCheck;
  }
  return isValid;
};
