export interface AuthFormProps {
  toggleForm: () => void;
}

export interface User {
  email: string;
  password: string;
  wishlist: number[];
  cart: { id: number; quantity: number }[];
}

export interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  updateWishlist: (productId: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export type NotificationType = "success" | "error";

export interface NotificationContextType {
  message: string | null;
  type: NotificationType;
  showNotification: (msg: string, type?: NotificationType) => void;
  hideNotification: () => void;
}

export interface NotificationProps {
  message: string;
  onClose: () => void;
  type: string;
}

export const defaultAuthContext: AuthContextType = {
  currentUser: null,
  signUp: () => {},
  signIn: () => false,
  signOut: () => {},
  updateWishlist: () => {},
  updateCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

export interface RenderListProps<T> {
  data: T[];
  ItemComponent: React.ComponentType<{ product: T }>;
  limit?: number;
}

export type ProductCardProps<T> = {
  product: T;
};

export type Products = {
  products: Product[];
};

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Section {
  title?: string;
  label?: string;
  extraContent?: React.ReactNode;
  children: React.ReactNode;
}

export type Product = {
  id: number;
  rating: number;
  price: number;
  discountPercentage: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  thumbnail: string;
  availabilityStatus: string;
};

export interface CategoryContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export interface AsideProps {
  onCategorySelect: (slug: string) => void;
  selectedCategory: string;
  isHomepage?: boolean;
}
