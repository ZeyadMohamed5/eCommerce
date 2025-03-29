import Aside from "../components/Shared/Aside";
import FlashSaleCountDown from "../components/Home/FlashSaleCountDown";
import Slider from "../components/Home/Slider";
import Sections from "../components/Home/Sections";
import RenderList from "../components/Shared/RenderList";
import ProductCard from "../components/Shared/ProductCard";
import { getProducts } from "../Api/Products";
import AdImage from "../Assests/images/Ad.png";
import AdImage1 from "../Assests/images/Ad1.png";
import AdImage2 from "../Assests/images/Ad2.png";
import AdImage3 from "../Assests/images/Ad3.png";
import AdImage4 from "../Assests/images/Ad4.png";
import service1 from "../Assests/images/Services.png";
import service2 from "../Assests/images/Services (1).png";
import service3 from "../Assests/images/Services (2).png";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";

const products = await getProducts();

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, selectedCategory } = useCategory();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate("/products", { state: { selectedCategory: category } });
  };

  return (
    <>
      <section className="grid grid-cols-12">
        <div className="hidden md:col-span-2 md:block pb-6">
          <Aside
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
            isHomepage={true}
          />
        </div>
        <div className="col-span-12  md:col-span-10 p-2 md:p-6">
          <Slider />
        </div>
      </section>
      <Sections
        label="Today's"
        title="Flash Sales"
        extraContent={<FlashSaleCountDown />}
      >
        <RenderList
          data={products}
          resourceName="products"
          ItemComponent={ProductCard}
          limit={4}
        />
        <button className="themeButton col-span-12 mx-auto px-6 py-3">
          <Link to="/products">View All Products</Link>
        </button>
      </Sections>
      <Sections label="This Month" title="Best Selling Products">
        <RenderList
          data={products}
          resourceName="products"
          ItemComponent={ProductCard}
          limit={4}
        />
      </Sections>
      <section className="grid grid-cols-12">
        <img className="col-span-12" src={AdImage} alt="Ad" />
      </section>
      <Sections label="Our Products" title="Explore Our Products">
        <RenderList
          data={products}
          resourceName="products"
          ItemComponent={ProductCard}
          limit={8}
        />
        <button className="themeButton col-span-12 mx-auto px-6 py-3">
          <Link to="/products">View All Products</Link>
        </button>
      </Sections>
      <Sections label="Featured" title="New Arrival">
        <img
          className="col-span-12 md:col-span-6 md:row-span-2"
          src={AdImage4}
          alt="Ad-Image"
        />
        <img
          className="col-span-12 md:col-span-6"
          src={AdImage3}
          alt="Ad-Image"
        />
        <img
          className="col-span-6 md:col-span-3 md:self-end"
          src={AdImage1}
          alt="Ad-Image"
        />
        <img
          className="col-span-6 md:col-span-3 md:self-end"
          src={AdImage2}
          alt="Ad-Image"
        />
      </Sections>
      <Sections>
        <div className="col-span-12 md:col-span-4 text-center pb-10">
          <img className="mx-auto pb-3" src={service1} alt="Service-Icon" />
          <h4 className="font-bold text-[20px] pb-2">FREE AND FAST DELIVERY</h4>
          <p className="text-[14px]">Free delivery for all orders over $140</p>
        </div>
        <div className="col-span-12 md:col-span-4 text-center pb-10">
          <img className="mx-auto pb-3" src={service2} alt="Service-Icon" />
          <h4 className="font-bold text-[20px] pb-2">24/7 CUSTOMER SERVICE</h4>
          <p className="text-[14px]">Friendly 24/7 customer support</p>
        </div>
        <div className="col-span-12 md:col-span-4 text-center pb-10">
          <img className="mx-auto pb-3" src={service3} alt="Service-Icon" />
          <h4 className="font-bold text-[20px] pb-2">MONEY BACK GUARANTEE</h4>
          <p className="text-[14px]">We reurn money within 30 days</p>
        </div>
      </Sections>
    </>
  );
};
export default Home;
