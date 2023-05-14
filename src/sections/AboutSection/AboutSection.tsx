// styles
import styles from "./AboutSection.module.scss";

// functions and hooks
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useScrollContext } from "../../contexts/ScrollContext";

// components
import SectionHeading from "../../components/SectionHeading";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";

const AboutSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { aboutSectionRef } = useScrollContext();

  return (
    <section
      className={`${styles["about"]} ${styles[`about-${theme}`]}`}
      id="about"
      data-scroll-snap-on-focus="true"
      ref={aboutSectionRef}
    >
      <SectionHeading text="About Me" />
      <div>
        <Paragraph
          text="Front-end web development is the perfect intersection between the analytic and the creative, which suits me well. I care deeply about improving user experience, and I have a methodical approach when coding which forces me to pay meticulous attention to detail. You can find me constantly daydreaming about ways to make code cleaner and more reusable."
          startingPos="left"
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
        <Paragraph
          text="I strive to understand how everything works, and the most fun way to learn is together. I regularly reinforce my mastery of concepts and techniques by teaching, and I am grateful to my peers and the programming community at large for being so welcoming and for accelerating my learning. These attitudes along with my desire to do things the right way underlie the great products and services that I've developed."
          startingPos="right"
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
      <Button
        text="View Résumé"
        url="https://drive.google.com/file/d/1wkYO592dsnyJ2kPbKfhvp_Di63QPhHJ_/view?usp=share_link"
        startingPos="down"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </section>
  );
};

export default AboutSection;
