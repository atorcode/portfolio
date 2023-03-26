// styles
import styles from "./App.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";
import { useScrollSnap } from "./hooks/useScrollSnap";

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
  const [sectionElements, setSectionElements] = useState<
    Array<HTMLElement> | []
  >([]);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const introductionSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const linear = (t: number) => 1 - --t * t * t * t;

  const [_bind, _unbind] = useScrollSnap(
    scrollContainerRef,
    {
      // snapDestinationY should match the height of each section as specified by @mixin section-dimensions in _mixins.scss
      snapDestinationY: "100vh",
      timeout: 1,
      duration: 200,
      threshold: 0.01,
      snapStop: true,
      easing: linear,
    },
    () => console.log("scroll")
  );

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
    // Snap the scroll position to the start of the nearest section when resizing window
    const handleResize = (): void => {
      if (!scrollContainerRef.current || sectionElements.length === 0) {
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

      nearestSection.scrollIntoView({ behavior: "auto" });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
      <NavBullets />
    </main>
  );
};

export default App;
