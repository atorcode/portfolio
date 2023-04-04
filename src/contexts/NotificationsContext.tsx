// dependencies and hooks
import React, { useContext, useState } from "react";

type NotificationType = {
  text: string;
};

type NotificationsContextType = {
  notifications: Array<NotificationType>;
  updateNotifications: (newNotification: NotificationType) => void;
};

type ChildrenType = {
  children: React.ReactNode;
};

const NotificationsContext = React.createContext<
  NotificationsContextType | undefined
>(undefined);

const NotificationsProvider = ({ children }: ChildrenType) => {
  const [notifications, setNotifications] = useState<Array<NotificationType>>(
    []
  );

  const updateNotifications = (newNotification: NotificationType): void => {
    if (notifications.length >= 5) {
      setNotifications((prev) => [...prev.slice(1), newNotification]);
    } else {
      setNotifications((prev) => [...prev, newNotification]);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, updateNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotificationsContext = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsProvider"
    );
  }
  return context;
};

export { NotificationsProvider, useNotificationsContext };
