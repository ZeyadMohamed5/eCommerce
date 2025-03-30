import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";

const CheckOutPage = () => {
  const location = useLocation();
  const { showNotification } = useNotification();

  if (!location.state?.fromCart) {
    showNotification("checkout from cart page only!", "error");
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-[80vh] place-content-center">
      <div className="max-w-[33rem] mx-auto border-2 text-2xl border-gray-300 shadow-2xl py-10 px-5 text-center">
        <div className="flex flex-col gap-5 justify-center items-center">
          <IoMdCheckmarkCircle className="text-green-500" size={100} />
          <span className="font-semibold text-3xl">Shipping!</span>
          <p>Thank you for your order!</p>
          <Link to="/">
            <button className="themeButton py-4 px-5 shadow-xl ">
              Return to home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CheckOutPage;
