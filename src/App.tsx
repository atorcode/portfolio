// styles
import styles from "./App.module.scss";

// hooks
import { useEffect } from "react";
import { useLoadingContext } from "./contexts/LoadingContext";
import { useScrollContext } from "./contexts/ScrollContext";
import { useThemeContext } from "./contexts/ThemeContext";

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
  const { theme } = useThemeContext();

  useEffect((): void => {
    // Ensure that refreshing page scrolls window to top on Firefox
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      window.addEventListener("beforeunload", () => {
        window.scrollTo(0, 0);
      });
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    clearTimeout(timeoutId);
    timeoutId = setTimeout((): void => {
      setIsLoading(false);
      // set to 5000 in production
    }, 100);
  }, []);

  useEffect((): (() => void) => {
    if (!isLoading) {
      scrollContainerRef.current?.classList.add(styles["app-scrollable"]);
    }
    return (): void => {
      scrollContainerRef.current?.classList.remove(styles["app-scrollable"]);
    };
  }, [isLoading, theme]);

  return (
    <main
      className={`${styles["app"]} ${styles[`app-${theme}`]}`}
      ref={scrollContainerRef}
    >
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
