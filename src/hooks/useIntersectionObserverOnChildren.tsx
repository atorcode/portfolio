// hooks
import { useEffect } from "react";
import { useLoadingContext } from "../contexts/LoadingContext";

type useIntersectionObserverOnChildrenProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  visibilityOfChildren: Array<boolean>;
  setVisibilityOfChildren: React.Dispatch<React.SetStateAction<Array<boolean>>>;
  threshold?: number;
};

// Unlike with useIntersectionObserver, the transitionClasses are handled outside the hook. This is due to the fact that handling them inside the hook would require parents to maintain references of their children.
export const useIntersectionObserverOnChildren = ({
  ref,
  visibilityOfChildren,
  setVisibilityOfChildren,
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
                  }, 300 * index);
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
    if (ref.current) {
      observer.observe(ref.current);
    }

    return (): void => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [visibilityOfChildren, isLoading]);
};
