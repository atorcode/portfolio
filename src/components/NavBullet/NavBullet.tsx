// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";
import { useLoadingContext } from "../../contexts/LoadingContext";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";

// utils
import {
  LOADING_SCREEN_DURATION,
  NUM_SECTIONS,
  BULLET_ENTRANCE_TRANSITION_DELAY,
  BULLET_ENTRANCE_TRANSITION_INTERVAL,
  TRANSITION_ASSIGNMENT_BUFFER,
} from "../../utils/constants";

type NavBulletProps = {
  index: number;
  isVisible: boolean;
};

const NavBullet = ({ index, isVisible }: NavBulletProps) => {
  const [isFirstColorTransitionAfterLoad, setIsFirstColorTransitionAfterLoad] =
    useState<boolean>(true);
  const [beforeClassesAdded, setBeforeClassesAdded] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { isLoading } = useLoadingContext();
  const { expandedBulletIndex, scrollToIndex } = useScrollContext();
  const { theme } = useThemeContext();

  useEffect((): (() => void) => {
    const buttonRefCurrent = buttonRef.current;
    if (isFirstColorTransitionAfterLoad) {
      setTimeout(() => {
        if (index === expandedBulletIndex) {
          buttonRefCurrent?.classList.add(
            `${styles["bullet-expanded-transition"]}`
          );
        } else {
          buttonRefCurrent?.classList.add(`${styles["bullet-transition"]}`);
        }
        setIsFirstColorTransitionAfterLoad(false);
        // The hard-coded value ought to match the transition duration specified in NavBullet.module.scss
      }, LOADING_SCREEN_DURATION + BULLET_ENTRANCE_TRANSITION_DELAY + (NUM_SECTIONS - 1) * BULLET_ENTRANCE_TRANSITION_INTERVAL + 300 + TRANSITION_ASSIGNMENT_BUFFER);
    } else {
      if (index === expandedBulletIndex) {
        buttonRefCurrent?.classList.add(
          `${styles["bullet-expanded-transition"]}`
        );
      } else {
        buttonRefCurrent?.classList.add(`${styles["bullet-transition"]}`);
      }
    }
    return (): void => {
      buttonRefCurrent?.classList.remove(
        `${styles["bullet-expanded-transition"]}`
      );
      buttonRefCurrent?.classList.remove(`${styles["bullet-transition"]}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, isLoading]);

  useEffect((): void => {
    if (!beforeClassesAdded) {
      if (index === expandedBulletIndex) {
        buttonRef.current?.classList.add(styles["bullet-expanded-before"]);
      } else {
        buttonRef.current?.classList.add(styles["bullet-before"]);
      }
      setTimeout(() => {
        setBeforeClassesAdded(true);
      }, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeClassesAdded, expandedBulletIndex]);

  useEffect((): void => {
    if (!isLoading && isVisible) {
      if (index === expandedBulletIndex) {
        buttonRef.current?.classList.remove(styles["bullet-expanded-before"]);
      }
      buttonRef.current?.classList.remove(styles["bullet-before"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isVisible]);

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
