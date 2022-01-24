import userSchema from '../models/usersModel.js';
import doHash from '../utils/doHash.js';
import db from '../config/lowdbConfig.js';

export default async (req, res, next) => {
  const { userId } = req.params;
  const { authorization } = req.headers;
  const [name, password] = Buffer
    .from(
      authorization?.split(' ')[1].toString() || '',
      'base64',
    ).toString('ascii').split(':');

  if (authorization && userSchema({ userId, name, password })) {
    const hashPassword = doHash(password);
    const isUser = db.data.users.find((user) => user.id === userId);

    if (!isUser) res.status(401).send('User not found with this id (or user is not the one authenticated)');
    if (isUser?.password === hashPassword) {
      req.userObject = isUser;
      next();
    }
    res.status(400).send('Invalid password');
  } else {
    res.status(400).send('Invalid parameters');
  }
};
