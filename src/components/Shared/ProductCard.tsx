import { FaStar } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../../types/types";
import { useNotification } from "../../hooks/useNotification";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const ProductCard = ({ products }: ProductCardProps) => {
  const { updateCart, updateWishlist, currentUser } = useAuth();
  const [randomReviewCount, setRandomReviewCount] = useState(0);
  const { showNotification } = useNotification();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRandomReviewCount(Math.round(Math.random() * 100));
  }, []);

  const { title, price, rating, discountPercentage, thumbnail, id } = products;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showNotification(
        "You must be logged in to add items to your wishlist.",
        "error"
      );
      return;
    }
    updateWishlist(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showNotification(
        "You must be logged in to add items to your cart.",
        "error"
      );
      return;
    }
    showNotification("Added to cart succefully", "success");
    updateCart(id, 1);
  };

  return (
    <Link
      to={`/product/${id}`}
      className="col-span-12 md:col-span-6 lg:col-span-3 pb-5 md:pb-10 flex flex-col justify-between items-center "
    >
      <div className="relative card w-full aspect-square overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}

        <LazyLoadImage
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-600 bg-gray-50 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          wrapperClassName="lazy-image-wrapper"
          effect="opacity"
          afterLoad={() => setLoaded(true)}
        />

        <div className="absolute inset-0 flex justify-between p-3">
          <span className="bg-accent-clr rounded h-fit text-white font-extralight text-[14px] px-2 py-1">
            {Math.round(discountPercentage)}%
          </span>
          <div className="flex flex-col gap-2">
            <span className="cursor-pointer" onClick={handleWishlist}>
              {currentUser?.wishlist.includes(id) ? (
                <HiHeart
                  className="bg-white rounded-full p-1 transition-colors duration-200 text-red-500"
                  size={35}
                />
              ) : (
                <HiOutlineHeart
                  className="bg-white rounded-full p-1 transition-colors duration-200"
                  size={35}
                />
              )}
            </span>
          </div>
        </div>
        <div onClick={handleAddToCart} className="CardOverLay">
          Add To Cart
        </div>
      </div>
      <div className="text-center">
        <h2 className="py-1">{title}</h2>
        <h2 className="text-main-clr">${price}</h2>
      </div>
      <div className="flex gap-1 items-center justify-center">
        <div className="flex">
          {Array.from({ length: Math.round(rating) }).map((_, i) => (
            <FaStar key={i} color="orange" />
          ))}
        </div>
        <span className="text-xs text-gray-400">({randomReviewCount})</span>
      </div>
    </Link>
  );
};

export default ProductCard;
