import AppButton from '../../../shared/components/Buttons/AppButton';
import CardComponent from '../components/AccountTypeCard';
import gif from '../../../assets/images/urban-842.gif'
import gif_buy from '../../../assets/images/buy.gif'
import '../css/AccountSelectionPage.css'

function RegisterLanding() {
    return (
        <div className="account-selection-page">
            <div className="account-cards">
                <CardComponent
                    imageSrc={gif}
                    title="Crear Cuenta Empresarial"
                    description="Vende y administra tus productos con un dashboard para las empresas."
                >
                    <AppButton to={`/register/count/business?type=business`} label='Continuar'></AppButton>
                </CardComponent>

                <CardComponent
                    imageSrc={gif_buy}
                    title="Crear Cuenta Personal"
                    description="Compra tus productos con una amplia gama de facilidades de pago."
                >
                   <AppButton to={`/register/count/personal?type=personal`} label='Continuar'></AppButton>
                </CardComponent>
            </div>
        </div>
    )
}

export default RegisterLanding;