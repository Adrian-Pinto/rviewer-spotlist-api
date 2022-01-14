import generateId from '../utils/generateId.js';
import listSchema from '../models/listsModel.js';
import db from '../config/lowdbConfig.js';

const getAllUserList = () => console.log('fetch all user lists');

const getUserListById = (req, res) => {
  const { userObject, params } = req;
  const isUserList = userObject.lists.find((list) => list.listId === params.listId);

  if (!isUserList) {
    res.sendStatus(401);
  } else {
    const listById = db.data.lists.find((list) => isUserList.listId === list.listId);

    res.status(200).json(listById);
  }
};

const postNewUserList = (req, res) => {
  const { userObject, body } = req;
  const { name, sogns } = body;

  if (!userObject?.lists) userObject.lists = [];

  const isList = userObject.lists.find((list) => list.name === name);

  if (!isList && listSchema(body)) {
    const listId = generateId();

    userObject.lists.push({
      listId,
      name,
    });

    const sognsId = sogns?.map((sogn) => {
      let isSogn = db.data.sogns.find((dbSogn) => dbSogn.title === sogn.title);

      if (!isSogn) {
        isSogn = {
          id: generateId(),
          ...sogn,
        };
        db.data.sogns.push(isSogn);
      }
      return isSogn;
    });

    db.data.lists.push({
      listId,
      name,
      sogns: sognsId,
    });

    db.write();
  }
  res.sendStatus(200);
};

export default {
  getAllUserList,
  getUserListById,
  postNewUserList,
};
