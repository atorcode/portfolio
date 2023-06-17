// hooks
import { useEffect } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";

type useIntersectionObserverProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isVisible?: boolean | undefined;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  transitionDelay?: number;
  beforeTransitionClass?: string;
  afterTransitionClass: string;
  threshold?: number;
  disabled?: boolean;
};

// Unlike with useIntersectionObserverOnChildren, the transitionClasses are passed in and handled inside the hook. This is fairly simple since we are only transitioning one component at a time.
export const useIntersectionObserver = ({
  ref,
  isVisible,
  setIsVisible,
  transitionDelay = 100,
  beforeTransitionClass,
  afterTransitionClass,
  threshold = 0,
  disabled = false,
}: useIntersectionObserverProps): void => {
  const { isLoading } = useLoadingContext();

  useEffect((): (() => void) | undefined => {
    const refCurrent = ref.current;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    let observer = new IntersectionObserver(
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
    if (isVisible) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (beforeTransitionClass) {
          refCurrent?.classList.remove(beforeTransitionClass);
        }
        refCurrent?.classList.add(afterTransitionClass);
      }, transitionDelay);
    }

    if (observer && refCurrent) {
      observer.observe(refCurrent);

      if (disabled) {
        observer.unobserve(refCurrent);
      }
    }

    return (): void => {
      clearTimeout(timeoutId);
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isLoading]);
};
