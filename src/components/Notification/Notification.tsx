// styles
import styles from "./Notification.module.scss";

type NotificationProps = {
  category: "missing-required-fields";
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
