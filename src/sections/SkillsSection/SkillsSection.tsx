// @ts-nocheck

// styles
import styles from "./SkillsSection.module.scss";

// hooks
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SkillBoxGroup from "../../components/SkillBoxGroup";
import SectionHeading from "../../components/SectionHeading";

// utils
import { TOOLS, SKILLS } from "../../utils/constants";

const SkillsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { skillsSectionRef } = useScrollContext();

  return (
    <section
      className={`${styles["skills"]} ${styles[`skills-${theme}`]}`}
      id="skills"
      data-scroll-snap-on-focus="true"
      ref={skillsSectionRef}
    >
      <SectionHeading
        text="My Skills"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <SkillBoxGroup subheading="My Bag of Tools" skills={TOOLS} />
      <SkillBoxGroup subheading="Other Skills" skills={SKILLS} />
    </section>
  );
};

export default SkillsSection;
