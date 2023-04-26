// styles
import styles from "./SkillBoxGroup.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";

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

  useEffect((): (() => void) => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            visibilityOfSkillBoxes.forEach(
              (isVisible: boolean, index: number): void => {
                if (!isVisible) {
                  setTimeout((): void => {
                    setVisibilityOfSkillBoxes(
                      (prev: Array<boolean>): Array<boolean> => {
                        const result = [...prev];
                        result[index] = true;
                        return result;
                      }
                    );
                  }, 200 * index + 50);
                }
              }
            );
          }
        });
      },
      { threshold: 1 }
    );
    if (skillBoxesRef.current) {
      observer.observe(skillBoxesRef.current);
    }

    return (): void => {
      if (skillBoxesRef.current) {
        observer.unobserve(skillBoxesRef.current);
      }
    };
  }, []);

  return (
    <section className={styles["skill-box-grouping"]}>
      <Subheading text={subheading} />
      <section className={styles["skill-boxes"]} ref={skillBoxesRef}>
        {skills.map((skill: SkillsType, index: number): JSX.Element => {
          return (
            <SkillBox
              key={index}
              skill={skill}
              isVisible={visibilityOfSkillBoxes[index]}
            />
          );
        })}
      </section>
    </section>
  );
};

export default SkillBoxGroup;
