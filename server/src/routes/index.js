import { Router } from 'express';
import version from './version';
import users from './users';
import greenhouses from './greenhouses';
import auth from './auth';

const router = Router();

router.use('/version', version);
router.use('/users', users);
router.use('/greenhouses', greenhouses);
router.use('/auth', auth);

export default router;
