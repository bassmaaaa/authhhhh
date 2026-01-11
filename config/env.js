import dotenv from 'dotenv';
dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'auth',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_secret_key',
    expires: process.env.JWT_EXPIRES || '1h', // 1 hour default
  },
};

export default env;
