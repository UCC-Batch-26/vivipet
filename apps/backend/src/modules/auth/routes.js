import { Router } from 'express';
import { signUp } from '../auth/controllers/sign-up.js';
import { login } from './controllers/login.js';

const router = new Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
