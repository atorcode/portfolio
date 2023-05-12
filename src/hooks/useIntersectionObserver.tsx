// hooks
import { useEffect } from "react";

type useIntersectionObserverProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  transitionStyle: string;
};
export const useIntersectionObserver = ({
  ref,
  isVisible,
  setIsVisible,
  transitionStyle,
}: useIntersectionObserverProps): void => {
  useEffect((): (() => void) => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              setTimeout((): void => {
                setIsVisible(true);
              }, 100);
            }
          }
        });
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    if (isVisible) {
      ref.current?.classList.add(transitionStyle);
    } else {
      ref.current?.classList.remove(transitionStyle);
    }

    return (): void => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);
};
