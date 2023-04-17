// styles
import styles from "./IntroductionSection.module.scss";

// functions and hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";

const IntroductionSection = (): JSX.Element => {
  const { theme } = useThemeContext();
  const { introductionSectionRef } = useScrollContext();

  return (
    <section
      className={`${styles["introduction"]} ${styles[`introduction-${theme}`]}`}
      id="introduction"
      data-scroll-snap-on-focus="true"
      ref={introductionSectionRef}
    >
      <SectionHeading text="Hey, I'm Albo!" />
      <Paragraph
        text="My full name is Alberto Torrigiotti. I'm a software engineer, front-end
        web developer, and lifelong learner who excels at delivering
        game-related services. I am extremely eager to collaborate with people
        and build projects together, so don't hesitate to reach out!"
      />
      <Button text="Explore My Work" url="#projects" />
    </section>
  );
};

export default IntroductionSection;
