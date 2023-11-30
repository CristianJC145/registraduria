import React, { ReactNode, useEffect, useState } from "react";
import AppFooter from "./AppFooter";
import AppNavbarProducts from "./AppNavbarProducts";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import AppshoppingCart from "./AppShoppingCart";
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
      <AppNavbarProducts toggleCart={toggleCart}></AppNavbarProducts>
      <AppshoppingCart isOpen={isCartOpen}></AppshoppingCart>
      <main className="mainContent">{children}</main>
      <AppFooter></AppFooter>
    </ShoppingCartProvider>
  );
};

export default VshowcaseLayout;
