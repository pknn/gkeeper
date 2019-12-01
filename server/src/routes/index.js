import { Router } from 'express';
import version from './version';
import users from './users';
import greenhouses from './greenhouses';
import auth from './auth';
import weather from './weather';
import statistics from './statistics';

const router = Router();

router.use('/version', version);
router.use('/users', users);
router.use('/greenhouses', greenhouses);
router.use('/auth', auth);
router.use('/weather', weather);
router.use('/statistics', statistics);

export default router;
