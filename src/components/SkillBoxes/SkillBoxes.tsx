// styles
import styles from "./SkillBoxes.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import SkillBox from "../../components/SkillBox";

// utils
import { SKILLS } from "../../utils/constants";

type SkillType = typeof SKILLS[number];

const SkillBoxes = (): JSX.Element => {
  return (
    <section className={styles["skill-boxes"]}>
      {SKILLS.map((skill: SkillType): JSX.Element => {
        return <SkillBox key={uuidv4()} skill={skill} />;
      })}
    </section>
  );
};

export default SkillBoxes;
