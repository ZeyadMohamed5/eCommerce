import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useSearch } from "../../../hooks/useSearch";

const SearchFormMobile = () => {
  const { query, setQuery, handleSearch } = useSearch();

  return (
    <form className="relative w-full max-w-md" onSubmit={handleSearch}>
      <input
        className="w-full bg-gray-200 text-[13px] outline-none rounded pe-12 ps-4 py-2 font-extralight"
        placeholder="What are you looking for..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <HiOutlineMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-500" />
      </button>
    </form>
  );
};
export default SearchFormMobile;
