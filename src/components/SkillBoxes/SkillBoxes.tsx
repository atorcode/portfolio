// styles
import styles from "./SkillBoxes.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import SkillBox from "../../components/SkillBox";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxesProps = {
  skills: Array<SkillsType>;
};

const SkillBoxes = ({ skills }: SkillBoxesProps): JSX.Element => {
  return (
    <section className={styles["skill-boxes"]}>
      {skills.map((skill: SkillsType): JSX.Element => {
        return <SkillBox key={uuidv4()} skill={skill} />;
      })}
    </section>
  );
};

export default SkillBoxes;
