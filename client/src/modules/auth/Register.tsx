import React, { useState, FormEvent } from 'react';
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
    <div className='vs-form-register'>
      <h2 className='vs-form-title'>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input className='form-control' type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input className='form-control' type="email" name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input className='form-control' type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input className='form-control' type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <AppButton label='Guardar'></AppButton>
      </form>
    </div>
  );
};

export default Register;