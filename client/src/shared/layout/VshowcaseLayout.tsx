import React, { ReactNode, useEffect, useState } from "react";
import AppFooter from "./AppFooter";
import AppNavbarProducts from "./AppNavbarProducts";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import AppshoppingCart from "./AppShoppingCart";
import styled from "styled-components";
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const VshowcaseLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isCartOpen && !target.closest(".vs-cart-container, .vs-navbar")) {
      setIsCartOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartOpen]);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <ShoppingCartProvider>
      <VshowcaseLayoutStyles>
        <AppshoppingCart isOpen={isCartOpen}></AppshoppingCart>
        <main className="mainContent">
          <AppNavbarProducts toggleCart={toggleCart}></AppNavbarProducts>
          <div className="vs-content">{children}</div>
          <AppFooter></AppFooter>
        </main>
      </VshowcaseLayoutStyles>
    </ShoppingCartProvider>
  );
};

export default VshowcaseLayout;
const VshowcaseLayoutStyles = styled.div`
  .mainContent {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .vs-content {
    padding: var(--p-6) var(--p-6);
    flex-grow: 1;
    background-color: #fff;
    margin-top: 80px;
  }
  @media (min-width: 768px) {
    .vs-content {
      margin-top: 70px;
    }
  }
`;
