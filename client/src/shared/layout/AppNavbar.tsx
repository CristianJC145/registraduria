import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/AppNavbar.css'
import AppButton from "../components/Buttons/AppButton";
import AppIcon from "../components/AppIcon";

interface AppNavbarProps {
    toggleSidebar: () => void;
}
const AppNavbar :React.FC <AppNavbarProps> = ({toggleSidebar}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
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
                <div>
                    <AppButton icon="bell" variant="dark"></AppButton>
                </div>
            </div>

        </nav>
    )
}
export default AppNavbar;