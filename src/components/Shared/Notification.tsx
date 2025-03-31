import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { NotificationProps } from "../../types/types";

const Notification = ({ message, onClose, type }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [message, onClose]);

  return isVisible ? (
    <div
      className={`fixed top-6 w-[90%] mx-auto md:w-fit left-1/2 transform -translate-x-1/2 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white p-4 rounded shadow-md flex items-center justify-between gap-2 animate-fadeInOut`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="cursor-pointer">
        <IoClose size={22} />
      </button>
    </div>
  ) : null;
};

export default Notification;
