import { Router } from 'express';
import controller from './controller';

const router = Router();

router
  .route('/')
  .get(controller.getUsers)
  .post(controller.newUser);

router
  .route('/:id')
  .get(controller.getUser)
  .put(controller.updateUser);

router
  .route('/:id/greenhouses')
  .get(controller.getUserGreenhouses)
  .post(controller.newUserGreenhouse);

export default router;
