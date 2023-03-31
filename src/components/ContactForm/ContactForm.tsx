// styles
import styles from "./ContactForm.module.scss";

// components
import FormField from "../FormField";

const ContactForm = (): JSX.Element => {
  return (
    <form className={styles["form"]}>
      <div className={styles["personal-info"]}>
        <FormField fieldType="Name" />
        <FormField fieldType="Email" />
      </div>
      <FormField fieldType="Subject" />
      <FormField fieldType="Message" />
    </form>
  );
};

export default ContactForm;
