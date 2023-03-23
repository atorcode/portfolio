// styles
import styles from "./App.module.scss";

// dependencies and hooks
import React, { useRef } from "react";

// sections
import IntroductionSection from "./sections/IntroductionSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

// components
import NavBullets from "./components/NavBullets";
import DarkLightToggleSwitch from "./components/DarkLightToggleSwitch";

const App = (): JSX.Element => {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>): void => {
    console.log(e);
    console.log(aboutSectionRef);
    console.log(skillsSectionRef);
    console.log(projectsSectionRef);
    console.log(contactSectionRef);
  };

  return (
    <main className={styles["app"]} onScroll={handleScroll}>
      <IntroductionSection />
      <AboutSection ref={aboutSectionRef} />
      <SkillsSection ref={skillsSectionRef} />
      <ProjectsSection ref={projectsSectionRef} />
      <ContactSection ref={contactSectionRef} />
      <DarkLightToggleSwitch />
      <NavBullets />
    </main>
  );
};

export default App;
