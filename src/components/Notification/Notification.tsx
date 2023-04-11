// styles
import styles from "./Notification.module.scss";

// dependencies
import { CSSTransition } from "react-transition-group";

// hooks
import { useEffect, useRef, useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// utils
import { NOTIFICATION_DURATION } from "../../utils/constants";

// types
import { NotificationType as NotificationProps } from "../../types/NotificationType";

const Notification = ({ id, text }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const { removeNotificationAfterDelay } = useNotificationsContext();

  useEffect(() => {
    setIsVisible(true);

    let exitTransitionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    removeNotificationAfterDelay(
      id,
      exitTransitionTimeoutId,
      setIsVisible,
      NOTIFICATION_DURATION,
      500
    );

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
