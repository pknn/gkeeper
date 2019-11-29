import { Router } from 'express';
import version from './version';
import users from './users';
import greenhouses from './greenhouses';

const router = Router();

router.use('/version', version);
router.use('/users', users);
router.use('/greenhouses', greenhouses);

export default router;
