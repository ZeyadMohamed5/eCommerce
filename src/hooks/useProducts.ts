import { useState, useEffect } from "react";
import { fetchProducts } from "../Api/Products";

const useProducts = (productsPerPage: number, category?: string) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const getProducts = async () => {
      setLoading(true);
      const skip = (currentPage - 1) * productsPerPage;
      const data = await fetchProducts(productsPerPage, skip, category);
      setProducts(data.products);
      setTotalProducts(data.total);
      setLoading(false);
    };

    getProducts();
  }, [currentPage, productsPerPage, category]);

  return { products, totalProducts, loading, currentPage, setCurrentPage };
};

export default useProducts;
