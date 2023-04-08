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
  triggerExitTransition: (
    timeoutId: ReturnType<typeof setTimeout> | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    transitionDuration: number
  ) => Promise<void>;
  removeNotification: () => void;
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

  const triggerExitTransition = async (
    timeoutId: ReturnType<typeof setTimeout> | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    transitionDuration: number
  ): Promise<void> => {
    clearTimeout(timeoutId);

    await new Promise<void>((resolve) => {
      timeoutId = setTimeout((): void => {
        setVisibility(false);
        resolve();
      }, NOTIFICATION_DURATION - transitionDuration);
    });

    await new Promise<void>((resolve) => {
      setTimeout((): void => {
        resolve();
      }, transitionDuration);
    });
  };

  // let removeNotificationTimeoutId: ReturnType<typeof setTimeout>;
  // const removeNotificationAfterDelay = (milliseconds: number) => {
  //   clearTimeout(removeNotificationTimeoutId);
  //   removeNotificationTimeoutId = setTimeout(() => {
  //     setNotifications((prev) => prev.slice(1));
  //   }, milliseconds);
  // };

  const removeNotification = () => {
    setNotifications((prev) => prev.slice(1));
  };

  const updateNotifications = (newNotification: NotificationType): void => {
    if (notifications.length >= 5) {
      setNotifications((prev) => [...prev.slice(1), newNotification]);
    } else {
      setNotifications((prev) => [...prev, newNotification]);
      // removeNotificationAfterDelay(NOTIFICATION_DURATION);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        triggerExitTransition,
        removeNotification,
        updateNotifications,
      }}
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
