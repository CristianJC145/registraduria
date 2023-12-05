import styled from "styled-components";
import AppCard from "../../../shared/components/AppCard/AppCard";
import { settings } from "../../../shared/constant/settings.constants";
import { Link } from "react-router-dom";
import AppButton from "../../../shared/components/Buttons/AppButton";
import AppIcon from "../../../shared/components/AppIcon";

const AccountUserPage = () => {
  const appLogo = settings.appLogo;
  return (
    <AccountUserPageStyle>
      <div className="vs-account">
        <div className="vs-account-tools">
          <AppCard
            body={
              <>
                <div className="vs-tools-header">
                  <div className="vs-header-logo">
                    <img src={appLogo} alt="Image Profile User" />
                  </div>
                  <div className="vs-header-info">
                    <div className="vs-info-name">Cristian Jamioy</div>
                    <div className="vs-info-type__account">Empresa</div>
                  </div>
                </div>
                <div className="vs-tools-body">
                  <Link className="vs-body-option" to="information">
                    <AppIcon icon="user"></AppIcon>
                    <span>Informacion General</span>
                  </Link>
                  <Link className="vs-body-option" to="information">
                    <AppIcon icon="lock"></AppIcon>
                    <span>Cambiar Contraseña</span>
                  </Link>
                  <Link className="vs-body-option" to="information">
                    <AppIcon icon="gear"></AppIcon>
                    <span>Configuracion de Usuario</span>
                  </Link>
                </div>
              </>
            }
          ></AppCard>
        </div>
        <div className="vs-account-form">
          <AppCard
            body={
              <div className="vs-form-title">
                <h5>Informacion General</h5>
              </div>
            }
          ></AppCard>
        </div>
      </div>
    </AccountUserPageStyle>
  );
};
export default AccountUserPage;

const AccountUserPageStyle = styled.div`
  .vs-account {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
  }
  .vs-account-tools {
    grid-column: span 12 / span 12;
    display: flex;
  }
  .vs-tools-header {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: var(--p-6);
  }
  .vs-header-logo {
    width: 3rem;
    height: 3rem;
    position: relative;
  }
  .vs-header-logo img {
    border-radius: 99px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .vs-header-info {
    margin-right: auto;
    margin-left: 1rem;
  }
  .vs-account-form {
    grid-column: span 12 / span 12;
  }
  .vs-info-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5rem;
  }
  .vs-info-type__account {
    color: var(--color-gray-300);
  }
  .vs-tools-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: var(--p-6);
    border-top: 2px solid var(--color-body);
  }
  .vs-body-option {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-gray-400);
    letter-spacing: 0.5px;
    gap: 0.5rem;
  }
  @media (min-width: 768px) {
    .vs-account-tools {
      grid-column: span 4 / span 4;
      display: block;
    }
    .vs-account-form {
      grid-column: span 8 / span 8;
    }
  }
`;
