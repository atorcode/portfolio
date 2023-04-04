// styles
import styles from "./Notifications.module.scss";

// dependencies
import { v4 as uuidv4 } from "uuid";

// hooks
import { useNotificationsContext } from "../../contexts/NotificationsContext";

// components
import Notification from "../Notification";

const Notifications = () => {
  const { notifications } = useNotificationsContext();
  return (
    <div className={styles["notifications"]}>
      {notifications.map((notification) => {
        return <Notification key={uuidv4()} text={notification.text} />;
      })}
    </div>
  );
};

export default Notifications;
