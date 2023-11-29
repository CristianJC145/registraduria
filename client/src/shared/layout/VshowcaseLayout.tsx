import React, { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppNavbarProducts from "./AppNavbarProducts";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import AppshoppingCart from "./AppShoppingCart";
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const VshowcaseLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <ShoppingCartProvider>
      <AppNavbarProducts></AppNavbarProducts>
      <AppshoppingCart></AppshoppingCart>
      <main className="mainContent">{children}</main>
      <AppFooter></AppFooter>
    </ShoppingCartProvider>
  );
};

export default VshowcaseLayout;
