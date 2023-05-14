// hooks
import { useEffect } from "react";

type useIntersectionObserverProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isVisible: boolean | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  transitionDelay?: number;
  transitionStyle: string;
  threshold?: number;
};
export const useIntersectionObserver = ({
  ref,
  isVisible,
  setIsVisible,
  transitionDelay = 100,
  transitionStyle,
  threshold = 0,
}: useIntersectionObserverProps): void => {
  useEffect((): (() => void) | undefined => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              setTimeout((): void => {
                if (setIsVisible) {
                  setIsVisible(true);
                }
              }, transitionDelay);
            }
          }
        });
      },
      { threshold: threshold }
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
