// import { PET_ACTIVITY, PET_MOOD } from '#modules/pets/models/pet.js';

// export function idleMood(pet) {
//   const now = Date.now();
//   const idleSince = new Date(pet.idleSince || pet.updatedAt).getTime();
//   const diffSec = (now - idleSince) / 1000;

//   if (pet.activity !== PET_ACTIVITY.IDLE) return PET_MOOD.CALM;

//   if (diffSec > 120) return PET_MOOD.SAD;
//   if (diffSec > 60) return PET_MOOD.DIRTY;
//   if (diffSec > 20) return PET_MOOD.HUNGRY;
//   if (diffSec <= 15) return PET_MOOD.HAPPY;
//   return PET_MOOD.CALM;
// }
