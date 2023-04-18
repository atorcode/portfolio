// styles
import styles from "./SkillsSection.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SkillBoxes from "../../components/SkillBoxes";
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
      <SectionHeading text="My Bag of Tools" />
      <SkillBoxes skills={[...TOOLS]} />
      <SkillBoxes skills={[...SKILLS]} />
    </section>
  );
};

export default SkillsSection;
