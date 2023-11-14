import axios from 'axios';
import { services } from '../../../shared/constant/services';
import {TokenService} from '../../../shared/services/token.service';

const tokenService = new TokenService('%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9=');

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