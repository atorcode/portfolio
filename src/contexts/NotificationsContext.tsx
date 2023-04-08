// dependencies and hooks
import React, { useContext, useState } from "react";

// types
import { NotificationType } from "../types/NotificationType";

type NotificationsContextType = {
  notifications: Array<NotificationType>;
  addNotification: (newNotification: NotificationType) => void;
  removeNotificationAfterDelay: (
    notificationId: string,
    timeoutId: ReturnType<typeof setTimeout> | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    delayDuration: number,
    transitionDuration: number
  ) => Promise<void>;
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

  const addNotification = (newNotification: NotificationType): void => {
    setNotifications((prev) => [...prev, newNotification]);
  };

  const triggerExitTransitionAfterDelay = async (
    timeoutId: ReturnType<typeof setTimeout> | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    delayDuration: number,
    transitionDuration: number
  ): Promise<void> => {
    clearTimeout(timeoutId);

    await new Promise<void>((resolve) => {
      timeoutId = setTimeout((): void => {
        setVisibility(false);
        resolve();
      }, delayDuration);
    });

    await new Promise<void>((resolve) => {
      setTimeout((): void => {
        resolve();
      }, transitionDuration);
    });
  };

  const removeNotificationAfterDelay = async (
    notificationId: string,
    timeoutId: ReturnType<typeof setTimeout> | undefined,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    delayDuration: number,
    transitionDuration: number
  ): Promise<void> => {
    await triggerExitTransitionAfterDelay(
      timeoutId,
      setVisibility,
      delayDuration,
      transitionDuration
    );
    setNotifications(
      (prev): Array<NotificationType> =>
        prev.filter(
          (notification): boolean => notification.id !== notificationId
        )
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotificationAfterDelay,
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
