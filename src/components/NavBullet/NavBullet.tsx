// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";

type NavBulletProps = {
  sectionElements: Array<HTMLElement> | [];
  currentSection: HTMLElement | undefined;
  index: number;
};

const NavBullet = ({
  sectionElements,
  currentSection,
  index,
}: NavBulletProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const indexOfBulletToExpand = sectionElements.findIndex(
      (section) => section === currentSection
    );
    if (index === indexOfBulletToExpand) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [currentSection]);

  const handleClick = (): void => {
    isExpanded
      ? buttonRef.current?.classList.remove(styles["bullet-expanded"])
      : buttonRef.current?.classList.add(styles["bullet-expanded"]);
    setIsExpanded((prev: boolean): boolean => !prev);
  };

  return (
    <button
      className={
        isExpanded
          ? `${styles["bullet-expanded"]} ${styles["bullet"]}`
          : styles["bullet"]
      }
      ref={buttonRef}
      onClick={handleClick}
    ></button>
  );
};

export default NavBullet;
