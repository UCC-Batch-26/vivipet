import { getMoodUpdate } from '#utils/get-mood.js';
import { log } from '#utils/log.js';
import { Pet, PET_ACTIVITY, PET_MOOD } from '../models/pet.js';

const hungerLevel = 75;
const dirtinessLevel = 75;

export async function petActivity(req, res) {
  const { userId } = req.params;
  const { activity } = req.body;

  try {
    const pet = await Pet.findOne({ owner: userId });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    switch (activity) {
      case PET_ACTIVITY.PLAY:
        if (pet.hungry > hungerLevel) {
          return res.status(400).json({ message: 'Pet is too hungry to play' });
        }
        if (pet.dirty > dirtinessLevel) {
          return res.status(400).json({ message: 'Pet is too dirty to play' });
        }

        pet.hungry = Math.min(100, pet.hungry + 10);
        pet.dirty = Math.min(100, pet.dirty + 5);
        pet.mood = PET_MOOD.HAPPY;
        break;

      case PET_ACTIVITY.FEED:
        if (pet.hungry < 20) {
          return res.status(400).json({ message: 'Pet is not hungry' });
        }

        pet.hungry = Math.max(0, pet.hungry - 40);
        pet.dirty = Math.min(100, pet.dirty + 5);
        pet.mood = PET_MOOD.HAPPY;
        break;

      case PET_ACTIVITY.SHOWER:
        if (pet.dirty < 20) {
          return res.status(400).json({ message: 'Pet is still clean!' });
        }

        pet.dirty = Math.max(0, pet.dirty - 60);
        pet.mood = PET_MOOD.HAPPY;
        break;

      default:
        break;
    }

    pet.activity = activity;
    pet.idleSince = new Date();

    getMoodUpdate(pet);

    await pet.save();

    setTimeout(async () => {
      try {
        const updatedPet = await Pet.findById(pet._id);
        if (!updatedPet) return;

        const isHungry = updatedPet.hungry >= 80;
        const isDirty = updatedPet.dirty >= 80;

        if (!isHungry && !isDirty) {
          updatedPet.activity = PET_ACTIVITY.IDLE;
          updatedPet.mood = PET_MOOD.HAPPY;
          updatedPet.idleSince = new Date();
        }

        await updatedPet.save();
      } catch (err) {
        log('error', `${err.message}`);
      }
    }, 10000);

    res.status(200).json({ pet });
  } catch (error) {
    log('error', error);
    res.status(500).json({ message: 'Server error' });
  }
}
