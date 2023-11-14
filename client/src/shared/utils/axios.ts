import axios from 'axios';
// import  useErrorAlertStore  from '../stores/errorAlert.store'; // Asegúrate de importar tu store correcto
import { TokenService } from '../services/token.service'; // Asegúrate de importar tu servicio de token correcto

const configureApi = () => {
  // const errorAlertStore = useErrorAlertStore ();
  const tokenService = new TokenService('');

  const api = axios.create();

  // Interceptor para configurar el token en cada solicitud
  api.interceptors.request.use(async (config) => {
    const token = await tokenService.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor para manejar errores de respuesta
  api.interceptors.response.use(
    (response) => {
      if (response && response.data && response.data.message) {
        // Mostrar mensaje de éxito si hay uno en la respuesta
        // errorAlertStore.methods.setMessage(response.data.message);
        console.log("error");
      }
      return response;
    },
    (error) => {
      // Manejar errores de respuesta y mostrar mensajes de error
      const response = error.response;

      if (response && response.data) {
        const data = response.data;
        const errorMessage = data.message || 'Error desconocido';
        const validationErrors = data.errors || [];
        // errorAlertStore.methods.setMessage(errorMessage, validationErrors);
        console.log(validationErrors);
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default configureApi;