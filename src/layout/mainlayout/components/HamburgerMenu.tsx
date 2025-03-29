import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useCategory } from "../../../hooks/useCategory";
import CategoriesList from "./CategoriesList";
import { IoMenuOutline } from "react-icons/io5";
import SearchFormMobile from "./SearchFormMobile";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate("/products", { state: { selectedCategory: category } });
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center text-2xl"
      >
        <IoMenuOutline size={30} />
      </button>

      <div
        className={`bg-black/20 w-full h-full fixed top-0 left-0 z-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`bg-gray-100 h-full text-center w-[75%] fixed right-0 top-0 flex flex-col items-center p-6 gap-3 overflow-y-scroll shadow-lg z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SearchFormMobile />

        <ul className="text-xl space-y-3">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)}>
            <li>Products</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            <li>About</li>
          </NavLink>
          {!currentUser && (
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              <li>Sign In</li>
            </NavLink>
          )}
        </ul>

        <CategoriesList
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default HamburgerMenu;
