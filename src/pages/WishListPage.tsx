import ProductCard from "../components/Shared/ProductCard";
import RenderList from "../components/Shared/RenderList";
import Spinner from "../components/Shared/Spinner";
import { useAuth } from "../hooks/useAuth";
import useWishlistProducts from "../hooks/useWishListProducts";

const WishListPage = () => {
  const { currentUser } = useAuth();
  const wishlist = currentUser?.wishlist as (string | number)[];

  const { products, loading } = useWishlistProducts(wishlist);
  return (
    <section className="py-5 min-h-screen">
      <h3 className=" font-semibold text-2xl pb-5">
        WishList ({wishlist.length})
      </h3>
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-12 gap-2">
          <RenderList
            data={products}
            ItemComponent={ProductCard}
          />
        </div>
      ) : (
        <p className="text-center font-light text-gray-600 py-15 min-h-[300px]">
          No items in your wishlist.
        </p>
      )}
    </section>
  );
};
export default WishListPage;
