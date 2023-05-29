// hooks
import { useEffect, useState } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";
import { useScrollContext } from "../contexts/ScrollContext";

type useIntersectionObserverProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isVisible?: boolean | undefined;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  sectionIsVisible?: boolean | undefined;
  setSectionIsVisible?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
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
  sectionIsVisible,
  setSectionIsVisible,
  transitionDelay = 100,
  beforeTransitionClass,
  afterTransitionClass,
  threshold = 0,
  disabled = false,
}: useIntersectionObserverProps): void => {
  const [transitionOccurred, setTransitionOccurred] = useState<boolean>(false);
  const { isLoading } = useLoadingContext();
  const { observeSectionsForTransitions } = useScrollContext();

  useEffect((): (() => void) | undefined => {
    const refCurrent = ref.current;
    let observer: IntersectionObserver;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (observeSectionsForTransitions) {
      observer = new IntersectionObserver(
        (entries: Array<IntersectionObserverEntry>): void => {
          entries.forEach((entry: IntersectionObserverEntry): void => {
            if (entry.isIntersecting && !isLoading) {
              if (!sectionIsVisible) {
                setTimeout((): void => {
                  if (setSectionIsVisible) {
                    setSectionIsVisible(true);
                  }
                }, 100);
              }
            }
          });
        },
        { threshold: threshold }
      );
      if (sectionIsVisible && !transitionOccurred) {
        setTransitionOccurred(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (beforeTransitionClass) {
            refCurrent?.classList.remove(beforeTransitionClass);
          }
          refCurrent?.classList.add(afterTransitionClass);
        }, transitionDelay);
      }
    } else {
      observer = new IntersectionObserver(
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
        console.log("hi");
        console.log("VIS");
        // setTransitionOccurred(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (beforeTransitionClass) {
            refCurrent?.classList.remove(beforeTransitionClass);
          }
          refCurrent?.classList.add(afterTransitionClass);
        }, transitionDelay);
      }
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
  }, [isVisible, sectionIsVisible, isLoading, observeSectionsForTransitions]);
};
