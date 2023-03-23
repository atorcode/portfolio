// styles
import styles from "./IntroductionSection.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";

const IntroductionSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  return (
    <section className={`${styles["hero"]} ${styles[`hero-${theme}`]}`}>
      <h1 className={styles["greeting"]}>Hey, I'm Albo!</h1>
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
