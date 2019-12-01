import { Router } from 'express';
import controller from './controller';

const router = Router();

router.get('/current', controller.current);
router.get('/forecast', controller.forecast);

export default router;
