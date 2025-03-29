import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useSearch } from "../../../hooks/useSearch";

export default function SearchForm() {
  const { query, setQuery, handleSearch } = useSearch();

  return (
    <form onSubmit={handleSearch} className="hidden md:block relative max-w-md">
      <input
        className="bg-gray-200 text-[13px] outline-none rounded pe-8 ps-4 py-2 font-extralight"
        placeholder="What are you looking for..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <HiOutlineMagnifyingGlass className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
      </button>
    </form>
  );
}
