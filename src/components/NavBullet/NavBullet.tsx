// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useEffect, useRef } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";

type NavBulletProps = {
  index: number;
};

const NavBullet = ({ index }: NavBulletProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { expandedBulletIndex, scrollToIndex } = useScrollContext();
  const { theme } = useThemeContext();

  useEffect((): (() => void) => {
    if (index === expandedBulletIndex) {
      buttonRef.current?.classList.add(
        `${styles["bullet-expanded-transition"]}`
      );
    } else {
      buttonRef.current?.classList.add(`${styles["bullet-transition"]}`);
    }

    return (): void => {
      buttonRef.current?.classList.remove(
        `${styles["bullet-expanded-transition"]}`
      );
      buttonRef.current?.classList.remove(`${styles["bullet-transition"]}`);
    };
  }, [theme]);

  return (
    <button
      className={`${styles[`bullet-${theme}`]}
        ${
          index === expandedBulletIndex
            ? `${styles["bullet"]} ${styles["bullet-expanded"]} ${
                styles[`bullet-expanded-${theme}`]
              }`
            : `${styles["bullet"]}`
        }`}
      tabIndex={-1}
      ref={buttonRef}
      onClick={(): void => scrollToIndex(index)}
    ></button>
  );
};

export default NavBullet;
