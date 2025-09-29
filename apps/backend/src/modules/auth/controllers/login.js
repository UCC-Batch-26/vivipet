import { User } from '#modules/users/models/user.js';
import { log } from '#utils/log.js';

export async function login(req, res) {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Login Successful',
      user: user,
    });
  } catch (error) {
    log('error', error);
    res.status(400).json({ message: 'Server error' });
  }
}
