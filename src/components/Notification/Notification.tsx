// styles
import styles from "./Notification.module.scss";

// dependencies
import { CSSTransition } from "react-transition-group";

// hooks
import { useEffect, useRef, useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";

type NotificationProps = {
  text: string;
};

const Notification = ({ text }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  //@ts-ignore
  const { triggerExitTransition, removeNotification } =
    useNotificationsContext();

  useEffect(() => {
    setIsVisible(true);

    let exitTransitionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    // const unmountNotification = async () => {
    //   triggerExitTransition(exitTransitionTimeoutId, setIsVisible);
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   removeNotification();
    // };

    triggerExitTransition(exitTransitionTimeoutId, setIsVisible, 500).then(
      () => {
        removeNotification();
      }
    );

    // unmountNotification();

    return () => {
      clearTimeout(exitTransitionTimeoutId);
    };
  }, []);

  return (
    <CSSTransition
      nodeRef={notificationRef}
      in={isVisible}
      timeout={500}
      classNames={{
        enter: styles["notification-enter"],
        enterActive: styles["notification-enter-active"],
        enterDone: styles["notification-enter-done"],
        exit: styles["notification-exit"],
        exitActive: styles["notification-exit-active"],
      }}
    >
      <div
        className={styles["notification"]}
        role="alert"
        ref={notificationRef}
      >
        {text}
      </div>
    </CSSTransition>
  );
};

export default Notification;
