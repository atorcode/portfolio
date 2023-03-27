// dependencies and hooks
import React, { useEffect, useState } from "react";
import createScrollSnap from "scroll-snap";

type UseScrollSnapType = (
  ref: React.RefObject<HTMLElement>,
  settings: object,
  callback?: () => void
) => [() => void, () => void];

export const useScrollSnap: UseScrollSnapType = (ref, settings, callback) => {
  const [scrollBind, setScrollBind] = useState<() => void>(() => () => {});
  // React.StrictMode interferes with scrollUnbind functionality. If testing scrollUnbind is required, disable React.StrictMode in development and then enable it again afterwards.
  const [scrollUnbind, setScrollUnbind] = useState<() => void>(() => () => {});

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const { bind, unbind } = createScrollSnap(element, settings, callback);
      setScrollBind(() => bind);
      setScrollUnbind(() => unbind);
    }
  }, []);

  return [scrollBind, scrollUnbind];
};
