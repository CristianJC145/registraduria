import * as express from 'express';
import * as cors from 'cors';
import './dotenv';
import { userRouter } from './user';
import { authRouter } from './auth';
import { productRouter } from './product';
import { requestLoggerMiddleware } from '../../src/middleware/requestLoggerMiddleware';

const compression = require('compression');

const app = express();

app.use(compression());
app.use('/uploads', express.static('./uploads'));
app.use(cors());
app.use(requestLoggerMiddleware);

const port = process.env.PORT ?? '3000';

app.use(express.json());

app.use(userRouter, authRouter, productRouter);

app.get('/', async (_req, res) => {
  res.json('vshowcase API');
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
