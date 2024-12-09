import { useEffect, useRef } from "react";
import "../css/HomePage.css";
import CardOptions from "../components/CardSOptions";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const accionNavigate = (url:string) =>{
    navigate(url);
  }
  return (
    <>
      <div className="vs-general-statistics">
        <CardOptions
          title="Usuarios"
          subtitle="Gestionar usuarios"
          icon="users"
          color="#280077"
          onClick={()=> accionNavigate('../users')}
        ></CardOptions>
        <CardOptions
          title="Productos"
          subtitle="Gestionar agregar productos"
          icon="box"
          color="#770c00"
          onClick={()=> accionNavigate('../products')}
        ></CardOptions>
        <CardOptions
          title="Productos Admin"
          subtitle="Gestionar productos Admin"
          icon="database"
          color="#107700"
          onClick={()=> accionNavigate('../admin-products')}
        ></CardOptions>
        <CardOptions
          title="Mi perfil"
          subtitle="Configuracion del perfil"
          icon="tools"
          color="#6f0077"
          onClick={()=> accionNavigate('../admin-products')}
        ></CardOptions>
      </div>
    </>
  );
};

export default HomePage;
