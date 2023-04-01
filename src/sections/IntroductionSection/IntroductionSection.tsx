// styles
import styles from "./IntroductionSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";

const IntroductionSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { introductionSectionRef } = useScrollContext();

  return (
    <section
      className={`${styles["introduction"]} ${styles[`introduction-${theme}`]}`}
      data-section="main"
      ref={introductionSectionRef}
    >
      <SectionHeading text="Hey, I'm Albo!" />
      <h2 className={styles["description"]}>
        My full name is Alberto Torrigiotti. I'm a software engineer, front-end
        web developer, and lifelong learner who excels at delivering
        game-related services. I am extremely eager to collaborate with people
        and build projects together, so don't hesitate to reach out!
      </h2>
    </section>
  );
};

export default IntroductionSection;
