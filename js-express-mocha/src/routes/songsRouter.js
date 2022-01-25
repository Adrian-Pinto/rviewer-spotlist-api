import Router from 'express';
import songsController from '../controllers/songsController.js';
import authorizeUser from '../middlewares/authorizeUser.js';

const songsRouter = Router();

songsRouter
  .route('/:userId/lists/:listId/songs')
  .all(authorizeUser)
  .post(songsController.postsongsToList);

export default songsRouter;
