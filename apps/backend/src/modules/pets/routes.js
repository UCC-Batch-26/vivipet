import { Router } from 'express';
import { getAllPet, getPet } from './controllers/get-pet.js';
import { petActivity } from './controllers/pet-activity.js';

const router = new Router();

router.get('/:userId', getPet);
router.get('/', getAllPet);
router.post('/:userId/activity', petActivity);

export default router;
