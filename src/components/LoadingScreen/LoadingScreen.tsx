// styles
import styles from "./LoadingScreen.module.scss";
import "./triangle.scss";

// assets
import { ReactComponent as Triangle } from "../../assets/triangle.svg";

// hooks
import { useEffect, useRef } from "react";

const LoadingScreen = (): JSX.Element => {
  useEffect((): (() => void) => {
    triangleRef.current?.classList.add("loading-triangle-svg-animated");

    return (): void => {
      triangleRef.current?.classList.remove("loading-triangle-svg-animated");
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
