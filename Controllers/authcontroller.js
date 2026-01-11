
import { registerUser, loginUser, getUserById } from '../Services/auth.service.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body); // service handles validation, hashing
    res.status(200).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body); 
    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    // userId is attached to req by authMiddleware
    const user = await getUserById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Optional: forgotPassword / resetPassword can be added here later
