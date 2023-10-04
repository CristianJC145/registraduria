import React, { useState } from 'react';
import AppButton from '../../shared/components/Buttons/AppButton';
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
          <div className='vs-form-field'>
            <label className='vs-form-label'>Nombre</label>
            <input className='vs-form-input' type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='vs-form-field'>
            <label className='vs-form-label'>E-mail</label>
            <input className='vs-form-input' type="email" name='email' value={formData.email} onChange={handleChange} required />
          </div>
          <div className='vs-form-field'>
            <label className='vs-form-label'>Celular</label>
            <input className='vs-form-input' type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className='vs-form-field'>
            <label className='vs-form-label'>Contraseña</label>
            <input className='vs-form-input' type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <AppButton className='mt-3' label='Guardar' shadow='sm'></AppButton>
        </form>
      </div>
      <div className="vs-form-actions">
        <span>¿Ya tienes cuenta?</span>
        <AppButton className='mt-3' label='Iniciar Sesión' shadow='sm' outlined></AppButton>
      </div>
    </section>
  );
};

export default Register;