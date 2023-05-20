// styles
import styles from "./NavBullets.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserverOnChildren } from "../../hooks/useIntersectionObserverOnChildren";

// components
import NavBullet from "../NavBullet";

// utils
import {
  LOADING_SCREEN_DURATION,
  NUM_SECTIONS,
  BULLET_ENTRANCE_TRANSITION_DELAY,
  BULLET_ENTRANCE_TRANSITION_INTERVAL,
} from "../../utils/constants";

const NavBullets = (): JSX.Element => {
  const [visibilityOfBullets, setVisibilityOfBullets] = useState<
    Array<boolean>
  >(Array.from({ length: NUM_SECTIONS }, () => false));
  const bulletsRef = useRef<HTMLUListElement | null>(null);
  const uuids = useRef<Array<string>>([]);

  useEffect((): void => {
    // This length check is to prevent React.StrictMode from populating the uuids array twice
    if (uuids.current.length === 0) {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        uuids.current.push(uuidv4());
      }
    }
    console.log(visibilityOfBullets);
  }, []);

  useIntersectionObserverOnChildren({
    ref: bulletsRef,
    visibilityOfChildren: visibilityOfBullets,
    setVisibilityOfChildren: setVisibilityOfBullets,
    toggleDelay: LOADING_SCREEN_DURATION + BULLET_ENTRANCE_TRANSITION_DELAY,
    intervalMultiplier: BULLET_ENTRANCE_TRANSITION_INTERVAL,
  });

  return (
    <nav className={styles["nav"]}>
      <ul className={styles["bullets"]} ref={bulletsRef}>
        {uuids.current.map((uuid: string, index: number): JSX.Element => {
          return (
            <li key={uuid} className={styles["bullet-container"]}>
              <NavBullet index={index} isVisible={visibilityOfBullets[index]} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBullets;
