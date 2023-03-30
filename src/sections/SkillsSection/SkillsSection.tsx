// styles
import styles from "./SkillsSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SkillBoxes from "../../components/SkillBoxes";

const SkillsSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { skillsSectionRef } = useScrollContext();
  return (
    <section
      className={`${styles["skills"]} ${styles[`skills-${theme}`]}`}
      ref={skillsSectionRef}
    >
      <SkillBoxes />
    </section>
  );
};

export default SkillsSection;
