import generateId from '../utils/generateId.js';
import listSchema from '../models/listsModel.js';
import db from '../config/lowdbConfig.js';

const getAllUserList = (req, res) => {
  const { userObject } = req;

  const userLists = userObject?.lists?.reduce((consult, { listId }) => {
    const temp = db.data.lists.find((dbList) => dbList.listId === listId);
    if (temp) consult.push(temp);
    return consult;
  }, []);

  if (userLists?.[0]) {
    res.status(200).json({
      lists: userLists,
    });
  } else {
    res.status(401).send('no results');
  }
};

const getUserListById = (req, res) => {
  const { userObject, params } = req;

  const isUserList = userObject?.lists?.find((list) => list.listId === params.listId);

  if (!isUserList) {
    res.sendStatus(401);
  } else {
    const listById = db.data.lists.find((list) => isUserList.listId === list.listId);

    res.status(200).json(listById);
  }
};

const postNewUserList = (req, res) => {
  const { userObject, body } = req;
  const { name, songs } = body;
  let status;
  let message;

  if (!userObject?.lists) userObject.lists = [];

  const isList = userObject.lists.find((list) => list.name === name);

  if (isList) {
    status = 409;
    message = 'the list already exists';
  }

  if (!isList && listSchema(body)) {
    const listId = generateId();

    userObject.lists.push({
      listId,
      name,
    });

    const songsId = songs?.map((sogn) => {
      let isSogn = db.data.songs.find((dbSogn) => dbSogn.title === sogn.title);

      if (!isSogn) {
        isSogn = {
          id: generateId(),
          ...sogn,
        };
        db.data.songs.push(isSogn);
      }

      return isSogn;
    });

    const newList = {
      listId,
      userId: userObject.id,
      name,
      songs: songsId || [],
    };

    db.data.lists.push(newList);

    status = 200;
    message = newList;

    db.write();
  }
  res.status(status).send(message);
};

export default {
  getAllUserList,
  getUserListById,
  postNewUserList,
};
