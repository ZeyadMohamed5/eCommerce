import Commerce from "../Assests/images/e-commerce.png";

const AboutPage = () => {
  return (
    <section className="py-5">
      <h3 className=" font-semibold text-2xl pb-5">About</h3>
      <div className="grid grid-cols-12 items-center ">
        <div className="col-span-12 md:col-span-6 ">
          <h3 className="text-5xl py-5 font-semibold ">Our Story</h3>
          <p className="text-xl leading-8 pb-4">
            At eCommerce, we strive to make online shopping simple, convenient,
            and enjoyable. With a diverse range of products, from fashion and
            electronics to home essentials, we bring quality and affordability
            together in one place.
          </p>
          <p className="text-xl leading-8 pb-4">
            Enjoy secure payments, fast shipping, and excellent customer
            support—all in one place.
          </p>
        </div>
        <div className="col-span-12 -order-1  md:col-span-6">
          <img src={Commerce} alt="" />
        </div>
      </div>
    </section>
  );
};
export default AboutPage;
