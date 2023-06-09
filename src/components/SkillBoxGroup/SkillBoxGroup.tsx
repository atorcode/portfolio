// styles
import styles from "./SkillBoxGroup.module.scss";

// hooks
import { useRef, useState } from "react";
import { useIntersectionObserverOnChildren } from "../../hooks/useIntersectionObserverOnChildren";

// components
import Subheading from "../Subheading";
import SkillBox from "../SkillBox";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxGroupProps = {
  subheading: string;
  readonly skills: ReadonlyArray<SkillsType>;
};

const SkillBoxGroup = ({
  subheading,
  skills,
}: SkillBoxGroupProps): JSX.Element => {
  const [visibilityOfSkillBoxes, setVisibilityOfSkillBoxes] = useState<
    Array<boolean>
  >(Array.from({ length: skills.length }, () => false));
  const skillBoxesRef = useRef<HTMLElement | null>(null);

  useIntersectionObserverOnChildren({
    ref: skillBoxesRef,
    visibilityOfChildren: visibilityOfSkillBoxes,
    setVisibilityOfChildren: setVisibilityOfSkillBoxes,
  });

  return (
    <section className={styles["skill-box-grouping"]}>
      <Subheading text={subheading} />
      <section className={styles["skill-boxes"]} ref={skillBoxesRef}>
        {skills.map((skill: SkillsType, index: number): JSX.Element => {
          return (
            <SkillBox
              key={index}
              skill={skill}
              groupIsVisible={visibilityOfSkillBoxes[index]}
            />
          );
        })}
      </section>
    </section>
  );
};

export default SkillBoxGroup;
