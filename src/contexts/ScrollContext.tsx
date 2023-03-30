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
    scrollContainerRef.current?.addEventListener(
      "scroll",
      updateCurrentSection
    );
    return () => {
      scrollContainerRef.current?.removeEventListener(
        "scroll",
        updateCurrentSection
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