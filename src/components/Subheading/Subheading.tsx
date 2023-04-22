// styles
import styles from "./Subheading.module.scss";

type SubheadingProps = {
  text: string;
};
const Subheading = ({ text }: SubheadingProps): JSX.Element => {
  return <h2 className={styles["subheading"]}>{text}</h2>;
};

export default Subheading;
