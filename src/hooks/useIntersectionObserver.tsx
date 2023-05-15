// hooks
import { useEffect } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";

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
    if (isVisible) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        ref.current?.classList.add(transitionStyle);
      }, transitionDelay);
    } else {
      ref.current?.classList.remove(transitionStyle);
    }

    return (): void => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible, isLoading]);
};
