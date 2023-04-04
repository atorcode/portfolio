// styles
import styles from "./Notification.module.scss";

type NotificationProps = {
  text: string;
};

const Notification = ({ text }: NotificationProps) => {
  return (
    <div className={styles["notification"]} role="alert">
      {text}
    </div>
  );
};

export default Notification;
