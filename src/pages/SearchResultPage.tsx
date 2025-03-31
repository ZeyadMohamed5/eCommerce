import RenderList from "../components/Shared/RenderList";
import ProductCard from "../components/Shared/ProductCard";
import { useSearchParams } from "react-router-dom";
import { getBySearch } from "../Api/Products";
import { useEffect, useState } from "react";
import Spinner from "../components/Shared/Spinner";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      setLoading(true);

      getBySearch(query)
        .then((data) => {
          const { products } = data;
          setResults(products || []);
        })
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <section className="py-5 min-h-screen">
      <h3 className="font-semibold text-2xl pb-5">
        your results for : {query}
      </h3>

      {loading ? (
        <Spinner />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-12 gap-2">
          <RenderList data={results} ItemComponent={ProductCard} />
        </div>
      ) : (
        <p className="text-center font-light text-gray-600 py-15 min-h-[300px]">
          No results found.
        </p>
      )}
    </section>
  );
};
export default SearchResultPage;
