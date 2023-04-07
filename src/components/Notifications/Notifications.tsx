// styles
import styles from "./Notifications.module.scss";

// hooks
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// components
import Notification from "../Notification";

const Notifications = () => {
  const { notifications } = useNotificationsContext();
  return (
    <div className={styles["notifications"]}>
      {notifications.map((notification) => {
        return <Notification key={notification.id} text={notification.text} />;
      })}
    </div>
  );
};

export default Notifications;
