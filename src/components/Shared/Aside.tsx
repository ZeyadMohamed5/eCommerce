import { useEffect, useState } from "react";
import { getCategory } from "../../Api/CategoryList";
import { AsideProps } from "../../types/types";

const Aside = ({
  onCategorySelect,
  selectedCategory,
  isHomepage = false,
}: AsideProps) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategory();
      if (data) setCategories(data);
    }

    fetchCategories();
  }, []);

  const displayedCategories = isHomepage ? categories.slice(0, 8) : categories;

  return (
    <div className="border-r border-gray-300 h-full">
      {!isHomepage && (
        <h3 className="font-semibold p-3 text-center border-b border-gray-300">
          All Categories
        </h3>
      )}
      <ul>
        {!isHomepage && (
          <li
            className={`cursor-pointer p-3 ${
              !isHomepage && selectedCategory === "" ? "font-semibold" : ""
            }`}
            onClick={() => onCategorySelect("")}
          >
            All
          </li>
        )}
        {displayedCategories.map(
          ({ name, slug }: { name: string; slug: string }) => (
            <li
              key={slug}
              className={`cursor-pointer p-3 ${
                !isHomepage && selectedCategory === slug ? "font-semibold" : ""
              }`}
              onClick={() => onCategorySelect(slug)}
            >
              {name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Aside;
