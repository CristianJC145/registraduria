import styled from "styled-components";
import AppCard from "../../../shared/components/AppCard/AppCard";
import { settings } from "../../../shared/constant/settings.constants";
import { TokenService } from "../../../shared/services/token.service";
import { Link } from "react-router-dom";
import AppIcon from "../../../shared/components/AppIcon";
import AcountForm from "../components/AccountForm";
import { useState } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";

const tokenService = new TokenService()
const AccountUserPage = () => {
  const appLogo = settings.appLogo;
  const dataToken = tokenService.isAuthenticated();
  const role = dataToken.idRole === 1 ? 'Administrador' : 'Usuario'
  const [activeTab, setActiveTab] = useState("tab1")
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  }
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
                    <div className="vs-info-name">{dataToken.username}</div>
                    <div className="vs-info-type__account">{role}</div>
                  </div>
                </div>
                <div className="vs-tools-body">
                  <Link
                    onClick={()=> handleTabClick("tab1")}
                    className={`vs-body-option ${activeTab === "tab1" ? "selected" : ""}`}
                    to="#"
                  >
                    <AppIcon icon="user"></AppIcon>
                    <span>Informacion General</span>
                  </Link>

                  <Link className={`vs-body-option ${activeTab === "tab2" ? "selected" : ""}`} to="#" onClick={()=> handleTabClick("tab2")}>
                    <AppIcon icon="lock"></AppIcon>
                    <span>Cambiar Contraseña</span>
                  </Link>
                  <Link className={`vs-body-option ${activeTab === "tab3" ? "selected" : ""}`} to="#" onClick={()=> handleTabClick("tab3")}>
                    <AppIcon icon="gear"></AppIcon>
                    <span>Configuracion de Usuario</span>
                  </Link>
                </div>
              </>
            }
          ></AppCard>
        </div>
        {activeTab === "tab1" && (
          <div className="vs-account-form">
            <AppCard
              body={
                <>
                  <div className="vs-form-title">
                    <h5>Información General</h5>
                  </div>
                  <div className="vs-form-content">
                    <AcountForm dataToken={dataToken}></AcountForm>
                  </div>
                </>
              }
            ></AppCard>
          </div>
        )}

        {activeTab === "tab2" && (
          <div className="vs-password-form">
            <AppCard
              body={
                <>
                  <div className="vs-form-title">
                    <h5>Cambio de Contraseña</h5>
                  </div>
                  <div className="vs-form-content">
                    <ChangePasswordForm dataToken={dataToken} onSave={()=> handleTabClick("tab1")}></ChangePasswordForm>
                  </div>
                </>
              }
            ></AppCard>
          </div>
        )}
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
  .vs-account-form, .vs-password-form {
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
  .vs-form-title {
    padding-bottom: var(--p-5);
    border-bottom: 2px solid var(--color-body);
  }
  .vs-form-title h5 {
    margin-bottom: 0;
  }
  .selected {
    font-weight: bold;
    color: var(--color-primary);
  }
  @media (min-width: 768px) {
    .vs-account-tools {
      grid-column: span 4 / span 4;
      display: block;
    }
    .vs-account-form, .vs-password-form {
      grid-column: span 8 / span 8;
    }
  }
`;
