export const MEAL_TIMES = {
  breakfast: '07:38',
  lunch: '12:42',
  dinner: '19:27',
};

function parseTimeToDate(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

export function getScheduledMood() {
  const now = new Date();

  // for (const meal of Object.values(MEAL_TIMES)) {
  //   const mealTime = parseTimeToDate(meal);
  //   const diff = (now - mealTime) / 1000 / 60;

  //   if (diff >= 0 && diff < 15) return 'hungry';
  //   if (diff >= 30 && diff < 60) return 'dirty';
  //   if (diff >= 60 && diff < 90) return 'sad';
  //   if (diff >= 90 && diff < 120) return 'playing';
  // }

  for (const meal of Object.values(MEAL_TIMES)) {
    const mealTime = parseTimeToDate(meal);
    const diff = (now - mealTime) / 1000; // in seconds

    if (diff >= 0 && diff < 10) return 'hungry';
    if (diff >= 15 && diff < 20) return 'dirty';
    if (diff >= 20 && diff < 30) return 'sad';
    if (diff >= 30 && diff < 40) return 'playing';
  }

  return null;
}
