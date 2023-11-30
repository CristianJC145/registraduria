import { toast } from "react-toastify";
import { ProductDto } from "../dtos/products.dto";
import { useNavigate } from "react-router-dom";
export type CartItem = {
  product: ProductDto;
  quantity: number;
};

export const cartFromLocalStorage = localStorage.getItem("cartItem");
export const initialState: any[] = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : [];

export const updateLocalStorage = (state: any) => {
  window.localStorage.setItem("cartItem", JSON.stringify(state));
};

export const cartReducer = (state: CartItem[], action: any) => {
  const navigate = useNavigate();
  function truncateName(text: string) {
    return text.length > 45 ? `${text.slice(0, 45)}...` : text;
  }
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;
      const existingItemIndex = state.findIndex(
        (item: CartItem) => item.product.id === id
      );
      if (existingItemIndex >= 0) {
        const newState = [
          ...state.slice(0, existingItemIndex),
          {
            ...state[existingItemIndex],
            quantity: state[existingItemIndex].quantity + 1,
          },
        ];
        let nameProduct = state[existingItemIndex].product.name;
        toast.info(`Se añadió ${truncateName(nameProduct)} al carrito`);
        updateLocalStorage(newState);
        return newState;
      } else {
        const newState = [...state, { product: action.payload, quantity: 1 }];
        updateLocalStorage(newState);
        let nameProduct = newState[0].product.name;
        toast.info(`Se añadió ${truncateName(nameProduct)} al carrito`);
        return newState;
      }
    }
    case "INCREMENT_QUANTITY": {
      const id = actionPayload;
      const incrementProductIndex = state.findIndex(
        (item: CartItem) => item.product.id === id
      );

      if (incrementProductIndex >= 0) {
        const newState = structuredClone(state);

        newState[incrementProductIndex].quantity += 1;

        updateLocalStorage(newState);
        return newState;
      }

      return state;
    }
    case "DECREMENT_QUANTITY": {
      const id = actionPayload;
      const decrementProductIndex = state.findIndex(
        (item: CartItem) => item.product.id === id
      );
      if (decrementProductIndex >= 0) {
        const newState = structuredClone(state);

        newState[decrementProductIndex].quantity -= 1;

        if (newState[decrementProductIndex].quantity <= 0) {
          newState.splice(decrementProductIndex, 1);
        }
        updateLocalStorage(newState);
        return newState;
      }
    }

    case "CLEAR_CART_BY_ID": {
      const newState = state.filter(
        (item) => item.product.id !== action.payload
      );
      updateLocalStorage(newState);
      return newState;
    }

    case "COMPLETE_PURCHASE": {
      let url = "http://192.168.18.37:5173";
      navigate(url);
      updateLocalStorage([]);
      toast.success("¡Compra realizada con éxito!");
      return [];
    }
  }

  return state;
};
