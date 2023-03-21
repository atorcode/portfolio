// styles
import styles from "./DarkLightToggleSwitch.module.scss";

// icons
import { RiSunFill } from "react-icons/ri";
import { RiMoonFill } from "react-icons/ri";

// hooks
import { useRef } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

const DarkLightToggleSwitch = (): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { theme, toggleTheme } = useThemeContext();

  const handleClick = (): void => {
    theme === "dark"
      ? buttonRef.current?.classList.remove(styles["dark-mode"])
      : buttonRef.current?.classList.add(styles["dark-mode"]);
    toggleTheme();
  };

  return (
    <button className={styles["panel"]} ref={buttonRef} onClick={handleClick}>
      <RiMoonFill />
      <RiSunFill />
      <div className={styles["switch"]}></div>
    </button>
  );
};

export default DarkLightToggleSwitch;
