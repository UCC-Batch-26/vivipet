const URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const headers = {
  'Content-Type': 'application/json',
};

export async function signUp(username, petname, selectedPet) {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username, name: petname, type: selectedPet }),
    });

    if (!response.ok) {
      throw new Error('Failed to Sign-up');
    }

    return await response.json();
  } catch (error) {
    console.error('Sign-up error', error);
    throw error;
  }
}
