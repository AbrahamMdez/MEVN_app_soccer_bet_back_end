import { Router } from 'express';
const router = Router();

import * as userCtrl from '../controllers/user.controller.js';
import { authJwt } from '../middlewares/index.js';

router.post('/', authJwt.verifyToken, userCtrl.createNewUser);

export default router;