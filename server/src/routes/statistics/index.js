import { Router } from 'express';
import controller from './controller';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.get);
router.get('/latest', controller.getLatest);
router.get('/watering', controller.getWatering);

export default router;
