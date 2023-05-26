// styles
import styles from "./LoadingScreen.module.scss";
import "./triangle.scss";

// assets
import { ReactComponent as Triangle } from "../../assets/triangle.svg";

// hooks
import { useEffect, useRef } from "react";

const LoadingScreen = (): JSX.Element => {
  useEffect((): (() => void) => {
    const triangleRefCurrent = triangleRef.current;
    triangleRefCurrent?.classList.add(
      "loading-triangle-svg-colored",
      "loading-triangle-svg-animated"
    );

    return (): void => {
      triangleRefCurrent?.classList.remove(
        "loading-triangle-svg-colored",
        "loading-triangle-svg-animated"
      );
    };
  }, []);

  const triangleRef = useRef<SVGSVGElement | null>(null);
  return (
    <div className={styles["loading-screen"]}>
      <Triangle className="loading-triangle-svg" ref={triangleRef} />
      <h1 className={styles["logo-letter"]}>A</h1>
    </div>
  );
};

export default LoadingScreen;
