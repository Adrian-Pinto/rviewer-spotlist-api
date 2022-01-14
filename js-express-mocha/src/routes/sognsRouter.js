import Router from 'express';
import sognsController from '../controllers/songsController.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const sognsRouter = Router();

sognsRouter
  .route('/:userId/lists/:listId/sogns')
  .all(authorizeUser)
  .post(sognsController.postSognsToList);

export default sognsRouter;
