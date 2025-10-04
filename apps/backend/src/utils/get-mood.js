import { PET_MOOD } from '#modules/pets/models/pet.js';

export function getMoodUpdate(pet) {
  const now = new Date();
  const minutesPassed = Math.floor((now - new Date(pet.idleSince)) / 1000);
  if (minutesPassed > 0) {
    pet.hungry = Math.min(100, pet.hungry + minutesPassed * 10);
    pet.dirty = Math.min(100, pet.dirty + minutesPassed * 5);
    pet.updatedAt = now;
  }

  if (pet.hungry >= 80) {
    pet.mood = PET_MOOD.HUNGRY;
  } else if (pet.dirty >= 80) {
    pet.mood = PET_MOOD.DIRTY;
  } else {
    pet.mood = PET_MOOD.HAPPY;
  }
}
