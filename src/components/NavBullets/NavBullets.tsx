// styles
import styles from "./NavBullets.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// components
import NavBullet from "../NavBullet/NavBullet";

type NavBulletsProps = {
  sectionElements: Array<HTMLElement> | [];
  currentSection: HTMLElement | undefined;
};

const NavBullets = ({
  sectionElements,
  currentSection,
}: NavBulletsProps): JSX.Element => {
  const uuids: string[] = [];
  for (let i = 0; i < 5; i++) {
    uuids.push(uuidv4());
  }

  return (
    <nav className={styles["nav"]}>
      <ul className={styles["bullets"]}>
        {uuids.map((uuid: string, index): JSX.Element => {
          return (
            <li key={uuid} className={styles["bullet-container"]}>
              <NavBullet
                sectionElements={sectionElements}
                currentSection={currentSection}
                index={index}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBullets;
