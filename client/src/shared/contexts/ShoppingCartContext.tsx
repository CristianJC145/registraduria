import React, { createContext, useContext, ReactNode, useReducer } from "react";
import { ProductDto } from "../dtos/products.dto";
import {
  CartItem,
  cartReducer,
  initialState,
} from "../reducers/shoppingCartReduce";
import { toast } from "react-toastify";

interface ShoppingCartContextProps {
  cart: CartItem[];
  addToCart: (product: ProductDto) => void;
  decrementQuantity: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  clearCart: (productId: number) => void;
  completePurchase: () => void;
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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: ProductDto) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const decrementQuantity = (productId: number) =>
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: productId,
    });

  const incrementQuantity = (productId: number) =>
    dispatch({
      type: "INCREMENT_QUANTITY",
      payload: productId,
    });

  const clearCart = (productId: number) =>
    dispatch({
      type: "CLEAR_CART_BY_ID",
      payload: productId,
    });
  const completePurchase = () =>
    dispatch({
      type: "COMPLETE_PURCHASE",
    });

  return (
    <ShoppingCartContext.Provider
      value={{
        cart: state,
        addToCart,
        decrementQuantity,
        incrementQuantity,
        clearCart,
        completePurchase,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
