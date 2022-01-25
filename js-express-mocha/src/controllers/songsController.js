import generateId from '../utils/generateId.js';
import songschema from '../models/songsModel.js';
import db from '../config/lowdbConfig.js';

const postsongsToList = (req, res) => {
  const { userObject, body, params } = req;
  const { listId } = params;
  let status;
  let message;

  const isUserList = userObject.lists.find((list) => list.listId === listId);

  if (isUserList && songschema(body)) {
    let isInsongs = db.data.songs.find((sogn) => sogn.title === body.title);
    const dbList = db.data.lists.find((list) => list.listId === listId);

    if (isInsongs) {
      const isSognInList = dbList.songs.find((sogn) => sogn.id === isInsongs.id);

      if (!isSognInList) dbList.songs.push({ ...isInsongs });
    } else {
      isInsongs = {
        id: generateId(),
        ...body,
      };

      dbList.songs.push({ ...isInsongs });
      db.data.songs.push({ ...isInsongs });
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
  postsongsToList,
};
