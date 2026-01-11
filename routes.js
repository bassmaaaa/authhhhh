
//../advanced/routes.js
import express from 'express';
import { register, login, profile } from '../advanced/Controllers/authcontroller.js';
import { validateRegister, validateLogin } from '../advanced/Models/validators/authvalidator.js';
import { verifyToken } from '../advanced/Middlewares/auth.middleware.js';

const router = express.Router();

// Register route
router.post('/register', validateRegister, register);

// Login route
router.post('/login', validateLogin, login);

// Profile route (protected)
router.get('/profile', verifyToken, profile);



export default router;
