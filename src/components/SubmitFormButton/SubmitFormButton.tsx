// styles
import styles from "./SubmitFormButton.module.scss";

const SubmitFormButton = (): JSX.Element => {
  return (
    <div className={styles["button-container"]}>
      <span className={styles["container-text"]}>Submit</span>
      <button className={styles["button"]}>Submit</button>
    </div>
  );
};

export default SubmitFormButton;
