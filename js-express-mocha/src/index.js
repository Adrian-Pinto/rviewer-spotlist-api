import { stdout } from 'process';
import express from 'express';
import listsRouter from './routes/listsRouter.js';
import songsRouter from './routes/songsRouter.js';
import './config/lowdbConfig.js';

const api = express();
const port = 3001;

api.disable('x-powered-by');

api.use(express.json());

api.use('/api/v1/users', listsRouter);
api.use('/api/v1/users', songsRouter);

api.listen(
  port,
  () => stdout.write(`Server running on port: ${port}\n`),
);
