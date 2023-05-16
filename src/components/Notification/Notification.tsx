// styles
import styles from "./Notification.module.scss";

// icons
import { MdWarning } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";

// dependencies
import { CSSTransition } from "react-transition-group";

// hooks
import { useEffect, useRef, useState } from "react";
import { useNotificationsContext } from "../../contexts/NotificationsContext";
import { useThemeContext } from "../../contexts/ThemeContext";

// utils
import { NOTIFICATION_DURATION } from "../../utils/constants";

// types
import { NotificationType as NotificationProps } from "../../types/NotificationType";

const Notification = ({ id, type, text }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const { removeNotificationAfterDelay } = useNotificationsContext();
  const { theme } = useThemeContext();

  useEffect((): (() => void) => {
    setIsVisible(true);

    let exitTransitionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    removeNotificationAfterDelay(
      id,
      exitTransitionTimeoutId,
      setIsVisible,
      NOTIFICATION_DURATION,
      500
    );

    return (): void => {
      clearTimeout(exitTransitionTimeoutId);
    };
  }, []);

  let icon: JSX.Element | undefined;
  switch (type) {
    case "warning":
      icon = <MdWarning />;
      break;
    case "success":
      icon = <ImCheckboxChecked />;
      break;
    default:
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }

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
        className={`${styles["notification"]} ${
          styles[`notification-${theme}`]
        }`}
        role="alert"
        ref={notificationRef}
      >
        {icon && <div className={styles["icon"]}>{icon}</div>}
        {text}
      </div>
    </CSSTransition>
  );
};

export default Notification;
