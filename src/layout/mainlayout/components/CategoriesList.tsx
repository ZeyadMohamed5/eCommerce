import { useState, useEffect } from "react";
import { getCategory } from "../../../Api/CategoryList";

const CategoriesList = ({
  onCategorySelect,
  selectedCategory,
}: {
  onCategorySelect: (slug: string) => void;
  selectedCategory: string;
  isHomepage?: boolean;
}) => {
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategory();
      if (data) setCategories(data);
    }

    fetchCategories();
  }, []);

  return (
    <>
      <h3 className="font-semibold text-center py-2 text-xl border-b border-gray-300">
        All Categories
      </h3>
      <ul className="space-y-3 text-xl">
        {categories.map(({ name, slug }) => (
          <li
            key={slug}
            className={`cursor-pointer ${
              selectedCategory === slug ? "font-semibold" : ""
            }`}
            onClick={() => onCategorySelect(slug)}
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesList;
