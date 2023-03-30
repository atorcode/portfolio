// styles
import styles from "./AboutSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

const AboutSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { aboutSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["about"]} ${styles[`about-${theme}`]}`}
      ref={aboutSectionRef}
    >
      AboutSection
    </section>
  );
};

export default AboutSection;
