// dependencies and hooks
import React, { useContext, useState } from "react";

type NotificationType = {
  category: "missing-required-fields";
  text: string;
};

type NotificationsContextType = {
  notifications: Array<NotificationType>;
  setNotifications: React.Dispatch<
    React.SetStateAction<Array<NotificationType>>
  >;
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
  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
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
