// styles
import styles from "./ContactForm.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              setTimeout((): void => {
                setIsVisible(true);
              }, 100);
            }
          }
        });
      }
    );
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    if (isVisible) {
      formRef.current?.classList.add(styles["form-visible"]);
    } else {
      formRef.current?.classList.remove(styles["form-visible"]);
    }
    return (): void => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, [isVisible]);

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
      <Button text="Submit" />
    </form>
  );
};

export default ContactForm;
