import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { registerUser } from '../vshowcase/services/createUser.service';
import { validatePassword } from './logic/validatePassword';

import './css/Register.css'

const Register: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeAccount = searchParams.get('type');
  const account_type_id = 1;
  console.log(account_type_id);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      account_type_id: account_type_id,
  });    
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(validatePassword(formData.password));
      if (!validatePassword(formData.password)) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }
      try {
          await registerUser(formData);
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

     

    </section>
  );
};

export default Register;