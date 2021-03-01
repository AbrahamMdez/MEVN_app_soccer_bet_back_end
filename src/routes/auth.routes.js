import { Router } from 'express'
const router = Router();

import * as authCtrl from '../controllers/auth.controller.js'
import { verifySingUp } from '../middlewares/index.js'

router.post('/signup', [verifySingUp.checkDuplicatedUserOrEmail, verifySingUp.checkIfRoleExists], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;