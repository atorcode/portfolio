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
  return (
    <>
      <IntroductionSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <NavBullets />
      <DarkLightToggleSwitch />
    </>
  );
};

export default App;
