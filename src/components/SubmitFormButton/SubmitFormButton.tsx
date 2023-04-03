// styles
import styles from "./SubmitFormButton.module.scss";

// hooks
import { useEffect, useRef } from "react";

const SubmitFormButton = (): JSX.Element => {
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
    return () => {
      buttonContainerRef.current?.removeEventListener("mouseover", handleHover);
      buttonContainerRef.current?.removeEventListener(
        "mouseleave",
        handleUnhover
      );
    };
  }, []);

  return (
    <div className={styles["button-container"]} ref={buttonContainerRef}>
      <span className={styles["container-text"]}>Submit</span>
      <button className={styles["button"]}>Submit</button>
    </div>
  );
};

export default SubmitFormButton;
