import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";

export const useCategory = () => {
  const context = useContext(CategoryContext);
  const location = useLocation();

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  const { setSelectedCategory } = context;

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory("");
    }
  }, [location.pathname, setSelectedCategory ]);

  return context;
};
