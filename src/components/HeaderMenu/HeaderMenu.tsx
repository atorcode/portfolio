// styles
import styles from "./HeaderMenu.module.scss";

// components
import DarkLightToggleSwitch from "../DarkLightToggleSwitch";

const HeaderMenu = (): JSX.Element => {
  return (
    <header className={styles["header"]}>
      <DarkLightToggleSwitch />
    </header>
  );
};

export default HeaderMenu;
