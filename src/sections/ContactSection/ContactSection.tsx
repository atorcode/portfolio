// styles
import styles from "./ContactSection.module.scss";

// functions and hooks
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import ContactForm from "../../components/ContactForm";
import SectionHeading from "../../components/SectionHeading";

const ContactSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { contactSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["contact"]} ${styles[`contact-${theme}`]}`}
      id="contact"
      data-scroll-snap-on-focus="true"
      ref={contactSectionRef}
    >
      <SectionHeading
        text="Contact Me"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <ContactForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </section>
  );
};

export default ContactSection;
