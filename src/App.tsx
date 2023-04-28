// styles
import styles from "./App.module.scss";

// hooks
import { useEffect } from "react";
import { useLoadingContext } from "./contexts/LoadingContext";
import { useScrollContext } from "./contexts/ScrollContext";

// sections
import IntroductionSection from "./sections/IntroductionSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

// components
import LoadingScreen from "./components/LoadingScreen";
import HeaderMenu from "./components/HeaderMenu";
import NavBullets from "./components/NavBullets";
import Notifications from "./components/Notifications";

const App = (): JSX.Element => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const { scrollContainerRef } = useScrollContext();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main className={styles["app"]} ref={scrollContainerRef}>
      {isLoading && <LoadingScreen />}
      <HeaderMenu />
      <Notifications />
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
