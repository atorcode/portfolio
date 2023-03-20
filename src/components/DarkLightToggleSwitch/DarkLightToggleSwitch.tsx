// styles
import styles from "./DarkLightToggleSwitch.module.scss";

// icons
import { RiSunFill } from "react-icons/ri";
import { RiMoonFill } from "react-icons/ri";

// hooks
import { useRef, useState } from "react";

const DarkLightToggleSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <button
      className={styles["panel"]}
      ref={buttonRef}
      onClick={() => {
        isDark
          ? buttonRef.current?.classList.remove(styles["dark-mode"])
          : buttonRef.current?.classList.add(styles["dark-mode"]);
        setIsDark((prev) => !prev);
      }}
    >
      <RiMoonFill />
      <RiSunFill />
      <div className={styles["switch"]}></div>
    </button>
  );
};

export default DarkLightToggleSwitch;
