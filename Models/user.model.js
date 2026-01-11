import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
export const createUser = async ({ username, email, password }) => {
    const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await db.execute(
    'INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result;
};

export const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0]; // returns first match or undefined
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // return first user or undefined
};

export const findUserById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  for (const key in data) {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  }

  const [result] = await db.execute(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    [...values, id]
  );

  return result;
};

export const deleteUser = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return result;
};
