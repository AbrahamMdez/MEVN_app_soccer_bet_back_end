import { Router } from 'express';
const router = Router();

import * as userCtrl from '../controllers/user.controller.js';
import { authJwt, verifySingUp } from '../middlewares/index.js';

router.post('/', [authJwt.verifyToken, verifySingUp.checkIfRoleExists], userCtrl.createNewUser);

export default router;