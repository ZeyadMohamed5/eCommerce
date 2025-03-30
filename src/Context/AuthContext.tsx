import { createContext, useEffect, useState } from "react";
import { User, AuthContextType, defaultAuthContext } from "../types/types";

const LOCAL_STORAGE_KEY = "authUsers";
const CURRENT_USER_KEY = "currentUser";

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) setUsers(JSON.parse(storedUsers));

    const storedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

      const updatedUsers = users.map((user) =>
        user.email === currentUser.email ? currentUser : user
      );
      setUsers(updatedUsers);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  }, [currentUser]);

  const signUp = (email: string, password: string) => {
    const newUser: User = { email, password, wishlist: [], cart: [] };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const signIn = (email: string, password: string): boolean => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateWishlist = (productId: number) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        wishlist: currentUser.wishlist.includes(productId)
          ? currentUser.wishlist.filter((id) => id !== productId)
          : [...currentUser.wishlist, productId],
      };
      setCurrentUser(updatedUser);
    }
  };

  const updateCart = (productId: number, quantity: number = 1) => {
    if (currentUser) {
      const existingProduct = currentUser.cart.find(
        (item) => item.id === productId
      );

      const updatedCart = existingProduct
        ? currentUser.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
              : item
          )
        : [...currentUser.cart, { id: productId, quantity }];

      const updatedUser = {
        ...currentUser,
        cart: updatedCart,
      };

      setCurrentUser(updatedUser);
    }
  };

  const removeFromCart = (productId: number) => {
    if (currentUser) {
      const updatedCart = currentUser.cart.filter(
        (item) => item.id !== productId
      );

      const updatedUser = {
        ...currentUser,
        cart: updatedCart,
      };

      setCurrentUser(updatedUser);
    }
  };
  const clearCart = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        cart: [],
      };
      setCurrentUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        updateWishlist,
        updateCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
