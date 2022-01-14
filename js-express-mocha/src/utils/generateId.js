import { randomBytes } from 'crypto';

export default () => [
  randomBytes(3).toString('hex'),
  randomBytes(6).toString('hex'),
  randomBytes(3).toString('hex'),
].join('-');
