// styles
import styles from "./App.module.scss";

// hooks
import { useScrollContext } from "./contexts/ScrollContext";

// sections
import IntroductionSection from "./sections/IntroductionSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

// components
import HeaderMenu from "./components/HeaderMenu";
import NavBullets from "./components/NavBullets";

const App = (): JSX.Element => {
  const { scrollContainerRef } = useScrollContext();

  return (
    <main className={styles["app"]} ref={scrollContainerRef}>
      <HeaderMenu />
      <IntroductionSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <NavBullets />
    </main>
  );
};

export default App;
