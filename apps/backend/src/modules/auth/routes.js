import { Router } from 'express';
import { signUp } from '../auth/controllers/sign-up.js';

const router = new Router();

router.post('/signup', signUp);

export default router;
