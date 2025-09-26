// src/components/MoodManager.js

export const MEAL_TIMES = {
  breakfast: '07:38',
  lunch: '12:00',
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

  for (const meal of Object.values(MEAL_TIMES)) {
    const mealTime = parseTimeToDate(meal);
    const diff = (now - mealTime) / 1000 / 60; // diff in minutes

    if (diff >= 0 && diff < 15) return 'hungry'; // hungry during meal
    if (diff >= 30 && diff < 60) return 'dirty'; // dirty 30 min after meal
    if (diff >= 60 && diff < 90) return 'sad'; // sad 30 min after dirty
    if (diff >= 90 && diff < 120) return 'playing'; // play 30 min after sad
  }

  return 'walking';
}
