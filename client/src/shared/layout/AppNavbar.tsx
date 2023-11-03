import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './css/AppNavbar.css'
import AppButton from "../components/Buttons/AppButton";
import AppIcon from "../components/AppIcon";
import LazyImage from "../components/LazyImage";
import { useAuth } from "../contexts/AuthContext";
import { LogoutUser } from "../services/logout.service";
import { settings } from "../constant/settings.constants";

interface AppNavbarProps {
    toggleSidebar: () => void;
}
const AppNavbar :React.FC <AppNavbarProps> = ({toggleSidebar}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const appLogo = settings.appLogo;
    const logout = new LogoutUser();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const [dropdown, setDropdown] = useState(false);
    const authContext = useAuth();


    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const closeDropdown = () => {
        setDropdown(false);
    };
    const handleLogout  = async () => {
        await logout.run();
        closeDropdown();
        authContext.logout();
        navigate('/');
        window.location.reload();
    }
    return (
        <nav className="vs-AppNavbar">
            <div className="vs-left-nav">
                <AppButton variant="dark" icon="bars" className="vs-btn-openSidebar" onClick={toggleSidebar}></AppButton>
                <div className="vs-nav-breadcrumbs">
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const isActive = isLast && pathnames.length > 1;
                        if (index >= 1){
                            return (
                                <span key={name} className={`vs-breadcrumbs-item ${isActive ? "active" : ""}`}>
                                {isLast ? name : <>
                                    <Link className="vs-item-link" to={routeTo}>{name}</Link>
                                    <AppIcon icon="angle-right"></AppIcon>
                                </>}
                                </span>
                            );
                            }
                        }
                    )}
                </div>
            </div>
            <div className="vs-right-nav">
                <AppButton icon="bell" variant="dark" ariaLabel="Notifications"></AppButton>
                <div className='vs-navbar-profile'>
                    <AppButton className='vs-profile-btn' to="" onClick={toggleDropdown} ariaLabel='Button Profile'>
                    <LazyImage className='vs-profile-img' src={appLogo} alt="" />
                    </AppButton>
                    {dropdown && (
                    <div className='vs-profile-dropdown'>
                        <div className='vs-dropdown-header'>
                        <span>Cristian Jamioy</span>
                        </div>
                        <AppButton variant='link' subvariant="dark" to='user/profile' label="Mi perfil" onClick={closeDropdown} ariaLabel='Button Profile'/>
                        <AppButton variant='link' subvariant="dark" href='#' label="Cerrar Sesion" onClick={handleLogout} ariaLabel='Button Sign off'/>
                    </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
export default AppNavbar;