// styles
import styles from "./AboutSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";

const AboutSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { aboutSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["about"]} ${styles[`about-${theme}`]}`}
      ref={aboutSectionRef}
    >
      <SectionHeading text="About Me" />
    </section>
  );
};

export default AboutSection;
