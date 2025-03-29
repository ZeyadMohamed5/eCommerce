import image from "../../Assests/images/figure1.png";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <main className=" col-span-12 md:col-span-7 bg-white flex items-center justify-center place-items-center py-3">
        <Outlet />
      </main>
      <section className="col-span-12 place-content-center bg-[#FFEDE1] p-4 text-white hidden md:block md:col-span-5">
        <img className="" src={image} alt="" />
      </section>
    </div>
  );
};
export default AuthLayout;
