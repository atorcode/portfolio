// styles
import styles from "./IntroductionSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { forwardRef } from "react";

// utility types
import { PropsWithoutRef } from "react";

const IntroductionSection = forwardRef<HTMLElement, PropsWithoutRef<{}>>(
  ({}, ref): JSX.Element => {
    const { theme } = useThemeContext();
    return (
      <section
        className={`${styles["introduction"]} ${
          styles[`introduction-${theme}`]
        }`}
        ref={ref}
      >
        <h1 className={styles["greeting"]}>Hey, I'm Albo!</h1>
        <h2 className={styles["description"]}>
          My full name is Alberto Torrigiotti. I'm a software engineer,
          front-end web developer, and lifelong learner who excels at delivering
          game-related services. I am extremely eager to collaborate with people
          and build projects together, so don't hesitate to reach out!
        </h2>
      </section>
    );
  }
);

export default IntroductionSection;
