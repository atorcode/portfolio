// styles
import styles from "./NavBullets.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useEffect, useRef } from "react";

// components
import NavBullet from "../NavBullet";

const NavBullets = (): JSX.Element => {
  const uuids = useRef<Array<string>>([]);

  useEffect((): void => {
    // This length check is to prevent React.StrictMode from populating the uuids array twice
    if (uuids.current.length === 0) {
      for (let i = 0; i < 5; i++) {
        uuids.current.push(uuidv4());
      }
    }
  }, []);

  return (
    <nav className={styles["nav"]}>
      <ul className={styles["bullets"]}>
        {uuids.current.map((uuid: string, index: number): JSX.Element => {
          return (
            <li key={uuid} className={styles["bullet-container"]}>
              <NavBullet index={index} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBullets;
