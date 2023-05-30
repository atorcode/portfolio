// styles
import styles from "./DarkLightToggleSwitch.module.scss";

// icons
import { RiSunFill, RiMoonFill } from "react-icons/ri";

// hooks
import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useLoadingContext } from "../../contexts/LoadingContext";

const DarkLightToggleSwitch = (): JSX.Element => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const switchRef = useRef<HTMLDivElement | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const { theme, toggleTheme } = useThemeContext();
  const { isLoading } = useLoadingContext();

  useEffect((): (() => void) => {
    buttonRef.current?.classList.add(styles["panel-before"]);

    const handleResize = (): void => {
      clearTimeout(resizeTimeoutRef.current);
      setIsResizing(true);
      resizeTimeoutRef.current = setTimeout(() => {
        setIsResizing(false);
      }, 50);
    };

    window.addEventListener("resize", handleResize);

    buttonRef.current?.classList.add(styles["panel-before"]);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect((): void => {
    if (!isLoading) {
      setTimeout((): void => {
        buttonRef.current?.classList.add(styles["panel-after"]);
      }, 500);
    }
  }, [isLoading]);

  useEffect((): void => {
    if (isResizing) {
      buttonRef.current?.classList.add(styles["no-transition"]);
      switchRef.current?.classList.add(styles["no-transition"]);
    } else {
      buttonRef.current?.classList.remove(styles["no-transition"]);
      switchRef.current?.classList.remove(styles["no-transition"]);
    }
  }, [isResizing]);

  const handleClick = (): void => {
    toggleTheme();
  };

  return (
    <button
      className={`${styles["panel"]} ${styles[`panel-${theme}`]}`}
      tabIndex={-1}
      ref={buttonRef}
      onClick={handleClick}
    >
      <RiMoonFill />
      <RiSunFill />
      <div className={styles["switch"]} ref={switchRef}></div>
    </button>
  );
};

export default DarkLightToggleSwitch;
