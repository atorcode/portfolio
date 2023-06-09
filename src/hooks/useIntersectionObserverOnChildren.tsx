// hooks
import { useEffect } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";

type useIntersectionObserverOnChildrenProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  visibilityOfChildren: Array<boolean>;
  setVisibilityOfChildren: React.Dispatch<React.SetStateAction<Array<boolean>>>;
  disabled?: boolean;
  toggleDelay?: number;
  intervalMultiplier?: number;
  threshold?: number;
};

// Unlike with useIntersectionObserver, the transitionClasses are handled outside the hook. This is due to the fact that handling them inside the hook would require parents to maintain references of their children.
export const useIntersectionObserverOnChildren = ({
  ref,
  visibilityOfChildren,
  setVisibilityOfChildren,
  disabled = false,
  toggleDelay = 0,
  intervalMultiplier = 300,
  threshold = 0,
}: useIntersectionObserverOnChildrenProps): void => {
  const { isLoading } = useLoadingContext();

  useEffect((): (() => void) | undefined => {
    const observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>): void => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
          if (entry.isIntersecting) {
            visibilityOfChildren.forEach(
              (isVisible: boolean, index: number): void => {
                if (!isVisible) {
                  setTimeout((): void => {
                    setVisibilityOfChildren(
                      (prev: Array<boolean>): Array<boolean> => {
                        const result = [...prev];
                        result[index] = true;
                        return result;
                      }
                    );
                  }, intervalMultiplier * index + toggleDelay);
                }
              }
            );
          }
        });
      },
      {
        threshold: threshold,
      }
    );

    const refCurrent = ref.current;

    if (refCurrent) {
      observer.observe(refCurrent);

      if (disabled) {
        observer.unobserve(refCurrent);
      }
    }

    return (): void => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibilityOfChildren, isLoading, disabled]);
};
