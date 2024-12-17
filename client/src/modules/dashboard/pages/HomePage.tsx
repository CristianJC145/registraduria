import { useEffect, useRef } from "react";
import "../css/HomePage.css";
import CardOptions from "../components/CardSOptions";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../../shared/services/token.service";

const tokenService = new TokenService();

const HomePage = () => {
  const navigate = useNavigate()
  const dataToken = tokenService.isAuthenticated();
  const accionNavigate = (url:string) =>{
    navigate(url);
  }
  return (
    <>
      <div className="vs-general-statistics">
        <CardOptions
          title="Productos"
          subtitle="Gestionar agregar productos"
          icon="box"
          color="#770c00"
          onClick={()=> accionNavigate('../products')}
        ></CardOptions>
        {dataToken.idRole === 1 && (<>
          <CardOptions
            title="Usuarios"
            subtitle="Gestionar usuarios"
            icon="users"
            color="#280077"
            onClick={()=> accionNavigate('../users')}
          ></CardOptions>
          <CardOptions
            title="Funcionarios"
            subtitle="Gestionar funcionarios"
            icon="building-user"
            color="#00776f"
            onClick={()=> accionNavigate('../employees')}
          ></CardOptions>
          <CardOptions
            title="Productos Admin"
            subtitle="Gestionar productos Admin"
            icon="database"
            color="#107700"
            onClick={()=> accionNavigate('../admin-products')}
          ></CardOptions>
        </>)}
        <CardOptions
          title="Mi perfil"
          subtitle="Configuracion del perfil"
          icon="tools"
          color="#6f0077"
          onClick={()=> accionNavigate('../account-settings')}
        ></CardOptions>
      </div>
    </>
  );
};

export default HomePage;
