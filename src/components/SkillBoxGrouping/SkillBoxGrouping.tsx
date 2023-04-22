// styles
import styles from "./SkillBoxGrouping.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import Subheading from "../Subheading";
import SkillBox from "../SkillBox";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxGroupingProps = {
  subheading: string;
  readonly skills: ReadonlyArray<SkillsType>;
};

const SkillBoxGrouping = ({
  subheading,
  skills,
}: SkillBoxGroupingProps): JSX.Element => {
  return (
    <section className={styles["skill-box-grouping"]}>
      <Subheading text={subheading} />
      <section className={styles["skill-boxes"]}>
        {skills.map((skill: SkillsType): JSX.Element => {
          return <SkillBox key={uuidv4()} skill={skill} />;
        })}
      </section>
    </section>
  );
};

export default SkillBoxGrouping;
