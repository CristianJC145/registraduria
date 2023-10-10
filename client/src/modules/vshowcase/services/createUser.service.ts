import axios from 'axios';
import { services } from '../../../shared/constant/services';

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post(`${services.users}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar:', error);
  }
};