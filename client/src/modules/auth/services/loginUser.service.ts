import axios from 'axios';
import { services } from '../../../shared/constant/services';
import {TokenService} from '../../../shared/services/token.service';

const tokenService = new TokenService();

export const LoginUser = async (formData: { email: string, password: string }) => {
  try {
    const response = await axios.post(`${services.users}/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const token = response.data.token;
    tokenService.set(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};