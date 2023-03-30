// styles
import styles from "./DarkLightToggleSwitch.module.scss";

// icons
import { RiSunFill, RiMoonFill } from "react-icons/ri";

// hooks
import { useThemeContext } from "../../contexts/ThemeContext";

const DarkLightToggleSwitch = (): JSX.Element => {
  const { theme, toggleTheme } = useThemeContext();

  const handleClick = (): void => {
    toggleTheme();
  };

  return (
    <button
      className={`${styles["panel"]} ${styles[`panel-${theme}`]}`}
      tabIndex={-1}
      onClick={handleClick}
    >
      <RiMoonFill />
      <RiSunFill />
      <div className={styles["switch"]}></div>
    </button>
  );
};

export default DarkLightToggleSwitch;
