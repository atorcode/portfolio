// styles
import styles from "./Mask.module.scss";

// hooks
import { useRef, useState } from "react";
import { useLoadingContext } from "../../contexts/LoadingContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type MaskProps = {
  unveilDirection: "up" | "down";
};

const Mask = ({ unveilDirection }: MaskProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useThemeContext();
  const { isLoading } = useLoadingContext();

  useIntersectionObserver({
    ref: maskRef,
    isVisible,
    setIsVisible,

    transitionDelay: 0,
    afterTransitionClass: styles["mask-hidden"],
    threshold: 0.3,
  });

  return (
    <div
      className={`${styles["mask"]} ${styles[`mask-${theme}`]} ${
        styles[`mask-unveil-${unveilDirection}`]
      }
        ${
          (!isLoading && unveilDirection === "up") ||
          (!isLoading && isVisible && unveilDirection === "down")
            ? styles["mask-hidden"]
            : ""
        }`}
      ref={maskRef}
    ></div>
  );
};

export default Mask;
