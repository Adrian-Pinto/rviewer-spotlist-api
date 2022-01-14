import Router from 'express';
import listsController from '../controllers/listsController.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const listsRouter = Router();

listsRouter
  .route('/:userId/lists/:listId')
  .all(authorizeUser)
  .get(listsController.getUserListById);

listsRouter
  .route('/:userId/lists')
  .all(authorizeUser)
  .get(listsController.getAllUserList)
  .post(listsController.postNewUserList);

export default listsRouter;
