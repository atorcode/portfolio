// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useRef, useState } from "react";

const NavBullet = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (): void => {
    isExpanded
      ? buttonRef.current?.classList.remove(styles["bullet-expanded"])
      : buttonRef.current?.classList.add(styles["bullet-expanded"]);
    setIsExpanded((prev: boolean): boolean => !prev);
  };

  return (
    <button
      className={styles["bullet"]}
      ref={buttonRef}
      onClick={handleClick}
    ></button>
  );
};

export default NavBullet;
