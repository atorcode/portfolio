// styles
import styles from "./NavBullet.module.scss";

// hooks
import { useScrollContext } from "../../contexts/ScrollContext";

type NavBulletProps = {
  index: number;
};

const NavBullet = ({ index }: NavBulletProps) => {
  const { expandedBulletIndex, scrollToIndex } = useScrollContext();

  return (
    <button
      className={
        index === expandedBulletIndex
          ? `${styles["bullet-expanded"]} ${styles["bullet"]}`
          : styles["bullet"]
      }
      tabIndex={-1}
      onClick={(): void => scrollToIndex(index)}
    ></button>
  );
};

export default NavBullet;
