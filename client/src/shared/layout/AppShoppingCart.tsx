import { useEffect, useState } from "react";
import styled from "styled-components";

import AppButton from "../components/Buttons/AppButton";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { settings } from "../constant/settings.constants";

interface AppshoppingCartProps {
  isOpen: boolean;
}

const AppshoppingCart: React.FC<AppshoppingCartProps> = ({ isOpen }) => {
  const appCartEmpty = settings.appCartEmpty;
  const {
    cart,
    decrementQuantity,
    clearCart,
    incrementQuantity,
    completePurchase,
  } = useShoppingCart();
  const classIsOpen = `vs-cart${isOpen ? " open" : ""}`;

  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });
    const total =
      subtotal +
      cart.reduce((acc, item) => acc + (item.product?.shipping || 0), 0);
    setSubtotal(subtotal);
    setTotal(total);
  }, [cart]);
  function formattedPrice(price: number | bigint) {
    return new Intl.NumberFormat("es-ES").format(price);
  }
  function truncateName(text: string) {
    return text.length > 45 ? `${text.slice(0, 45)}...` : text;
  }
  return (
    <AppshoppingCartStyles>
      <div className={`${classIsOpen}`}>
        {isOpen && <div className="overlay"></div>}
        <aside className="vs-cart-container">
          <div className="vs-container-header">
            <h5 className="fw-bold mb-0">Mi carrito</h5>
            <AppButton
              className="vs-header-btn-action rounded-circle p-2 position-absolute"
              variant="dark"
              outlined
              icon="times"
            ></AppButton>
          </div>
          {cart.length > 0 ? (
            <>
              <div className="vs-products-container">
                {cart.map((item) => (
                  <div className="vs-container-row" key={item.product.id}>
                    <div className="vs-row-left">
                      <div className="vs-left-image">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                        />
                      </div>
                    </div>

                    <div className="vs-row-right">
                      <div className="vs-right-col__top">
                        <span className="vs-col-top__label">
                          {truncateName(item.product.name)}
                        </span>
                        <AppButton
                          onClick={() => clearCart(item.product.id)}
                          variant="dark"
                          icon="times"
                          className="vs-col-btn-action"
                        ></AppButton>
                      </div>

                      <div className="vs-right-col__bottom">
                        <div className="vs-right-actions">
                          <AppButton
                            className="vs-col-btn-action"
                            onClick={() => decrementQuantity(item.product.id)}
                            variant="dark"
                            icon="minus"
                          ></AppButton>
                          <span>{item.quantity}</span>
                          <AppButton
                            className="vs-col-btn-action"
                            onClick={() => incrementQuantity(item.product.id)}
                            variant="dark"
                            icon="plus"
                          ></AppButton>
                        </div>

                        <h6 className="mb-0">
                          ${formattedPrice(item.product.price)}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="vs-container-operations">
                <div className="vs-operations-titles">
                  <span>Tu Subtotal</span>
                  <span>Envío</span>
                  <span>Total</span>
                </div>
                <div className="vs-operations-values">
                  <span>${`${formattedPrice(subtotal)}`}</span>
                  <span style={{ color: "var(--color-pastel-green)" }}>
                    Gratis
                  </span>
                  <span>${formattedPrice(total)}</span>
                </div>
              </div>
              <div className="vs-container-btn-buy">
                <AppButton
                  label="Realizar compra"
                  onClick={() => completePurchase()}
                ></AppButton>
              </div>
            </>
          ) : (
            <div className="d-flex gap-4 flex-column align-items-center">
              <div className="mt-5 pt-3">
                <img
                  src={appCartEmpty}
                  alt="Image Cart Empty"
                  style={{ height: "250px", width: "100%", objectFit: "cover" }}
                />
                <div className="px-4 text-center">
                  <h5 className="fw-bold mb-4">Carrito Vacio</h5>
                  <h6 className="mb-4">
                    Descubre nuestros productos y agrégales un lugar especial.
                  </h6>
                  <AppButton
                    label="Agrega Productos"
                    shadow="sm"
                    to="/"
                  ></AppButton>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </AppshoppingCartStyles>
  );
};
export default AppshoppingCart;

const AppshoppingCartStyles = styled.div`
  .vs-cart {
    position: absolute;
    top: 0;
    height: calc(100vh - 0px);
    z-index: 40;
  }
  .vs-products-container {
    height: 250px;
    overflow-y: auto;
    margin-bottom: 2rem;
  }
  .vs-products-container::-webkit-scrollbar {
    width: 8px;
  }
  .vs-products-container::-webkit-scrollbar-thumb {
    background: rgba(var(--color-gray-400-rgb), 0.5);
    border-radius: 5px;
  }
  .vs-cart-container {
    position: fixed;
    width: 290px;
    height: inherit;
    right: 0;
    top: inherit;
    background-color: #fff;
    box-shadow: -4px 4px 8px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.6s ease;
    transform: translateX(110%);
  }
  .vs-container-header {
    position: relative;
    padding: var(--p-5);
    text-align: center;
    border-bottom: 2px solid var(--color-body);
  }
  .vs-header-btn-action {
    width: 22px;
    height: 22px;
    top: 0;
    right: 0;
    margin: 0.5rem;
  }
  .vs-cart.open .vs-cart-container {
    transform: translateX(0);
  }
  .vs-container-row {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: var(--p-4);
    position: relative;
    border-bottom: 2px solid var(--color-body);
  }
  .vs-left-image {
    height: 70px;
    width: 70px;
  }
  .vs-left-image img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  .vs-row-right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .vs-right-col__top {
    display: flex;
    gap: 0.225rem;
    align-items: flex-start;
  }
  .vs-col-top__label {
    font-size: 14px;
  }
  .vs-right-col__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
  }
  .vs-col-btn-action {
    width: 15px;
    height: 15px;
    font-size: 15px;
  }
  .vs-right-actions {
    display: flex;
    align-items: center;
    gap: 1.225rem;
    font-size: 12px;
  }
  .vs-container-operations {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 var(--p-4);
  }
  .vs-container-operations::before {
    content: "";
    top: 0;
    position: absolute;
    width: 40%;
    border-top: 1px dashed rgba(var(--color-gray-300-rgb), 0.5);
  }
  .vs-operations-titles {
    display: flex;
    flex-direction: column;
    color: var(--color-gray-300);
    padding: var(--p-8) var(--p-4);
    font-weight: 500;
    gap: 1rem;
  }
  .vs-operations-values {
    display: flex;
    flex-direction: column;
    color: var(--color-gray-900);
    text-align: center;
    padding: var(--p-8) var(--p-4);
    font-weight: 500;
    gap: 1rem;
  }
  .vs-container-btn-buy {
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: var(--p-4);
  }
  .vs-container-btn-buy::before {
    content: "";
    top: 0;
    position: absolute;
    width: 90%;
    border-top: 1px dashed rgba(var(--color-gray-300-rgb), 0.5);
  }

  @media (min-width: 768px) {
    .vs-cart {
      top: 70px;
      height: calc(100vh - 20px);
    }
    .vs-col-btn-action {
      font-size: 15px;
    }
    .vs-col-top__label {
      font-size: 12px;
    }
    .vs-right-actions {
      gap: 1rem;
    }
  }
`;
