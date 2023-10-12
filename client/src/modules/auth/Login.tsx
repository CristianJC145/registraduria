import React, { useState } from 'react';
import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { loginUser } from './services/loginUser.service';
import './css/Register.css'

const Login: React.FC = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });  

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await loginUser(formData);
      } catch (error) {
      console.log(error);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="vs-section-form">
      <div className="vs-form-register">
        <h2 className="vs-form-title">Iniciar Sesión</h2>
        <form className="vs-form-content" onSubmit={handleSubmit}>
          <AppFormField label="E-mail" name='email' type="text" value={formData.email} onChange={handleChange}></AppFormField>
          <AppFormField label="Contraseña" name='password' type="password" value={formData.password} onChange={handleChange}></AppFormField>
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