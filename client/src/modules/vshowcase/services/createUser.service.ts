import axios from 'axios';
import { services } from '../../../shared/constant/services';

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${services.users}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar:', error);
  }
};