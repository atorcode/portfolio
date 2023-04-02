// styles
import styles from "./ContactForm.module.scss";

// components
import FormField from "../FormField";
import SubmitFormButton from "../SubmitFormButton";

const ContactForm = (): JSX.Element => {
  return (
    <form className={styles["form"]}>
      <div className={styles["personal-info"]}>
        <FormField fieldType="Name" />
        <FormField fieldType="Email" />
      </div>
      <FormField fieldType="Subject" />
      <FormField fieldType="Message" />
      <SubmitFormButton />
    </form>
  );
};

export default ContactForm;
