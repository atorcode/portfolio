// styles
import styles from "./ContactForm.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useRef, useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// components
import FormField from "../FormField";
import Button from "../Button";

// types
import { ValidityOfFields } from "../../types/ValidityOfFields";

type ContactFormProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactForm = ({
  isVisible,
  setIsVisible,
}: ContactFormProps): JSX.Element => {
  const [areFieldsValid, setAreFieldsValid] = useState<ValidityOfFields>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const { addNotification } = useNotificationsContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(areFieldsValid).every((value) => value === true)) {
      addNotification({
        id: uuidv4(),
        type: "success",
        text: "Your message has been sent successfully. Thank you!",
      });
    } else {
      addNotification({
        id: uuidv4(),
        type: "warning",
        text: "Please fill out all required fields appropriately!",
      });
    }
  };

  useIntersectionObserver({
    ref: formRef,
    isVisible,
    setIsVisible,
    transitionStyle: styles["form-visible"],
  });

  return (
    <form className={styles["form"]} ref={formRef} onSubmit={handleSubmit}>
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
      <Button
        text="Submit"
        startingPos="right"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </form>
  );
};

export default ContactForm;
