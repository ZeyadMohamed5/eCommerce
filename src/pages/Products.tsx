import { useEffect } from "react";
import Aside from "../components/Shared/Aside";
import ProductCard from "../components/Shared/ProductCard";
import RenderList from "../components/Shared/RenderList";
import useProducts from "../hooks/useProducts";
import Spinner from "../components/Shared/Spinner";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useCategory } from "../hooks/useCategory";
import { useLocation } from "react-router-dom";

const productsPerPage = 12;

const AllProducts = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      setCurrentPage(1);
    }
  }, [location.state, setSelectedCategory]);

  const { products, totalProducts, loading, currentPage, setCurrentPage } =
    useProducts(productsPerPage, selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <section className="grid grid-cols-12">
      <div className="hidden md:col-span-2 md:block pb-6">
        <Aside
          onCategorySelect={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="col-span-12 md:col-span-10 p-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-12 gap-2">
            <RenderList
              data={products}
              resourceName="products"
              ItemComponent={ProductCard}
            />
          </div>
        )}
        {!loading && (
          <div className="flex justify-center pt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-4 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-default  "
            >
              <MdKeyboardArrowLeft size={30} />
            </button>
            <span className="px-4 py-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              className="px-4 py-2 cursor-pointer disabled:opacity-50"
            >
              <MdKeyboardArrowRight size={30} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
