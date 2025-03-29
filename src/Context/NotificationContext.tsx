import { createContext, useState, ReactNode } from "react";
import { NotificationContextType, NotificationType } from "../types/types";
import Notification from "../components/Shared/Notification";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<{
    message: string | null;
    type: NotificationType;
  }>({ message: null, type: "error" });

  const showNotification = (msg: string, type: NotificationType = "success") =>
    setNotification({ message: msg, type });

  const hideNotification = () =>
    setNotification({ message: null, type: "success" });

  return (
    <NotificationContext.Provider
      value={{ ...notification, showNotification, hideNotification }}
    >
      {children}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
