// styles
import styles from "./Subheading.module.scss";

// hooks
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type SubheadingProps = {
  text: string;
};

const Subheading = ({ text }: SubheadingProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.classList.add(styles["subheading-before"]);
  }, []);

  useIntersectionObserver({
    ref: headingRef,
    isVisible,
    setIsVisible,
    beforeTransitionClass: styles["subheading-before"],
    afterTransitionClass: styles["subheading-after"],
  });

  return (
    <h2 className={styles["subheading"]} ref={headingRef}>
      {text}
    </h2>
  );
};

export default Subheading;
