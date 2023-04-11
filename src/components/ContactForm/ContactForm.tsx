// styles
import styles from "./ContactForm.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// components
import FormField from "../FormField";
import Button from "../Button";

// types
import { ValidityOfFields } from "../../types/ValidityOfFields";

const ContactForm = (): JSX.Element => {
  const [areFieldsValid, setAreFieldsValid] = useState<ValidityOfFields>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const { addNotification } = useNotificationsContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(areFieldsValid).every((value) => value === true)) {
      console.log("Every field is validated!!!");
    } else {
      addNotification({
        id: uuidv4(),
        text: "Please fill out all required fields appropriately!",
      });
    }
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["personal-info"]}>
        <FormField
          fieldType="name"
          isValid={areFieldsValid.name}
          setIsValid={setAreFieldsValid}
        />
        <FormField
          fieldType="email"
          isValid={areFieldsValid.email}
          setIsValid={setAreFieldsValid}
        />
      </div>
      <FormField
        fieldType="subject"
        isValid={areFieldsValid.subject}
        setIsValid={setAreFieldsValid}
      />
      <FormField
        fieldType="message"
        isValid={areFieldsValid.message}
        setIsValid={setAreFieldsValid}
      />
      <Button text="Submit" />
    </form>
  );
};

export default ContactForm;
