import doHash from '../utils/doHash.js';
import db from '../config/lowdbConfig.js';

export default async (req, res, next) => {
  const { userId } = req.params;
  const { authorization } = req.headers;

  if (authorization) {
    const hashPassword = doHash(Buffer
      .from(
        authorization.split(' ')[1].toString(),
        'base64',
      ).toString('ascii').split(':')[1]);
    const isUser = db.data.users.find((user) => user.id === userId);

    if (!isUser) res.tatus(401).send('User not found with this id (or user is not the one authenticated)');
    if (isUser.password === hashPassword) next();
  } else {
    res.status(400).send('Invalid parameters');
  }
};
