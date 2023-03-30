// styles
import styles from "./ContactForm.module.scss";

// components
import FormField from "../FormField";

const ContactForm = (): JSX.Element => {
  return (
    <form className={styles["form"]}>
      <div className={styles["personal-info"]}>
        <FormField fieldType="name" />
        <FormField fieldType="email" />
      </div>
      <FormField fieldType="subject" />
      <FormField fieldType="message" />
    </form>
  );
};

export default ContactForm;
