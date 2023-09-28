import React from 'react';
import './AppFooter.css'

import AppButton from '../../shared/components/Buttons/AppButton';

const AppFooter:React.FC = () => {
    return (
        <footer>
            <div className="vs-footer-left" >
                <span>@ 2023 Vshowcase. Todos los derechos reservados</span>
            </div>

            <div className="vs-footer-right" >
                <AppButton type='button' icon="fa-brands fa-instagram" variant='dark'></AppButton>
                <AppButton type='button' icon="fa-brands fa-youtube" variant='dark'></AppButton>
                <AppButton type='button' icon="fa-brands fa-twitter" variant='dark'></AppButton>
            </div>
        </footer>
    )
}
export default AppFooter