import React from 'react';
import './css/AppHeader.css'
const AppHeader:React.FC = () => {
    return (
        <header>
            <div className="vs-header" >
                <a className="vs-header-container" href="/">
                    <img className="vs-header-logo" src="src/assets/images/logo_2.png" alt="" />
                    <span className="vs-header-title">VSHOWCASE</span>
                </a>
            </div>
        </header>
    )
}
export default AppHeader