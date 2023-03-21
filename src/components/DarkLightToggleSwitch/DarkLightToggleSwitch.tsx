// styles
import styles from "./DarkLightToggleSwitch.module.scss";

// icons
import { RiSunFill } from "react-icons/ri";
import { RiMoonFill } from "react-icons/ri";

// hooks
import { useRef } from "react";
import { useThemeContext } from "../../contexts/ThemeProvider";

const DarkLightToggleSwitch = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { mode, setMode } = useThemeContext();

  const handleClick = (): void => {
    mode === "dark"
      ? buttonRef.current?.classList.remove(styles["dark-mode"])
      : buttonRef.current?.classList.add(styles["dark-mode"]);
    setMode((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
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
