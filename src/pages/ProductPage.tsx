import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../Api/Products";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { Product } from "../types/types";
import Spinner from "../components/Shared/Spinner";
import { useNotification } from "../hooks/useNotification";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const ProductPage = () => {
  const { currentUser, updateWishlist, updateCart } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [randomReviewCount, setRandomReviewCount] = useState(0);
  const { showNotification } = useNotification();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRandomReviewCount(Math.round(Math.random() * 100));
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showNotification(
        "You must be logged in to add items to the cart.",
        "error"
      );
      return;
    }
    showNotification("Added to cart succefully.", "success");
    updateCart(Number(id), quantity);
  };

  const handleAddToWhishList = () => {
    if (!currentUser) {
      showNotification(
        "You must be logged in to add items to the wishlist.",
        "error"
      );
      return;
    }

    updateWishlist(Number(id));
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <Spinner />;
  const { title, price, description, images, rating, availabilityStatus } =
    product;

  return (
    <div className="grid grid-cols-12 space-x-2 space-y-2 py-10 md:py-20">
      <div className=" md:col-span-1 hidden space-y-4 md:block">
        {images.map((image: string, i: number) => (
          <LazyLoadImage
            key={i}
            src={image}
            alt={`image of ${title}`}
            effect="opacity"
            className="bg-gray-50 w-full col-span-4"
          />
        ))}
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="min-w-full min-h-80 max-h-full relative">
          {!loaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <LazyLoadImage
            src={images[0]}
            alt={title}
            effect="opacity"
            afterLoad={() => setLoaded(true)}
            className="w-full  bg-gray-50"
          />
        </div>
      </div>
      {images.map((image: string, i: number) => (
        <div key={i} className="col-span-4 md:hidden">
          <LazyLoadImage
            key={i}
            src={image}
            alt={`image of ${title}`}
            effect="opacity"
            className="bg-gray-50 w-full md:hidden"
          />
        </div>
      ))}

      <div className="col-span-12 md:col-span-5 md:px-10">
        <div className="border-b-2 border-gray-300 pb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex items-center py-2">
            <div className="flex items-center">
              {Array.from({ length: Math.round(rating) }).map((_, i) => (
                <FaStar size={18} key={i} color="orange" />
              ))}
            </div>
            <p className="text-gray-400 pl-2">({randomReviewCount} Reviews)</p>
          </div>
          <p className="py-1 font-bold">{availabilityStatus}</p>
          <p className="text-2xl font-light">${price}</p>
          <p className="text-black pt-4">{description}</p>
        </div>
        <form className="py-4 flex justify-between items-center flex-wrap gap-2">
          <div className="border-1 border-gray-300 rounded ">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="text-gray-500 px-3 py-1 border-r border-gray-300 text-2xl"
            >
              -
            </button>
            <span className="px-6 text-center w-[60px] inline-block ">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increaseQuantity}
              className="bg-accent-clr text-white px-3 py-1 rounded-tr rounded-br text-2xl"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="themeButton px-8 py-2 "
            onClick={handleAddToCart}
          >
            Buy Now
          </button>
          <button
            className="cursor-pointer"
            onClick={handleAddToWhishList}
            type="button"
          >
            {currentUser?.wishlist.includes(Number(id)) ? (
              <HiHeart
                className="border-1 border-gray-400 rounded p-1 transition-colors duration-200 text-red-500"
                size={35}
              />
            ) : (
              <HiOutlineHeart
                className="border-1 border-gray-400 rounded p-1 transition-colors duration-200"
                size={35}
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
