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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to Sign-up');
    }

    return data;
  } catch (error) {
    console.error('Sign-up error', error);
    throw error;
  }
}

export async function login(username) {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to Login');
    }

    return data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
}
