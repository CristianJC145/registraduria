import React, { useState, useEffect  } from 'react';
import AppButton from '../components/Buttons/AppButton';
import './css/AppNavbarProducts.css'
import AppIcon from '../components/AppIcon';
import { settings } from '../constant/settings.constants';
import { TokenService } from '../services/token.service';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../services/logout.service';
import  { useAuth }  from '../contexts/AuthContext';
import LazyImage from '../components/LazyImage';

const tokenService = new TokenService('%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9=');

const AppNavbarProducts: React.FC = () => {
  const navigate = useNavigate();
  const logout = new LogoutUser();
  const appLogo = settings.appLogo;
  const dataToken = tokenService.isAuthenticated();
  const authContext = useAuth();
  const [isLoggedIn] = useState(tokenService.isAuthenticated());
  const[isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const closeDropdown = () => {
    setDropdown(false);
  };
  const toogleNavbar = () => {
    setIsOpen(!isOpen);
    if(!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  const handleLogout  = async () => {
    await logout.run();
    closeDropdown();
    authContext.logout();
    navigate('/');
    window.location.reload();
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
        <AppButton className="openNavbar" variant='dark' icon="fa-bars" onClick={toogleNavbar} ariaLabel='Open Navbar'></AppButton>
        <div className={`vs-navbar-nav ${isOpen ? 'is-active' : ''}`}>
          <div className="vs-nav-header">
            <div className="vs-header-top">
              <a className="vs-navbar-logo" href="/">
                <LazyImage  src={appLogo} alt="Logo" />
                <span>VSHOWCASE</span>
              </a>
              <AppButton className='closeNavbar' variant='white' icon="fa-times" onClick={toogleNavbar} ariaLabel='Clase Navbar'></AppButton>
            </div>
            <div className="vs-header-actions">
              {isLoggedIn? (
                <>
                  <div className='vs-actions-profile'>
                      <AppButton className='vs-profile-btn' to="/user/profile" onClick={handleItemClick} ariaLabel='Button Profile'>
                        <LazyImage className='vs-profile-img' src="src/assets/images/1.webp" alt="Profile" />
                      </AppButton>
                      <span className='vs-profile-name'>Hola, <span>{dataToken.name}</span> </span>
                  </div>
                </>
              ) : (
                 <>
                  <AppButton variant='primary' className='vs-btn-login' to="/auth/login" label="Ingresar" onClick={handleItemClick}></AppButton>
                  <AppButton variant='primary' outlined className='vs-btn-register' to="/register/landing" label="Registrarme" onClick={handleItemClick}></AppButton>
                </>
              )
            }
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
                <LazyImage src="src/assets/images/logo_2.webp" alt="Logo"/>
            </div>
            <input type="text" placeholder="Buscar..."/>
            <AppButton variant='dark' icon="fa-search" ariaLabel='Search'></AppButton>

          </div>
        </section>
      </div>
      <div className="vs-navbar-right">
        {isLoggedIn ? (
          <div className='vs-navbar-profile'>
            <AppButton className='vs-profile-btn' to="" onClick={toggleDropdown} ariaLabel='Button Profile'>
              <LazyImage className='vs-profile-img' src="src/assets/images/1.webp" alt="" />
            </AppButton>
            {dropdown && (
              <div className='vs-profile-dropdown'>
                <div className='vs-dropdown-header'>
                  <span>Cristian Jamioy</span>
                </div>
                <AppButton variant='link' subvariant="dark" to='user/profile' label="Mi perfil" onClick={closeDropdown} ariaLabel='Button Profile'/>
                {dataToken.account_type_id === 2 && (
                  <AppButton variant='link' subvariant="dark" to='dashboard/home' label="Dashboard" onClick={closeDropdown} ariaLabel='Button Dashboard'/>
                )}
              <AppButton variant='link' subvariant="dark" href='#' label="Cerrar Sesion" onClick={handleLogout} ariaLabel='Button Sign off'/>
              </div>
            )}
          </div>
        ) : (
            <>
              <AppButton  to='auth/login' label="Ingresar"/>
              <AppButton to='register/landing' label='Registrarme' variant='primary' outlined></AppButton>
            </>
        )}
        <div className='vs-right-cart-shopping'>
          <AppButton icon="fa-cart-shopping" variant='dark' ariaLabel='Cart Shopping'></AppButton>
        </div>
      </div>

    </nav>
  );
};

export default AppNavbarProducts;