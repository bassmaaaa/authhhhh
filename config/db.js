// src/config/db.js
import mysql from 'mysql2/promise';
import env from './env.js';

// Create a MySQL pool
export const db = mysql.createPool({
  host: env.db.host,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  port: env.db.port,
  waitForConnections: true,   // wait if all connections are busy
  connectionLimit: 10,        // max simultaneous connections
  queueLimit: 0,              // unlimited queue
});
