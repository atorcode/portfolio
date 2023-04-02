import { FormFieldType } from "../types/FormFieldType";

export const validateFormField = (fieldType: FormFieldType): boolean => {
  let isValid = false;
  switch (fieldType) {
    case "Name":
      isValid = true;
      break;
    case "Email":
      isValid = false;
      break;
    case "Subject":
      isValid = true;
      break;
    case "Message":
      isValid = false;
      break;
    default:
      const _exhaustiveCheck: never = fieldType;
      return _exhaustiveCheck;
  }
  return isValid;
};
