import { PET_MOOD } from '#modules/pets/models/pet.js';

export function getMoodUpdate(pet) {
  const now = new Date();
  const minutesPassed = Math.floor((now - new Date(pet.idleSince)) / 1000);
  if (minutesPassed > 0) {
    pet.hungry = Math.min(100, pet.hungry + minutesPassed * 1);
    pet.dirty = Math.min(100, pet.dirty + minutesPassed * 0.5);
    pet.idleSince = now;
  }

  const isHungry = pet.hungry >= 80;
  const isDirty = pet.dirty >= 80;

  if (isHungry && isDirty) {
    pet.mood = PET_MOOD.SAD;
  } else if (isHungry) {
    pet.mood = PET_MOOD.HUNGRY;
  } else if (isDirty) {
    pet.mood = PET_MOOD.DIRTY;
  } else {
    pet.mood = PET_MOOD.HAPPY;
  }
}
