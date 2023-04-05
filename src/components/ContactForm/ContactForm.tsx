// styles
import styles from "./ContactForm.module.scss";

// hooks
import { useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// components
import FormField from "../FormField";
import SubmitFormButton from "../SubmitFormButton";

const ContactForm = (): JSX.Element => {
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isSubjectValid, setIsSubjectValid] = useState<boolean>(false);
  const [isMessageValid, setIsMessageValid] = useState<boolean>(false);
  const { updateNotifications } = useNotificationsContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      updateNotifications({
        text: "Please fill out all required fields appropriately!",
      });
    } else {
      console.log("GOOD JOB!");
    }
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["personal-info"]}>
        <FormField
          fieldType="Name"
          isValid={isNameValid}
          setIsValid={setIsNameValid}
        />
        <FormField
          fieldType="Email"
          isValid={isEmailValid}
          setIsValid={setIsEmailValid}
        />
      </div>
      <FormField
        fieldType="Subject"
        isValid={isSubjectValid}
        setIsValid={setIsSubjectValid}
      />
      <FormField
        fieldType="Message"
        isValid={isMessageValid}
        setIsValid={setIsMessageValid}
      />
      <SubmitFormButton />
    </form>
  );
};

export default ContactForm;
