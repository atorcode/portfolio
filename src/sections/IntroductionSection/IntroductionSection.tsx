// styles
import styles from "./IntroductionSection.module.scss";

// hooks
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import HeaderMenu from "../../components/HeaderMenu";
import SectionHeading from "../../components/SectionHeading";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Mask from "../../components/Mask";

const IntroductionSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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
      <HeaderMenu
        sectionIsVisible={isVisible}
        setSectionIsVisible={setIsVisible}
      />
      <Mask unveilDirection="up" />
      <div className={styles["introduction-content"]}>
        <SectionHeading
          text="Hey, I'm Albo!"
          sectionIsVisible={isVisible}
          setSectionIsVisible={setIsVisible}
        />
        <Paragraph
          text="My full name is Alberto Torrigiotti. I'm a software engineer, front-end
        web developer, designer, educator, and lifelong learner who excels at delivering
        game-related services. I am extremely eager to collaborate with people
        and build projects together, so don't hesitate to reach out!"
          startingPos="down"
          sectionIsVisible={isVisible}
          setSectionIsVisible={setIsVisible}
        />
        <Button
          text="Explore My Work"
          url="#projects"
          sectionIsVisible={isVisible}
          setSectionIsVisible={setIsVisible}
          transitionDelay={1000}
        />
      </div>
    </section>
  );
};

export default IntroductionSection;
