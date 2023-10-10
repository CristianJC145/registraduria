import React, { useState, useEffect } from 'react';
import AppButton from '../components/Buttons/AppButton';
import './css/AppNavbarProducts.css'
import AppIcon from '../components/AppIcon';
import { settings } from '../constant/settings.constants';

const AppNavbarProducts: React.FC = () => {
  const appLogo = settings.appLogo;
  const[isOpen, setIsOpen] = useState(false);
  const toogleNavbar = () =>{
    setIsOpen(!isOpen);
    if(!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isOpen && !target.closest('.vs-navbar-nav')) {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
  };
  const handleItemClick = () => {
    setIsOpen(false);
    document.body.classList.remove('no-scroll');
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <nav className="vs-navbar">
      {isOpen && <div className="overlay"></div>}
      <div className="vs-navbar-left">
        <AppButton className="openNavbar" icon="fa-bars" onClick={toogleNavbar} ariaLabel='Open Navbar'></AppButton>
        <div className={`vs-navbar-nav ${isOpen ? 'is-active' : ''}`}>
          <div className="vs-nav-header">
            <div className="vs-header-top">
              <a className="vs-navbar-logo" href="/">
                <img src={appLogo} alt="" />
                <span>VSHOWCASE</span>
              </a>
              <AppButton className='closeNavbar' variant='white' icon="fa-times" onClick={toogleNavbar} ariaLabel='Clase Navbar'></AppButton>
            </div>
            <div className="vs-header-actions">
              <AppButton variant='light' outlined className='vs-btn-login' to="/login" label="Ingresar" shadow='sm' onClick={handleItemClick}></AppButton>
              <AppButton variant='light' className='vs-btn-register' to="/register/landing" label="Registrarme" shadow='sm' onClick={handleItemClick}></AppButton>
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
                <img src="src/assets/images/logo_2.png" alt="Logo"/>
            </div>
            <input type="text" placeholder="Buscar..."/>
            <AppButton variant='dark' icon="fa-search" ariaLabel='Search'></AppButton>

          </div>
        </section>
      </div>
      <div className="vs-navbar-right">
        <AppButton label="Ingresar" to='login'/>
        <AppButton to='register/landing' label='Registrarme' variant='light' shadow='sm'></AppButton>
        <AppButton icon="fa-cart-shopping" ariaLabel='Cart Shopping'></AppButton>
      </div>

    </nav>
  );
};

export default AppNavbarProducts;