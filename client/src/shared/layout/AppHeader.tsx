import React from 'react';
import { settings } from '../constant/settings.constants';
import './css/AppHeader.css'
const AppHeader:React.FC = () => {
    const appLogo = settings.appLogo;
    return (
        <header>
            <div className="vs-header" >
                <a className="vs-header-container" href="/">
                    <img className="vs-header-logo" src={appLogo} alt="" />
                    <span className="vs-header-title">VSHOWCASE</span>
                </a>
            </div>
        </header>
    )
}
export default AppHeader