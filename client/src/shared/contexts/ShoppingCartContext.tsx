import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProductDto } from "../dtos/products.dto";
import { toast } from "react-toastify";

interface ShoppingCartContextProps {
  cart: ProductDto[];
  addToCart: (product: ProductDto) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(
  undefined
);

export const useShoppingCart = (): ShoppingCartContextProps => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart debe usarse dentro de un ShoppingCartProvider"
    );
  }
  return context;
};

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const storedCartItems = localStorage.getItem("cartItems");
  const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
  const [cart, setCart] = useState<any[]>(initialCartItems);
  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevItems) => [
        ...prevItems,
        { productId: product.id, quantity: 1 },
      ]);
    }
    let nameProducto =
      product.name.length > 40
        ? `${product.name.slice(0, 40)}...`
        : product.name;
    setCart((prevCart) => [...prevCart, product]);
    toast.info(`Se agregó ${nameProducto} al carrito`);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
