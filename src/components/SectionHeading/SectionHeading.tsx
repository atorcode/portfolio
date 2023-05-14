// styles
import styles from "./SectionHeading.module.scss";

// hooks
import { useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type SectionHeadingProps = {
  text: string;
};

const SectionHeading = ({ text }: SectionHeadingProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useIntersectionObserver({
    ref: headingRef,
    isVisible,
    setIsVisible,
    transitionStyle: styles["heading-visible"],
    threshold: 1,
  });

  return (
    <h1 className={styles["heading"]} ref={headingRef}>
      {text}
    </h1>
  );
};

export default SectionHeading;
