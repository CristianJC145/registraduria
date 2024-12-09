import React from 'react';
import { settings } from '../constant/settings.constants';
import styled from 'styled-components';
import LazyImage from '../components/LazyImage';
const AppHeader:React.FC = () => {
    const appLogo = settings.appLogo;
    return (
        <AppHeaderStyles>
            <header>
                <div className="vs-header" >
                    <a className="vs-header-container" href="/">
                        <LazyImage className="vs-header-logo" src={appLogo} alt="Logo" />
                        <span className="vs-header-title">Registraduria</span>
                    </a>
                </div>
            </header>
        </AppHeaderStyles>
    )
}
export default AppHeader

const AppHeaderStyles = styled.div`
.vs-header {
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: var(--p-3);
}

.vs-header-container {
    margin: 0 auto;
    text-decoration: none;
}
.vs-header-title {
    color: var(--color-gray-400);
    font-size: 16px;
    font-weight: bold;
}
.vs-header-logo {
    height: 40px;
    width: 40px;
    object-fit: contain;
    margin-right: 0.5rem;
}
`