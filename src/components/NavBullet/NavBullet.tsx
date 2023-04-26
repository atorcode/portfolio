// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";

type NavBulletProps = {
  index: number;
};

const NavBullet = ({ index }: NavBulletProps) => {
  const { expandedBulletIndex, scrollToIndex } = useScrollContext();
  const { theme } = useThemeContext();

  return (
    <button
      className={`${styles[`bullet-${theme}`]}
        ${
          index === expandedBulletIndex
            ? `${styles["bullet-expanded"]} ${styles["bullet"]}`
            : styles["bullet"]
        }`}
      tabIndex={-1}
      onClick={(): void => scrollToIndex(index)}
    ></button>
  );
};

export default NavBullet;
