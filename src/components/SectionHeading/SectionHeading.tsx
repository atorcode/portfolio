// styles
import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = {
  text: string;
};

const SectionHeading = ({ text }: SectionHeadingProps): JSX.Element => {
  return <h1 className={styles["heading"]}>{text}</h1>;
};

export default SectionHeading;
