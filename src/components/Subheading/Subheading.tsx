// styles
import styles from "./Subheading.module.scss";

// hooks
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

type SubheadingProps = {
  text: string;
  sectionIsVisible: boolean;
  setSectionIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Subheading = ({
  text,
  sectionIsVisible,
  setSectionIsVisible,
}: SubheadingProps): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.classList.add(styles["subheading-before"]);
  }, []);

  useIntersectionObserver({
    ref: headingRef,
    isVisible: sectionIsVisible,
    setIsVisible: setSectionIsVisible,
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
