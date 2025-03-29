import { createContext, useState, ReactNode } from "react";
import { NotificationContextType } from "../types/types";
import Notification from "../components/Shared/Notification";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => setMessage(msg);
  const hideNotification = () => setMessage(null);

  return (
    <NotificationContext.Provider
      value={{ message, showNotification, hideNotification }}
    >
      {children}
      {message && <Notification message={message} onClose={hideNotification} />}
    </NotificationContext.Provider>
  );
};
