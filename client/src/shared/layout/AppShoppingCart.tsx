import { useShoppingCart } from "../contexts/ShoppingCartContext";
import styled from "styled-components";

const AppshoppingCart = () => {
  const { cart } = useShoppingCart();
  //   console.log(cart);
  return (
    <AppshoppingCartStyles>
      {cart.length > 0 && <h1>{cart[0].name}</h1>}
    </AppshoppingCartStyles>
  );
};
export default AppshoppingCart;

const AppshoppingCartStyles = styled.div``;
