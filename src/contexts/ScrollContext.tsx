// dependencies and hooks
import React, { useContext, useEffect, useRef, useState } from "react";

type ScrollContextType = {
  isScrolling: boolean;
  scrollContainerRef: React.MutableRefObject<HTMLElement | null>;
  expandedBulletIndex: number;
  introductionSectionRef: React.MutableRefObject<HTMLElement | null>;
  aboutSectionRef: React.MutableRefObject<HTMLElement | null>;
  skillsSectionRef: React.MutableRefObject<HTMLElement | null>;
  projectsSectionRef: React.MutableRefObject<HTMLElement | null>;
  contactSectionRef: React.MutableRefObject<HTMLElement | null>;
  scrollToIndex: (index: number) => void;
};

type ChildrenType = {
  children: React.ReactNode;
};

const ScrollContext = React.createContext<ScrollContextType | undefined>(
  undefined
);

const ScrollProvider = ({ children }: ChildrenType) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<
    HTMLElement | undefined
  >();
  const [sectionElements, setSectionElements] = useState<Array<HTMLElement>>(
    []
  );
  const [expandedBulletIndex, setExpandedBulletIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // sections
  const introductionSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const scrollToIndex = (index: number): void => {
    if (!currentSection || !scrollContainerRef.current) {
      return;
    }
    setCurrentSection(sectionElements[index]);
    setExpandedBulletIndex(index);
    scrollContainerRef.current.scrollTo(0, sectionElements[index].offsetTop);
  };

  useEffect((): void => {
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

  useEffect((): (() => void) => {
    const scrollContainerRefCurrent = scrollContainerRef.current;
    // Set currentSection to the first section (introduction) if it hasn't been set yet
    if (!currentSection) {
      setCurrentSection(sectionElements[0]);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const updateIsScrolling = async (): Promise<void> => {
      clearTimeout(timeoutId);

      setIsScrolling(true);

      await new Promise<void>(
        (resolve) =>
          (timeoutId = setTimeout((): void => {
            setIsScrolling(false);
            resolve();
          }, 10))
      );
    };

    const updateCurrentSection = (): void => {
      if (!scrollContainerRefCurrent) {
        return;
      }
      const scrollPosition = scrollContainerRefCurrent.scrollTop;
      const distancesToSections = sectionElements.map(
        (element: HTMLElement): number =>
          Math.abs(scrollPosition - element.offsetTop)
      );
      let shortestDistanceToSection = Math.min(...distancesToSections);
      let nearestSectionIndex = distancesToSections.indexOf(
        shortestDistanceToSection
      );
      let nearestSection = sectionElements[nearestSectionIndex];
      setCurrentSection(nearestSection);
    };
    // If focusing an element causes scrolling, as in the case of tab navigation, ensure that one of the fixed scroll positions remains snapped to the scroll container. Without this function, it is possible for the container to display a position between two fixed positions.
    const scrollSnapOnFocus = (e: FocusEvent): void => {
      if (!(e.target instanceof HTMLElement) || !scrollContainerRefCurrent) {
        return;
      }
      // Valid snapTargets are the main section components: IntroductionSection, AboutSection, SkillsSection, ProjectsSection, and ContactSection
      const snapTarget = e.target.closest(
        '[data-scroll-snap-on-focus="true"]'
      ) as HTMLElement | null;
      if (!snapTarget) {
        return;
      }
      if (scrollContainerRefCurrent.scrollTop !== snapTarget.offsetTop) {
        scrollContainerRefCurrent.scrollTo(0, snapTarget.offsetTop);
      }
    };

    // Snap the scroll position to the start of the nearest section when resizing window
    const handleResize = (): void => {
      if (!scrollContainerRefCurrent || sectionElements.length === 0) {
        return;
      }
      const scrollPosition = scrollContainerRefCurrent.scrollTop;

      const distancesToSections = sectionElements.map((element) =>
        Math.abs(scrollPosition - element.offsetTop)
      );
      let shortestDistanceToSection = Math.min(...distancesToSections);
      let nearestSectionIndex = distancesToSections.indexOf(
        shortestDistanceToSection
      );
      let nearestSection = sectionElements[nearestSectionIndex];

      if (scrollContainerRefCurrent.offsetWidth > 768) {
        nearestSection.scrollIntoView({ behavior: "auto" });
      }
    };

    // attach event listeners
    scrollContainerRefCurrent?.addEventListener("scroll", updateIsScrolling);
    scrollContainerRefCurrent?.addEventListener("scroll", updateCurrentSection);
    scrollContainerRefCurrent?.addEventListener(
      "focus",
      scrollSnapOnFocus,
      true
    );
    window.addEventListener("resize", handleResize);

    // remove event listeners when unmounting
    return (): void => {
      scrollContainerRefCurrent?.removeEventListener(
        "scroll",
        updateIsScrolling
      );
      scrollContainerRefCurrent?.removeEventListener(
        "scroll",
        updateCurrentSection
      );
      scrollContainerRefCurrent?.removeEventListener(
        "focus",
        scrollSnapOnFocus,
        true
      );
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionElements]);

  useEffect((): void => {
    // expand the bullet whose index in the bullet array matches the index of currentSection in sectionElements
    setExpandedBulletIndex(
      sectionElements.findIndex(
        (section: HTMLElement): boolean => section === currentSection
      )
    );
  }, [currentSection, sectionElements]);

  return (
    <ScrollContext.Provider
      value={{
        isScrolling,
        scrollContainerRef,
        expandedBulletIndex,
        introductionSectionRef,
        aboutSectionRef,
        skillsSectionRef,
        projectsSectionRef,
        contactSectionRef,
        scrollToIndex,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

const useScrollContext = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

export { ScrollProvider, useScrollContext };
