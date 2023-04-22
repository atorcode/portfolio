// styles
import styles from "./SkillBoxes.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import Subheading from "../../components/Subheading";
import SkillBox from "../../components/SkillBox";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxesProps = {
  heading: string;
  readonly skills: ReadonlyArray<SkillsType>;
};

const SkillBoxes = ({ heading, skills }: SkillBoxesProps): JSX.Element => {
  return (
    <section className={styles["skill-box-grouping"]}>
      <Subheading text={heading} />
      <section className={styles["skill-boxes"]}>
        {skills.map((skill: SkillsType): JSX.Element => {
          return <SkillBox key={uuidv4()} skill={skill} />;
        })}
      </section>
    </section>
  );
};

export default SkillBoxes;
