import React, { useState, useEffect } from "react";
import AppButton from "../components/Buttons/AppButton";
import styled from "styled-components";

import AppIcon from "../components/AppIcon";
import LazyImage from "../components/LazyImage";

import { settings } from "../constant/settings.constants";
import { TokenService } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../services/logout.service";
import { useAuth } from "../contexts/AuthContext";

const tokenService = new TokenService(
  "%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9="
);

interface AppNavbarProductsProps {
  toggleCart: () => void;
}

const AppNavbarProducts: React.FC<AppNavbarProductsProps> = ({
  toggleCart,
}) => {
  const navigate = useNavigate();
  const logout = new LogoutUser();
  const appLogo = settings.appLogo;
  const dataToken = tokenService.isAuthenticated();
  const authContext = useAuth();
  const [isLoggedIn] = useState(tokenService.isAuthenticated());
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const toogleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };
  const handleLogout = async () => {
    await logout.run();
    authContext.logout();
    navigate("/");
    window.location.reload();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isOpen && !target.closest(".vs-navbar-nav")) {
      setIsOpen(false);
      document.body.classList.remove("no-scroll");
    }
    if (
      dropdown &&
      !target.closest(".vs-profile-dropdown") &&
      !target.closest(".vs-profile-btn")
    ) {
      console.log(dropdown);

      setDropdown(false);
    }
  };
  const handleItemClick = () => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };
  const performSearch = () => {
    navigate(`/list/${searchTerm}`);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, dropdown]);
  return (
    <AppNavbarProductsStyle>
      <div className="vs-navbar-containter">
        {isOpen && <div className="overlay"></div>}
        <nav className="vs-navbar">
          <div className="vs-navbar-left">
            <AppButton
              className="openNavbar"
              variant="dark"
              icon="fa-bars"
              onClick={toogleNavbar}
              ariaLabel="Open Navbar"
            ></AppButton>
            <div className={`vs-navbar-nav ${isOpen ? "is-active" : ""}`}>
              <div className="vs-nav-header">
                <div className="vs-header-top">
                  <a className="vs-navbar-logo" href="/">
                    <LazyImage src={appLogo} alt="Logo" />
                    <span>VSHOWCASE</span>
                  </a>
                  <AppButton
                    className="closeNavbar"
                    variant="white"
                    icon="fa-times"
                    onClick={toogleNavbar}
                    ariaLabel="Clase Navbar"
                  ></AppButton>
                </div>
                <div className="vs-header-actions">
                  {isLoggedIn ? (
                    <>
                      <div className="vs-actions-profile">
                        <AppButton
                          className="vs-profile-btn"
                          to="dashboard/account"
                          onClick={handleItemClick}
                          ariaLabel="Button Profile"
                        >
                          <LazyImage
                            className="vs-profile-img"
                            src="src/assets/images/1.webp"
                            alt="Profile"
                          />
                        </AppButton>
                        <span className="vs-profile-name">
                          Hola, <span>{dataToken.name}</span>{" "}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <AppButton
                        variant="primary"
                        className="vs-btn-login"
                        to="/auth/login"
                        label="Ingresar"
                        onClick={handleItemClick}
                      ></AppButton>
                      <AppButton
                        variant="primary"
                        outlined
                        className="vs-btn-register"
                        to="/register/landing"
                        label="Registrarme"
                        onClick={handleItemClick}
                      ></AppButton>
                    </>
                  )}
                </div>
              </div>
              <div className="vs-nav-links">
                <a className="vs-nav-link vs-nav-categories" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-list"></AppIcon>
                  Categorias
                </a>
                <a className="vs-nav-link" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-tags"></AppIcon>
                  Ofertas
                </a>
                <a className="vs-nav-link vs-nav-show" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-heart"></AppIcon>
                  Favoritos
                </a>
                <a className="vs-nav-link" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-user-tag"></AppIcon>
                  Vender
                </a>
                <a className="vs-nav-link" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-clock"></AppIcon>
                  Historial
                </a>
                <a className="vs-nav-link vs-nav-show" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-bell"></AppIcon>
                  Notificaciones
                </a>
                <a className="vs-nav-link vs-nav-show" href="#">
                  <AppIcon className="vs-nav-icon" icon="fa-user-alt"></AppIcon>
                  Mi cuenta
                </a>
              </div>
            </div>

            <section className="vs-section-search-bar">
              <div className="vs-search-bar">
                <div className="vs-logo">
                  <LazyImage src={appLogo} alt="Logo" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  onChange={handleInputChange}
                  value={searchTerm}
                  onKeyDown={handleKeyDown}
                />
                <AppButton
                  variant="dark"
                  icon="fa-search"
                  ariaLabel="Search Product"
                  onClick={handleSearch}
                ></AppButton>
              </div>
            </section>
          </div>
          <div className="vs-navbar-right">
            {isLoggedIn ? (
              <div className="vs-navbar-profile">
                <AppButton
                  className="vs-profile-btn"
                  to=""
                  onClick={toggleDropdown}
                  ariaLabel="Button Profile"
                >
                  <LazyImage className="vs-profile-img" src={appLogo} alt="" />
                </AppButton>
                {dropdown && (
                  <div className="vs-profile-dropdown">
                    <div className="vs-dropdown-header">
                      <span>{dataToken.name}</span>
                    </div>
                    <AppButton
                      variant="link"
                      className="vs-dropdown-link"
                      to="dashboard/account"
                      label="Mi perfil"
                      ariaLabel="Button Profile"
                    />
                    {dataToken.account_type_id === 2 && (
                      <AppButton
                        variant="link"
                        className="vs-dropdown-link"
                        to="dashboard/home"
                        label="Dashboard"
                        ariaLabel="Button Dashboard"
                      />
                    )}
                    <AppButton
                      variant="link"
                      className="vs-dropdown-link"
                      href="#"
                      label="Cerrar Sesion"
                      onClick={handleLogout}
                      ariaLabel="Button Sign off"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="vs-profile-btn__group">
                <AppButton to="auth/login" label="Ingresar" />
                <AppButton
                  to="register/landing"
                  label="Registrarme"
                  variant="primary"
                  outlined
                ></AppButton>
              </div>
            )}
            <div className="vs-right-cart-shopping">
              <AppButton
                icon="fa-cart-shopping"
                variant="dark"
                ariaLabel="Cart Shopping"
                onClick={toggleCart}
              ></AppButton>
            </div>
          </div>
        </nav>
      </div>
    </AppNavbarProductsStyle>
  );
};

export default AppNavbarProducts;

const AppNavbarProductsStyle = styled.div`
  .vs-navbar-containter {
    position: absolute;
    top: 0;
    z-index: 40;
    width: 100%;
  }
  .vs-navbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: var(--navbar-height);
    padding: 0 var(--p-3);
    z-index: 6;
    border-bottom: 2px solid rgba(var(--color-gray-900-rgb), 0.05);
  }

  .vs-navbar-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 1rem;
    padding: var(--p-7) var(--p-4);
  }
  .vs-navbar-logo img {
    margin-right: 0.5rem;
    display: inline-block;
    height: 30px;
    width: 30px;
  }
  .vs-navbar-logo span {
    color: var(--color-light);
    font-weight: 600;
  }
  .vs-navbar-left {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
  }
  .vs-right-cart-shopping {
    margin-left: 1rem;
    padding-left: var(--p-2);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .vs-navbar-nav {
    display: flex;
    position: fixed;
    top: 0;
    left: -300px;
    bottom: 0;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    background-color: #f5f7fa;
    border-radius: 20px;
    transition: all 0.4s ease;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.16);
    z-index: 20;
  }

  .vs-navbar-nav.is-active {
    left: 10px;
  }
  .vs-navbar-right {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .vs-nav-header {
    display: flex;
    flex-direction: column;
  }
  .vs-header-top {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-primary);
    border-radius: 16px 16px 0 0;
  }
  .vs-header-actions {
    display: flex;
    gap: 0.5rem;
    padding: var(--p-4);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .vs-actions-profile {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .vs-profile-btn {
    background-color: #fff;
    border: 2px solid rgba(var(--color-gray-400-rgb), 0.075);
    border-radius: 999px;
    padding: 0.225rem;
  }
  .vs-profile-btn: hover {
    background-color: rgba(var(--color-gray-400-rgb), 0.05);
    border-color: rgba(var(--color-gray-400-rgb), 0.1);
  }
  .vs-profile-dropdown {
    position: absolute;
    z-index: 10;
    width: 13rem;
    padding: var(--p-4);
    border-radius: 10px;
    background-color: var(--color-light);
    box-shadow: 0 0 15px rgba(106, 106, 106, 0.6);
    inset: 0px 0px auto auto;
    transform: translate(30px, 45px);
  }
  .vs-dropdown-header {
    padding: var(--p-4);
    font-weight: bold;
    border-bottom: 1px solid rgba(var(--color-gray-900-rgb), 0.1);
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .vs-dropdown-link {
    display: flex;
    padding: var(--p-4);
    border-radius: 8px;
    justify-content: start;
    color: var(--color-gray-800);
  }

  .vs-navbar-profile {
    position: relative;
  }
  .vs-profile-btn__group {
    display: none;
    gap: 0.5rem;
  }
  .vs-profile-img {
    height: 30px;
    width: 30px;
    object-fit: cover;
    border-radius: 999px;
  }
  .vs-profile-name {
    color: var(--color-dark);
    margin-left: 10px;
    letter-spacing: 1px;
  }
  .vs-profile-name span {
    font-weight: bold;
  }
  .vs-btn-login {
    flex: 1 1 auto;
  }
  .vs-nav-links {
    display: flex;
    flex-direction: column;
    padding: 0 var(--p-4);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  .vs-nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: var(--color-gray-400);
    padding: var(--p-4) var(--p-2);
  }
  .vs-nav-link:hover {
    color: var(--color-gray-300);
  }
  .vs-nav-link:focus {
    color: var(--color-primary);
  }
  .vs-navbar-left input {
    display: inline-block;
  }
  .closeNavbar {
    margin: 0.5rem;
  }
  .vs-section-search-bar {
    display: flex;
    flex: 1 1 auto;
    justify-content: space-between;
    align-items: center;
    padding: var(--p-2) var(--p-4);
    color: #fff;
    background-color: transparent;
  }

  .vs-logo img {
    height: 20px;
    width: 20px;
  }

  .vs-search-bar {
    display: flex;
    align-items: center;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.05);
    background-color: var(--color-body);
    padding: 0 var(--p-3);
    border-radius: 8px;
    width: 100%;
  }
  .vs-search-bar:hover {
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.09);
  }

  .vs-search-bar input[type="text"] {
    padding: 0 var(--p-3);
    border: none;
    flex-grow: 1;
    width: 100%;
    background-color: transparent;
    color: var(--color-gray-700);
    letter-spacing: 0.5px;
  }

  .vs-search-bar input[type="text"]:focus-visible {
    outline: none;
  }

  button {
    padding: 5px 10px;
    background-color: var(--color-primary);
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }

  .vs-search-bar input[type="text"]::placeholder {
    color: rgba(var(--color-gray-300-rgb), 0.6);
    margin-left: 10px;
    font-weight: bold;
  }

  .vs-user-menu {
    display: flex;
    flex-direction: column;
    width: 150px;
    padding: var(--p-4);
    background-color: var(--color-body);
    border-radius: var(--radius-1);
    position: absolute;
    right: 1rem;
    top: calc(var(--navbar-height) - 1rem);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .vs-menu-item {
    text-decoration: none;
    color: #fff;
  }
  @media (min-width: 768px) {
    .vs-navbar-containter {
      top: 70px;
      height: calc(100vh - 20px);
      width: initial;
    }
    .vs-profile-btn__group {
      display: flex;
    }
    .vs-navbar {
      width: 100%;
      position: fixed;
      top: 0;
    }
    .vs-profile-dropdown {
      width: 15rem;
      transform: translate(0, 45px);
    }
    .vs-header-actions {
      display: none;
    }
    .vs-profile-img {
      height: 35px;
      width: 35px;
    }
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
    .vs-navbar {
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 var(--p-4);
    }

    .vs-navbar-left {
      flex: 1 1 auto;
      margin-right: 2rem;
    }

    .vs-navbar-nav {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-direction: row;
      top: unset;
      left: unset;
      bottom: unset;
      margin-left: 0;
      padding: 0;
      position: relative;
      background-color: unset;
      max-width: none;
      width: auto;
      box-shadow: none;
      transition: unset;
    }
    .vs-header-top {
      background-color: inherit;
    }
    .vs-nav-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border: unset;
      padding: 0;
    }
    .vs-navbar-logo {
      padding: 0;
    }
    .vs-navbar-logo span {
      color: var(--color-gray-700);
    }
    .vs-nav-link {
      color: var(--color-gray-700);
      padding: 0 var(--p-4);
    }
    .vs-nav-link:focus {
      color: var(--color-gray-400);
    }
    .vs-nav-categories {
      position: relative;
    }
    .vs-nav-categories::after {
      border-style: solid;
      border-width: 0 1.5px 1.5px 0;
      content: "";
      display: inline-block;
      height: 6px;
      transform: rotate(45deg);
      width: 6px;
      color: rgba(255, 255, 255);
      margin: 0;
      bottom: 9px;
      right: 2px;
      position: absolute;
      padding: 2px;
    }
    .closeNavbar,
    .openNavbar,
    .vs-nav-show,
    .overlay,
    .vs-nav-link .vs-nav-icon {
      display: none;
    }
    .no-scroll {
      overflow: initial;
    }
  }
`;
