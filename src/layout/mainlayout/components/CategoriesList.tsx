import { getCategory } from "../../../Api/CategoryList";

const categories = await getCategory();

const CategoriesList = ({
  onCategorySelect,
  selectedCategory,
}: {
  onCategorySelect: (slug: string) => void;
  selectedCategory: string;
  isHomepage?: boolean;
}) => {
  return (
    <>
      <h3 className="font-semibold text-center py-2 text-xl border-b border-gray-300">
        All Categories
      </h3>
      <ul className="space-y-3 text-xl">
        {categories.map(({ name, slug }: { name: string; slug: string }) => (
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
