// styles
import styles from "./App.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";
import { useScrollSnap } from "./hooks/useScrollSnap";

// utils
import { SCROLL_DURATION } from "./utils/constants";

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
  const [sectionElements, setSectionElements] = useState<Array<HTMLElement>>(
    []
  );
  const [currentSection, setCurrentSection] = useState<
    HTMLElement | undefined
  >();
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const currentSectionRef = useRef<HTMLElement | null>(null);

  // sections
  const introductionSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const easeOutQuart = (t: number) => 1 - --t * t * t * t;

  const [_scrollBind, _scrollUnbind] = useScrollSnap(scrollContainerRef, {
    // snapDestinationY should match the height of each section as specified by @mixin section-dimensions in _mixins.scss
    snapDestinationY: "100vh",
    timeout: 1,
    duration: SCROLL_DURATION,
    threshold: 0.01,
    easing: easeOutQuart,
  });

  useEffect(() => {
    const createNonNullRefArray = (
      ...args: Array<HTMLElement | null>
    ): Array<HTMLElement> => {
      return args.filter((arg) => arg !== null) as Array<HTMLElement>;
    };

    // Every component appended with "Section" in the render output should be included here
    setSectionElements(
      createNonNullRefArray(
        introductionSectionRef.current,
        aboutSectionRef.current,
        skillsSectionRef.current,
        projectsSectionRef.current,
        contactSectionRef.current
      )
    );
  }, []);

  useEffect(() => {
    if (!currentSection) {
      setCurrentSection(sectionElements[0]);
    }
    // Set currentSection to the first section (introduction) if it hasn't been set yet
    if (!currentSectionRef.current) {
      currentSectionRef.current = sectionElements[0];
    }
    // Snap the scroll position to the start of the current section when resizing window
    const handleResize = (): void => {
      if (
        !scrollContainerRef.current ||
        sectionElements.length === 0 ||
        !currentSectionRef.current
      ) {
        return;
      }
    };

    const updateCurrentSection = (): void => {
      if (!scrollContainerRef.current) {
        return;
      }
      const scrollPosition = scrollContainerRef.current.scrollTop;
      const distancesToSections = sectionElements.map((element) =>
        Math.abs(scrollPosition - element.offsetTop)
      );
      let shortestDistanceToSection = Math.min(...distancesToSections);
      let nearestSectionIndex = distancesToSections.indexOf(
        shortestDistanceToSection
      );
      let nearestSection = sectionElements[nearestSectionIndex];
      setCurrentSection(nearestSection);
    };

    window.addEventListener("resize", handleResize);
    scrollContainerRef.current?.addEventListener(
      "scroll",
      updateCurrentSection
    );
    return () => {
      window.removeEventListener("resize", handleResize);
      scrollContainerRef.current?.removeEventListener(
        "scroll",
        updateCurrentSection
      );
    };
  }, [sectionElements]);

  return (
    <main className={styles["app"]} ref={scrollContainerRef}>
      <HeaderMenu />
      <IntroductionSection ref={introductionSectionRef} />
      <AboutSection ref={aboutSectionRef} />
      <SkillsSection ref={skillsSectionRef} />
      <ProjectsSection ref={projectsSectionRef} />
      <ContactSection ref={contactSectionRef} />
      <NavBullets
        sectionElements={sectionElements}
        currentSection={currentSection}
      />
    </main>
  );
};

export default App;
