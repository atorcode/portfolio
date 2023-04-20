// styles
import styles from "./Button.module.scss";

// hooks
import { useEffect, useRef } from "react";

type ButtonProps = {
  text: string;
  url?: string;
  hasResizeableParent?: boolean;
};

const Button = ({
  text,
  url,
  hasResizeableParent,
}: ButtonProps): JSX.Element => {
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect((): (() => void) => {
    let animationDonePromise: Promise<void>;
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleHover = (e: MouseEvent): void => {
      if (
        !buttonContainerRef.current ||
        // the following is to prevent extra triggers of the function when the cursor moves between the buttonContainer and its children. e.relatedTarget refers to the element that the cursor was hovering over before entering e.target.
        buttonContainerRef.current.contains(e.relatedTarget as Node)
      ) {
        return;
      }
      clearTimeout(timeoutId);

      buttonContainerRef.current.classList.add(
        `${styles["button-container-hovered"]}`
      );
      animationDonePromise = new Promise((resolve) => {
        // This delay should match the duration for the clear and fillUp CSS animations
        timeoutId = setTimeout(resolve, 600);
      });
    };
    const handleUnhover = async (): Promise<void> => {
      if (!buttonContainerRef.current) {
        return;
      }
      await animationDonePromise;
      buttonContainerRef.current.classList.remove(
        `${styles["button-container-hovered"]}`
      );
    };
    buttonContainerRef.current?.addEventListener("mouseover", handleHover);
    buttonContainerRef.current?.addEventListener("mouseleave", handleUnhover);
    return (): void => {
      buttonContainerRef.current?.removeEventListener("mouseover", handleHover);
      buttonContainerRef.current?.removeEventListener(
        "mouseleave",
        handleUnhover
      );
    };
  }, []);

  return url ? (
    <a
      className={
        hasResizeableParent ? styles["button-link-resizeable"] : undefined
      }
      href={url}
      target={url[0] === "#" ? undefined : "_blank"}
    >
      <div
        className={`${styles["button-container"]} ${
          hasResizeableParent
            ? styles["button-container-resizeable"]
            : styles["button-container-fixed"]
        }`}
        ref={buttonContainerRef}
      >
        <span className={styles["container-text"]}>{text}</span>
        <button
          className={`${styles["button"]} ${
            hasResizeableParent
              ? styles["button-resizeable"]
              : styles["button-fixed"]
          }`}
        >
          {text}
        </button>
      </div>
    </a>
  ) : (
    <div
      className={`${styles["button-container"]} ${
        hasResizeableParent
          ? styles["button-container-resizeable"]
          : styles["button-container-fixed"]
      }`}
      ref={buttonContainerRef}
    >
      <span className={styles["container-text"]}>{text}</span>
      <button
        className={`${styles["button"]} ${
          hasResizeableParent
            ? styles["button-resizeable"]
            : styles["button-fixed"]
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
