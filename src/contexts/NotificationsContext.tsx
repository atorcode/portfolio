// dependencies and hooks
import React, { useContext, useState } from "react";

// utils
import { NOTIFICATION_DURATION } from "../utils/constants";

type NotificationType = {
  id: string;
  text: string;
};

type NotificationsContextType = {
  notifications: Array<NotificationType>;
  updateNotifications: (newNotification: NotificationType) => void;
  triggerExitTransition: (
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
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

  // parameterize this Id
  let exitTransitionTimeoutId: ReturnType<typeof setTimeout>;
  const triggerExitTransition = (
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    clearTimeout(exitTransitionTimeoutId);
    exitTransitionTimeoutId = setTimeout(() => {
      setVisibility(false);
      // The second argument in this setTimeout should be equal to NOTIFICATION_DURATION minus the duration of the slide-out transition.
    }, NOTIFICATION_DURATION - 500);
  };

  let removeNotificationTimeoutId: ReturnType<typeof setTimeout>;
  const removeNotificationAfterDelay = (milliseconds: number) => {
    clearTimeout(removeNotificationTimeoutId);
    removeNotificationTimeoutId = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, milliseconds);
  };

  const updateNotifications = (newNotification: NotificationType): void => {
    if (notifications.length >= 5) {
      setNotifications((prev) => [...prev.slice(1), newNotification]);
    } else {
      setNotifications((prev) => [...prev, newNotification]);
      removeNotificationAfterDelay(NOTIFICATION_DURATION);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, updateNotifications, triggerExitTransition }}
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
