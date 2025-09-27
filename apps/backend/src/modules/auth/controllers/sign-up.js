import { Pet } from '#modules/pets/models/pet.js';
import { User } from '#modules/users/models/user.js';
import { log } from '#utils/log.js';

export async function signUp(req, res) {
  const { username, name, type } = req.body;

  try {
    const newUser = new User({
      username,
    });

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = await newUser.save();

    const newPet = new Pet({
      name,
      type,
      owner: user._id,
    });

    const pet = await newPet.save();

    res.status(200).json({
      message: 'Signup Successful',
      user: user,
      pet: pet,
    });
  } catch (error) {
    log('Signup error', error);
    res.status(400).json({
      error: 'Something went wrong',
    });
  }
}
