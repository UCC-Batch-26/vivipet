import { log } from '#utils/log.js';
import { Pet, PET_ACTIVITY, PET_MOOD } from '../models/pet.js';

export async function petActivity(req, res) {
  const { userId } = req.params;
  const { activity } = req.body;

  try {
    const pet = await Pet.findOne({ owner: userId });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    pet.activity = activity;
    pet.mood = PET_MOOD.CALM;
    await pet.save();

    setTimeout(async () => {
      const updatedPet = await Pet.findById(pet._id);
      if (!updatedPet) return;
      updatedPet.activity = PET_ACTIVITY.IDLE;

      updatedPet.idleSince = new Date();
      await updatedPet.save();
    }, 10000);

    res.status(200).json({ pet: pet });
  } catch (error) {
    log('error', error);
    res.status(400).json({ message: 'Server error' });
  }
}
