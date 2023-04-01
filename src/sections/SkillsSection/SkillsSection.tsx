// styles
import styles from "./SkillsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SkillBoxes from "../../components/SkillBoxes";
import SectionHeading from "../../components/SectionHeading";

const SkillsSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { skillsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["skills"]} ${styles[`skills-${theme}`]}`}
      data-scroll-snap-on-focus="true"
      ref={skillsSectionRef}
    >
      <SectionHeading text="My Bag of Tools" />
      <SkillBoxes />
    </section>
  );
};

export default SkillsSection;
