import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Notification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 w-[90%] mx-auto md:w-fit left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-md flex items-center justify-between gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="cursor-pointer">
        <IoClose size={22} />
      </button>
    </div>
  );
};

export default Notification;
