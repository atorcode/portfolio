// hooks
import { useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";

type useIntersectionObserverProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isVisible: boolean | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  transitionDelay?: number;
  beforeTransitionClass: string;
  afterTransitionClass: string;
  threshold?: number;
};
export const useIntersectionObserver = ({
  ref,
  isVisible,
  setIsVisible,
  transitionDelay = 100,
  beforeTransitionClass,
  afterTransitionClass,
  threshold = 0,
}: useIntersectionObserverProps): void => {
  const [transitionOccurred, setTransitionOccurred] = useState<boolean>(false);
  const { isLoading } = useLoadingContext();

  useEffect((): (() => void) | undefined => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting && !isLoading) {
            if (!isVisible) {
              setTimeout((): void => {
                if (setIsVisible) {
                  setIsVisible(true);
                }
              }, 100);
            }
          }
        });
      },
      { threshold: threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (isVisible && !transitionOccurred) {
      setTransitionOccurred(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ref.current?.classList.remove(beforeTransitionClass);
        ref.current?.classList.add(afterTransitionClass);
      }, transitionDelay);
    }

    return (): void => {
      clearTimeout(timeoutId);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible, isLoading]);
};
