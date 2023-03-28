// styles
import styles from "./NavBullets.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useEffect, useRef, useState } from "react";

// components
import NavBullet from "../NavBullet/NavBullet";

type NavBulletsProps = {
  sectionElements: Array<HTMLElement>;
  currentSection: HTMLElement | undefined;
};

const NavBullets = ({
  sectionElements,
  currentSection,
}: NavBulletsProps): JSX.Element => {
  const [expandedBulletIndex, setExpandedBulletIndex] = useState<
    number | undefined
  >();
  const uuids = useRef<string[]>([]);

  useEffect(() => {
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
        {uuids.current.map((uuid: string, index): JSX.Element => {
          return (
            <li key={uuid} className={styles["bullet-container"]}>
              <NavBullet
                index={index}
                sectionElements={sectionElements}
                currentSection={currentSection}
                expandedBulletIndex={expandedBulletIndex}
                setExpandedBulletIndex={setExpandedBulletIndex}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBullets;
