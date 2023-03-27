// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useEffect, useRef } from "react";

type NavBulletProps = {
  index: number;
  sectionElements: Array<HTMLElement>;
  currentSection: HTMLElement | undefined;
  expandedBulletIndex: number | undefined;
  setExpandedBulletIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

const NavBullet = ({
  index,
  sectionElements,
  currentSection,
  expandedBulletIndex,
  setExpandedBulletIndex,
}: NavBulletProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // expand the bullet whose index in the bullet array matches the index of currentSection in sectionElements
    setExpandedBulletIndex(
      sectionElements.findIndex((section) => section === currentSection)
    );
  }, [currentSection]);

  const handleClick = (): void => {
    setExpandedBulletIndex(index);
  };

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
