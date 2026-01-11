import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById, findUserByUsername } from '../Models/user.model.js';
import env from '../config/env.js';

const SALT_ROUNDS = 10;





//hydi registration btekhod username email w password btshuf iza l username mawjud abel 
export const registerUser = async ({ username, email, password }) => {
  // Check if user exists
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const result = await createUser({ username, email, password });
  return { id: result.insertId, username, email };
};







export const loginUser = async ({ email, password }) => {
  console.log('Login attempt:', { email, password }); // <-- password from request
  const user = await findUserByEmail(email);
  console.log('User from DB:', user); // <-- hashedPassword in DB

  if (!user) throw new Error('Invalid email or password');
console.log('password plain:', JSON.stringify(password)); // shows hidden chars
console.log('hashedPassword DB:', JSON.stringify(user.hashedPassword));
const match = await bcrypt.compare(password.trim(), user.hashedPassword);
console.log('Password match after trim:', match);

 // const match = await bcrypt.compare(password, user.hashedPassword);
  console.log('Password match:', match);

  if (!match) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user.id, email: user.email }, env.jwt.secret, {
    expiresIn: env.jwt.expires,
  });

  return { token, user: { id: user.id, username: user.username, email: user.email } };
};







export const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Return safe user data
  return { id: user.id, username: user.username, email: user.email };
};
