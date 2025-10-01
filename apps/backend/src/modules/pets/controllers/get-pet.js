import { Pet, PET_ACTIVITY } from '../models/pet.js';
import { log } from '#utils/log.js';
import { idleMood } from '#utils/idleMood.js';

export async function getPet(req, res) {
  const { userId } = req.params;

  try {
    const pet = await Pet.findOne({ owner: userId }).populate('owner', 'username');

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.activity === PET_ACTIVITY.IDLE) {
      pet.mood = idleMood(pet);
    }

    res.status(200).json({
      message: 'Get Pet Successful',
      pet: pet,
    });
  } catch (error) {
    log('error', error);
    res.status(400).json({ message: 'Server error' });
  }
}

export async function getAllPet(req, res) {
  try {
    const pet = await Pet.find().populate('owner', 'username');

    res.status(200).json({
      message: 'Get All Pet Successful',
      pet: pet,
    });
  } catch (error) {
    log('error', error);
    res.status(400).json({ message: 'Server error' });
  }
}
