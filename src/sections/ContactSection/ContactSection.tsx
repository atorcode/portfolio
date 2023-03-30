// styles
import styles from "./ContactSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import ContactForm from "../../components/ContactForm";

const ContactSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { contactSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["contact"]} ${styles[`contact-${theme}`]}`}
      ref={contactSectionRef}
    >
      <ContactForm />
    </section>
  );
};

export default ContactSection;
