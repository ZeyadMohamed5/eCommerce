import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import SearchForm from "./SearchForm";

const Header = () => {
  const { currentUser, signOut } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
  const [logMenu, setLogMenu] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  const cartCount =
    currentUser?.cart.reduce((total, item) => total + item.quantity, 0) || 0;

  const whishListCount = currentUser?.wishlist.length || 0;

  return (
    <header className="border-1 border-gray-300  w-full">
      <div className="w-[90%] flex justify-between items-center mx-auto py-4">
        <Link to={"/"}>
          <h1 className="font-bold text-2xl">eCommerce</h1>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex justify-center items-center space-x-8 ">
            <NavLink to={"/"} className="nav-link">
              <li>Home</li>
            </NavLink>
            <NavLink to={"/products"} className="nav-link">
              <li>Products</li>
            </NavLink>
            <NavLink to={"/about"} className="nav-link">
              <li>About</li>
            </NavLink>

            {!isLoggedIn && (
              <NavLink to={"/login"} className="nav-link">
                <li>Sign In</li>
              </NavLink>
            )}
          </ul>
        </nav>
        <div className="flex justify-between items-center space-x-2.5">
          <SearchForm />
          <div className="relative">
            <button
              className="align-middle cursor-pointer"
              onClick={() => {
                isLoggedIn
                  ? navigate("/wishlist")
                  : showNotification(
                      "You must be logged in to view the wishlist."
                    );
              }}
            >
              <CiHeart size={30} />
              {whishListCount > 0 && (
                <span className="CounterIcon">{whishListCount}</span>
              )}
            </button>
          </div>
          <div className="relative">
            <button
              className="align-middle cursor-pointer"
              onClick={() => {
                isLoggedIn
                  ? navigate("/cart")
                  : showNotification("You must be logged in to view the cart.");
              }}
            >
              <CiShoppingCart size={30} />
              {cartCount > 0 && (
                <span className="CounterIcon">{cartCount}</span>
              )}
            </button>
          </div>
          {isLoggedIn && (
            <div className="relative">
              <CiUser onClick={() => setLogMenu(!logMenu)} size={30} />
              {logMenu && (
                <div className="absolute w-25 h-8 bg-white shadow-md z-10 text-center bottom bottom-0 right-0 translate-y-10 translate-x-8 rounded ">
                  <p onClick={signOut}>Sign Out</p>
                </div>
              )}
            </div>
          )}
          <div className="block md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
