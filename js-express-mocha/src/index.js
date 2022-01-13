import { stdout } from 'process';
import express from 'express';
import morgan from 'morgan';

const api = express();
const port = 3001;

api.use(morgan('dev'));
api.use(express.json());

api.listen(
  port,
  () => stdout.write(`Server runin on port: ${port}`),
);
