import { stdout } from 'process';
import express from 'express';
import morgan from 'morgan';
import listsRouter from './controllers/listsRouter.js';
import sognsRouter from './controllers/sognsRouter.js';
import './config/lowdbConfig.js';

const api = express();
const port = 3001;

api.use(morgan('dev'));
api.use(express.json());

api.use('/api/v1/users', listsRouter);
api.use('/api/v1/users', sognsRouter);

api.listen(
  port,
  () => stdout.write(`Server runin on port: ${port}`),
);
