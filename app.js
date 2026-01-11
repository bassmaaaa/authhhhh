
import express from 'express';
import router from './routes.js';

const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', router);

// Optional: 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
