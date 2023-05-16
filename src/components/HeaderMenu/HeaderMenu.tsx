// styles
import styles from "./HeaderMenu.module.scss";

// components
import DarkLightToggleSwitch from "../DarkLightToggleSwitch";

type HeaderMenuProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeaderMenu = ({
  isVisible,
  setIsVisible,
}: HeaderMenuProps): JSX.Element => {
  return (
    <header className={styles["header"]}>
      <DarkLightToggleSwitch
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </header>
  );
};

export default HeaderMenu;
