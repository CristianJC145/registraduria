import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { registerUser } from '../vshowcase/services/createUser.service';
import { validatePassword } from './logic/validatePassword';

import './css/Register.css'
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const typeAccount = searchParams.get('type');
  const account_type_id = typeAccount === 'business' ? 2 : 1;
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      account_type_id: account_type_id,
  });    
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validatePassword(formData.password)) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }
      try {
          await registerUser(formData);
          let url = '/auth/login'
          toast.success('Te has registrado exitosamente');
          navigate(url);
          
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
    <section className="vs-section-form">
      <div className='vs-form-register'>
        <h2 className='vs-form-title'>Crear Cuenta</h2>
        <form className='vs-form-content' onSubmit={handleSubmit}>     
          <AppFormField label={`${typeAccount === 'business' ? 'Nombre empresa' : 'Nombre'}`} name='name' type="text" value={formData.name} onChange={handleChange}></AppFormField>
          <AppFormField label="E-mail" name='email' type="text" value={formData.email} onChange={handleChange}></AppFormField>
          <AppFormField label="Celular" name='phone' type="text" value={formData.phone} onChange={handleChange}></AppFormField>
          <AppFormField label="Contraseña" name='password' type="password" value={formData.password} onChange={handleChange}></AppFormField>
          <AppButton className='mt-3' label='Guardar' shadow='sm'></AppButton>
        </form>
      </div>

      <div className='vs-section-terms'>
        <span>Al registrate aceptas nuestros</span>
        <AppButton variant='link' to="/" label=' Terminos y condiciones '></AppButton>
        <span>&</span>
        <AppButton variant='link' to="/" label=' Políticas de Privacidad'></AppButton>
      </div>

      <div className="vs-section-actions">
        <span className='vs-actions-label'>¿Ya tienes cuenta?</span>
        <AppButton variant='link' to="/auth/login" label='Iniciar Sesión'></AppButton>
      </div>
     

    </section>
  );
};

export default Register;