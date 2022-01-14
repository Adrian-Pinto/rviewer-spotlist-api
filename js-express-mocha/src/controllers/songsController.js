import generateId from '../utils/generateId.js';
import sognSchema from '../models/songsModel.js';
import db from '../config/lowdbConfig.js';

const postSognsToList = (req, res) => {
  const { userObject, body, params } = req;
  const { listId } = params;
  let status;
  let message;

  const isUserList = userObject.lists.find((list) => list.listId === listId);

  if (isUserList && sognSchema(body)) {
    let isInSogns = db.data.sogns.find((sogn) => sogn.title === body.title);
    const dbList = db.data.lists.find((list) => list.listId === listId);

    if (isInSogns) {
      const isSognInList = dbList.sogns.find((sogn) => sogn.id === isInSogns.id);

      if (!isSognInList) dbList.sogns.push({ ...isInSogns });
    } else {
      isInSogns = {
        id: generateId(),
        ...body,
      };

      dbList.sogns.push({ ...isInSogns });
      db.data.sogns.push({ ...isInSogns });
    }

    status = 200;
    message = 'OK';

    db.write();
  } else {
    status = 409;
    message = 'user does not have this list';
  }

  res.status(status).send(message);
};

export default {
  postSognsToList,
};
