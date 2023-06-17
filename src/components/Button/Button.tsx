// styles
import styles from "./Button.module.scss";

// dependencies and hooks
import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// types
import { StartingPosition } from "../../types/StartingPosition";

type ButtonProps = {
  text: string;
  url?: string;
  hasResizeableParent?: boolean;
  startingPos?: StartingPosition;
  transitionDelay?: number | undefined;
};

const Button = ({
  text,
  url,
  hasResizeableParent,
  startingPos,
  transitionDelay,
}: ButtonProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { theme } = useThemeContext();

  useEffect((): (() => void) => {
    const buttonContainerRefCurrent = buttonContainerRef.current;
    let animationDonePromise: Promise<void>;
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleHover = (e: MouseEvent): void => {
      if (
        !buttonContainerRefCurrent ||
        !buttonRef.current ||
        // the following is to prevent extra triggers of the function when the cursor moves between the buttonContainer and its children. e.relatedTarget refers to the element that the cursor was hovering over before entering e.target.
        buttonContainerRefCurrent.contains(e.relatedTarget as Node)
      ) {
        return;
      }
      clearTimeout(timeoutId);

      buttonRef.current.classList.add(styles["button-animated"]);
      buttonContainerRefCurrent.classList.add(
        styles["button-container-hovered"]
      );
      animationDonePromise = new Promise((resolve) => {
        // This delay should match the duration for the clear and fillUp CSS animations
        timeoutId = setTimeout(resolve, 600);
      });
    };
    const handleUnhover = async (): Promise<void> => {
      if (!buttonContainerRefCurrent) {
        return;
      }
      await animationDonePromise;
      buttonContainerRefCurrent.classList.remove(
        styles["button-container-hovered"]
      );
    };
    buttonContainerRefCurrent?.addEventListener("mouseover", handleHover);
    buttonContainerRefCurrent?.addEventListener("mouseleave", handleUnhover);

    return (): void => {
      buttonContainerRefCurrent?.removeEventListener("mouseover", handleHover);
      buttonContainerRefCurrent?.removeEventListener(
        "mouseleave",
        handleUnhover
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (startingPos) {
        buttonContainerRef.current?.classList.add(
          styles[`button-container-before-${startingPos}`]
        );
      } else {
        buttonContainerRef.current?.classList.add(
          styles["button-container-before-stationary"]
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, isVisible]);

  useIntersectionObserver({
    ref: buttonContainerRef,
    isVisible,
    setIsVisible,

    transitionDelay: text === "Explore My Work" ? transitionDelay || 1000 : 200,
    beforeTransitionClass: startingPos
      ? styles[`button-container-before-${startingPos}`]
      : styles["button-container-before-stationary"],
    afterTransitionClass: styles["button-container-after"],
    threshold: 0,
  });

  return url ? (
    <a
      className={
        hasResizeableParent ? styles["button-link-resizeable"] : undefined
      }
      href={url}
      target={url[0] === "#" ? undefined : "_blank"}
      rel="noreferrer"
    >
      <div
        className={`${styles["button-container"]} ${
          styles[`button-container-${theme}`]
        } ${
          hasResizeableParent
            ? styles["button-container-resizeable"]
            : styles["button-container-fixed"]
        }`}
        ref={buttonContainerRef}
      >
        <span className={styles["button-text"]}>{text}</span>
        <button
          className={`${styles["button"]} ${styles[`button-${theme}`]} ${
            hasResizeableParent
              ? styles["button-resizeable"]
              : styles["button-fixed"]
          }`}
          ref={buttonRef}
        >
          <span className={styles["button-text"]}>{text}</span>
        </button>
      </div>
    </a>
  ) : (
    <div
      className={`${styles["button-container"]} ${
        styles[`button-container-${theme}`]
      } ${
        hasResizeableParent
          ? styles["button-container-resizeable"]
          : styles["button-container-fixed"]
      }`}
      ref={buttonContainerRef}
    >
      <span className={styles["button-text"]}>{text}</span>
      <button
        className={`${styles["button"]} ${styles[`button-${theme}`]} ${
          hasResizeableParent
            ? styles["button-resizeable"]
            : styles["button-fixed"]
        }`}
        ref={buttonRef}
      >
        <span className={styles["button-text"]}>{text}</span>
      </button>
    </div>
  );
};

export default Button;
