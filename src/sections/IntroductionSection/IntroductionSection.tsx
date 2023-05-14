// styles
import styles from "./IntroductionSection.module.scss";
import paragraphStyles from "../../components/Paragraph/Paragraph.module.scss";

// hooks
import { useRef, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// components
import SectionHeading from "../../components/SectionHeading";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";

const IntroductionSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { theme } = useThemeContext();
  const { introductionSectionRef } = useScrollContext();

  useIntersectionObserver({
    ref: paragraphRef,
    isVisible,
    setIsVisible,
    transitionDelay: 500,
    transitionStyle: paragraphStyles["paragraph-visible"],
  });

  return (
    <section
      className={`${styles["introduction"]} ${styles[`introduction-${theme}`]}`}
      id="introduction"
      data-scroll-snap-on-focus="true"
      ref={introductionSectionRef}
    >
      <div className={styles["introduction-content"]}>
        <SectionHeading text="Hey, I'm Albo!" />
        <Paragraph
          text="My full name is Alberto Torrigiotti. I'm a software engineer, front-end
        web developer, educator, and lifelong learner who excels at delivering
        game-related services. I am extremely eager to collaborate with people
        and build projects together, so don't hesitate to reach out!"
          startingPos="down"
          ref={paragraphRef}
        />
        <Button text="Explore My Work" url="#projects" />
      </div>
    </section>
  );
};

export default IntroductionSection;
