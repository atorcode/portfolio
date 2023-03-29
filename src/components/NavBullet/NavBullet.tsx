// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useEffect, useRef } from "react";

type NavBulletProps = {
  index: number;
  sectionElements: Array<HTMLElement>;
  currentSection: HTMLElement | undefined;
  setCurrentSection: React.Dispatch<
    React.SetStateAction<HTMLElement | undefined>
  >;
  expandedBulletIndex: number;
  setExpandedBulletIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollContainerRef: React.MutableRefObject<HTMLElement | null>;
};

const NavBullet = ({
  index,
  sectionElements,
  currentSection,
  setCurrentSection,
  expandedBulletIndex,
  setExpandedBulletIndex,
  scrollContainerRef,
}: NavBulletProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // expand the bullet whose index in the bullet array matches the index of currentSection in sectionElements
    setExpandedBulletIndex(
      sectionElements.findIndex(
        (section: HTMLElement): boolean => section === currentSection
      )
    );
  }, [currentSection]);

  const handleClick = (): void => {
    if (!currentSection || !scrollContainerRef.current) {
      return;
    }
    setCurrentSection(sectionElements[index]);
    setExpandedBulletIndex(index);
    scrollContainerRef.current.scrollTo(0, sectionElements[index].offsetTop);
  };

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);

  return (
    <button
      className={
        index === expandedBulletIndex
          ? `${styles["bullet-expanded"]} ${styles["bullet"]}`
          : styles["bullet"]
      }
      ref={buttonRef}
      onClick={handleClick}
    ></button>
  );
};

export default NavBullet;
