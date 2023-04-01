// styles
import styles from "./HeaderMenu.module.scss";

// components
import DarkLightToggleSwitch from "../DarkLightToggleSwitch";

const HeaderMenu = () => {
  return (
    <header className={styles["header"]} data-scroll-snap-on-focus="true">
      <DarkLightToggleSwitch />
    </header>
  );
};

export default HeaderMenu;
