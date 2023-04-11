// styles
import styles from "./Notifications.module.scss";

// hooks
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// components
import Notification from "../Notification";

// types
import { NotificationType } from "../../types/NotificationType";

const Notifications = () => {
  const { notifications } = useNotificationsContext();

  return (
    <div className={styles["notifications"]}>
      {notifications.map((notification: NotificationType): JSX.Element => {
        return <Notification key={notification.id} {...notification} />;
      })}
    </div>
  );
};

export default Notifications;
