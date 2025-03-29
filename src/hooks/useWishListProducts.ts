import { useState, useEffect } from "react";
import { getProductById } from "../Api/Products";
import { Product } from "../types/types";

const useWishlistProducts = (wishlist: (number | string)[]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setLoading(true);
      const productPromises = wishlist.map((id) => getProductById(id));
      const results = await Promise.all(productPromises);
      setProducts(
        results.filter((product): product is Product => product !== null)
      );
      setLoading(false);
    };

    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [wishlist]);

  return { products, loading };
};

export default useWishlistProducts;
