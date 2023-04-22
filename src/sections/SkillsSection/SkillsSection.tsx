// styles
import styles from "./SkillsSection.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SkillBoxGrouping from "../../components/SkillBoxGrouping";
import SectionHeading from "../../components/SectionHeading";

// utils
import { TOOLS, SKILLS } from "../../utils/constants";

const SkillsSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { skillsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["skills"]} ${styles[`skills-${theme}`]}`}
      id="skills"
      data-scroll-snap-on-focus="true"
      ref={skillsSectionRef}
    >
      <SectionHeading text="My Skills" />
      <SkillBoxGrouping subheading="My Bag of Tools" skills={TOOLS} />
      <SkillBoxGrouping subheading="Other Skills" skills={SKILLS} />
    </section>
  );
};

export default SkillsSection;
