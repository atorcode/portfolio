// styles
import styles from "./SkillBoxes.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import SkillBox from "../../components/SkillBox";

// utils
import { SKILLS } from "../../utils/constants";

const SkillBoxes = (): JSX.Element => {
  return (
    <section className={styles["skill-boxes"]}>
      {SKILLS.map((skill) => {
        return <SkillBox key={uuidv4()} skill={skill} />;
      })}
    </section>
  );
};

export default SkillBoxes;
