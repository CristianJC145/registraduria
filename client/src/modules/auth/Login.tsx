import React, { useState } from 'react';
import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { loginUser } from './services/loginUser.service';
import './css/Register.css'

const Login: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    }
  });  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    const requiredFields = ['email', 'password'];

    e.preventDefault();
    try {
        for (const field of requiredFields) {
          if (!formData[field]) {
            setErrorMessage(`Por favor, completa el campo ${field}.`);
            return;
          }
        }
        await loginUser(formData);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: { errors: any; }) => ({
    ...prevState,
    [name]: e.target.value,
    errors: {
      ...prevState.errors,
      [name]: value.trim() ? '' : `Por favor, completa el campo ${name}.`,
    }
    }));
  };
  return (
    <div className="vs-section-form">
      <div className="vs-form-register">
        <h2 className="vs-form-title">Iniciar Sesión</h2>
        <form className="vs-form-content" onSubmit={handleSubmit}>
          <AppFormField label="E-mail" name='email' type="text" value={formData.email} onChange={handleChange} errorMessage={errorMessage}></AppFormField>
          <AppFormField label="Contraseña" name='password' type="password" value={formData.password} onChange={handleChange} errorMessage={errorMessage}></AppFormField>
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