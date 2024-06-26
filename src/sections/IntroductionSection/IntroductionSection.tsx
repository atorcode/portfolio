// styles
import styles from "./IntroductionSection.module.scss";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import HeaderMenu from "../../components/HeaderMenu";
import SectionHeading from "../../components/SectionHeading";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Mask from "../../components/Mask";

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
      <div
        className={`${styles["content-mask"]} ${
          styles[`content-mask-${theme}`]
        }`}
      ></div>
      <HeaderMenu />
      <Mask unveilDirection="up" />
      <div className={styles["introduction-content"]}>
        <SectionHeading text="Hey, I'm Albo!" />
        <Paragraph
          text="My full name is Alberto Torrigiotti. I'm a full-stack software engineer, educator, and lifelong learner who excels at delivering projects end to end. I'm currently the lead developer of an emergency alerting application leveraging a brand new signaling protocol to enable over the air delivery of rich media. I am also extremely eager to collaborate with people and build projects together, so don't hesitate to reach out!"
          startingPos="down"
        />
        <Button text="Explore My Work" url="#projects" transitionDelay={1000} />
      </div>
    </section>
  );
};

export default IntroductionSection;
