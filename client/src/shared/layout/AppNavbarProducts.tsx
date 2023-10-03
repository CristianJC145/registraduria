import React, { useState, useEffect } from 'react';
import AppButton from '../components/Buttons/AppButton';
import './css/AppNavbarProducts.css'
import AppIcon from '../components/AppIcon';

const AppNavbarProducts: React.FC = () => {
  const[isOpen, setIsOpen] = useState(false);
  const toogleNavbar = () =>{
    setIsOpen(!isOpen);
  }
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isOpen && !target.closest('.vs-navbar-nav')) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <nav className="vs-navbar">
      <div className="vs-navbar-left">
        <AppButton className="openNavbar" icon="fa-bars" onClick={toogleNavbar}></AppButton>
        <div className={`vs-navbar-nav ${isOpen ? 'is-active' : ''}`}>
          <div className="vs-nav-header">
            <a className="vs-navbar-logo" href="/">
              <img src="src/assets/images/logo_2.png" alt="" />
              <span>VSHOWCASE</span>
            </a>
            <AppButton className='closeNavbar' variant='dark' icon="fa-times" onClick={toogleNavbar}></AppButton>
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

        <section>
          <div className="vs-search-bar">
            <div className="vs-logo">
                <img src="src/assets/images/logo_2.png" alt="Logo"/>
            </div>
            <input type="text" placeholder="Buscar..."/>
            <AppButton variant='dark' icon="fa-search"></AppButton>

          </div>
        </section>
      </div>
      <div className="vs-navbar-right">
        <AppButton label="Ingresar" to='login'/>
        <AppButton to='register' label='Registrarme' variant='light' shadow='sm'></AppButton>
        <AppButton variant="primary" icon="fa-user"></AppButton>
        <AppButton icon="fa-cart-shopping"></AppButton>
      </div>
    </nav>
  );
};

export default AppNavbarProducts;