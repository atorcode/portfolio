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
import NavBullets from "./components/NavBullets";
import Notifications from "./components/Notifications";

// utils
import { LOADING_SCREEN_DURATION } from "./utils/constants";

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
    }, LOADING_SCREEN_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): (() => void) => {
    const scrollContainerRefCurrent = scrollContainerRef.current;
    if (!isLoading) {
      scrollContainerRefCurrent?.classList.add(styles["app-scrollable"]);
    }
    return (): void => {
      scrollContainerRefCurrent?.classList.remove(styles["app-scrollable"]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, theme]);

  return (
    <main
      className={`${styles["app"]} ${styles[`app-${theme}`]}`}
      ref={scrollContainerRef}
    >
      {isLoading && <LoadingScreen />}
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
