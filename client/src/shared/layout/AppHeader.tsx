import React from 'react';
import { settings } from '../constant/settings.constants';
import './css/AppHeader.css'
import LazyImage from '../components/LazyImage';
const AppHeader:React.FC = () => {
    const appLogo = settings.appLogo;
    return (
        <header>
            <div className="vs-header" >
                <a className="vs-header-container" href="/">
                    <LazyImage className="vs-header-logo" src={appLogo} alt="Logo" />
                    <span className="vs-header-title">VSHOWCASE</span>
                </a>
            </div>
        </header>
    )
}
export default AppHeader