// styles
import styles from "./ContactForm.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useEffect, useRef, useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// components
import FormField from "../FormField";
import Button from "../Button";

// types
import { ValidityOfFields } from "../../types/ValidityOfFields";

type ContactFormProps = {
  sectionIsVisible: boolean;
  setSectionIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactForm = ({
  sectionIsVisible,
  setSectionIsVisible,
}: ContactFormProps): JSX.Element => {
  const [areFieldsValid, setAreFieldsValid] = useState<ValidityOfFields>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const { addNotification } = useNotificationsContext();

  useEffect((): void => {
    formRef.current?.classList.add(styles["form-before"]);
  }, []);

  useIntersectionObserver({
    ref: formRef,
    isVisible: sectionIsVisible,
    setIsVisible: setSectionIsVisible,
    beforeTransitionClass: styles["form-before"],
    afterTransitionClass: styles["form-after"],
  });

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
        sectionIsVisible={sectionIsVisible}
        setSectionIsVisible={setSectionIsVisible}
        transitionDelay={500}
      />
    </form>
  );
};

export default ContactForm;
