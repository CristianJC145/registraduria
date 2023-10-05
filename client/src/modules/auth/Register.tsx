import React, { useState } from 'react';
import AppButton from '../../shared/components/Buttons/AppButton';
import AppFormField from '../../shared/components/forms/AppFormField';
import { registerUser } from '../vshowcase/services/createUser.service';

import './css/Register.css'

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',

    });    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
          <AppFormField label="Nombre" name='name' type="text" value={formData.name} onChange={handleChange}></AppFormField>
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
        <AppButton variant='link' to="/login" label='Iniciar Sesión'></AppButton>
      </div>

    </section>
  );
};

export default Register;