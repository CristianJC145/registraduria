import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { LoginUser } from './services/loginUser.service';
import './css/Register.css'
import AppIcon from '../../shared/components/AppIcon';
import { useAuth } from '../../shared/contexts/AuthContext';
import { TokenService } from '../../shared/services/token.service';

const tokenService = new TokenService();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const location = useLocation();
  const { from } = (location.state as { from: { pathname: string } }) || { from: { pathname: '/dashboard/home' } };
  const [formData, setFormData] = useState<any>({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    }
  });  
  const [serverErrorMensage, setServerErrorMensage] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  useEffect(() =>{
    if (isLoggedIn) {
      let url = from.pathname;
      navigate(url);
    }
  }, [isLoggedIn, from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    const requiredFields = ['email', 'password'];

    e.preventDefault();
    try {
        for (const field of requiredFields) {
          if (!formData[field]) {
            setErrorMessage(prevErrors => ({
              ...prevErrors,
              [field]: `Por favor, completa el campo ${field}.`,
            }));
            return;
          }
        }
        await LoginUser(formData);
        const decodedData = tokenService.isAuthenticated();
        console.log("data decodificada: ",decodedData);
        if (decodedData) {
          if (decodedData.idStatus !== 1) {
            setServerErrorMensage('Tu cuenta no está activa. Contacta al administrador.');
            return;
          }

          login(decodedData);
          navigate(from.pathname);
        }
    } catch (error: any) {
      setServerErrorMensage(error.response?.data?.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (!value) {
      setErrorMessage(prevErrors => ({
        ...prevErrors,
        [name]: `Por favor, completa el campo ${name}.`,
      }));
    } else {
      setErrorMessage(prevErrors => ({
        ...prevErrors,
        [name]: '', 
      }));
    }
  };
  return (
    <div className="vs-section-form">
      <div className="vs-form-register">
        <h2 className="vs-form-title">Iniciar Sesión</h2>
        <form className="vs-form-content" onSubmit={handleSubmit}>
          <AppFormField label="Nombre de usuario" name='email' type="text" value={formData.email} onChange={handleChange} errorMessage={errorMessage.email}></AppFormField>
          <AppFormField label="Contraseña" name='password' type="password" value={formData.password} onChange={handleChange} errorMessage={errorMessage.password}></AppFormField>
          {serverErrorMensage && (
            <div className="vs-form-box-error">
              <div className="vs-form-error-message">
                <AppIcon icon="fa-exclamation-triangle" className='me-1 fs-6'></AppIcon>
                {serverErrorMensage}
              </div>
            </div>
          )}
          <AppButton className='mt-3' label='Guardar' shadow='sm'></AppButton>
        </form>
      </div>
      <div className='vs-section-terms'>
        <span>¿Olvidaste tu contraseña?</span>
        <AppButton variant='link' to="/auth/recovery-password" label=' recuperarla aqui'></AppButton>
      </div>
      
      <div className="vs-section-actions">
        <span className='vs-actions-label'>¿No tienes cuenta?</span>
        <AppButton variant='link' to="/register/landing" label='Crear Cuenta'></AppButton>
      </div>
    </div>
  );
};

export default Login;