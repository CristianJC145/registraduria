// Archivo principal del servidor con ExpressJS

// importamos todo express
import * as express from 'express';
import * as cors from 'cors';

// importamos el archivo de configuración que nos permite leer las variables de entorno de .env
import './dotenv';
import { userRouter } from './user';
// import { authenticateToken } from '../../src/middleware/authMiddleware';
import { authRouter } from './auth';

const app = express();
app.use(cors());

const port = process.env.PORT ?? '3000';

// Usamos express.json para poder leer el req.body como un objeto
app.use(express.json());

// Usamos los routers que creamos

app.use(userRouter);

// usamos cors para permitir las peticiones del front
app.get('/', async (_req, res) => {
  res.json('vshowcase API');
});

app.use(authRouter);

app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
