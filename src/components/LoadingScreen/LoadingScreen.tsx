// styles
import styles from "./LoadingScreen.module.scss";

// assets
import { ReactComponent as Triangle } from "../../assets/triangle.svg";

const LoadingScreen = (): JSX.Element => {
  return (
    <div className={styles["loading-screen"]}>
      <Triangle />
    </div>
  );
};

export default LoadingScreen;
