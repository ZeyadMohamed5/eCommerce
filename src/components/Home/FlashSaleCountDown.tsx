import { useState, useEffect } from "react";
import { TimeLeft } from "../../types/types";

const FlashSaleCountDown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 3,
      23,
      59,
      59
    );
    const difference = endDate.getTime() - now.getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex gap-4 text-center text-xl font-semibold mt-1">
      <span className="relative ">
        {formatNumber(timeLeft.days)}
        <span className="CountDownLaber">days</span>
      </span>
      <span className="text-accent-clr">:</span>
      <span className="relative">
        {formatNumber(timeLeft.hours)}
        <span className="CountDownLaber">hours</span>
      </span>
      <span className="text-accent-clr">:</span>
      <span className="relative">
        {formatNumber(timeLeft.minutes)}
        <span className="CountDownLaber">minutes</span>
      </span>
      <span className="text-accent-clr">:</span>
      <span className="relative">
        {formatNumber(timeLeft.seconds)}
        <span className="CountDownLaber">seconds</span>
      </span>
    </div>
  );
};
export default FlashSaleCountDown;
