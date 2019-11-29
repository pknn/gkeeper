import { Router } from 'express';
import controller from './controller';

const router = Router();

router
  .route('/:id')
  .get(controller.getGreenhouse)
  .put(controller.updateGreenhouse);

router.route('/:id/statistics').get(controller.getStatistics);

export default router;
