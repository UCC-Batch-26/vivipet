const URL = `${import.meta.env.VITE_BACKEND_URL}/pet`;

const headers = {
  'Content-Type': 'application/json',
};

export async function fetchPet(userId) {
  try {
    const response = await fetch(`${URL}/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Pet not found');
    }

    return data.pet;
  } catch (error) {
    console.error('Error fetch', error);
    return null;
  }
}

export async function petAction(activity, userId, setPet, setAction, setMood) {
  try {
    const response = await fetch(`${URL}/${userId}/activity`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ activity }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setPet(data.pet);
    setAction(data.pet.activity);
    setMood(data.pet.mood);
  } catch (error) {
    console.error('Pet Action Failed', error);
    throw error;
  }
}
