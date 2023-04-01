// dependencies and hooks
import React, { useContext, useEffect, useRef, useState } from "react";
import { useScrollSnap } from "../hooks/useScrollSnap";

// utils
import { SCROLL_DURATION } from "../utils/constants";

type ScrollContextType = {
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
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [currentSection, setCurrentSection] = useState<
    HTMLElement | undefined
  >();
  const [sectionElements, setSectionElements] = useState<Array<HTMLElement>>(
    []
  );
  const [expandedBulletIndex, setExpandedBulletIndex] = useState<number>(0);

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

  const scrollToIndex = (index: number): void => {
    if (!currentSection || !scrollContainerRef.current) {
      return;
    }
    setCurrentSection(sectionElements[index]);
    setExpandedBulletIndex(index);
    scrollContainerRef.current.scrollTo(0, sectionElements[index].offsetTop);
  };

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
    // Set currentSection to the first section (introduction) if it hasn't been set yet
    if (!currentSection) {
      setCurrentSection(sectionElements[0]);
    }
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

    // If focusing an element causes scrolling, as in the case of tab navigation, ensure that one of the fixed scroll positions remains snapped to the scroll container. Without this function, it is possible for the container to display a position between two fixed positions.
    const scrollSnapOnFocus = (e: FocusEvent): void => {
      if (!(e.target instanceof HTMLElement) || !scrollContainerRef.current) {
        return;
      }
      // Valid snapTargets are HeaderMenu and the main section components: IntroductionSection, AboutSection, SkillsSection, ProjectsSection, and ContactSection
      const snapTarget = e.target.closest(
        '[data-scroll-snap-on-focus="true"]'
      ) as HTMLElement | null;
      if (!snapTarget) {
        console.error(
          `The snapTarget of the focused element ${e.target.outerHTML} could not be found. In order for scrollOnTabNavigation to work, snapTarget must be a valid HTMLElement.`
        );
        return;
      }
      if (scrollContainerRef.current.scrollTop !== snapTarget.offsetTop) {
        scrollContainerRef.current.scrollTo(0, snapTarget.offsetTop);
      }
    };

    scrollContainerRef.current?.addEventListener(
      "scroll",
      updateCurrentSection
    );
    scrollContainerRef.current?.addEventListener(
      "focus",
      scrollSnapOnFocus,
      true
    );
    return () => {
      scrollContainerRef.current?.removeEventListener(
        "scroll",
        updateCurrentSection
      );
      scrollContainerRef.current?.removeEventListener(
        "focus",
        scrollSnapOnFocus,
        true
      );
    };
  }, [sectionElements]);

  useEffect(() => {
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
